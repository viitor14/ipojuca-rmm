const crypto = require('crypto');
const repository = require('../database/repository');
const { verifyJwtToken, hashAgentToken, sanitizeMachine } = require('../middlewares/auth');

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

        const existingTask = await repository.findRemoteTaskById(String(task_id));
        if (!existingTask || Number(existingTask.machine_id) !== Number(machineId)) {
          await repository.recordAuditLog({
            machineId,
            actionType: 'SECURITY_BLOCKED_TASK_RESULT_SPOOF',
            ipAddress: socket.handshake.address,
            details: { task_id: String(task_id), via: 'socket' },
          });
          return;
        }

        const validStatus = status === 'COMPLETED' ? 'COMPLETED' : 'FAILED';
        const cleanOutput = String(output_summary || '').slice(0, 2000);
        const updatedTask = await repository.completeRemoteTask({
          taskId: String(task_id),
          status: validStatus,
          exitCode: Number(exit_code ?? 0),
          outputSummary: cleanOutput,
        });

        await repository.recordAuditLog({
          userId: existingTask.requested_by_user_id || null,
          machineId,
          actionType: 'REMOTE_TASK_RESULT',
          ipAddress: socket.handshake.address,
          details: {
            task_id,
            task_code: existingTask.task_code,
            status: validStatus,
            exit_code: Number(exit_code ?? 0),
            output_summary: cleanOutput.slice(0, 300),
          },
        });

        if (updatedTask) {
          this.broadcastToDashboard('task:updated', updatedTask);
        }
      });

      socket.on('disconnect', async () => {
        if (this.connectedAgents.get(machineId) === socket) {
          this.connectedAgents.delete(machineId);
          try {
            const offlineMachine = await repository.markMachineOfflineById(machineId);
            if (offlineMachine) {
              this.broadcastToDashboard('machine:updated', offlineMachine);
            }
          } catch {
            // Ignora falha em desconexão
          }
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
      if (socket.user?.role) {
        socket.join(`role:${socket.user.role}`);
      }
      socket.emit('connection:ready', {
        status: 'connected',
        role: socket.user.role,
        server_time: new Date().toISOString(),
      });
    });

    // Transmissão em tempo real de eventos de auditoria exclusivamente para ADMIN_N2
    if (typeof repository.setAuditListener === 'function') {
      repository.setAuditListener((auditEntry) => {
        this.broadcastToRole('ADMIN_N2', 'audit:created', auditEntry);
      });
    }
  }

  broadcastToRole(role, event, data) {
    if (!this.io || !role) return;
    this.io.of('/dashboard').to(`role:${role}`).emit(event, data);
  }

  broadcastToDashboard(event, data) {
    if (!this.io) return;
    const safePayload =
      event === 'machine:updated' && data && typeof data === 'object'
        ? sanitizeMachine(data)
        : data;
    this.io.of('/dashboard').emit(event, safePayload);
  }

  disconnectAgentByMachineId(machineId) {
    const id = Number(machineId);
    const agentSocket = this.connectedAgents.get(id);
    if (agentSocket) {
      this.connectedAgents.delete(id);
      try {
        agentSocket.disconnect(true);
      } catch {
        // Ignora falha ao desconectar socket revogado
      }
      return true;
    }
    return false;
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

