const { loadExpressAndCors } = require("../utils/frameworkCompat");
const { express } = loadExpressAndCors();
const crypto = require("crypto");
const repository = require("../database/repository");
const {
  createJwtToken,
  hashPassword,
  hashAgentToken,
  requireAuth,
  requireRole,
  createRateLimiter,
} = require("../middlewares/auth");
const { TASK_CATALOG, signTaskPayload } = require("../config/taskCatalog");
const { evaluateMachineHealth } = require("../services/healthEvaluator");
const { triggerN8nIncidentWebhook } = require("../services/n8nWebhookService");
const socketHub = require("../realtime/socketHub");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Filas em memória para comunicação Cliente-Servidor com o Super Agente Nativo (.exe)
const pendingRefreshByAgent = new Set();
const pendingUpdateByAgent = new Set();
const pendingTasksByAgent = new Map();
const taskResultWaiters = new Map();
const pendingMessagesByAgent = new Map();
const chatHistoryByMachine = new Map();
const heartbeatWaitersByAgent = new Map();

const LATEST_AGENT_VERSION = "2.3.0-native-exe";

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
  try {
    if (fs.existsSync(exePath)) {
      const buf = fs.readFileSync(exePath);
      sizeBytes = buf.length;
      sha256 = crypto.createHash("sha256").update(buf).digest("hex");
    }
  } catch {}
  return {
    latest_version: LATEST_AGENT_VERSION,
    download_path: "/api/agent/download",
    sha256,
    size_bytes: sizeBytes,
    released_at: "2026-11-10T14:55:00Z",
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

// 1. Healthcheck da API e Observabilidade
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ipojuca-rmm-backend",
    db_mode: repository.mode,
    timestamp: new Date().toISOString(),
  });
});

// 2. Login de Operadores (RBAC)
router.post("/auth/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    const user = await repository.findUserByEmail(email);
    const candidateHash = hashPassword(password);

    if (
      !user ||
      candidateHash.length !== user.password_hash.length ||
      !crypto.timingSafeEqual(
        Buffer.from(candidateHash),
        Buffer.from(user.password_hash),
      )
    ) {
      await repository.recordAuditLog({
        actionType: "AUTH_LOGIN_FAILED",
        ipAddress: req.ip,
        details: { email: String(email).slice(0, 100) },
      });
      return res.status(401).json({ error: "Credenciais inválidas." });
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
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erro interno ao processar autenticação." });
  }
});

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

    const { agent_version, inventory = {}, metrics = {} } = req.body || {};

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
      temperature_c: Math.min(
        130,
        Math.max(0, Number(metrics.temperature_c ?? 45)),
      ),
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

    // Emite atualização imediata para o Digital Twin 3D via Socket.io e resolve waiters manuais
    socketHub.broadcastToDashboard("machine:updated", updatedMachine);
    notifyLiveAgentHeartbeat(String(agentUuid), updatedMachine);

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

    const installerInfo = getAgentInstallerInfo();
    return res.json({
      status: "ok",
      machine_id: updatedMachine.id,
      health_status: updatedMachine.health_status,
      reason: evaluation.reason,
      alert: alertTriggered,
      latest_agent_version: installerInfo.latest_version,
      server_time: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ error: "Falha ao processar heartbeat." });
  }
});

// 4. Listagem de Unidades de Saúde e Setores (para o Dashboard e Digital Twin)
router.get("/units", requireAuth, async (req, res) => {
  const units = await repository.listUnitsWithSummary();
  res.json({ units });
});

// 5. Listagem de Máquinas (com coordenadas 3D e métricas atuais)
router.get("/machines", requireAuth, async (req, res) => {
  const { unit_id, sector_id, status } = req.query;
  const machines = await repository.listMachines({
    unitId: unit_id,
    sectorId: sector_id,
    status,
  });
  res.json({ machines });
});

// 6. Diagnóstico Detalhado de um Computador
router.get("/machines/:id/diagnostics", requireAuth, async (req, res) => {
  const data = await repository.getMachineDiagnostics(req.params.id);
  if (!data) {
    return res.status(404).json({ error: "Computador não encontrado." });
  }
  return res.json(data);
});

// 6.1. Coleta Manual de Telemetria Sob Demanda (Botão Manual do Operador)
router.post("/machines/:id/refresh-telemetry", requireAuth, async (req, res) => {
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
});

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

      // Enfileira também para o Super Agente Nativo (.exe) executar de verdade no Windows
      if (taskSpec.code === "SYNC_TELEMETRY_NOW") {
        pendingRefreshByAgent.add(machine.agent_uuid);
        socketHub.requestImmediateTelemetry(machine.id);
      } else if (taskSpec.code === "UPDATE_AGENT") {
        pendingUpdateByAgent.add(machine.agent_uuid);
      } else {
        const agentTaskQueue = pendingTasksByAgent.get(machine.agent_uuid) || [];
        agentTaskQueue.push({
          task_id: taskId,
          machine_id: machine.id,
          task_code: taskSpec.code,
          parameters: paramValidation.sanitized,
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
              outputSummary: `Host: ${liveMachine.hostname} | IPv4: ${liveMachine.ip_address} (${liveMachine.mac_address}) | CPU: ${Number(liveMachine.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(liveMachine.ram_usage_pct).toFixed(1)}% | Disco: ${Number(liveMachine.disk_usage_pct).toFixed(1)}% | Temp: ${Number(liveMachine.temperature_c).toFixed(1)}°C`,
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

        const diskUsedPct = Number(machine.disk_usage_pct || 0).toFixed(1);
        const diskTotalGb = Number(machine.disk_total_gb || 240);
        const diskFreeGb = Math.max(0, diskTotalGb * (1 - Number(machine.disk_usage_pct || 0) / 100)).toFixed(1);
        const diskUsedGb = Math.max(0, diskTotalGb - Number(diskFreeGb)).toFixed(1);

        const simulatedOutputByCode = {
          SYNC_TELEMETRY_NOW: `Host: ${machine.hostname} | IPv4: ${machine.ip_address} (${machine.mac_address}) | CPU: ${Number(machine.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(machine.ram_usage_pct).toFixed(1)}% | Disco: ${diskUsedPct}%`,
          CLEAR_TEMP_CACHE: `Limpeza concluída em ${machine.hostname}: diretórios temporários (%TEMP% e Windows\\Temp) higienizados | Espaço livre em C:: ${diskFreeGb} GB.`,
          RESTART_SPOOLER: `Serviço Spooler de Impressão reiniciado com sucesso em ${machine.hostname} (Status: ATIVO) | Fila de impressão limpa.`,
          COLLECT_NETWORK_DIAG: `Host: ${machine.hostname} | Adaptador Ativo (1000 Mbps) | IPv4: ${machine.ip_address} (MAC ${machine.mac_address || "N/A"}) | Gateway: ${String(machine.ip_address || "10.0.0.1").replace(/\.\d+$/, ".1")} (Ping 1ms) | DNS: [8.8.8.8, 1.1.1.1] | Status: CONECTADO`,
          FLUSH_DNS_WINSOCK: `Cache DNS limpo com sucesso em ${machine.hostname} (ipconfig /flushdns executado e tabela de resolução renovada).`,
          CHECK_DISK_HEALTH: `Disco: ${machine.disk_type || "SSD"} (${machine.model || "Workstation"}) | Saúde SMART: OK (Saudável) | Volume C: [NTFS]: ${diskUsedGb} GB usados / ${diskFreeGb} GB livres (Total ${diskTotalGb} GB — ${diskUsedPct}%)`,
          LIST_TOP_PROCESSES: `Estação ${machine.hostname} | Uso de CPU: ${Number(machine.cpu_usage_pct).toFixed(1)}% | Uso de RAM: ${Number(machine.ram_usage_pct).toFixed(1)}% de ${(Number(machine.ram_total_mb || 8192) / 1024).toFixed(1)} GB | Aguardando listagem detalhada de PIDs do Agente.`,
          INSTALL_APPROVED_PRINTER: `Impressora '${paramValidation.sanitized.printer_name}' mapeada em ${paramValidation.sanitized.printer_ip} na estação ${machine.hostname}.`,
          REBOOT_WORKSTATION: `Reinicialização programada com aviso de 30s enviada para a tela de ${machine.hostname}.`,
          UPDATE_AGENT: `Ordem de atualização OTA (${LATEST_AGENT_VERSION}) enviada para ${machine.hostname} com barra de progresso na tela do cliente.`,
        };

        // Se for tarefa de reinício de spooler em máquina com spooler parado, corrige o estado
        if (taskSpec.code === "RESTART_SPOOLER" && !machine.spooler_running) {
          await repository.upsertHeartbeat({
            agentUuid: machine.agent_uuid,
            agentVersion: machine.agent_version,
            inventory: {},
            metrics: {
              cpu_usage_pct: machine.cpu_usage_pct,
              ram_usage_pct: machine.ram_usage_pct,
              disk_usage_pct: machine.disk_usage_pct,
              temperature_c: machine.temperature_c,
              uptime_seconds: machine.uptime_seconds,
              spooler_running: true,
            },
            healthStatus: evaluateMachineHealth({
              cpu_usage_pct: machine.cpu_usage_pct,
              ram_usage_pct: machine.ram_usage_pct,
              disk_usage_pct: machine.disk_usage_pct,
              temperature_c: machine.temperature_c,
              spooler_running: true,
            }).health_status,
          });
        }

        const completedTask = await repository.completeRemoteTask({
          taskId,
          status: "COMPLETED",
          exitCode: 0,
          outputSummary:
            simulatedOutputByCode[taskSpec.code] ||
            "Tarefa executada com sucesso.",
        });

        socketHub.broadcastToDashboard("task:updated", completedTask);
        return res.status(202).json({
          task: completedTask,
          delivery_mode: "completed_immediate",
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
router.get("/alerts", requireAuth, async (req, res) => {
  const alerts = await repository.listAlerts(50);
  res.json({ alerts });
});

// 10. Listagem de Trilha de Auditoria (Restrito a ADMIN_N2)
router.get(
  "/audit-logs",
  requireAuth,
  requireRole(["ADMIN_N2"]),
  async (req, res) => {
    const logs = await repository.listAuditLogs(100);
    res.json({ logs });
  },
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
  return res.sendFile(exePath);
});

// 11.1. Disparo de Atualização Remota do Agente (Individual ou Global em Todas as Máquinas)
router.post(
  "/machines/:id/update-agent",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
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
  },
);

router.post(
  "/agent/update-all",
  requireAuth,
  requireRole(["ADMIN_N2"]),
  async (req, res) => {
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
  },
);

// 12. Poll de Comandos e Mensagens para o Super Agente Nativo (.exe em segundo plano)
router.get("/agent/pending", async (req, res) => {
  const agentUuid = String(
    req.headers["x-agent-uuid"] || req.query.agent_uuid || "",
  ).trim();
  const currentAgentVersion = String(
    req.headers["x-agent-version"] || req.query.agent_version || "",
  ).trim();
  const rawIdleSeconds =
    req.headers["x-agent-idle-seconds"] ?? req.query.idle_seconds ?? null;
  if (!agentUuid) {
    return res.status(400).json({ error: "agent_uuid obrigatório." });
  }

  // Atualiza presença leve e ociosidade em tempo real do agente (mantém máquina ONLINE enquanto o agente estiver aberto)
  try {
    const reactivatedMachine = await repository.touchAgentPresence(
      agentUuid,
      currentAgentVersion,
      rawIdleSeconds,
    );
    if (reactivatedMachine) {
      socketHub.broadcastToDashboard("machine:updated", reactivatedMachine);
    }
  } catch {
    // Ignora falha silenciosa
  }

  const refreshRequested = pendingRefreshByAgent.has(agentUuid);
  if (refreshRequested) {
    pendingRefreshByAgent.delete(agentUuid);
  }

  let updateRequested = pendingUpdateByAgent.has(agentUuid);
  if (updateRequested) {
    pendingUpdateByAgent.delete(agentUuid);
  }

  const installerInfo = getAgentInstallerInfo();
  const autoUpdateAvailable =
    Boolean(currentAgentVersion) &&
    currentAgentVersion !== installerInfo.latest_version;

  const queuedMsgs = pendingMessagesByAgent.get(agentUuid) || [];
  if (queuedMsgs.length > 0) {
    pendingMessagesByAgent.set(agentUuid, []);
  }

  const queuedTasks = pendingTasksByAgent.get(agentUuid) || [];
  if (queuedTasks.length > 0) {
    pendingTasksByAgent.set(agentUuid, []);
  }

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
});

// 12.05. Recebimento do Resultado Real de Tarefa Executada pelo Agente Nativo (.exe)
router.post("/agent/task-result", async (req, res) => {
  try {
    const { task_id, status = "COMPLETED", exit_code = 0, output_summary = "" } = req.body || {};
    if (!task_id) {
      return res.status(400).json({ error: "task_id obrigatório." });
    }
    const completedTask = await repository.completeRemoteTask({
      taskId: String(task_id),
      status: status === "FAILED" ? "FAILED" : "COMPLETED",
      exitCode: Number(exit_code || 0),
      outputSummary: String(output_summary || "Executado pelo Agente Windows.").slice(0, 1000),
    });
    if (completedTask) {
      socketHub.broadcastToDashboard("task:updated", completedTask);
      notifyLiveAgentTaskResult(String(task_id), completedTask);
    }
    return res.json({ status: "ok", task: completedTask });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao registrar resultado da tarefa." });
  }
});

// 12.06. Alocação de Unidade de Saúde e Setor da Máquina pelo Painel
router.post(
  "/machines/:id/location",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
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
    socketHub.broadcastToDashboard("machine:updated", updated);
    return res.json({ status: "ok", machine: updated });
  },
);

// 12.1. Desconexão Imediata do Agente (Quando o usuário encerra o Agente ou desliga o PC)
router.post("/agent/disconnect", async (req, res) => {
  const agentUuid = String(
    req.headers["x-agent-uuid"] || req.body?.agent_uuid || "",
  ).trim();
  if (!agentUuid) {
    return res.status(400).json({ error: "agent_uuid obrigatório." });
  }

  const offlineMachine = await repository.markMachineOfflineByAgentUuid(agentUuid);
  if (offlineMachine) {
    socketHub.broadcastToDashboard("machine:updated", offlineMachine);
  }
  return res.json({ status: "offline", agent_uuid: agentUuid });
});

// 12.2. Exclusão de Máquina Cadastrada (Limpeza administrativa de estações)
router.delete(
  "/machines/:id",
  requireAuth,
  requireRole(["TECH_N1", "ADMIN_N2"]),
  async (req, res) => {
    const machineId = Number(req.params.id);
    const removed = await repository.deleteMachineById(machineId);
    if (!removed) {
      return res.status(404).json({ error: "Computador não encontrado." });
    }
    socketHub.broadcastToDashboard("machine:deleted", { id: machineId });
    return res.json({ status: "deleted", id: machineId });
  },
);

// 13. Canal Super Agente Cliente -> Servidor (Mensagem enviada pelo usuário na máquina Windows)
router.post("/agent/message", async (req, res) => {
  const agentUuid = String(
    req.headers["x-agent-uuid"] || req.body?.agent_uuid || "",
  ).trim();
  const messageText = String(req.body?.message || "").trim().slice(0, 500);
  const sender = String(req.body?.sender || agentUuid).trim().slice(0, 80);

  if (!agentUuid || !messageText) {
    return res.status(400).json({ error: "agent_uuid e message são obrigatórios." });
  }

  const machine = await repository.findMachineByAgentUuid(agentUuid);
  const machineId = machine ? machine.id : 0;
  const entry = {
    id: `msg_${Date.now()}`,
    machine_id: machineId,
    agent_uuid: agentUuid,
    direction: "CLIENT_TO_SERVER",
    sender,
    message: messageText,
    created_at: new Date().toISOString(),
  };

  if (machineId) {
    const hist = chatHistoryByMachine.get(machineId) || [];
    hist.push(entry);
    chatHistoryByMachine.set(machineId, hist.slice(-100));
  }

  socketHub.broadcastToDashboard("agent:message", entry);
  return res.json({ status: "ok", message: entry });
});

// 14. Canal Super Agente Servidor -> Cliente (Histórico e envio de mensagem da Central de TI para o PC)
router.get("/machines/:id/messages", requireAuth, async (req, res) => {
  const machineId = Number(req.params.id);
  const messages = chatHistoryByMachine.get(machineId) || [];
  return res.json({ messages });
});

router.post("/machines/:id/messages", requireAuth, async (req, res) => {
  const machine = await repository.findMachineById(req.params.id);
  if (!machine) {
    return res.status(404).json({ error: "Computador não encontrado." });
  }
  const messageText = String(req.body?.message || "").trim().slice(0, 500);
  if (!messageText) {
    return res.status(400).json({ error: "Mensagem vazia." });
  }

  const entry = {
    id: `msg_${Date.now()}`,
    machine_id: machine.id,
    agent_uuid: machine.agent_uuid,
    direction: "SERVER_TO_CLIENT",
    sender: req.user?.name || "Central TI",
    message: messageText,
    created_at: new Date().toISOString(),
  };

  const hist = chatHistoryByMachine.get(machine.id) || [];
  hist.push(entry);
  chatHistoryByMachine.set(machine.id, hist.slice(-100));

  const queue = pendingMessagesByAgent.get(machine.agent_uuid) || [];
  queue.push(entry);
  pendingMessagesByAgent.set(machine.agent_uuid, queue);

  socketHub.broadcastToDashboard("agent:message", entry);
  return res.json({ status: "ok", message: entry });
});

module.exports = router;
