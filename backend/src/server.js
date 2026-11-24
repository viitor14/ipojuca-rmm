try {
  require('dotenv').config();
} catch {
  // Dotenv opcional caso variaveis venham do ambiente/Docker
}
const http = require('http');
const app = require('./app');
const env = require('./config/env');
const repository = require('./database/repository');
const socketHub = require('./realtime/socketHub');
const { triggerN8nIncidentWebhook } = require('./services/n8nWebhookService');

async function startServer() {
  env.validateProductionConfig();
  const dbStatus = await repository.initialize();

  const server = http.createServer(app);
  let io = null;
  try {
    const { Server } = require('socket.io');
    io = new Server(server, {
      cors: {
        origin: env.corsOrigin,
        methods: ['GET', 'POST'],
      },
    });
    socketHub.attach(io);
  } catch {
    // Opera em modo REST + Event Hub interno caso socket.io ainda nao esteja instalado localmente
  }

  // Worker periódico de presença OFFLINE e expiração de tarefas remotas (a cada 10s)
  const offlineTimer = setInterval(async () => {
    try {
      // Mantém last_seen_at atualizado para agentes com WebSocket ativo
      for (const [, sock] of socketHub.connectedAgents.entries()) {
        if (sock?.connected && sock?.machine?.agent_uuid) {
          await repository.touchAgentPresence(sock.machine.agent_uuid);
        }
      }

      const newlyOffline = await repository.markStaleMachinesOffline(
        env.offlineThresholdSeconds
      );
      for (const machine of newlyOffline) {
        socketHub.broadcastToDashboard('machine:updated', machine);
      }

      const expiredTasks = await repository.expireStaleRemoteTasks();
      for (const task of expiredTasks) {
        socketHub.broadcastToDashboard('task:updated', task);
      }

      // Alerta automático para estações inativas há mais de 24h (OFFLINE ou sem uso)
      const inactivityAlerts = await repository.checkInactiveMachinesAndAlert(
        env.inactivityAlertSeconds
      );
      for (const { alert, machine } of inactivityAlerts) {
        try {
          const webhookOutcome = await triggerN8nIncidentWebhook({
            alert,
            machine,
            unit: {
              id: machine.unit_id,
              code: machine.unit_code,
              name: machine.unit_name,
              unit_type: machine.unit_type,
            },
            sector: {
              id: machine.sector_id,
              name: machine.sector_name,
            },
          });
          await repository.markAlertNotified(alert.id, webhookOutcome.external_ticket_id);
          alert.n8n_notified = 1;
          alert.external_ticket_id = webhookOutcome.external_ticket_id;
        } catch {
          // Segue emitindo no dashboard mesmo se webhook falhar
        }
        socketHub.broadcastToDashboard('alert:triggered', {
          ...alert,
          hostname: machine.hostname,
          unit_name: machine.unit_name,
          sector_name: machine.sector_name,
        });
      }
    } catch {
      // Falha silenciosa para não interromper o loop
    }
  }, 10000);
  offlineTimer.unref();

  return new Promise((resolve) => {
    server.listen(env.port, () => {
      console.log(
        `[RMM-Backend] Servidor iniciado na porta ${env.port} (DB Mode: ${dbStatus.mode})`
      );
      resolve({ server, io });
    });
  });
}

if (require.main === module) {
  startServer().catch((err) => {
    console.error(err?.message || err);
    process.exit(1);
  });
}

module.exports = { startServer };
