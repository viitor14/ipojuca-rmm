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
    const err = new Error(data.error || `Falha na requisição (${res.status})`);
    err.status = res.status;
    throw err;
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
  getMe(token) {
    return request('/api/auth/me', { token });
  },
  logout(token) {
    if (!token) return Promise.resolve();
    return request('/api/auth/logout', { method: 'POST', token }).catch(() => {});
  },
  changePassword(token, { currentPassword, newPassword }) {
    return request('/api/auth/change-password', {
      method: 'POST',
      token,
      body: {
        current_password: currentPassword,
        new_password: newPassword,
      },
    });
  },
  getUsers(token) {
    return request('/api/users', { token });
  },
  createUser(token, { name, email, password, role }) {
    return request('/api/users', {
      method: 'POST',
      token,
      body: { name, email, password, role },
    });
  },
  updateUser(token, userId, payload) {
    return request(`/api/users/${userId}`, {
      method: 'PUT',
      token,
      body: payload,
    });
  },
  deleteUser(token, userId) {
    return request(`/api/users/${userId}`, {
      method: 'DELETE',
      token,
    });
  },
  getAuditLogs(token) {
    return request('/api/audit-logs', { token });
  },
  getInventoryChanges(token, { machineId, limit = 120 } = {}) {
    const params = new URLSearchParams();
    if (machineId) params.set('machine_id', machineId);
    if (limit) params.set('limit', limit);
    const qs = params.toString();
    return request(`/api/inventory/changes${qs ? `?${qs}` : ''}`, { token });
  },
  async downloadAgentInstaller(token) {
    const res = await fetch(`${API_BASE}/api/agent/download`, {
      method: 'GET',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const err = new Error(data.error || `Falha ao baixar instalador (${res.status})`);
      err.status = res.status;
      throw err;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IpojucaRMM-Setup.exe';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 4000);
  },
  revokeMachine(token, machineId, revoked = true, reason = '') {
    return request(`/api/machines/${machineId}/revoke`, {
      method: 'POST',
      token,
      body: { revoked, reason },
    });
  },
  getUnits(token) {
    return request('/api/units', { token });
  },
  createUnit(token, payload) {
    return request('/api/units', {
      method: 'POST',
      token,
      body: payload,
    });
  },
  updateUnit(token, unitId, payload) {
    return request(`/api/units/${unitId}`, {
      method: 'PUT',
      token,
      body: payload,
    });
  },
  deleteUnit(token, unitId, payload = {}) {
    const params = new URLSearchParams();
    if (payload.target_unit_id) params.set('target_unit_id', payload.target_unit_id);
    if (payload.target_sector_id) params.set('target_sector_id', payload.target_sector_id);
    const qs = params.toString();
    return request(`/api/units/${unitId}${qs ? `?${qs}` : ''}`, {
      method: 'DELETE',
      token,
      body: payload,
    });
  },
  createSector(token, unitId, payload) {
    return request(`/api/units/${unitId}/sectors`, {
      method: 'POST',
      token,
      body: payload,
    });
  },
  updateSector(token, sectorId, payload) {
    return request(`/api/sectors/${sectorId}`, {
      method: 'PUT',
      token,
      body: payload,
    });
  },
  deleteSector(token, sectorId, payload = {}) {
    const params = new URLSearchParams();
    if (payload.target_sector_id) params.set('target_sector_id', payload.target_sector_id);
    const qs = params.toString();
    return request(`/api/sectors/${sectorId}${qs ? `?${qs}` : ''}`, {
      method: 'DELETE',
      token,
      body: payload,
    });
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
  getMachineMessages(token, machineId) {
    return request(`/api/machines/${machineId}/messages`, { token });
  },
  sendMachineMessage(token, machineId, message) {
    return request(`/api/machines/${machineId}/messages`, {
      method: 'POST',
      token,
      body: { message },
    });
  },
  updateMachineLocation(token, machineId, { unitId, sectorId }) {
    return request(`/api/machines/${machineId}/location`, {
      method: 'POST',
      token,
      body: { unit_id: unitId, sector_id: sectorId },
    });
  },
  getTaskCatalog(token) {
    return request('/api/catalog/tasks', { token });
  },
  getApprovedPrinters(token, unitId, machineId) {
    const params = new URLSearchParams();
    if (unitId) params.set('unit_id', unitId);
    if (machineId) params.set('machine_id', machineId);
    const query = params.toString() ? `?${params.toString()}` : '';
    return request(`/api/printers${query}`, { token });
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
  if (handlers.onAgentMessage) {
    socket.on('agent:message', handlers.onAgentMessage);
  }
  if (handlers.onUnitsUpdated) {
    socket.on('units:updated', handlers.onUnitsUpdated);
  }
  if (handlers.onConnect) {
    socket.on('connect', handlers.onConnect);
  }
  if (handlers.onDisconnect) {
    socket.on('disconnect', handlers.onDisconnect);
  }

  return socket;
}

