import { io } from 'socket.io-client';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, { method = 'GET', token, body, headers = {} } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Falha na requisição (${res.status})`);
  }
  return data;
}

export const rmmApi = {
  login(email, password) {
    return request('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },
  getUnits(token) {
    return request('/api/units', { token });
  },
  getMachines(token, { unitId, status } = {}) {
    const params = new URLSearchParams();
    if (unitId) params.set('unit_id', unitId);
    if (status) params.set('status', status);
    const qs = params.toString();
    return request(`/api/machines${qs ? `?${qs}` : ''}`, { token });
  },
  getMachineDiagnostics(token, machineId) {
    return request(`/api/machines/${machineId}/diagnostics`, { token });
  },
  refreshMachineTelemetryNow(token, machineId) {
    return request(`/api/machines/${machineId}/refresh-telemetry`, {
      method: 'POST',
      token,
    });
  },
  deleteMachine(token, machineId) {
    return request(`/api/machines/${machineId}`, {
      method: 'DELETE',
      token,
    });
  },
  getAgentVersionInfo() {
    return request('/api/agent/version');
  },
  updateMachineAgent(token, machineId) {
    return request(`/api/machines/${machineId}/update-agent`, {
      method: 'POST',
      token,
    });
  },
  updateAllAgents(token) {
    return request('/api/agent/update-all', {
      method: 'POST',
      token,
    });
  },
  getTaskCatalog(token) {
    return request('/api/catalog/tasks', { token });
  },
  dispatchAuthorizedTask(token, { machineId, taskCode, parameters, reason }) {
    return request('/api/command', {
      method: 'POST',
      token,
      body: {
        machine_id: machineId,
        task_code: taskCode,
        parameters,
        reason,
      },
    });
  },
  getAlerts(token) {
    return request('/api/alerts', { token });
  },
  simulateAgentHeartbeat({ agentUuid, agentToken, inventory, metrics }) {
    return request('/api/heartbeat', {
      method: 'POST',
      headers: {
        'X-Agent-Uuid': agentUuid,
        'X-Agent-Token': agentToken,
      },
      body: {
        agent_version: '1.0.0',
        inventory,
        metrics,
      },
    });
  },
};

export function connectDashboardSocket(token, handlers = {}) {
  const socketUrl = API_BASE ? `${API_BASE}/dashboard` : '/dashboard';
  const socket = io(socketUrl, {
    auth: { token },
    reconnection: true,
  });

  if (handlers.onMachineUpdated) {
    socket.on('machine:updated', handlers.onMachineUpdated);
  }
  if (handlers.onMachineDeleted) {
    socket.on('machine:deleted', handlers.onMachineDeleted);
  }
  if (handlers.onAlertTriggered) {
    socket.on('alert:triggered', handlers.onAlertTriggered);
  }
  if (handlers.onTaskUpdated) {
    socket.on('task:updated', handlers.onTaskUpdated);
  }
  if (handlers.onConnect) {
    socket.on('connect', handlers.onConnect);
  }
  if (handlers.onDisconnect) {
    socket.on('disconnect', handlers.onDisconnect);
  }

  return socket;
}

