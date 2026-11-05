try {
  require('dotenv').config();
} catch {
  // Dotenv opcional
}
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { collectTelemetrySnapshot } = require('./collectors/systemCollector');
const { executeAuthorizedTask } = require('./tasks/taskExecutor');

const IDENTITY_FILE = path.join(__dirname, '..', '.agent-identity.json');

// 4 horas em milissegundos (4 * 60 * 60 * 1000 = 14.400.000 ms)
const FOUR_HOURS_MS = 4 * 60 * 60 * 1000;

function resolveMachineIdentity() {
  const envUuid = process.env.AGENT_UUID;
  const envToken = process.env.AGENT_TOKEN;

  if (envUuid && envUuid !== 'auto' && envToken) {
    return { agentUuid: envUuid, agentToken: envToken };
  }

  try {
    if (fs.existsSync(IDENTITY_FILE)) {
      const saved = JSON.parse(fs.readFileSync(IDENTITY_FILE, 'utf8'));
      if (saved.agentUuid && saved.agentToken) {
        return saved;
      }
    }
  } catch {
    // Recria caso o arquivo esteja corrompido
  }

  const safeHost = os
    .hostname()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .slice(0, 32);
  const generated = {
    agentUuid: `agt-win-${safeHost}`,
    agentToken: `tok-${crypto.randomBytes(16).toString('hex')}`,
    createdAt: new Date().toISOString(),
  };

  try {
    fs.writeFileSync(IDENTITY_FILE, JSON.stringify(generated, null, 2), 'utf8');
  } catch {
    // Segue em memoria caso nao tenha permissao de escrita no diretorio
  }

  return generated;
}

const identity = resolveMachineIdentity();

const config = {
  serviceName: process.env.SERVICE_NAME || 'IpojucaRMMService',
  backendUrl: (process.env.BACKEND_URL || 'http://localhost:4000').replace(/\/+$/, ''),
  agentUuid: identity.agentUuid,
  agentToken: identity.agentToken,
  enrollmentKey: process.env.AGENT_ENROLLMENT_KEY || 'rmm-ipojuca-enroll-2026',
  unitId: Number(process.env.UNIT_ID || 1),
  sectorId: Number(process.env.SECTOR_ID || 1),
  taskSigningSecret:
    process.env.TASK_SIGNING_SECRET ||
    crypto.createHash('sha256').update('ipojuca-rmm-dev-task-key').digest('hex'),
  // Padrao leve: envia ao ligar o PC e a cada 4 horas (14.400.000 ms)
  heartbeatIntervalMs: Number(process.env.HEARTBEAT_INTERVAL_MS || FOUR_HOURS_MS),
};

async function sendHeartbeatOnce(options = {}) {
  const snapshot = await collectTelemetrySnapshot(options);
  snapshot.unit_id = config.unitId;
  snapshot.sector_id = config.sectorId;

  const response = await fetch(`${config.backendUrl}/api/heartbeat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Agent-Uuid': config.agentUuid,
      'X-Agent-Token': config.agentToken,
      'X-Enrollment-Key': config.enrollmentKey,
    },
    body: JSON.stringify(snapshot),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }
  return data;
}

async function startAgentService() {
  const intervalHours = (config.heartbeatIntervalMs / (1000 * 60 * 60)).toFixed(1);
  console.log(
    `[${config.serviceName}] Iniciando agente '${config.agentUuid}' (Modo Leve: Boot + ciclo de ${intervalHours}h + Coleta Manual Sob Demanda)`
  );

  // 1. Coleta imediata no Boot / Inicialização do PC
  try {
    const firstHb = await sendHeartbeatOnce();
    console.log(
      `[${config.serviceName}] Telemetria de Inicialização enviada (ID: ${firstHb.machine_id} | Status: ${firstHb.health_status})`
    );
  } catch (err) {
    console.error(
      `[${config.serviceName}] Aviso na telemetria de inicialização: ${err.message}`
    );
  }

  // 2. Canal WebSocket leve para ouvir Coleta Manual Sob Demanda e Tarefas Autorizadas
  let socket = null;
  try {
    const { io } = require('socket.io-client');
    socket = io(`${config.backendUrl}/agents`, {
      auth: {
        agentUuid: config.agentUuid,
        agentToken: config.agentToken,
      },
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 60000,
    });

    socket.on('connect', () => {
      console.log(
        `[${config.serviceName}] Canal WebSocket conectado (${socket.id}) em repouso (0% CPU). Pronto para comandos manuais.`
      );
    });

    // Botão Manual do Dashboard: Coleta imediata sob demanda
    socket.on('telemetry:request', async () => {
      console.log(
        `[${config.serviceName}] Solicitação manual recebida do painel! Coletando telemetria agora...`
      );
      try {
        const res = await sendHeartbeatOnce();
        console.log(
          `[${config.serviceName}] Telemetria sob demanda entregue -> Status: ${res.health_status}`
        );
      } catch (err) {
        console.error(
          `[${config.serviceName}] Erro na telemetria sob demanda: ${err.message}`
        );
      }
    });

    socket.on('task:execute', async (taskPayload) => {
      console.log(
        `[${config.serviceName}] Executando tarefa remota autorizada: ${taskPayload.task_code} (${taskPayload.task_id})`
      );
      const outcome = await executeAuthorizedTask(
        taskPayload,
        config.taskSigningSecret
      );
      socket.emit('task:result', outcome);
      sendHeartbeatOnce().catch(() => {});
    });
  } catch {
    console.log(`[${config.serviceName}] Operando em modo HTTP Heartbeat.`);
  }

  // 3. Agendamento periódico a cada 4 horas (14.400.000 ms)
  let consecutiveFailures = 0;
  async function heartbeatLoop() {
    try {
      const res = await sendHeartbeatOnce();
      consecutiveFailures = 0;
      console.log(
        `[${config.serviceName}] Telemetria periódica (4h) enviada (${new Date().toLocaleTimeString('pt-BR')}) -> Status: ${res.health_status}`
      );
    } catch (err) {
      consecutiveFailures += 1;
      console.error(
        `[${config.serviceName}] Falha no envio periódico (tentativa ${consecutiveFailures}): ${err.message}`
      );
    }

    // Se falhar no boot porque a rede ainda estava subindo, tenta novamente em 60s; se teve sucesso, aguarda 4 horas
    const nextDelay =
      consecutiveFailures > 0
        ? Math.min(300000, 60000 * consecutiveFailures)
        : config.heartbeatIntervalMs;
    setTimeout(heartbeatLoop, nextDelay).unref();
  }

  setTimeout(heartbeatLoop, config.heartbeatIntervalMs).unref();
  return { socket };
}

if (require.main === module) {
  if (process.argv.includes('--once')) {
    sendHeartbeatOnce({ skipNativeQueries: process.argv.includes('--fast') })
      .then((res) => {
        console.log('[IpojucaRMMService] Heartbeat único enviado com sucesso:', res);
        process.exit(0);
      })
      .catch((err) => {
        console.error('[IpojucaRMMService] Erro no heartbeat único:', err.message);
        process.exit(1);
      });
  } else {
    startAgentService();
  }
}

module.exports = {
  sendHeartbeatOnce,
  startAgentService,
  collectTelemetrySnapshot,
  executeAuthorizedTask,
};
