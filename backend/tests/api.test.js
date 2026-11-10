const test = require('node:test');
const assert = require('node:assert/strict');

process.env.DB_MODE = 'memory';
process.env.FORCE_NATIVE_ROUTER = '1';

const app = require('../src/app');
const repository = require('../src/database/repository');
const socketHub = require('../src/realtime/socketHub');
const { signTaskPayload } = require('../src/config/taskCatalog');
const env = require('../src/config/env');
const { executeAuthorizedTask } = require('../../agent/src/tasks/taskExecutor');
const { collectTelemetrySnapshot } = require('../../agent/src/collectors/systemCollector');

async function requestJson(method, path, { headers = {}, body } = {}) {
  const normalizedHeaders = {};
  for (const [k, v] of Object.entries(headers)) {
    normalizedHeaders[k.toLowerCase()] = v;
  }

  return new Promise((resolve, reject) => {
    const req = {
      method,
      url: path,
      headers: normalizedHeaders,
      body: body !== undefined ? body : {},
      socket: { remoteAddress: '127.0.0.1' },
    };

    const resHeaders = {};
    const res = {
      statusCode: 200,
      headersSent: false,
      writableEnded: false,
      setHeader(k, v) {
        resHeaders[k.toLowerCase()] = v;
      },
      end(payload) {
        this.writableEnded = true;
        this.headersSent = true;
        let parsed = {};
        try {
          parsed = payload ? JSON.parse(payload) : {};
        } catch {
          parsed = {};
        }
        resolve({ status: this.statusCode, data: parsed, headers: resHeaders });
      },
    };

    Promise.resolve(app(req, res)).catch(reject);
  });
}

async function enrollTestMachine() {
  repository.resetMemoryStore();
  return repository.enrollNewAgentMachine({
    agentUuid: 'agt-usf-nso-rec01',
    agentToken: 'tok-usf-nso-rec01-secret',
    unitId: 1,
    sectorId: 1,
    inventory: {
      hostname: 'USF-NSO-REC01',
      ip_address: '10.14.1.11',
    },
  });
}

test.before(async () => {
  await repository.initialize();
});

test('1. Healthcheck e repositório limpo sem máquinas virtuais pré-criadas', async () => {
  repository.resetMemoryStore();
  assert.equal(repository.machines.length, 0);
  const res = await requestJson('GET', '/api/health');
  assert.equal(res.status, 200);
  assert.equal(res.data.status, 'ok');
});

test('2. Autenticação JWT e bloqueio de credenciais inválidas', async () => {
  const fail = await requestJson('POST', '/api/auth/login', {
    body: { email: 'admin@ipojuca.pe.gov.br', password: 'wrong' },
  });
  assert.equal(fail.status, 401);

  const ok = await requestJson('POST', '/api/auth/login', {
    body: { email: 'suporte@ipojuca.pe.gov.br', password: 'Suporte@Rmm2026' },
  });
  assert.equal(ok.status, 200);
  assert.ok(ok.data.token);
  assert.equal(ok.data.user.role, 'TECH_N1');
});

test('3. CA-01 e CA-03: Heartbeat Crítico atualiza estado e gera Alerta n8n sem duplicidade', async () => {
  await enrollTestMachine();

  const hbPayload = {
    agent_version: '1.0.0',
    inventory: {
      hostname: 'USF-NSO-REC01',
      ip_address: '10.14.1.11',
    },
    metrics: {
      cpu_usage_pct: 40.0,
      ram_usage_pct: 60.0,
      disk_usage_pct: 97.2,
      temperature_c: 55.0,
      uptime_seconds: 3600,
      spooler_running: true,
    },
  };

  const first = await requestJson('POST', '/api/heartbeat', {
    headers: {
      'X-Agent-Uuid': 'agt-usf-nso-rec01',
      'X-Agent-Token': 'tok-usf-nso-rec01-secret',
    },
    body: hbPayload,
  });

  assert.equal(first.status, 200);
  assert.equal(first.data.health_status, 'CRITICAL');
  assert.ok(first.data.alert);
  const firstAlertId = first.data.alert.id;

  const second = await requestJson('POST', '/api/heartbeat', {
    headers: {
      'X-Agent-Uuid': 'agt-usf-nso-rec01',
      'X-Agent-Token': 'tok-usf-nso-rec01-secret',
    },
    body: hbPayload,
  });

  assert.equal(second.status, 200);
  assert.equal(second.data.alert.id, firstAlertId);
});

test('4. CA-02: Detecção automática de máquina OFFLINE após expiração de heartbeat', async () => {
  const m = await enrollTestMachine();
  m.last_seen_at = new Date(Date.now() - 20000 * 1000).toISOString();
  const newlyOffline = await repository.markStaleMachinesOffline(15000);
  assert.equal(newlyOffline.length, 1);
  assert.equal(newlyOffline[0].id, m.id);
  assert.equal(newlyOffline[0].health_status, 'OFFLINE');
});

test('5. CA-04, CA-05 e CA-06: Controle RBAC e Bloqueio de Comandos PowerShell Arbitrários', async () => {
  const m = await enrollTestMachine();

  const viewerLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'gestao@ipojuca.pe.gov.br', password: 'Gestao@Rmm2026' },
  });
  const techLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'suporte@ipojuca.pe.gov.br', password: 'Suporte@Rmm2026' },
  });

  const viewerCmd = await requestJson('POST', '/api/command', {
    headers: { Authorization: `Bearer ${viewerLogin.data.token}` },
    body: { machine_id: m.id, task_code: 'CLEAR_TEMP_CACHE' },
  });
  assert.equal(viewerCmd.status, 403);

  const arbitraryPs = await requestJson('POST', '/api/command', {
    headers: { Authorization: `Bearer ${techLogin.data.token}` },
    body: {
      machine_id: m.id,
      powershell: 'Remove-Item -Recurse -Force C:\\*',
    },
  });
  assert.equal(arbitraryPs.status, 403);

  const highRiskAttempt = await requestJson('POST', '/api/command', {
    headers: { Authorization: `Bearer ${techLogin.data.token}` },
    body: {
      machine_id: m.id,
      task_code: 'INSTALL_APPROVED_PRINTER',
      parameters: { printer_ip: '10.14.1.200', printer_name: 'HP_RECEPCAO' },
    },
  });
  assert.equal(highRiskAttempt.status, 403);

  const validTask = await requestJson('POST', '/api/command', {
    headers: { Authorization: `Bearer ${techLogin.data.token}` },
    body: {
      machine_id: m.id,
      task_code: 'CLEAR_TEMP_CACHE',
      parameters: { include_system_temp: true },
      reason: 'Limpeza preventiva',
    },
  });
  assert.equal(validTask.status, 202);
  assert.equal(validTask.data.task.task_code, 'CLEAR_TEMP_CACHE');
  assert.equal(validTask.data.task.status, 'COMPLETED');
});

test('6. Despacho WebSocket Simulado Backend <-> Agente Windows e Diagnóstico Completo', async () => {
  const m = await enrollTestMachine();

  socketHub.connectedAgents.set(m.id, {
    connected: true,
    emit(event, payload) {
      if (event === 'task:execute') {
        executeAuthorizedTask(payload, env.taskSigningSecret).then((res) => {
          repository.completeRemoteTask({
            taskId: res.task_id,
            status: res.status,
            exitCode: res.exit_code,
            outputSummary: res.output_summary,
          });
        });
      }
    },
  });

  const adminLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'admin@ipojuca.pe.gov.br', password: 'Admin@Rmm2026' },
  });

  const dispatchRes = await requestJson('POST', '/api/command', {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      machine_id: m.id,
      task_code: 'INSTALL_APPROVED_PRINTER',
      parameters: { printer_ip: '10.14.1.250', printer_name: 'BROTHER_USF_01' },
    },
  });

  assert.equal(dispatchRes.status, 202);
  assert.equal(dispatchRes.data.delivery_mode, 'websocket_agent');

  await new Promise((r) => setTimeout(r, 50));

  const diag = await requestJson('GET', `/api/machines/${m.id}/diagnostics`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
  });
  assert.equal(diag.status, 200);
  const completedTask = diag.data.tasks.find(
    (t) => t.task_id === dispatchRes.data.task.task_id
  );
  assert.equal(completedTask.status, 'COMPLETED');
  assert.match(completedTask.output_summary, /BROTHER_USF_01/);

  socketHub.connectedAgents.delete(m.id);
});

test('7. Agente Windows: Coleta de Telemetria LGPD-Safe e Rejeição de Replay/Assinatura Inválida', async () => {
  const snapshot = await collectTelemetrySnapshot({ skipNativeQueries: true });
  assert.ok(snapshot.inventory.hostname);
  assert.equal(typeof snapshot.metrics.cpu_usage_pct, 'number');

  const expiresAt = new Date(Date.now() + 60000).toISOString();
  const taskPayload = {
    task_id: 'tsk_unit_replay_test',
    machine_id: 1,
    task_code: 'RESTART_SPOOLER',
    parameters: {},
    expires_at: expiresAt,
    signature: signTaskPayload({
      task_id: 'tsk_unit_replay_test',
      machine_id: 1,
      task_code: 'RESTART_SPOOLER',
      expires_at: expiresAt,
    }),
  };

  const firstExec = await executeAuthorizedTask(taskPayload, env.taskSigningSecret);
  assert.equal(firstExec.status, 'COMPLETED');

  const replayExec = await executeAuthorizedTask(taskPayload, env.taskSigningSecret);
  assert.equal(replayExec.status, 'FAILED');
  assert.equal(replayExec.exit_code, 409);

  const tamperedExec = await executeAuthorizedTask(
    { ...taskPayload, task_id: 'tsk_tampered_01', signature: '0'.repeat(64) },
    env.taskSigningSecret
  );
  assert.equal(tamperedExec.status, 'FAILED');
  assert.equal(tamperedExec.exit_code, 401);
});

test('8. Auto-Enrollment de Máquina Real e Botão Manual de Coleta de Telemetria Sob Demanda', async () => {
  repository.resetMemoryStore();

  const enrollRes = await requestJson('POST', '/api/heartbeat', {
    headers: {
      'X-Agent-Uuid': 'agt-win-posto-teste01',
      'X-Agent-Token': 'tok-posto-teste01-secret',
      'X-Enrollment-Key': 'rmm-ipojuca-enroll-2026',
    },
    body: {
      agent_version: '1.0.0',
      unit_id: 1,
      sector_id: 1,
      inventory: {
        hostname: 'USF-TESTE-PC01',
        ip_address: '10.14.1.99',
      },
      metrics: {
        cpu_usage_pct: 18.5,
        ram_usage_pct: 44.0,
        disk_usage_pct: 51.0,
        temperature_c: 46.0,
        uptime_seconds: 120,
        spooler_running: true,
      },
    },
  });

  assert.equal(enrollRes.status, 200);
  assert.equal(enrollRes.data.health_status, 'NORMAL');
  const newMachineId = enrollRes.data.machine_id;

  const techLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'suporte@ipojuca.pe.gov.br', password: 'Suporte@Rmm2026' },
  });

  const refreshRes = await requestJson(
    'POST',
    `/api/machines/${newMachineId}/refresh-telemetry`,
    {
      headers: { Authorization: `Bearer ${techLogin.data.token}` },
    }
  );
  assert.equal(refreshRes.status, 200);
  assert.equal(refreshRes.data.status, 'ok');

  const verRes = await requestJson('GET', '/api/agent/version');
  assert.equal(verRes.status, 200);
  assert.equal(verRes.data.latest_version, '2.2.0-native-exe');

  const updateRes = await requestJson(
    'POST',
    `/api/machines/${newMachineId}/update-agent`,
    {
      headers: { Authorization: `Bearer ${techLogin.data.token}` },
    }
  );
  assert.equal(updateRes.status, 200);
  assert.equal(updateRes.data.status, 'ok');

  const pollRes = await requestJson(
    'GET',
    '/api/agent/pending?agent_uuid=agt-win-posto-teste01&agent_version=2.0.0-native-exe'
  );
  assert.equal(pollRes.status, 200);
  assert.equal(pollRes.data.update_requested, true);
});
