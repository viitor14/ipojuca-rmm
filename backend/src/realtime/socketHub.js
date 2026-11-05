const crypto = require('crypto');
const repository = require('../database/repository');
const { verifyJwtToken, hashAgentToken } = require('../middlewares/auth');

/**
 * Hub de Tempo Real Socket.io (@lead, @engineer, @security).
 * Separa em dois namespaces isolados:
 *  - /agents: conexão autenticada individualmente para cada serviço Windows
 *  - /dashboard: conexão autenticada por JWT para operadores do painel 2D/3D
 */
class SocketHub {
  constructor() {
    this.io = null;
    this.connectedAgents = new Map(); // machineId -> socket
  }

  attach(io) {
    this.io = io;

    // 1. Namespace dos Agentes Windows (/agents)
    const agentNs = io.of('/agents');
    agentNs.use(async (socket, next) => {
      try {
        const agentUuid =
          socket.handshake.auth?.agentUuid || socket.handshake.headers['x-agent-uuid'];
        const agentToken =
          socket.handshake.auth?.agentToken || socket.handshake.headers['x-agent-token'];

        if (!agentUuid || !agentToken) {
          return next(new Error('Credenciais do agente ausentes.'));
        }

        const machine = await repository.findMachineByAgentUuid(agentUuid);
        if (!machine || machine.is_revoked) {
          return next(new Error('Agente inválido ou revogado.'));
        }

        const incomingHash = hashAgentToken(agentToken);
        if (
          incomingHash.length !== machine.agent_token_hash.length ||
          !crypto.timingSafeEqual(
            Buffer.from(incomingHash),
            Buffer.from(machine.agent_token_hash)
          )
        ) {
          return next(new Error('Token do agente inválido.'));
        }

        socket.machine = machine;
        return next();
      } catch (err) {
        return next(new Error('Erro de autenticação do agente.'));
      }
    });

    agentNs.on('connection', (socket) => {
      const machineId = socket.machine.id;
      this.connectedAgents.set(machineId, socket);

      socket.on('task:result', async (payload = {}) => {
        const { task_id, status, exit_code, output_summary } = payload;
        if (!task_id) return;

        const validStatus = status === 'COMPLETED' ? 'COMPLETED' : 'FAILED';
        const updatedTask = await repository.completeRemoteTask({
          taskId: String(task_id),
          status: validStatus,
          exitCode: Number(exit_code ?? 0),
          outputSummary: String(output_summary || '').slice(0, 2000),
        });

        await repository.recordAuditLog({
          machineId,
          actionType: 'REMOTE_TASK_RESULT',
          ipAddress: socket.handshake.address,
          details: {
            task_id,
            status: validStatus,
            exit_code: Number(exit_code ?? 0),
          },
        });

        if (updatedTask) {
          this.broadcastToDashboard('task:updated', updatedTask);
        }
      });

      socket.on('disconnect', () => {
        if (this.connectedAgents.get(machineId) === socket) {
          this.connectedAgents.delete(machineId);
        }
      });
    });

    // 2. Namespace do Dashboard Operacional / Digital Twin (/dashboard)
    const dashboardNs = io.of('/dashboard');
    dashboardNs.use((socket, next) => {
      const token =
        socket.handshake.auth?.token ||
        (socket.handshake.headers.authorization || '').replace('Bearer ', '');
      const user = verifyJwtToken(token);
      if (!user) {
        return next(new Error('Sessão JWT inválida para o canal de tempo real.'));
      }
      socket.user = user;
      return next();
    });

    dashboardNs.on('connection', (socket) => {
      socket.emit('connection:ready', {
        status: 'connected',
        role: socket.user.role,
        server_time: new Date().toISOString(),
      });
    });
  }

  broadcastToDashboard(event, data) {
    if (!this.io) return;
    this.io.of('/dashboard').emit(event, data);
  }

  dispatchTaskToAgent(machineId, taskPayload) {
    const agentSocket = this.connectedAgents.get(Number(machineId));
    if (agentSocket && agentSocket.connected) {
      agentSocket.emit('task:execute', taskPayload);
      return { deliveredToSocket: true };
    }
    return { deliveredToSocket: false };
  }

  requestImmediateTelemetry(machineId) {
    const agentSocket = this.connectedAgents.get(Number(machineId));
    if (agentSocket && agentSocket.connected) {
      agentSocket.emit('telemetry:request', {
        requested_at: new Date().toISOString(),
      });
      return { deliveredToSocket: true };
    }
    return { deliveredToSocket: false };
  }
}

module.exports = new SocketHub();

