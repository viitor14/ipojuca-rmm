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

async function startServer() {
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

  // Worker periódico de verificação de agentes OFFLINE em tempo real (a cada 10s)
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
  startServer();
}

module.exports = { startServer };
