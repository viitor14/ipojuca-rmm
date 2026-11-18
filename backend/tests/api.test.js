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
  assert.equal(verRes.data.latest_version, '2.3.1-native-exe');

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
    '/api/agent/pending?agent_uuid=agt-win-posto-teste01&agent_version=2.0.0-native-exe&idle_seconds=420'
  );
  assert.equal(pollRes.status, 200);
  assert.equal(pollRes.data.update_requested, true);

  const diagRes = await requestJson('GET', `/api/machines/${newMachineId}/diagnostics`, {
    headers: { Authorization: `Bearer ${techLogin.data.token}` },
  });
  assert.equal(diagRes.status, 200);
  assert.equal(diagRes.data.machine.idle_seconds, 420);
});


test('9. Ciclo #26 (CA-107 a CA-113): CRUD Completo de Unidades e Setores, Alocação 3D Anti-Colisão e RBAC', async () => {
  const m = await enrollTestMachine();

  const viewerLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'gestao@ipojuca.pe.gov.br', password: 'Gestao@Rmm2026' },
  });
  const adminLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'admin@ipojuca.pe.gov.br', password: 'Admin@Rmm2026' },
  });

  // 1. RBAC (CA-113): VIEWER não pode criar/editar/excluir unidades ou setores
  const viewerCreateUnit = await requestJson('POST', '/api/units', {
    headers: { Authorization: `Bearer ${viewerLogin.data.token}` },
    body: { name: 'USF Não Autorizada', unit_type: 'USF' },
  });
  assert.equal(viewerCreateUnit.status, 403);

  const viewerCreateSector = await requestJson('POST', '/api/units/1/sectors', {
    headers: { Authorization: `Bearer ${viewerLogin.data.token}` },
    body: { name: 'Setor Não Autorizado', room_theme: 'CONS' },
  });
  assert.equal(viewerCreateSector.status, 403);

  // 2. Criar Nova Unidade (CA-107)
  const createUnitRes = await requestJson('POST', '/api/units', {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      name: 'USF Camela',
      code: 'USF-CAM',
      unit_type: 'UPA',
      address: 'Distrito de Camela, Ipojuca - PE',
      create_default_sectors: true,
    },
  });
  assert.equal(createUnitRes.status, 201);
  assert.equal(createUnitRes.data.unit.code, 'USF-CAM');
  assert.equal(createUnitRes.data.unit.unit_type, 'UPA');
  assert.equal(createUnitRes.data.unit.sectors.length, 4);
  const createdUnitId = createUnitRes.data.unit.id;
  const createdUnitFirstSectorId = createUnitRes.data.unit.sectors[0].id;

  // 3. Editar Unidade (CA-108)
  const editUnitRes = await requestJson('PUT', `/api/units/${createdUnitId}`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      name: 'UPA Camela 24h',
      code: 'UPA-CAM',
      unit_type: 'UPA',
      address: 'Rodovia PE-60, Camela, Ipojuca - PE',
    },
  });
  assert.equal(editUnitRes.status, 200);
  assert.equal(editUnitRes.data.unit.name, 'UPA Camela 24h');
  assert.equal(editUnitRes.data.unit.code, 'UPA-CAM');

  // 4. Criar 5º e 6º Setores na Unidade 1 com Alocação Automática Sem Colisão (CA-110)
  const sec5Res = await requestJson('POST', '/api/units/1/sectors', {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      name: 'Sala de Vacinação Especial',
      code: 'VAC-01',
      room_theme: 'FARM',
    },
  });
  assert.equal(sec5Res.status, 201);
  assert.equal(sec5Res.data.sector.bounds_x, 13.5);
  assert.equal(sec5Res.data.sector.bounds_z, -3.5);

  const sec6Res = await requestJson('POST', '/api/units/1/sectors', {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      name: 'CPD / Sala Técnica',
      code: 'CPD-01',
      room_theme: 'TI',
    },
  });
  assert.equal(sec6Res.status, 201);
  assert.equal(sec6Res.data.sector.bounds_x, 13.5);
  assert.equal(sec6Res.data.sector.bounds_z, 3.5);

  // Bloqueio de sigla duplicada na mesma unidade
  const dupSecRes = await requestJson('POST', '/api/units/1/sectors', {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: { name: 'Duplicado', code: 'VAC-01', room_theme: 'FARM' },
  });
  assert.equal(dupSecRes.status, 409);

  // 5. Editar Setor (CA-111)
  const editSec5Res = await requestJson('PUT', `/api/sectors/${sec5Res.data.sector.id}`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: {
      name: 'Imunização & Vacinas',
      code: 'VAC-01',
      room_theme: 'FARM',
      width_3d: 9.0,
      depth_3d: 5.0,
    },
  });
  assert.equal(editSec5Res.status, 200);
  assert.equal(editSec5Res.data.sector.name, 'Imunização & Vacinas');

  // 6. Alocar PC no novo setor e Excluir Setor com Realocação Segura (CA-111 / CA-112)
  const moveToSec5 = await requestJson('POST', `/api/machines/${m.id}/location`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: { unit_id: 1, sector_id: sec5Res.data.sector.id },
  });
  assert.equal(moveToSec5.status, 200);
  assert.equal(moveToSec5.data.machine.sector_id, sec5Res.data.sector.id);

  const delSec5Res = await requestJson(
    'DELETE',
    `/api/sectors/${sec5Res.data.sector.id}`,
    {
      headers: { Authorization: `Bearer ${adminLogin.data.token}` },
      body: { target_sector_id: 1 },
    }
  );
  assert.equal(delSec5Res.status, 200);
  assert.equal(delSec5Res.data.relocated_machines_count, 1);

  const relocatedCheck = await repository.findMachineById(m.id);
  assert.equal(relocatedCheck.sector_id, 1);

  // Excluir setor vazio 6
  const delSec6Res = await requestJson('DELETE', `/api/sectors/${sec6Res.data.sector.id}`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
  });
  assert.equal(delSec6Res.status, 200);

  // 7. Alocar PC na Nova Unidade e Excluir Unidade com Realocação (CA-109)
  const moveToNewUnit = await requestJson('POST', `/api/machines/${m.id}/location`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: { unit_id: createdUnitId, sector_id: createdUnitFirstSectorId },
  });
  assert.equal(moveToNewUnit.status, 200);
  assert.equal(moveToNewUnit.data.machine.unit_id, createdUnitId);

  const delUnitRes = await requestJson('DELETE', `/api/units/${createdUnitId}`, {
    headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    body: { target_unit_id: 1 },
  });
  assert.equal(delUnitRes.status, 200);
  assert.equal(delUnitRes.data.relocated_machines_count, 1);

  const finalMachineState = await repository.findMachineById(m.id);
  assert.equal(finalMachineState.unit_id, 1);

  // 8. Verificar Trilha de Auditoria Completa (RF-106)
  const logs = await repository.listAuditLogs(20);
  const actions = logs.map((l) => l.action_type);
  for (const expected of [
    'UNIT_CREATED',
    'UNIT_UPDATED',
    'UNIT_DELETED',
    'SECTOR_CREATED',
    'SECTOR_UPDATED',
    'SECTOR_DELETED',
  ]) {
    assert.ok(actions.includes(expected), `Audit log deve conter ${expected}`);
  }
});

test('10. Ciclo #27 (CA-124 a CA-128): identidade de hardware, Upsert por serial/MAC, rebind auditado e histórico', async () => {
  const {
    normalizeSerial,
    normalizeMac,
    computeHardwareIdentity,
  } = require('../src/services/hardwareIdentity');
  const { parseInventoryJson } = require('../../agent/src/collectors/hardwareInventory');

  assert.equal(normalizeSerial('To be filled by O.E.M.'), null);
  assert.equal(normalizeSerial('Default string'), null);
  assert.equal(normalizeSerial('0'), null);
  assert.equal(normalizeSerial('SN-DESKTOP01'), null);
  assert.equal(normalizeSerial(' PE03KB4C '), 'PE03KB4C');
  assert.equal(normalizeMac('a4-bb-6d-12-34-56'), 'A4:BB:6D:12:34:56');
  assert.equal(normalizeMac('00:00:00:00:00:00'), null);

  const byMac = computeHardwareIdentity({ serial_number: 'Default string', mac_address: 'A4:BB:6D:12:34:56' });
  assert.equal(byMac.identity_confidence, 'MEDIUM');
  assert.equal(byMac.serial_number, null);
  const none = computeHardwareIdentity({});
  assert.equal(none.hardware_key, null);
  assert.equal(none.identity_confidence, 'LOW');

  const parsed = parseInventoryJson(
    JSON.stringify({ serial: 'ABC1234', manufacturer: 'Dell Inc.', model: 'OptiPlex', ram_bytes: 8589934592, disk_media: 4, cpu_cores: 4 })
  );
  assert.equal(parsed.ram_total_mb, 8192);
  assert.equal(parsed.disk_type, 'SSD');
  assert.equal(parsed.cpu_model, null);
  assert.equal(parsed.os_version, null);

  repository.resetMemoryStore();
  const send = (uuid, token, inventory, extra = {}) =>
    requestJson('POST', '/api/heartbeat', {
      headers: {
        'X-Agent-Uuid': uuid,
        'X-Agent-Token': token,
        'X-Enrollment-Key': env.agentEnrollmentKey,
      },
      body: {
        agent_version: '2.2.0',
        unit_id: 1,
        sector_id: 1,
        inventory,
        metrics: { cpu_usage_pct: 10, ram_usage_pct: 20, disk_usage_pct: 30, uptime_seconds: 60 },
        ...extra,
      },
    });

  const inv = {
    hostname: 'USF-REC01',
    serial_number: 'ABC1234',
    smbios_uuid: '4C4C4544-0042-3510-8051-B8C04F373232',
    mac_address: 'A4:BB:6D:12:34:56',
    ip_address: '10.20.1.15',
    cpu_model: 'Intel i5',
    ram_total_mb: 8192,
    disk_type: 'SSD',
    disk_total_gb: 238,
  };

  const first = await send('agt-a', 'tok-a', inv);
  assert.equal(first.status, 200);
  const machineId = first.data.machine_id;

  const stored = await repository.findMachineById(machineId);
  assert.equal(stored.identity_confidence, 'HIGH');
  assert.equal(stored.serial_number, 'ABC1234');

  const moved = await repository.updateMachineLocation(machineId, { unitId: 2, sectorId: 6 });
  assert.ok(moved);

  const reinstall = await send('agt-b', 'tok-b', { ...inv, hostname: 'USF-REC01-NEW', ram_total_mb: 16384 });
  assert.equal(reinstall.status, 200);
  assert.equal(reinstall.data.machine_id, machineId);
  assert.equal((await repository.listMachines()).length, 1);

  const rebound = await repository.findMachineById(machineId);
  assert.equal(rebound.agent_uuid, 'agt-b');
  assert.equal(rebound.unit_id, 2);
  assert.equal(rebound.sector_id, 6);
  assert.ok(repository.auditLogs.some((l) => l.action_type === 'AGENT_REBOUND'));

  const oldAgent = await send('agt-a', 'tok-a', inv, {});
  assert.equal(oldAgent.status, 200);
  assert.equal((await repository.listMachines()).length, 1, 'agente antigo reenvia com serial já existente: rebind, sem duplicata');

  const changes = await repository.listInventoryChanges(machineId);
  assert.ok(changes.some((c) => c.field_name === 'ram_total_mb' && c.old_value === '8192' && c.new_value === '16384'));

  const spoof = await send('agt-evil', 'tok-evil', { ...inv, smbios_uuid: '11111111-2222-3333-4444-555555555555' });
  assert.equal(spoof.status, 409);
  assert.ok(repository.auditLogs.some((l) => l.action_type === 'HARDWARE_KEY_CONFLICT'));
  assert.equal((await repository.listMachines()).length, 1);

  const refresh = await send('agt-a', 'tok-a', { hostname: 'USF-REC01-NEW', serial_number: 'To be filled by O.E.M.', ip_address: '10.20.1.16' });
  assert.equal(refresh.status, 200);
  const kept = await repository.findMachineById(machineId);
  assert.equal(kept.serial_number, 'ABC1234');
  assert.equal(kept.ip_address, '10.20.1.16');
  assert.equal(kept.unit_id, 2);
});

test('11. Ciclo #28 (CA-131 a CA-133): exclusão de unidade/setor não deixa vínculo órfão e valida setor de destino', async () => {
  const adminLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'admin@ipojuca.pe.gov.br', password: 'Admin@Rmm2026' },
  });
  const token = adminLogin.data.token;
  const auth = { Authorization: `Bearer ${token}` };

  const unitA = await requestJson('POST', '/api/units', {
    headers: auth,
    body: { name: 'USF Origem Teste', code: 'USF-ORIG-T', unit_type: 'USF', create_default_sectors: true },
  });
  assert.equal(unitA.status, 201);
  const unitB = await requestJson('POST', '/api/units', {
    headers: auth,
    body: { name: 'USF Destino Teste', code: 'USF-DEST-T', unit_type: 'USF', create_default_sectors: true },
  });
  assert.equal(unitB.status, 201);
  const sectorA = unitA.data.unit.sectors[0];
  const sectorB = unitB.data.unit.sectors[0];

  const machine = await repository.enrollNewAgentMachine({
    agentUuid: 'agt-crud-28',
    agentToken: 'tok-crud-28',
    unitId: unitA.data.unit.id,
    sectorId: sectorA.id,
    inventory: { hostname: 'PC-CRUD-28', serial_number: 'CRUD28SN', ram_total_mb: 4096, disk_total_gb: 120 },
  });
  assert.ok(machine.id);

  const crossUnit = await requestJson('DELETE', `/api/sectors/${sectorA.id}?target_sector_id=${sectorB.id}`, {
    headers: auth,
  });
  assert.equal(crossUnit.status, 400);
  assert.ok(await repository.findSectorById(sectorA.id));

  const deleteUnit = await requestJson(
    `DELETE`,
    `/api/units/${unitA.data.unit.id}?target_unit_id=${unitB.data.unit.id}&target_sector_id=${sectorB.id}`,
    { headers: auth }
  );
  assert.equal(deleteUnit.status, 200);
  assert.equal(deleteUnit.data.relocated_machines_count, 1);
  assert.equal(await repository.findUnitById(unitA.data.unit.id), null);
  assert.equal((await repository.listSectorsByUnit(unitA.data.unit.id)).length, 0);

  const relocated = await repository.findMachineById(machine.id);
  assert.equal(relocated.unit_id, unitB.data.unit.id);
  assert.equal(relocated.sector_id, sectorB.id);

  const sectorC = await requestJson('POST', `/api/units/${unitB.data.unit.id}/sectors`, {
    headers: auth,
    body: { name: 'Sala Exclusão', code: 'DEL-T', room_theme: 'CONS' },
  });
  assert.equal(sectorC.status, 201);
  const delSector = await requestJson(
    'DELETE',
    `/api/sectors/${sectorC.data.sector.id}?target_sector_id=${sectorB.id}`,
    { headers: auth }
  );
  assert.equal(delSector.status, 200);
  assert.equal(await repository.findSectorById(sectorC.data.sector.id), null);
});

test('12. Ciclo #29 (CA-136 a CA-139): catalogo de impressoras homologadas e parametros de instalacao', async () => {
  const adminLogin = await requestJson('POST', '/api/auth/login', {
    body: { email: 'admin@ipojuca.pe.gov.br', password: 'Admin@Rmm2026' },
  });
  const token = adminLogin.data.token;
  const auth = { Authorization: `Bearer ${token}` };

  const list = await requestJson('GET', '/api/printers?unit_id=1', { headers: auth });
  assert.equal(list.status, 200);
  assert.ok(Array.isArray(list.data.printers));

  const noAuth = await requestJson('GET', '/api/printers');
  assert.equal(noAuth.status, 401);

  const machine = await repository.enrollNewAgentMachine({
    agentUuid: 'agt-printer-29',
    agentToken: 'tok-printer-29',
    unitId: 1,
    sectorId: 1,
    inventory: { hostname: 'PC-PRINTER-29', serial_number: 'PRN29SN', ram_total_mb: 4096, disk_total_gb: 120 },
  });

  // Ciclo #30: impressoras reais descobertas na LAN chegam pelo heartbeat
  const hb = await requestJson('POST', '/api/heartbeat', {
    headers: {
      'X-Agent-Uuid': 'agt-printer-29',
      'X-Agent-Token': 'tok-printer-29',
    },
    body: {
      agent_version: '2.4.0',
      inventory: { hostname: 'PC-PRINTER-29', serial_number: 'PRN29SN' },
      metrics: { cpu_usage_pct: 5, ram_usage_pct: 20, disk_usage_pct: 30, uptime_seconds: 60 },
      printers: [
        { ip_address: '10.200.33.18', name: 'IMPRESSORA-18', port: 9100, source: 'NETWORK' },
        { ip_address: '10.200.33.60', name: 'IMPRESSORA-60', port: 9100, source: 'NETWORK' },
      ],
    },
  });
  assert.equal(hb.status, 200);

  const withDiscovery = await requestJson('GET', `/api/printers?unit_id=1&machine_id=${machine.id}`, {
    headers: auth,
  });
  assert.equal(withDiscovery.status, 200);
  const discovered = withDiscovery.data.printers.filter((p) => p.source === 'NETWORK');
  assert.equal(discovered.length, 2);
  assert.ok(discovered.some((p) => p.ip_address === '10.200.33.18'));
  const printer = discovered[0];

  const withoutParams = await requestJson('POST', '/api/command', {
    headers: auth,
    body: { machine_id: machine.id, task_code: 'INSTALL_APPROVED_PRINTER', parameters: {} },
  });
  assert.equal(withoutParams.status, 400);

  const withParams = await requestJson('POST', '/api/command', {
    headers: auth,
    body: {
      machine_id: machine.id,
      task_code: 'INSTALL_APPROVED_PRINTER',
      parameters: { printer_ip: printer.ip_address, printer_name: printer.name },
    },
  });
  assert.ok([200, 202].includes(withParams.status));
  assert.ok(String(withParams.data.task?.output_summary || '').includes(printer.name));

  const reboot = await requestJson('POST', '/api/command', {
    headers: auth,
    body: { machine_id: machine.id, task_code: 'REBOOT_WORKSTATION', parameters: {} },
  });
  assert.ok([200, 202].includes(reboot.status));
});
