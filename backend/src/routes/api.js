const { loadExpressAndCors } = require("../utils/frameworkCompat");
const { express } = loadExpressAndCors();
const crypto = require("crypto");
const repository = require("../database/repository");
const {
  createJwtToken,
  hashPassword,
  verifyPassword,
  isLegacyPasswordHash,
  hashAgentToken,
  requireAuth,
  requireRole,
  createRequireAgentAuth,
  asyncHandler,
  createRateLimiter,
} = require("../middlewares/auth");
const { TASK_CATALOG, signTaskPayload } = require("../config/taskCatalog");
const { evaluateMachineHealth } = require("../services/healthEvaluator");
const { triggerN8nIncidentWebhook } = require("../services/n8nWebhookService");
const socketHub = require("../realtime/socketHub");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const requireAgentAuth = createRequireAgentAuth(repository);

// Filas em memória para sinalização rápida de polling do Super Agente Nativo (.exe)
// (Histórico de chat e tarefas ficam persistidos no banco/repositório)
const pendingRefreshByAgent = new Set();
const pendingUpdateByAgent = new Set();
const pendingTasksByAgent = new Map();
const taskResultWaiters = new Map();
const heartbeatWaitersByAgent = new Map();

const LATEST_AGENT_VERSION = "2.4.0-native-exe";

function waitForLiveAgentTaskResult(taskId, timeoutMs = 4500) {
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      taskResultWaiters.delete(taskId);
      resolve(null);
    }, timeoutMs);

    taskResultWaiters.set(taskId, (completedTask) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      taskResultWaiters.delete(taskId);
      resolve(completedTask);
    });
  });
}

function notifyLiveAgentTaskResult(taskId, completedTask) {
  const fn = taskResultWaiters.get(taskId);
  if (fn) {
    try {
      fn(completedTask);
    } catch {}
  }
}

function getAgentInstallerInfo() {
  const exePath = path.join(__dirname, "../../public/IpojucaRMM-Setup.exe");
  let sha256 = "";
  let sizeBytes = 0;
  let releasedAt = null;
  try {
    if (fs.existsSync(exePath)) {
      const stat = fs.statSync(exePath);
      const buf = fs.readFileSync(exePath);
      sizeBytes = buf.length;
      sha256 = crypto.createHash("sha256").update(buf).digest("hex");
      releasedAt = stat.mtime.toISOString();
    }
  } catch {}
  return {
    latest_version: LATEST_AGENT_VERSION,
    download_path: "/api/agent/download",
    sha256,
    size_bytes: sizeBytes,
    released_at: releasedAt,
  };
}

function waitForLiveAgentHeartbeat(agentUuid, timeoutMs = 3800) {
  return new Promise((resolve) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      const set = heartbeatWaitersByAgent.get(agentUuid);
      if (set) set.delete(onHeartbeat);
      resolve(null);
    }, timeoutMs);

    function onHeartbeat(updatedMachine) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(updatedMachine);
    }

    if (!heartbeatWaitersByAgent.has(agentUuid)) {
      heartbeatWaitersByAgent.set(agentUuid, new Set());
    }
    heartbeatWaitersByAgent.get(agentUuid).add(onHeartbeat);
  });
}

function notifyLiveAgentHeartbeat(agentUuid, updatedMachine) {
  const waiters = heartbeatWaitersByAgent.get(agentUuid);
  if (!waiters || waiters.size === 0) return;
  for (const fn of Array.from(waiters)) {
    waiters.delete(fn);
    try {
      fn(updatedMachine);
    } catch {}
  }
}

const authLimiter = createRateLimiter({ windowMs: 60000, maxRequests: 30 });
const heartbeatLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 240,
});
const refreshLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 30,
});

// 1. Healthcheck da API e Observabilidade
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ipojuca-rmm-backend",
    db_mode: repository.mode,
    // Permite detectar container desatualizado sem tentar rotas de escrita
    capabilities: [
      "units:crud",
      "sectors:crud",
      "hardware:identity-upsert",
      "inventory:changes",
      "printers:catalog",
      "printers:discovery",
      "auth:session-me",
      "agent:authenticated-poll",
      "tasks:honest-queue",
      "alerts:inactivity-24h",
    ],
    timestamp: new Date().toISOString(),
  });
});

// 2. Login de Operadores (RBAC) e Verificação de Sessão
router.get("/auth/me", requireAuth, (req, res) => {
  return res.json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

router.post("/auth/login", authLimiter, asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "E-mail e senha são obrigatórios." });
  }

  const user = await repository.findUserByEmail(email);

  if (!user || !verifyPassword(password, user.password_hash)) {
    await repository.recordAuditLog({
      actionType: "AUTH_LOGIN_FAILED",
      ipAddress: req.ip,
      details: { email: String(email).slice(0, 100) },
    });
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  // Migração transparente de hash legado (salt fixo v1) para scrypt com salt aleatório
  if (isLegacyPasswordHash(user.password_hash)) {
    try {
      await repository.updateUserPasswordHash(user.id, hashPassword(password));
    } catch {
      // Nao bloqueia o login caso o upgrade de hash falhe
    }
  }

  const token = createJwtToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  await repository.recordAuditLog({
    userId: user.id,
    actionType: "AUTH_LOGIN_SUCCESS",
    ipAddress: req.ip,
    details: { role: user.role },
  });

  return res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}));

// 3. Recebimento de Heartbeat e Telemetria do Agente Windows
router.post("/heartbeat", heartbeatLimiter, async (req, res) => {
  try {
    const agentUuid = req.headers["x-agent-uuid"] || req.body?.agent_uuid;
    const agentToken = req.headers["x-agent-token"] || req.body?.agent_token;
    const enrollmentKey =
      req.headers["x-enrollment-key"] || req.body?.enrollment_key || "";

    if (!agentUuid || !agentToken) {
      return res
        .status(401)
        .json({ error: "Identidade ou credencial do agente ausente." });
    }

    let machine = await repository.findMachineByAgentUuid(String(agentUuid));
    if (!machine) {
      const env = require("../config/env");
      if (enrollmentKey && enrollmentKey === env.agentEnrollmentKey) {
        machine = await repository.enrollNewAgentMachine({
          agentUuid: String(agentUuid),
          agentToken: String(agentToken),
          unitId: Number(req.body?.unit_id || 1),
          sectorId: Number(req.body?.sector_id || 1),
          inventory: req.body?.inventory || {},
          ipAddress: req.ip || "0.0.0.0",
        });
        await repository.recordAuditLog({
          machineId: machine.id,
          actionType: "AGENT_AUTO_ENROLLED",
          ipAddress: req.ip,
          details: { agentUuid, hostname: machine.hostname },
        });
      } else {
        return res.status(401).json({ error: "Agente não reconhecido." });
      }
    }
    if (machine.is_revoked) {
      return res
        .status(403)
        .json({ error: "Credencial do agente foi revogada pelo @security." });
    }

    const incomingHash = hashAgentToken(agentToken);
    if (
      incomingHash.length !== machine.agent_token_hash.length ||
      !crypto.timingSafeEqual(
        Buffer.from(incomingHash),
        Buffer.from(machine.agent_token_hash),
      )
    ) {
      await repository.recordAuditLog({
        machineId: machine.id,
        actionType: "AGENT_AUTH_FAILED",
        ipAddress: req.ip,
        details: { agentUuid },
      });
      return res.status(401).json({ error: "Token do agente inválido." });
    }

    const { agent_version, inventory = {}, metrics = {}, printers = [] } = req.body || {};

    const rawTemp = metrics.temperature_c;
    const sanitizedTemp =
      rawTemp === null || rawTemp === undefined || rawTemp === "" || Number.isNaN(Number(rawTemp))
        ? 0
        : Math.min(130, Math.max(0, Number(rawTemp)));

    // Validação numérica de métricas
    const sanitizedMetrics = {
      cpu_usage_pct: Math.min(
        100,
        Math.max(0, Number(metrics.cpu_usage_pct ?? 0)),
      ),
      ram_usage_pct: Math.min(
        100,
        Math.max(0, Number(metrics.ram_usage_pct ?? 0)),
      ),
      disk_usage_pct: Math.min(
        100,
        Math.max(0, Number(metrics.disk_usage_pct ?? 0)),
      ),
      temperature_c: sanitizedTemp,
      uptime_seconds: Math.max(0, Number(metrics.uptime_seconds ?? 0)),
      idle_seconds: Math.max(0, Number(metrics.idle_seconds ?? 0)),
      spooler_running:
        metrics.spooler_running === undefined
          ? true
          : Boolean(metrics.spooler_running),
    };

    const evaluation = evaluateMachineHealth(sanitizedMetrics);

    const updatedMachine = await repository.upsertHeartbeat({
      agentUuid: String(agentUuid),
      agentVersion: String(agent_version || "1.0.0"),
      inventory,
      metrics: sanitizedMetrics,
      healthStatus: evaluation.health_status,
    });

    // Impressoras descobertas na LAN pela estacao (Ciclo #30)
    if (Array.isArray(printers) && printers.length) {
      try {
        await repository.upsertDiscoveredPrinters(
          updatedMachine.id,
          updatedMachine.unit_id,
          printers
        );
      } catch {
        // Falha de descoberta nao invalida o heartbeat
      }
    }

    // Emite atualização imediata para o Digital Twin 3D via Socket.io e resolve waiters manuais
    socketHub.broadcastToDashboard("machine:updated", updatedMachine);    notifyLiveAgentHeartbeat(String(agentUuid), updatedMachine);

    let alertTriggered = null;
    if (evaluation.health_status === "CRITICAL") {
      const { alert, isNew } = await repository.findOrCreateActiveAlert({
        machineId: updatedMachine.id,
        severity: "CRITICAL",
        metricName: evaluation.primary_metric,
        message: evaluation.reason,
      });

      if (isNew) {
        const webhookOutcome = await triggerN8nIncidentWebhook({
          alert,
          machine: updatedMachine,
          unit: {
            id: updatedMachine.unit_id,
            code: updatedMachine.unit_code,
            name: updatedMachine.unit_name,
            unit_type: updatedMachine.unit_type,
          },
          sector: {
            id: updatedMachine.sector_id,
            name: updatedMachine.sector_name,
          },
        });

        await repository.markAlertNotified(
          alert.id,
          webhookOutcome.external_ticket_id,
        );
        alert.n8n_notified = 1;
        alert.external_ticket_id = webhookOutcome.external_ticket_id;

        socketHub.broadcastToDashboard("alert:triggered", {
          ...alert,
          hostname: updatedMachine.hostname,
          unit_name: updatedMachine.unit_name,
          sector_name: updatedMachine.sector_name,
        });
      }
      alertTriggered = alert;
    } else if (evaluation.health_status === "NORMAL") {
      await repository.resolveMachineAlertsIfHealthy(updatedMachine.id);
    }

    let inactivityAlert = null;
    try {
      const inactivityOutcome = await repository.evaluateMachineInactivityAlert(updatedMachine);
      if (inactivityOutcome.alert) {
        inactivityAlert = inactivityOutcome.alert;
        if (inactivityOutcome.isNew) {
          const webhookOutcome = await triggerN8nIncidentWebhook({
            alert: inactivityAlert,
            machine: updatedMachine,
            unit: {
              id: updatedMachine.unit_id,
              code: updatedMachine.unit_code,
              name: updatedMachine.unit_name,
              unit_type: updatedMachine.unit_type,
            },
            sector: {
              id: updatedMachine.sector_id,
              name: updatedMachine.sector_name,
            },
          });
          await repository.markAlertNotified(
            inactivityAlert.id,
            webhookOutcome.external_ticket_id,
          );
          inactivityAlert.n8n_notified = 1;
          inactivityAlert.external_ticket_id = webhookOutcome.external_ticket_id;

          socketHub.broadcastToDashboard("alert:triggered", {
            ...inactivityAlert,
            hostname: updatedMachine.hostname,
            unit_name: updatedMachine.unit_name,
            sector_name: updatedMachine.sector_name,
          });
        }
      }
    } catch {
      // Falha na avaliacao de inatividade nao invalida o heartbeat
    }

    const installerInfo = getAgentInstallerInfo();
    return res.json({
      status: "ok",
      machine_id: updatedMachine.id,
      health_status: updatedMachine.health_status,
      reason: evaluation.reason,
      alert: alertTriggered,
      inactivity_alert: inactivityAlert,
      latest_agent_version: installerInfo.latest_version,
      server_time: new Date().toISOString(),
    });
  } catch (err) {
    if (err && err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: "Falha ao processar heartbeat." });
  }
});

// 4. Listagem de Unidades de Saúde e Setores (para o Dashboard e Digital Twin)
router.get("/units", requireAuth, asyncHandler(async (req, res) => {
  const units = await repository.listUnitsWithSummary();
  res.json({ units });
}));

async function broadcastUnitsAndRelocations(relocatedMachines = []) {
  const units = await repository.listUnitsWithSummary();
  socketHub.broadcastToDashboard("units:updated", { units });
  for (const m of relocatedMachines) {
    socketHub.broadcastToDashboard("machine:updated", m);
  }
  return units;
}

// 4.1. Criação de Nova Unidade de Saúde (TECH_N1 / ADMIN_N2)
router.post(
  "/units",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const {
        name,
        code,
        unit_type = "USF",
        address = "",
        create_default_sectors = true,
      } = req.body || {};

      const unit = await repository.createUnit({
        name,
        code,
        unitType: unit_type,
        address,
        createDefaultSectors: create_default_sectors !== false,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "UNIT_CREATED",
        ipAddress: req.ip,
        details: {
          unit_id: unit.id,
          code: unit.code,
          name: unit.name,
          unit_type: unit.unit_type,
          sectors_count: (unit.sectors || []).length,
        },
      });

      const units = await broadcastUnitsAndRelocations();
      return res.status(201).json({ status: "created", unit, units });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao criar unidade de saúde." });
    }
  },
);

// 4.2. Edição de Unidade de Saúde (TECH_N1 / ADMIN_N2)
router.put(
  "/units/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const { name, code, unit_type, address } = req.body || {};
      const unit = await repository.updateUnit(req.params.id, {
        name,
        code,
        unitType: unit_type,
        address,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "UNIT_UPDATED",
        ipAddress: req.ip,
        details: {
          unit_id: unit.id,
          code: unit.code,
          name: unit.name,
          unit_type: unit.unit_type,
        },
      });

      const units = await broadcastUnitsAndRelocations();
      return res.json({ status: "updated", unit, units });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao atualizar unidade de saúde." });
    }
  },
);

// 4.3. Exclusão de Unidade de Saúde com Realocação Segura (TECH_N1 / ADMIN_N2)
router.delete(
  "/units/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const targetUnitId =
        req.body?.target_unit_id ?? req.query?.target_unit_id ?? undefined;
      const targetSectorId =
        req.body?.target_sector_id ?? req.query?.target_sector_id ?? undefined;

      const result = await repository.deleteUnit(req.params.id, {
        targetUnitId,
        targetSectorId,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "UNIT_DELETED",
        ipAddress: req.ip,
        details: {
          deleted_unit_id: result.deletedId,
          deleted_name: result.deletedName,
          relocated_machines_count: result.relocatedMachinesCount,
          target_unit_id: result.targetUnitId,
        },
      });

      const units = await broadcastUnitsAndRelocations(result.relocatedMachines);
      return res.json({
        status: "deleted",
        deleted_id: result.deletedId,
        relocated_machines_count: result.relocatedMachinesCount,
        target_unit_id: result.targetUnitId,
        units,
      });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao excluir unidade de saúde." });
    }
  },
);

// 4.4. Criação de Novo Setor na Unidade com Alocador Espacial 3D (TECH_N1 / ADMIN_N2)
router.post(
  "/units/:unitId/sectors",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const {
        name,
        code,
        room_theme,
        bounds_x,
        bounds_z,
        width_3d,
        depth_3d,
        auto_size,
      } = req.body || {};

      const sector = await repository.createSector(req.params.unitId, {
        name,
        code,
        roomTheme: room_theme,
        boundsX: bounds_x,
        boundsZ: bounds_z,
        width3d: width_3d,
        depth3d: depth_3d,
        autoSize: auto_size === true,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "SECTOR_CREATED",
        ipAddress: req.ip,
        details: {
          sector_id: sector.id,
          unit_id: sector.unit_id,
          code: sector.code,
          name: sector.name,
          room_theme: sector.room_theme,
          bounds: [sector.bounds_x, sector.bounds_z, sector.width_3d, sector.depth_3d],
        },
      });

      const units = await broadcastUnitsAndRelocations();
      return res.status(201).json({ status: "created", sector, units });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao criar setor na unidade." });
    }
  },
);

// 4.5. Edição de Setor Existente (TECH_N1 / ADMIN_N2)
router.put(
  "/sectors/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const {
        name,
        code,
        room_theme,
        bounds_x,
        bounds_z,
        width_3d,
        depth_3d,
      } = req.body || {};

      const sector = await repository.updateSector(req.params.id, {
        name,
        code,
        roomTheme: room_theme,
        boundsX: bounds_x,
        boundsZ: bounds_z,
        width3d: width_3d,
        depth3d: depth_3d,
      });

      const updatedMachines = await repository.listMachines({ sectorId: sector.id });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "SECTOR_UPDATED",
        ipAddress: req.ip,
        details: {
          sector_id: sector.id,
          unit_id: sector.unit_id,
          code: sector.code,
          name: sector.name,
          room_theme: sector.room_theme,
          bounds: [sector.bounds_x, sector.bounds_z, sector.width_3d, sector.depth_3d],
        },
      });

      const units = await broadcastUnitsAndRelocations(updatedMachines);
      return res.json({ status: "updated", sector, units });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao atualizar setor." });
    }
  },
);

// 4.6. Exclusão de Setor com Realocação de Máquinas (TECH_N1 / ADMIN_N2)
router.delete(
  "/sectors/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const targetSectorId =
        req.body?.target_sector_id ?? req.query?.target_sector_id ?? undefined;

      const result = await repository.deleteSector(req.params.id, {
        targetSectorId,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        actionType: "SECTOR_DELETED",
        ipAddress: req.ip,
        details: {
          deleted_sector_id: result.deletedId,
          unit_id: result.unitId,
          deleted_name: result.deletedName,
          relocated_machines_count: result.relocatedMachinesCount,
          target_sector_id: result.targetSectorId,
        },
      });

      const units = await broadcastUnitsAndRelocations(result.relocatedMachines);
      return res.json({
        status: "deleted",
        deleted_id: result.deletedId,
        unit_id: result.unitId,
        relocated_machines_count: result.relocatedMachinesCount,
        target_sector_id: result.targetSectorId,
        units,
      });
    } catch (err) {
      return res
        .status(err.statusCode || 500)
        .json({ error: err.message || "Erro ao excluir setor." });
    }
  },
);

// 5. Listagem de Máquinas (com coordenadas 3D e métricas atuais)
router.get("/machines", requireAuth, asyncHandler(async (req, res) => {
  const { unit_id, sector_id, status } = req.query;
  const machines = await repository.listMachines({
    unitId: unit_id,
    sectorId: sector_id,
    status,
  });
  res.json({ machines });
}));

// 6. Diagnóstico Detalhado de um Computador
router.get("/machines/:id/diagnostics", requireAuth, asyncHandler(async (req, res) => {
  const data = await repository.getMachineDiagnostics(req.params.id);
  if (!data) {
    return res.status(404).json({ error: "Computador não encontrado." });
  }
  return res.json(data);
}));

// 6.1. Coleta Manual de Telemetria Sob Demanda (Botão Manual do Operador)
router.post("/machines/:id/refresh-telemetry", requireAuth, refreshLimiter, asyncHandler(async (req, res) => {
  try {
    const machine = await repository.findMachineById(req.params.id);
    if (!machine) {
      return res.status(404).json({ error: "Computador não encontrado." });
    }

    const socketOutcome = socketHub.requestImmediateTelemetry(machine.id);
    pendingRefreshByAgent.add(machine.agent_uuid);

    await repository.recordAuditLog({
      userId: req.user.id,
      machineId: machine.id,
      actionType: "MANUAL_TELEMETRY_REFRESH",
      ipAddress: req.ip,
      details: { deliveredToSocket: socketOutcome.deliveredToSocket, queuedForNativeAgent: true },
    });

    // Aguarda até 3.8s pela resposta real do Agente Windows (via WebSocket ou Poll do .exe)
    const waitMs = process.env.FORCE_NATIVE_ROUTER === "1" ? 40 : 3800;
    const liveMachine = await waitForLiveAgentHeartbeat(machine.agent_uuid, waitMs);

    if (liveMachine) {
      return res.json({
        status: "ok",
        mode: "agent_live_pull_completed",
        machine: liveMachine,
        message: `Telemetria coletada em tempo real do agente (${liveMachine.ip_address} | CPU ${Number(liveMachine.cpu_usage_pct).toFixed(1)}% | RAM ${Number(liveMachine.ram_usage_pct).toFixed(1)}%).`,
      });
    }

    if (!socketOutcome.deliveredToSocket) {
      const updated = await repository.findMachineById(machine.id);
      return res.json({
        status: "ok",
        mode: "snapshot_refreshed",
        machine: updated,
        message: "Solicitação enfileirada para o Agente Windows em segundo plano.",
      });
    }

    return res.json({
      status: "ok",
      mode: "agent_live_pull",
      machine_id: machine.id,
      message: "Solicitação de coleta instantânea enviada ao Agente Windows.",
    });
  } catch (err) {
    return res.status(500).json({ error: "Falha ao solicitar telemetria manual." });
  }
}));

// 7. Catálogo de Tarefas Autorizadas disponíveis para o operador
router.get("/catalog/tasks", requireAuth, (req, res) => {
  const tasks = Object.values(TASK_CATALOG).map((t) => ({
    code: t.code,
    title: t.title,
    description: t.description,
    riskLevel: t.riskLevel,
    allowedRoles: t.allowedRoles,
    permittedForCurrentUser: t.allowedRoles.includes(req.user.role),
  }));
  res.json({ tasks });
});

// 7.1 Impressoras: catalogo homologado + descobertas na LAN da estacao (Ciclo #30)
router.get("/printers", requireAuth, async (req, res) => {
  try {
    const unitId = Number(req.query.unit_id) || null;
    const machineId = Number(req.query.machine_id) || null;
    const approved = await repository.listApprovedPrinters({ unitId });
    const discovered = await repository.listDiscoveredPrinters({ machineId, unitId });

    const byIp = new Map();
    for (const p of approved) {
      byIp.set(p.ip_address, {
        id: `approved-${p.id}`,
        ip_address: p.ip_address,
        name: p.name,
        model: p.model,
        source: "APPROVED",
      });
    }
    for (const p of discovered) {
      byIp.set(p.ip_address, {
        id: `discovered-${p.id}`,
        ip_address: p.ip_address,
        name: p.name,
        model: p.model,
        source: p.source,
        machine_id: p.machine_id,
        last_seen_at: p.last_seen_at,
      });
    }

    res.json({ printers: Array.from(byIp.values()) });
  } catch {
    res.status(500).json({ error: "Falha ao listar impressoras." });
  }
});

// 8. Disparo de Tarefa Remota Homologada (Inovação C com Controles de @security)
router.post(
  "/command",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    try {
      const { machine_id, task_code, parameters = {}, reason } = req.body || {};

      // Bloqueio explícito de tentativa de envio de comando/script livre (CA-05 / RN-01)
      if (req.body?.script || req.body?.powershell || req.body?.cmd) {
        await repository.recordAuditLog({
          userId: req.user.id,
          machineId: Number(machine_id) || null,
          actionType: "SECURITY_BLOCKED_ARBITRARY_COMMAND",
          ipAddress: req.ip,
          details: { attemptedKeys: Object.keys(req.body || {}) },
        });
        return res.status(403).json({
          error:
            "Operação bloqueada pelo @security: execução arbitrária de scripts PowerShell não é permitida. Utilize apenas task_code do catálogo autorizado.",
        });
      }

      if (!machine_id || !task_code) {
        return res
          .status(400)
          .json({ error: "Campos machine_id e task_code são obrigatórios." });
      }

      const taskSpec = TASK_CATALOG[String(task_code)];
      if (!taskSpec) {
        await repository.recordAuditLog({
          userId: req.user.id,
          machineId: Number(machine_id),
          actionType: "SECURITY_BLOCKED_UNKNOWN_TASK",
          ipAddress: req.ip,
          details: { task_code },
        });
        return res.status(403).json({
          error: `Tarefa '${task_code}' não consta no catálogo homologado de manutenção remota.`,
        });
      }

      // Verifica se o perfil do operador tem permissão para o nível de risco da tarefa
      if (!taskSpec.allowedRoles.includes(req.user.role)) {
        await repository.recordAuditLog({
          userId: req.user.id,
          machineId: Number(machine_id),
          actionType: "SECURITY_BLOCKED_INSUFFICIENT_ROLE",
          ipAddress: req.ip,
          details: { task_code, userRole: req.user.role },
        });
        return res.status(403).json({
          error: `A tarefa '${task_code}' (Risco: ${taskSpec.riskLevel}) exige perfil ${taskSpec.allowedRoles.join(" ou ")}.`,
        });
      }

      const paramValidation = taskSpec.validateParams(parameters);
      if (!paramValidation.valid) {
        return res.status(400).json({ error: paramValidation.error });
      }

      const machine = await repository.findMachineById(machine_id);
      if (!machine) {
        return res
          .status(404)
          .json({ error: "Computador de destino não encontrado." });
      }

      const taskId = `tsk_${crypto.randomBytes(6).toString("hex")}`;
      const issuedAt = new Date().toISOString();
      const expiresAt = new Date(Date.now() + 120 * 1000).toISOString();
      const signature = signTaskPayload({
        task_id: taskId,
        machine_id: machine.id,
        task_code: taskSpec.code,
        expires_at: expiresAt,
      });

      const taskRecord = await repository.createRemoteTask({
        taskId,
        machineId: machine.id,
        requestedByUserId: req.user.id,
        taskCode: taskSpec.code,
        parameters: paramValidation.sanitized,
        reason: String(
          reason || `Execução autorizada: ${taskSpec.title}`,
        ).slice(0, 240),
        status: "DISPATCHED",
        expiresAt,
      });

      await repository.recordAuditLog({
        userId: req.user.id,
        machineId: machine.id,
        actionType: "REMOTE_TASK_DISPATCHED",
        ipAddress: req.ip,
        details: {
          task_id: taskId,
          task_code: taskSpec.code,
          parameters: paramValidation.sanitized,
        },
      });

      const dispatchOutcome = socketHub.dispatchTaskToAgent(machine.id, {
        task_id: taskId,
        machine_id: machine.id,
        task_code: taskSpec.code,
        parameters: paramValidation.sanitized,
        issued_at: issuedAt,
        expires_at: expiresAt,
        signature,
      });

      // Enfileira também para o Super Agente Nativo (.exe) executar de verdade no Windows,
      // assinando com a chave individual da máquina (agent_token_hash) + TTL
      if (taskSpec.code === "SYNC_TELEMETRY_NOW") {
        pendingRefreshByAgent.add(machine.agent_uuid);
        socketHub.requestImmediateTelemetry(machine.id);
      } else if (taskSpec.code === "UPDATE_AGENT") {
        pendingUpdateByAgent.add(machine.agent_uuid);
      } else {
        const agentSignature = signTaskPayload(
          {
            task_id: taskId,
            machine_id: machine.id,
            task_code: taskSpec.code,
            expires_at: expiresAt,
          },
          machine.agent_token_hash
        );
        const agentTaskQueue = pendingTasksByAgent.get(machine.agent_uuid) || [];
        agentTaskQueue.push({
          task_id: taskId,
          machine_id: machine.id,
          task_code: taskSpec.code,
          parameters: paramValidation.sanitized,
          issued_at: issuedAt,
          expires_at: expiresAt,
          signature: agentSignature,
        });
        pendingTasksByAgent.set(machine.agent_uuid, agentTaskQueue);
      }

      if (!dispatchOutcome.deliveredToSocket) {
        if (taskSpec.code === "SYNC_TELEMETRY_NOW") {
          const waitMs = process.env.FORCE_NATIVE_ROUTER === "1" ? 30 : 6500;
          const liveMachine = await waitForLiveAgentHeartbeat(machine.agent_uuid, waitMs);
          if (liveMachine) {
            const completedLive = await repository.completeRemoteTask({
              taskId,
              status: "COMPLETED",
              exitCode: 0,
              outputSummary: `Host: ${liveMachine.hostname} | IPv4: ${liveMachine.ip_address} (${liveMachine.mac_address}) | CPU: ${Number(liveMachine.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(liveMachine.ram_usage_pct).toFixed(1)}% | Disco: ${Number(liveMachine.disk_usage_pct).toFixed(1)}% | Temp: ${Number(liveMachine.temperature_c) > 0 ? `${Number(liveMachine.temperature_c).toFixed(1)}°C` : "N/D"}`,
            });
            socketHub.broadcastToDashboard("task:updated", completedLive);
            return res.status(202).json({
              task: completedLive,
              delivery_mode: "native_agent_live_executed",
            });
          }
        } else if (taskSpec.code !== "UPDATE_AGENT") {
          // Aguarda até 8.5s pelo resultado real executado pelo Agente C# (.exe) no computador
          const waitMs = process.env.FORCE_NATIVE_ROUTER === "1" ? 30 : 8500;
          const liveCompletedTask = await waitForLiveAgentTaskResult(taskId, waitMs);
          if (liveCompletedTask) {
            return res.status(202).json({
              task: liveCompletedTask,
              delivery_mode: "native_agent_live_executed",
            });
          }
        }

        // Nunca forjar COMPLETED quando o agente não respondeu em tempo real:
        // mantém status honesto DISPATCHED na fila até confirmação real ou expiração (TTL).
        socketHub.broadcastToDashboard("task:updated", taskRecord);
        return res.status(202).json({
          task: taskRecord,
          delivery_mode: "queued_for_agent",
        });
      }

      socketHub.broadcastToDashboard("task:updated", taskRecord);
      return res.status(202).json({
        task: taskRecord,
        delivery_mode: "websocket_agent",
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Erro ao despachar tarefa remota." });
    }
  },
);

// 9. Listagem de Alertas e Chamados n8n
router.get("/alerts", requireAuth, asyncHandler(async (req, res) => {
  const alerts = await repository.listAlerts(50);
  res.json({ alerts });
}));

// 10. Listagem de Trilha de Auditoria (Restrito a ADMIN_N2)
router.get(
  "/audit-logs",
  requireAuth,
  requireRole(["ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const logs = await repository.listAuditLogs(100);
    res.json({ logs });
  }),
);

// 11. Download Direto e Manifesto de Versão do Instalador Executável Nativo (.exe)
router.get("/agent/version", (req, res) => {
  return res.json(getAgentInstallerInfo());
});

router.get("/agent/download", (req, res) => {
  const exePath = path.join(__dirname, "../../public/IpojucaRMM-Setup.exe");
  if (!fs.existsSync(exePath)) {
    return res
      .status(404)
      .json({ error: "Instalador IpojucaRMM-Setup.exe não encontrado no servidor." });
  }
  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="IpojucaRMM-Setup.exe"',
  );
  if (typeof res.sendFile === "function") {
    return res.sendFile(exePath);
  }
  return fs.createReadStream(exePath).pipe(res);
});

// 11.1. Disparo de Atualização Remota do Agente (Individual ou Global em Todas as Máquinas)
router.post(
  "/machines/:id/update-agent",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const machine = await repository.findMachineById(req.params.id);
    if (!machine) {
      return res.status(404).json({ error: "Computador não encontrado." });
    }
    pendingUpdateByAgent.add(machine.agent_uuid);
    await repository.recordAuditLog({
      userId: req.user.id,
      machineId: machine.id,
      actionType: "AGENT_OTA_UPDATE_REQUESTED",
      ipAddress: req.ip,
      details: { targetVersion: LATEST_AGENT_VERSION, hostname: machine.hostname },
    });
    return res.json({
      status: "ok",
      target_version: LATEST_AGENT_VERSION,
      machine_id: machine.id,
      message: `Ordem de atualização (${LATEST_AGENT_VERSION}) enviada para ${machine.hostname}. A atualização será exibida na tela do cliente.`,
    });
  }),
);

router.post(
  "/agent/update-all",
  requireAuth,
  requireRole(["ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const machines = await repository.listMachines({});
    for (const m of machines) {
      if (m.agent_uuid) {
        pendingUpdateByAgent.add(m.agent_uuid);
      }
    }
    await repository.recordAuditLog({
      userId: req.user.id,
      actionType: "AGENT_OTA_UPDATE_ALL_REQUESTED",
      ipAddress: req.ip,
      details: { targetVersion: LATEST_AGENT_VERSION, count: machines.length },
    });
    return res.json({
      status: "ok",
      target_version: LATEST_AGENT_VERSION,
      queued_machines: machines.length,
      message: `Atualização automática (${LATEST_AGENT_VERSION}) enviada para todas as ${machines.length} máquina(s) cadastradas.`,
    });
  }),
);

// 12. Poll de Comandos e Mensagens Autenticado para o Super Agente Nativo (.exe)
router.get("/agent/pending", requireAgentAuth, asyncHandler(async (req, res) => {
  const machine = req.machine;
  const agentUuid = machine.agent_uuid;
  const currentAgentVersion = String(
    req.headers["x-agent-version"] || req.query.agent_version || "",
  ).trim();
  const rawIdleSeconds =
    req.headers["x-agent-idle-seconds"] ?? req.query.idle_seconds ?? null;

  // Atualiza presença leve e ociosidade em tempo real do agente (com throttle no MySQL)
  try {
    const reactivatedMachine = await repository.touchAgentPresence(
      agentUuid,
      currentAgentVersion,
      rawIdleSeconds,
    );
    if (reactivatedMachine) {
      socketHub.broadcastToDashboard("machine:updated", reactivatedMachine);
    }
    const presenceTarget = reactivatedMachine || {
      ...machine,
      idle_seconds:
        rawIdleSeconds !== null && rawIdleSeconds !== "" && !Number.isNaN(Number(rawIdleSeconds))
          ? Math.max(0, Math.round(Number(rawIdleSeconds)))
          : Number(machine.idle_seconds || 0),
    };
    const inactRes = await repository.evaluateMachineInactivityAlert(presenceTarget);
    if (inactRes.isNew && inactRes.alert) {
      const fullMachine = reactivatedMachine || (await repository.findMachineById(machine.id)) || machine;
      const webhookOutcome = await triggerN8nIncidentWebhook({
        alert: inactRes.alert,
        machine: fullMachine,
        unit: {
          id: fullMachine.unit_id,
          code: fullMachine.unit_code,
          name: fullMachine.unit_name,
          unit_type: fullMachine.unit_type,
        },
        sector: {
          id: fullMachine.sector_id,
          name: fullMachine.sector_name,
        },
      });
      await repository.markAlertNotified(inactRes.alert.id, webhookOutcome.external_ticket_id);
      inactRes.alert.n8n_notified = 1;
      inactRes.alert.external_ticket_id = webhookOutcome.external_ticket_id;
      socketHub.broadcastToDashboard("alert:triggered", {
        ...inactRes.alert,
        hostname: fullMachine.hostname,
        unit_name: fullMachine.unit_name,
        sector_name: fullMachine.sector_name,
      });
    }
  } catch {
    // Ignora falha silenciosa
  }

  const refreshRequested = pendingRefreshByAgent.has(agentUuid);
  if (refreshRequested) {
    pendingRefreshByAgent.delete(agentUuid);
  }

  const updateRequested = pendingUpdateByAgent.has(agentUuid);
  if (updateRequested) {
    pendingUpdateByAgent.delete(agentUuid);
  }

  const installerInfo = getAgentInstallerInfo();
  const autoUpdateAvailable =
    Boolean(currentAgentVersion) &&
    currentAgentVersion !== installerInfo.latest_version;

  const queuedMsgs = await repository.consumePendingAgentMessages(agentUuid);

  const nowMs = Date.now();
  const rawTasks = pendingTasksByAgent.get(agentUuid) || [];
  if (rawTasks.length > 0) {
    pendingTasksByAgent.set(agentUuid, []);
  }
  const queuedTasks = rawTasks.filter(
    (t) => !t.expires_at || new Date(t.expires_at).getTime() >= nowMs
  );

  return res.json({
    refresh_requested: refreshRequested,
    update_requested: updateRequested || autoUpdateAvailable,
    latest_version: installerInfo.latest_version,
    download_path: installerInfo.download_path,
    sha256: installerInfo.sha256,
    tasks: queuedTasks,
    messages: queuedMsgs,
    server_time: new Date().toISOString(),
  });
}));

// 12.05. Recebimento Autenticado do Resultado Real de Tarefa Executada pelo Agente (.exe)
router.post("/agent/task-result", requireAgentAuth, asyncHandler(async (req, res) => {
  const { task_id, status = "COMPLETED", exit_code = 0, output_summary = "" } = req.body || {};
  if (!task_id) {
    return res.status(400).json({ error: "task_id obrigatório." });
  }

  const existingTask = await repository.findRemoteTaskById(String(task_id));
  if (!existingTask) {
    return res.status(404).json({ error: "Tarefa remota não encontrada." });
  }
  if (Number(existingTask.machine_id) !== Number(req.machine.id)) {
    await repository.recordAuditLog({
      machineId: req.machine.id,
      actionType: "SECURITY_BLOCKED_TASK_RESULT_SPOOF",
      ipAddress: req.ip,
      details: {
        task_id: String(task_id),
        ownerMachineId: existingTask.machine_id,
      },
    });
    return res.status(403).json({
      error: "Acesso negado: tarefa pertence a outro equipamento.",
    });
  }

  const validStatus = status === "FAILED" ? "FAILED" : "COMPLETED";
  const completedTask = await repository.completeRemoteTask({
    taskId: String(task_id),
    status: validStatus,
    exitCode: Number(exit_code || 0),
    outputSummary: String(output_summary || "Executado pelo Agente Windows.").slice(0, 1000),
  });

  await repository.recordAuditLog({
    machineId: req.machine.id,
    actionType: "REMOTE_TASK_RESULT",
    ipAddress: req.ip,
    details: {
      task_id: String(task_id),
      status: validStatus,
      exit_code: Number(exit_code || 0),
    },
  });

  if (completedTask) {
    socketHub.broadcastToDashboard("task:updated", completedTask);
    notifyLiveAgentTaskResult(String(task_id), completedTask);
  }
  return res.json({ status: "ok", task: completedTask });
}));

// 12.06. Alocação de Unidade de Saúde e Setor da Máquina pelo Painel
router.post(
  "/machines/:id/location",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const machineId = Number(req.params.id);
    const { unit_id, sector_id } = req.body || {};
    if (!unit_id || !sector_id) {
      return res.status(400).json({ error: "unit_id e sector_id são obrigatórios." });
    }
    const updated = await repository.updateMachineLocation(machineId, {
      unitId: Number(unit_id),
      sectorId: Number(sector_id),
    });
    if (!updated) {
      return res.status(404).json({ error: "Máquina ou setor não encontrado." });
    }
    await repository.recordAuditLog({
      userId: req.user.id,
      machineId: updated.id,
      actionType: "MACHINE_RELOCATED",
      ipAddress: req.ip,
      details: {
        hostname: updated.hostname,
        unit_id: updated.unit_id,
        sector_id: updated.sector_id,
      },
    });
    socketHub.broadcastToDashboard("machine:updated", updated);
    return res.json({ status: "ok", machine: updated });
  }),
);

// 12.1. Desconexão Imediata Autenticada do Agente (Quando encerra ou desliga o PC)
router.post("/agent/disconnect", requireAgentAuth, asyncHandler(async (req, res) => {
  const offlineMachine = await repository.markMachineOfflineById(req.machine.id);
  if (offlineMachine) {
    socketHub.broadcastToDashboard("machine:updated", offlineMachine);
  }
  await repository.recordAuditLog({
    machineId: req.machine.id,
    actionType: "AGENT_DISCONNECTED",
    ipAddress: req.ip,
    details: { agent_uuid: req.machine.agent_uuid },
  });
  return res.json({ status: "offline", agent_uuid: req.machine.agent_uuid });
}));

// 12.2. Exclusão de Máquina Cadastrada (Limpeza administrativa de estações)
router.delete(
  "/machines/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const machineId = Number(req.params.id);
    const existing = await repository.findMachineById(machineId);
    const removed = await repository.deleteMachineById(machineId);
    if (!removed) {
      return res.status(404).json({ error: "Computador não encontrado." });
    }
    await repository.recordAuditLog({
      userId: req.user.id,
      machineId,
      actionType: "MACHINE_DELETED",
      ipAddress: req.ip,
      details: {
        hostname: existing?.hostname || null,
        agent_uuid: existing?.agent_uuid || null,
      },
    });
    socketHub.broadcastToDashboard("machine:deleted", { id: machineId });
    return res.json({ status: "deleted", id: machineId });
  }),
);

// 13. Canal Super Agente Cliente -> Servidor (Autenticado)
router.post("/agent/message", requireAgentAuth, asyncHandler(async (req, res) => {
  const messageText = String(req.body?.message || "").trim().slice(0, 500);
  const sender = String(req.body?.sender || req.machine.hostname || req.machine.agent_uuid)
    .trim()
    .slice(0, 80);

  if (!messageText) {
    return res.status(400).json({ error: "message é obrigatório." });
  }

  const entry = await repository.createMachineMessage({
    machineId: req.machine.id,
    agentUuid: req.machine.agent_uuid,
    direction: "CLIENT_TO_SERVER",
    sender,
    message: messageText,
    deliveredToAgent: true,
  });

  socketHub.broadcastToDashboard("agent:message", entry);
  return res.json({ status: "ok", message: entry });
}));

// 14. Canal Super Agente Servidor -> Cliente (Histórico persistido e envio restrito a TECH_N1/ADMIN_N2)
router.get("/machines/:id/messages", requireAuth, asyncHandler(async (req, res) => {
  const machineId = Number(req.params.id);
  const messages = await repository.listMachineMessages(machineId, 100);
  return res.json({ messages });
}));

router.post(
  "/machines/:id/messages",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  asyncHandler(async (req, res) => {
    const machine = await repository.findMachineById(req.params.id);
    if (!machine) {
      return res.status(404).json({ error: "Computador não encontrado." });
    }
    const messageText = String(req.body?.message || "").trim().slice(0, 500);
    if (!messageText) {
      return res.status(400).json({ error: "Mensagem vazia." });
    }

    const entry = await repository.createMachineMessage({
      machineId: machine.id,
      agentUuid: machine.agent_uuid,
      direction: "SERVER_TO_CLIENT",
      sender: req.user?.name || "Central TI",
      message: messageText,
      deliveredToAgent: false,
    });

    await repository.recordAuditLog({
      userId: req.user.id,
      machineId: machine.id,
      actionType: "AGENT_MESSAGE_SENT",
      ipAddress: req.ip,
      details: { message_id: entry.id, length: messageText.length },
    });

    socketHub.broadcastToDashboard("agent:message", entry);
    return res.json({ status: "ok", message: entry });
  }),
);

module.exports = router;
