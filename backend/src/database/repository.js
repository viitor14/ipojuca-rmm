const env = require('../config/env');
const { hashPassword, hashAgentToken } = require('../middlewares/auth');

const ALLOWED_UNIT_TYPES = new Set([
  'USF',
  'POLICLINICA',
  'CAPS',
  'UPA',
  'HOSPITAL',
  'CEO',
  'SEDE',
]);

const ALLOWED_ROOM_THEMES = new Set(['REC', 'CONS', 'FARM', 'ADM', 'TI']);

function createDomainError(message, statusCode = 400) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

function normalizeCode(rawCode, fallbackName = '', defaultPrefix = 'ITEM') {
  const source = String(rawCode || fallbackName || defaultPrefix)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 28);
  return source || defaultPrefix;
}

function normalizeRoomTheme(roomTheme, code = '', name = '') {
  const upperTheme = String(roomTheme || '').trim().toUpperCase();
  if (ALLOWED_ROOM_THEMES.has(upperTheme)) {
    return upperTheme;
  }
  const combined = `${code} ${name}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  if (combined.includes('REC') || combined.includes('TRIAG') || combined.includes('ACOLH')) {
    return 'REC';
  }
  if (combined.includes('CONS') || combined.includes('MED') || combined.includes('PSI') || combined.includes('ODONT')) {
    return 'CONS';
  }
  if (combined.includes('FAR') || combined.includes('VAC') || combined.includes('LAB') || combined.includes('MEDIC')) {
    return 'FARM';
  }
  if (combined.includes('TI') || combined.includes('CPD') || combined.includes('SERV') || combined.includes('INFOR')) {
    return 'TI';
  }
  return 'ADM';
}

/**
 * Repositório Unificado (MySQL 8.0 + Store Relacional em Memória).
 * Contém apenas as Unidades de Saúde, Setores e Operadores reais;
 * todas as máquinas são registradas exclusivamente por Agentes Windows reais.
 */
class RmmRepository {
  constructor() {
    this.pool = null;
    this.mode = 'memory';
    this.resetMemoryStore();
  }

  resetMemoryStore() {
    this.units = [
      {
        id: 1,
        code: 'USF-NSO',
        name: 'USF Nossa Senhora do Ó',
        unit_type: 'USF',
        address: 'Av. Principal, Nossa Senhora do Ó, Ipojuca - PE',
        is_active: 1,
      },
      {
        id: 2,
        code: 'POLI-CEN',
        name: 'Policlínica Municipal de Ipojuca',
        unit_type: 'POLICLINICA',
        address: 'Centro, Ipojuca - PE',
        is_active: 1,
      },
      {
        id: 3,
        code: 'CAPS-IPO',
        name: 'CAPS Porto de Galinhas / Ipojuca',
        unit_type: 'CAPS',
        address: 'Porto de Galinhas, Ipojuca - PE',
        is_active: 1,
      },
    ];

    this.sectors = [
      { id: 1, unit_id: 1, code: 'REC', name: 'Recepção e Triagem', room_theme: 'REC', bounds_x: -4.5, bounds_z: -3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 2, unit_id: 1, code: 'CONS-01', name: 'Consultório Médico 01', room_theme: 'CONS', bounds_x: 4.5, bounds_z: -3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 3, unit_id: 1, code: 'FARM', name: 'Farmácia e Vacinação', room_theme: 'FARM', bounds_x: -4.5, bounds_z: 3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 4, unit_id: 1, code: 'ADM', name: 'Coordenação / Enfermagem', room_theme: 'ADM', bounds_x: 4.5, bounds_z: 3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 5, unit_id: 2, code: 'REC-POLI', name: 'Recepção Central Policlínica', room_theme: 'REC', bounds_x: -4.5, bounds_z: -3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 6, unit_id: 2, code: 'LAB-POLI', name: 'Laboratório e Exames', room_theme: 'ADM', bounds_x: 4.5, bounds_z: -3.5, width_3d: 9.0, depth_3d: 5.0 },
      { id: 7, unit_id: 2, code: 'REG-POLI', name: 'Regulação Médica', room_theme: 'ADM', bounds_x: 0.0, bounds_z: 3.5, width_3d: 18.0, depth_3d: 5.0 },
      { id: 8, unit_id: 3, code: 'ACOLH', name: 'Acolhimento e Prontuário CAPS', room_theme: 'TI', bounds_x: -4.5, bounds_z: 0.0, width_3d: 9.0, depth_3d: 10.0 },
      { id: 9, unit_id: 3, code: 'PSI-01', name: 'Consultório Multiprofissional', room_theme: 'CONS', bounds_x: 4.5, bounds_z: 0.0, width_3d: 9.0, depth_3d: 10.0 },
    ];

    // Zero máquinas virtuais/simuladas: apenas computadores reais registrados pelo Agente Windows
    this.machines = [];
    this.alerts = [];
    this.telemetryHistory = [];
    this.remoteTasks = [];
    this.auditLogs = [];
    this.lastBroadcastedIdleByMachine = new Map();

    this.users = [
      {
        id: 1,
        name: 'Vitor França (Admin N2)',
        email: 'admin@ipojuca.pe.gov.br',
        password_hash: hashPassword('Admin@Rmm2026'),
        role: 'ADMIN_N2',
        is_active: 1,
      },
      {
        id: 2,
        name: 'Carlos Mendes (Suporte N1)',
        email: 'suporte@ipojuca.pe.gov.br',
        password_hash: hashPassword('Suporte@Rmm2026'),
        role: 'TECH_N1',
        is_active: 1,
      },
      {
        id: 3,
        name: 'Dra. Helena Costa (Gestão Saúde)',
        email: 'gestao@ipojuca.pe.gov.br',
        password_hash: hashPassword('Gestao@Rmm2026'),
        role: 'VIEWER',
        is_active: 1,
      },
    ];
  }

  async initialize() {
    if (env.dbMode === 'memory') {
      this.mode = 'memory';
      return { mode: 'memory' };
    }

    try {
      const mysql = require('mysql2/promise');
      const pool = mysql.createPool({
        host: env.db.host,
        port: env.db.port,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
        charset: 'utf8mb4',
        waitForConnections: true,
        connectionLimit: 10,
        connectTimeout: 2500,
      });
      await pool.query('SELECT 1');
      this.pool = pool;
      this.mode = 'mysql';
      await this.ensureMysqlSeedData();
      return { mode: 'mysql' };
    } catch (err) {
      if (env.dbMode === 'mysql') {
        throw err;
      }
      this.mode = 'memory';
      return { mode: 'memory', fallbackReason: err.message };
    }
  }

  async ensureMysqlSeedData() {
    if (this.mode !== 'mysql' || !this.pool) return;
    await this.pool.query('SET NAMES utf8mb4');

    // Auto-migrations seguras para compatibilizar bancos já existentes na VPS
    try {
      await this.pool.query(
        'ALTER TABLE machines ADD COLUMN idle_seconds BIGINT NOT NULL DEFAULT 0 AFTER uptime_seconds'
      );
    } catch {
      // Coluna já existe
    }
    try {
      await this.pool.query(
        "ALTER TABLE health_units MODIFY COLUMN unit_type VARCHAR(32) NOT NULL DEFAULT 'USF'"
      );
    } catch {
      // Coluna já ajustada
    }
    try {
      await this.pool.query(
        'ALTER TABLE sectors ADD COLUMN room_theme VARCHAR(16) DEFAULT NULL AFTER name'
      );
    } catch {
      // Coluna já existe
    }

    // Semeia unidades/setores iniciais somente se o banco ainda estiver vazio
    try {
      const [[countRow]] = await this.pool.query('SELECT COUNT(*) AS cnt FROM health_units');
      if (Number(countRow?.cnt || 0) === 0) {
        for (const unit of this.units) {
          await this.pool.execute(
            `INSERT IGNORE INTO health_units (id, code, name, unit_type, address, is_active)
             VALUES (?, ?, ?, ?, ?, 1)`,
            [unit.id, unit.code, unit.name, unit.unit_type, unit.address]
          );
        }
        for (const sec of this.sectors) {
          await this.pool.execute(
            `INSERT IGNORE INTO sectors (id, unit_id, code, name, room_theme, bounds_x, bounds_z, width_3d, depth_3d)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [sec.id, sec.unit_id, sec.code, sec.name, sec.room_theme, sec.bounds_x, sec.bounds_z, sec.width_3d, sec.depth_3d]
          );
        }
      }
    } catch {
      // Ignora caso tabelas já estejam povoadas
    }

    // Repara apenas acentuação corrompida (mojibake) sem sobrescrever edições manuais do operador
    for (const unit of this.units) {
      await this.pool.execute(
        `UPDATE health_units SET name = ?, address = ?
         WHERE id = ? AND (name LIKE '%Ã%' OR address LIKE '%Ã%')`,
        [unit.name, unit.address, unit.id]
      );
    }
    for (const sec of this.sectors) {
      await this.pool.execute(
        `UPDATE sectors SET name = ? WHERE id = ? AND name LIKE '%Ã%'`,
        [sec.name, sec.id]
      );
    }

    for (const u of this.users) {
      await this.pool.execute(
        `INSERT IGNORE INTO users (id, name, email, password_hash, role, is_active)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [u.id, u.name, u.email, u.password_hash, u.role]
      );
    }

    // Restaura métricas reais do histórico caso alguma estação ativa tenha sido zerada por timeout curto anterior
    try {
      const [machines] = await this.pool.query('SELECT * FROM machines');
      for (const m of machines) {
        if (Number(m.cpu_usage_pct) === 0 && Number(m.ram_usage_pct) === 0) {
          const [lastTel] = await this.pool.execute(
            `SELECT * FROM telemetry_history WHERE machine_id = ? AND (cpu_usage_pct > 0 OR ram_usage_pct > 0) ORDER BY recorded_at DESC LIMIT 1`,
            [m.id]
          );
          if (lastTel.length > 0) {
            await this.pool.execute(
              `UPDATE machines SET cpu_usage_pct = ?, ram_usage_pct = ?, disk_usage_pct = ?, temperature_c = ?, health_status = ? WHERE id = ?`,
              [
                lastTel[0].cpu_usage_pct,
                lastTel[0].ram_usage_pct,
                lastTel[0].disk_usage_pct,
                lastTel[0].temperature_c,
                lastTel[0].health_status === 'OFFLINE' ? 'NORMAL' : lastTel[0].health_status,
                m.id,
              ]
            );
          } else {
            await this.pool.execute(
              `UPDATE machines SET health_status = 'NORMAL' WHERE id = ? AND TIMESTAMPDIFF(SECOND, last_seen_at, NOW()) < ?`,
              [m.id, env.offlineThresholdSeconds]
            );
          }
        }
      }
    } catch {
      // Ignora caso não haja histórico prévio
    }
  }

  async enrollNewAgentMachine({
    agentUuid,
    agentToken,
    unitId = 1,
    sectorId = 1,
    inventory = {},
  }) {
    const tokenHash = hashAgentToken(agentToken);
    const nowIso = new Date().toISOString();

    let resolvedUnitId = Number(unitId);
    let sector = null;
    if (this.mode === 'mysql') {
      const [secRows] = await this.pool.execute(
        'SELECT * FROM sectors WHERE id = ? LIMIT 1',
        [Number(sectorId)]
      );
      if (secRows.length > 0) {
        sector = secRows[0];
        resolvedUnitId = Number(sector.unit_id);
      } else {
        const [unitSecRows] = await this.pool.execute(
          'SELECT * FROM sectors WHERE unit_id = ? ORDER BY id ASC LIMIT 1',
          [resolvedUnitId]
        );
        if (unitSecRows.length > 0) {
          sector = unitSecRows[0];
        } else {
          const [anySecRows] = await this.pool.query(
            'SELECT * FROM sectors ORDER BY id ASC LIMIT 1'
          );
          sector = anySecRows[0] || this.sectors[0];
          resolvedUnitId = Number(sector?.unit_id || resolvedUnitId);
        }
      }
    } else {
      sector =
        this.sectors.find((s) => s.id === Number(sectorId)) ||
        this.sectors.find((s) => s.unit_id === resolvedUnitId) ||
        this.sectors[0];
      if (sector) {
        resolvedUnitId = Number(sector.unit_id);
      }
    }

    const resolvedSectorId = Number(sector?.id || sectorId);
    const existingInUnit = await this.listMachines({ unitId: resolvedUnitId });
    const baseSectorX = Number(sector?.bounds_x || -4.5);
    const baseSectorZ = Number(sector?.bounds_z || -3.5);
    const offsetIdx = existingInUnit.filter((m) => m.sector_id === resolvedSectorId).length;
    const posX = Number((baseSectorX - 1.5 + (offsetIdx % 3) * 1.8).toFixed(2));
    const posZ = Number((baseSectorZ - 0.5 + Math.floor(offsetIdx / 3) * 1.6).toFixed(2));

    const resolvedCpuModel = inventory.cpu_model || inventory.processor || 'x64 CPU';
    const resolvedRamMb = Number(
      inventory.ram_total_mb ||
        (inventory.ram_total_gb ? Math.round(Number(inventory.ram_total_gb) * 1024) : 8192)
    );
    const resolvedDiskGb = Math.max(1, Math.round(Number(inventory.disk_total_gb || 256)));
    const resolvedOsVersion = inventory.os_version || inventory.os_name || 'Windows';

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `INSERT INTO machines
          (agent_uuid, agent_token_hash, is_revoked, unit_id, sector_id, hostname,
           manufacturer, model, serial_number, mac_address, ip_address, cpu_model,
           ram_total_mb, disk_type, disk_total_gb, os_version, agent_version,
           health_status, pos_x, pos_y, pos_z, last_seen_at)
         VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1.0.0', 'NORMAL', ?, 0.65, ?, NOW())`,
        [
          agentUuid,
          tokenHash,
          resolvedUnitId,
          resolvedSectorId,
          inventory.hostname || agentUuid,
          inventory.manufacturer || 'Windows PC',
          inventory.model || 'Workstation',
          inventory.serial_number || 'SN-AUTO',
          inventory.mac_address || '00:00:00:00:00:00',
          inventory.ip_address || '0.0.0.0',
          resolvedCpuModel,
          resolvedRamMb,
          inventory.disk_type || 'SSD',
          resolvedDiskGb,
          resolvedOsVersion,
          posX,
          posZ,
        ]
      );
      return this.findMachineByAgentUuid(agentUuid);
    }

    const nextMachineId =
      this.machines.reduce((maxId, m) => Math.max(maxId, Number(m.id || 0)), 0) + 1;
    const newMachine = {
      id: nextMachineId,
      agent_uuid: agentUuid,
      agent_token_hash: tokenHash,
      is_revoked: 0,
      unit_id: resolvedUnitId,
      sector_id: resolvedSectorId,
      hostname: inventory.hostname || agentUuid,
      manufacturer: inventory.manufacturer || 'Windows PC',
      model: inventory.model || 'Workstation',
      serial_number: inventory.serial_number || 'SN-AUTO',
      mac_address: inventory.mac_address || '00:00:00:00:00:00',
      ip_address: inventory.ip_address || '0.0.0.0',
      cpu_model: resolvedCpuModel,
      ram_total_mb: resolvedRamMb,
      disk_type: inventory.disk_type || 'SSD',
      disk_total_gb: resolvedDiskGb,
      os_version: resolvedOsVersion,
      agent_version: '1.0.0',
      health_status: 'NORMAL',
      cpu_usage_pct: 0,
      ram_usage_pct: 0,
      disk_usage_pct: 0,
      temperature_c: 45,
      uptime_seconds: 0,
      spooler_running: 1,
      pos_x: posX,
      pos_y: 0.65,
      pos_z: posZ,
      last_seen_at: nowIso,
      updated_at: nowIso,
    };
    this.machines.push(newMachine);
    return newMachine;
  }

  async findUserByEmail(email) {
    const normalized = String(email || '').trim().toLowerCase();
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        'SELECT * FROM users WHERE LOWER(email) = ? AND is_active = 1 LIMIT 1',
        [normalized]
      );
      return rows[0] || null;
    }
    return (
      this.users.find((u) => u.email.toLowerCase() === normalized && u.is_active === 1) ||
      null
    );
  }

  async findMachineByAgentUuid(agentUuid) {
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        'SELECT * FROM machines WHERE agent_uuid = ? LIMIT 1',
        [agentUuid]
      );
      return rows[0] || null;
    }
    return this.machines.find((m) => m.agent_uuid === agentUuid) || null;
  }

  async findMachineById(machineId) {
    const id = Number(machineId);
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        `SELECT m.*, u.name AS unit_name, u.code AS unit_code, u.unit_type,
                s.name AS sector_name, s.code AS sector_code
         FROM machines m
         JOIN health_units u ON u.id = m.unit_id
         JOIN sectors s ON s.id = m.sector_id
         WHERE m.id = ? LIMIT 1`,
        [id]
      );
      return rows[0] || null;
    }
    const machine = this.machines.find((m) => m.id === id);
    if (!machine) return null;
    const unit = this.units.find((u) => u.id === machine.unit_id);
    const sector = this.sectors.find((s) => s.id === machine.sector_id);
    return {
      ...machine,
      unit_name: unit?.name || 'Unidade',
      unit_code: unit?.code || 'UNI',
      unit_type: unit?.unit_type || 'USF',
      sector_name: sector?.name || 'Setor',
      sector_code: sector?.code || 'SET',
    };
  }

  async listUnitsWithSummary() {
    await this.markStaleMachinesOffline(env.offlineThresholdSeconds);
    if (this.mode === 'mysql') {
      const [units] = await this.pool.query(
        'SELECT * FROM health_units WHERE is_active = 1 ORDER BY id ASC'
      );
      const [sectors] = await this.pool.query('SELECT * FROM sectors ORDER BY id ASC');
      const [machines] = await this.pool.query('SELECT id, unit_id, health_status FROM machines');

      return units.map((u) => {
        const unitMachines = machines.filter((m) => m.unit_id === u.id);
        return {
          ...u,
          sectors: sectors.filter((s) => s.unit_id === u.id),
          summary: {
            total: unitMachines.length,
            NORMAL: unitMachines.filter((m) => m.health_status === 'NORMAL').length,
            WARNING: unitMachines.filter((m) => m.health_status === 'WARNING').length,
            CRITICAL: unitMachines.filter((m) => m.health_status === 'CRITICAL').length,
            OFFLINE: unitMachines.filter((m) => m.health_status === 'OFFLINE').length,
          },
        };
      });
    }

    return this.units.map((u) => {
      const unitMachines = this.machines.filter((m) => m.unit_id === u.id);
      return {
        ...u,
        sectors: this.sectors.filter((s) => s.unit_id === u.id),
        summary: {
          total: unitMachines.length,
          NORMAL: unitMachines.filter((m) => m.health_status === 'NORMAL').length,
          WARNING: unitMachines.filter((m) => m.health_status === 'WARNING').length,
          CRITICAL: unitMachines.filter((m) => m.health_status === 'CRITICAL').length,
          OFFLINE: unitMachines.filter((m) => m.health_status === 'OFFLINE').length,
        },
      };
    });
  }

  async listMachines({ unitId, sectorId, status } = {}) {
    await this.markStaleMachinesOffline(env.offlineThresholdSeconds);
    if (this.mode === 'mysql') {
      let sql = `
        SELECT m.*, u.name AS unit_name, u.code AS unit_code, u.unit_type,
               s.name AS sector_name, s.code AS sector_code
        FROM machines m
        JOIN health_units u ON u.id = m.unit_id
        JOIN sectors s ON s.id = m.sector_id
        WHERE 1=1
      `;
      const params = [];
      if (unitId) {
        sql += ' AND m.unit_id = ?';
        params.push(Number(unitId));
      }
      if (sectorId) {
        sql += ' AND m.sector_id = ?';
        params.push(Number(sectorId));
      }
      if (status) {
        sql += ' AND m.health_status = ?';
        params.push(String(status));
      }
      sql += ' ORDER BY m.id ASC';
      const [rows] = await this.pool.execute(sql, params);
      return rows.map(({ agent_token_hash, ...safe }) => safe);
    }

    return this.machines
      .filter((m) => {
        if (unitId && m.unit_id !== Number(unitId)) return false;
        if (sectorId && m.sector_id !== Number(sectorId)) return false;
        if (status && m.health_status !== String(status)) return false;
        return true;
      })
      .map((m) => {
        const unit = this.units.find((u) => u.id === m.unit_id);
        const sector = this.sectors.find((s) => s.id === m.sector_id);
        const { agent_token_hash, ...safe } = m;
        return {
          ...safe,
          unit_name: unit?.name || 'Unidade',
          unit_code: unit?.code || 'UNI',
          unit_type: unit?.unit_type || 'USF',
          sector_name: sector?.name || 'Setor',
          sector_code: sector?.code || 'SET',
        };
      });
  }

  async upsertHeartbeat({ agentUuid, agentVersion, inventory = {}, metrics = {}, healthStatus }) {
    const nowIso = new Date().toISOString();
    let machine = await this.findMachineByAgentUuid(agentUuid);

    if (!machine) {
      throw new Error(`Agente '${agentUuid}' não provisionado.`);
    }

    const incomingRamMb =
      inventory.ram_total_mb ||
      (inventory.ram_total_gb ? Math.round(Number(inventory.ram_total_gb) * 1024) : 0);

    const updatedFields = {
      hostname: inventory.hostname || machine.hostname,
      manufacturer: inventory.manufacturer || machine.manufacturer,
      model: inventory.model || machine.model,
      serial_number: inventory.serial_number || machine.serial_number,
      mac_address: inventory.mac_address || machine.mac_address,
      ip_address: inventory.ip_address || machine.ip_address,
      cpu_model: inventory.cpu_model || inventory.processor || machine.cpu_model,
      ram_total_mb: Number(incomingRamMb || machine.ram_total_mb),
      disk_type: inventory.disk_type || machine.disk_type,
      disk_total_gb: Math.round(Number(inventory.disk_total_gb || machine.disk_total_gb)),
      os_version: inventory.os_version || inventory.os_name || machine.os_version,
      agent_version: agentVersion || machine.agent_version,
      health_status: healthStatus,
      cpu_usage_pct: Number(metrics.cpu_usage_pct ?? machine.cpu_usage_pct),
      ram_usage_pct: Number(metrics.ram_usage_pct ?? machine.ram_usage_pct),
      disk_usage_pct: Number(metrics.disk_usage_pct ?? machine.disk_usage_pct),
      temperature_c: Number(metrics.temperature_c ?? machine.temperature_c),
      uptime_seconds: Number(metrics.uptime_seconds ?? machine.uptime_seconds),
      idle_seconds: Math.max(
        0,
        Number(metrics.idle_seconds ?? machine.idle_seconds ?? 0)
      ),
      spooler_running:
        metrics.spooler_running === undefined
          ? machine.spooler_running
          : metrics.spooler_running
            ? 1
            : 0,
      last_seen_at: nowIso,
      updated_at: nowIso,
    };

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE machines SET
          hostname=?, manufacturer=?, model=?, serial_number=?, mac_address=?, ip_address=?,
          cpu_model=?, ram_total_mb=?, disk_type=?, disk_total_gb=?, os_version=?, agent_version=?,
          health_status=?, cpu_usage_pct=?, ram_usage_pct=?, disk_usage_pct=?, temperature_c=?,
          uptime_seconds=?, idle_seconds=?, spooler_running=?, last_seen_at=NOW()
        WHERE id=?`,
        [
          updatedFields.hostname,
          updatedFields.manufacturer,
          updatedFields.model,
          updatedFields.serial_number,
          updatedFields.mac_address,
          updatedFields.ip_address,
          updatedFields.cpu_model,
          updatedFields.ram_total_mb,
          updatedFields.disk_type,
          updatedFields.disk_total_gb,
          updatedFields.os_version,
          updatedFields.agent_version,
          updatedFields.health_status,
          updatedFields.cpu_usage_pct,
          updatedFields.ram_usage_pct,
          updatedFields.disk_usage_pct,
          updatedFields.temperature_c,
          updatedFields.uptime_seconds,
          updatedFields.idle_seconds,
          updatedFields.spooler_running,
          machine.id,
        ]
      );
      await this.pool.execute(
        `INSERT INTO telemetry_history
          (machine_id, cpu_usage_pct, ram_usage_pct, disk_usage_pct, temperature_c, uptime_seconds, spooler_running, health_status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          machine.id,
          updatedFields.cpu_usage_pct,
          updatedFields.ram_usage_pct,
          updatedFields.disk_usage_pct,
          updatedFields.temperature_c,
          updatedFields.uptime_seconds,
          updatedFields.spooler_running,
          updatedFields.health_status,
        ]
      );
    } else {
      Object.assign(machine, updatedFields);
      this.telemetryHistory.push({
        id: this.telemetryHistory.length + 1,
        machine_id: machine.id,
        cpu_usage_pct: updatedFields.cpu_usage_pct,
        ram_usage_pct: updatedFields.ram_usage_pct,
        disk_usage_pct: updatedFields.disk_usage_pct,
        temperature_c: updatedFields.temperature_c,
        uptime_seconds: updatedFields.uptime_seconds,
        spooler_running: updatedFields.spooler_running,
        health_status: updatedFields.health_status,
        recorded_at: nowIso,
      });
      if (this.telemetryHistory.length > 1000) {
        this.telemetryHistory.shift();
      }
    }

    return this.findMachineById(machine.id);
  }

  async findOrCreateActiveAlert({ machineId, severity, metricName, message }) {
    const incidentKey = `inc_${machineId}_${metricName}_${severity}`;

    if (this.mode === 'mysql') {
      const [existing] = await this.pool.execute(
        `SELECT * FROM alerts WHERE machine_id = ? AND metric_name = ? AND status IN ('OPEN', 'ACKNOWLEDGED') LIMIT 1`,
        [machineId, metricName]
      );
      if (existing.length > 0) {
        return { alert: existing[0], isNew: false };
      }
      const uniqueKey = `${incidentKey}_${Date.now()}`;
      const [result] = await this.pool.execute(
        `INSERT INTO alerts (incident_key, machine_id, severity, metric_name, message, status, n8n_notified)
         VALUES (?, ?, ?, ?, ?, 'OPEN', 0)`,
        [uniqueKey, machineId, severity, metricName, message]
      );
      const [created] = await this.pool.execute('SELECT * FROM alerts WHERE id = ?', [
        result.insertId,
      ]);
      return { alert: created[0], isNew: true };
    }

    const existing = this.alerts.find(
      (a) =>
        a.machine_id === Number(machineId) &&
        a.metric_name === metricName &&
        (a.status === 'OPEN' || a.status === 'ACKNOWLEDGED')
    );
    if (existing) {
      return { alert: existing, isNew: false };
    }

    const alert = {
      id: this.alerts.length + 1,
      incident_key: `${incidentKey}_${Date.now()}`,
      machine_id: Number(machineId),
      severity,
      metric_name: metricName,
      message,
      status: 'OPEN',
      n8n_notified: 0,
      external_ticket_id: null,
      triggered_at: new Date().toISOString(),
      resolved_at: null,
    };
    this.alerts.unshift(alert);
    return { alert, isNew: true };
  }

  async markAlertNotified(alertId, externalTicketId) {
    if (this.mode === 'mysql') {
      await this.pool.execute(
        'UPDATE alerts SET n8n_notified = 1, external_ticket_id = ? WHERE id = ?',
        [externalTicketId, alertId]
      );
      return;
    }
    const alert = this.alerts.find((a) => a.id === Number(alertId));
    if (alert) {
      alert.n8n_notified = 1;
      alert.external_ticket_id = externalTicketId;
    }
  }

  async resolveMachineAlertsIfHealthy(machineId) {
    const nowIso = new Date().toISOString();
    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE alerts SET status = 'RESOLVED', resolved_at = NOW() WHERE machine_id = ? AND status IN ('OPEN', 'ACKNOWLEDGED')`,
        [machineId]
      );
      return;
    }
    for (const a of this.alerts) {
      if (a.machine_id === Number(machineId) && a.status !== 'RESOLVED') {
        a.status = 'RESOLVED';
        a.resolved_at = nowIso;
      }
    }
  }

  async getMachineDiagnostics(machineId) {
    const machine = await this.findMachineById(machineId);
    if (!machine) return null;
    const { agent_token_hash, ...safeMachine } = machine;

    if (this.mode === 'mysql') {
      const [telemetry] = await this.pool.execute(
        'SELECT * FROM telemetry_history WHERE machine_id = ? ORDER BY recorded_at DESC LIMIT 25',
        [machine.id]
      );
      const [alerts] = await this.pool.execute(
        'SELECT * FROM alerts WHERE machine_id = ? ORDER BY triggered_at DESC LIMIT 20',
        [machine.id]
      );
      const [tasks] = await this.pool.execute(
        'SELECT * FROM remote_tasks WHERE machine_id = ? ORDER BY issued_at DESC LIMIT 20',
        [machine.id]
      );
      return { machine: safeMachine, telemetry, alerts, tasks };
    }

    const telemetry = this.telemetryHistory
      .filter((t) => t.machine_id === machine.id)
      .slice(-25)
      .reverse();
    const alerts = this.alerts.filter((a) => a.machine_id === machine.id).slice(0, 20);
    const tasks = this.remoteTasks.filter((t) => t.machine_id === machine.id).slice(0, 20);
    return { machine: safeMachine, telemetry, alerts, tasks };
  }

  async createRemoteTask({
    taskId,
    machineId,
    requestedByUserId,
    taskCode,
    parameters,
    reason,
    status = 'DISPATCHED',
    expiresAt,
  }) {
    const nowIso = new Date().toISOString();
    const record = {
      task_id: taskId,
      machine_id: Number(machineId),
      requested_by_user_id: Number(requestedByUserId),
      task_code: taskCode,
      parameters_json: parameters,
      reason,
      status,
      exit_code: null,
      output_summary: null,
      issued_at: nowIso,
      expires_at: expiresAt,
      completed_at: null,
    };

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `INSERT INTO remote_tasks
          (task_id, machine_id, requested_by_user_id, task_code, parameters_json, reason, status, expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.task_id,
          record.machine_id,
          record.requested_by_user_id,
          record.task_code,
          JSON.stringify(record.parameters_json || {}),
          record.reason,
          record.status,
          new Date(expiresAt),
        ]
      );
      return record;
    }

    this.remoteTasks.unshift(record);
    return record;
  }

  async completeRemoteTask({ taskId, status, exitCode, outputSummary }) {
    const completedAt = new Date().toISOString();
    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE remote_tasks SET status = ?, exit_code = ?, output_summary = ?, completed_at = NOW() WHERE task_id = ?`,
        [status, exitCode, outputSummary, taskId]
      );
      const [rows] = await this.pool.execute(
        'SELECT * FROM remote_tasks WHERE task_id = ? LIMIT 1',
        [taskId]
      );
      return rows[0] || null;
    }

    const task = this.remoteTasks.find((t) => t.task_id === taskId);
    if (!task) return null;
    task.status = status;
    task.exit_code = exitCode;
    task.output_summary = outputSummary;
    task.completed_at = completedAt;
    return task;
  }

  async recordAuditLog({ userId = null, machineId = null, actionType, ipAddress, details = {} }) {
    const entry = {
      id: this.auditLogs.length + 1,
      user_id: userId,
      machine_id: machineId,
      action_type: actionType,
      ip_address: ipAddress || '127.0.0.1',
      details_json: details,
      created_at: new Date().toISOString(),
    };

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `INSERT INTO audit_logs (user_id, machine_id, action_type, ip_address, details_json)
         VALUES (?, ?, ?, ?, ?)`,
        [userId, machineId, actionType, entry.ip_address, JSON.stringify(details)]
      );
      return entry;
    }

    this.auditLogs.unshift(entry);
    return entry;
  }

  async listAlerts(limit = 50) {
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.query(
        `SELECT a.*, m.hostname, m.ip_address, u.name AS unit_name, s.name AS sector_name
         FROM alerts a
         JOIN machines m ON m.id = a.machine_id
         JOIN health_units u ON u.id = m.unit_id
         JOIN sectors s ON s.id = m.sector_id
         ORDER BY a.triggered_at DESC LIMIT ?`,
        [Number(limit)]
      );
      return rows;
    }

    return this.alerts.slice(0, limit).map((a) => {
      const m = this.machines.find((x) => x.id === a.machine_id);
      const u = this.units.find((x) => x.id === m?.unit_id);
      const s = this.sectors.find((x) => x.id === m?.sector_id);
      return {
        ...a,
        hostname: m?.hostname || 'N/A',
        ip_address: m?.ip_address || '0.0.0.0',
        unit_name: u?.name || 'Unidade',
        sector_name: s?.name || 'Setor',
      };
    });
  }

  async listAuditLogs(limit = 50) {
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.query(
        'SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?',
        [Number(limit)]
      );
      return rows;
    }
    return this.auditLogs.slice(0, limit);
  }

  async markStaleMachinesOffline(thresholdSeconds = env.offlineThresholdSeconds) {
    const cutoffMs = Date.now() - thresholdSeconds * 1000;
    const transitioned = [];

    if (this.mode === 'mysql') {
      const [staleRows] = await this.pool.execute(
        `SELECT * FROM machines WHERE health_status != 'OFFLINE' AND TIMESTAMPDIFF(SECOND, last_seen_at, NOW()) > ?`,
        [thresholdSeconds]
      );
      for (const m of staleRows) {
        await this.pool.execute(
          `UPDATE machines SET health_status = 'OFFLINE' WHERE id = ?`,
          [m.id]
        );
        transitioned.push(await this.findMachineById(m.id));
      }
      return transitioned;
    }

    for (const m of this.machines) {
      const lastSeenMs = new Date(m.last_seen_at).getTime();
      if (m.health_status !== 'OFFLINE' && lastSeenMs < cutoffMs) {
        m.health_status = 'OFFLINE';
        m.updated_at = new Date().toISOString();
        transitioned.push(await this.findMachineById(m.id));
      }
    }
    return transitioned;
  }

  async touchAgentPresence(agentUuid, currentAgentVersion = '', idleSeconds = null) {
    const machine = await this.findMachineByAgentUuid(agentUuid);
    if (!machine) return null;
    const nowIso = new Date().toISOString();
    const wasOffline = machine.health_status === 'OFFLINE';
    const nextVersion = String(currentAgentVersion || '').trim();
    const versionChanged = Boolean(nextVersion) && nextVersion !== machine.agent_version;
    const hasIdle = idleSeconds !== null && idleSeconds !== '' && !Number.isNaN(Number(idleSeconds));
    const parsedIdle = hasIdle ? Math.max(0, Math.round(Number(idleSeconds))) : Number(machine.idle_seconds || 0);
    const prevIdle = Number(machine.idle_seconds || 0);
    const lastBroadcastIdle = this.lastBroadcastedIdleByMachine.get(machine.id);
    const idleChangedSignificantly =
      hasIdle &&
      (lastBroadcastIdle === undefined ||
        Math.abs(parsedIdle - lastBroadcastIdle) >= 5 ||
        (parsedIdle < 5 && prevIdle >= 5) ||
        (parsedIdle >= 180 && prevIdle < 180) ||
        (parsedIdle >= 1800 && prevIdle < 1800));

    if (idleChangedSignificantly) {
      this.lastBroadcastedIdleByMachine.set(machine.id, parsedIdle);
    }

    if (this.mode === 'mysql') {
      const nextStatus = wasOffline ? 'NORMAL' : machine.health_status;
      const resolvedVer = versionChanged ? nextVersion : machine.agent_version;
      await this.pool.execute(
        `UPDATE machines SET health_status = ?, agent_version = ?, idle_seconds = ?, last_seen_at = NOW() WHERE id = ?`,
        [nextStatus, resolvedVer, parsedIdle, machine.id]
      );
      return wasOffline || versionChanged || idleChangedSignificantly
        ? this.findMachineById(machine.id)
        : null;
    }

    const memMachine = this.machines.find((m) => m.id === machine.id);
    if (!memMachine) return null;
    memMachine.last_seen_at = nowIso;
    memMachine.updated_at = nowIso;
    if (hasIdle) {
      memMachine.idle_seconds = parsedIdle;
    }
    if (versionChanged) {
      memMachine.agent_version = nextVersion;
    }
    if (wasOffline) {
      memMachine.health_status = 'NORMAL';
    }
    if (wasOffline || versionChanged || idleChangedSignificantly) {
      return this.findMachineById(memMachine.id);
    }
    return null;
  }

  async markMachineOfflineById(machineId) {
    const id = Number(machineId);
    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE machines SET health_status = 'OFFLINE' WHERE id = ?`,
        [id]
      );
      return this.findMachineById(id);
    }
    const m = this.machines.find((x) => x.id === id);
    if (!m) return null;
    m.health_status = 'OFFLINE';
    m.updated_at = new Date().toISOString();
    return this.findMachineById(id);
  }

  async markMachineOfflineByAgentUuid(agentUuid) {
    const machine = await this.findMachineByAgentUuid(agentUuid);
    if (!machine) return null;
    return this.markMachineOfflineById(machine.id);
  }

  async deleteMachineById(machineId) {
    const id = Number(machineId);
    if (this.mode === 'mysql') {
      await this.pool.execute('DELETE FROM machines WHERE id = ?', [id]);
      return true;
    }
    const idx = this.machines.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.machines.splice(idx, 1);
    return true;
  }

  async updateMachineLocation(machineId, { unitId, sectorId }) {
    const id = Number(machineId);
    const nextUnitId = Number(unitId);
    const nextSectorId = Number(sectorId);

    if (this.mode === 'mysql') {
      const [secRows] = await this.pool.execute(
        'SELECT * FROM sectors WHERE id = ? AND unit_id = ? LIMIT 1',
        [nextSectorId, nextUnitId]
      );
      if (secRows.length === 0) return null;
      const sector = secRows[0];
      const [existingInSector] = await this.pool.execute(
        'SELECT COUNT(*) AS cnt FROM machines WHERE sector_id = ? AND id != ?',
        [nextSectorId, id]
      );
      const countInSector = Number(existingInSector[0]?.cnt || 0);
      const posX = Number(sector.bounds_x || 0) + (countInSector % 2 === 0 ? -1.4 : 1.4);
      const posZ = Number(sector.bounds_z || 0) + (countInSector > 1 ? 1.2 : -0.7);

      await this.pool.execute(
        'UPDATE machines SET unit_id = ?, sector_id = ?, pos_x = ?, pos_z = ?, updated_at = NOW() WHERE id = ?',
        [nextUnitId, nextSectorId, posX, posZ, id]
      );
      return this.findMachineById(id);
    }

    const machine = this.machines.find((m) => m.id === id);
    if (!machine) return null;
    const sector = this.sectors.find(
      (s) => s.id === nextSectorId && s.unit_id === nextUnitId
    );
    if (!sector) return null;

    const countInSector = this.machines.filter(
      (m) => m.sector_id === nextSectorId && m.id !== id
    ).length;
    machine.unit_id = nextUnitId;
    machine.sector_id = nextSectorId;
    machine.pos_x = Number(sector.bounds_x || 0) + (countInSector % 2 === 0 ? -1.4 : 1.4);
    machine.pos_z = Number(sector.bounds_z || 0) + (countInSector > 1 ? 1.2 : -0.7);
    machine.updated_at = new Date().toISOString();
    return this.findMachineById(id);
  }

  computeNextFreeSectorSlot(existingSectors = [], width3d = 9.0, depth3d = 5.0) {
    const halfW = Number(width3d || 9.0) / 2;
    const halfD = Number(depth3d || 5.0) / 2;
    const collides = (cx, cz) =>
      existingSectors.some((s) => {
        const sx = Number(s.bounds_x || 0);
        const sz = Number(s.bounds_z || 0);
        const sHalfW = Number(s.width_3d || 9.0) / 2;
        const sHalfD = Number(s.depth_3d || 5.0) / 2;
        return (
          Math.abs(cx - sx) < halfW + sHalfW - 0.15 &&
          Math.abs(cz - sz) < halfD + sHalfD - 0.15
        );
      });

    const candidateCols = [-4.5, 4.5, 13.5, -13.5, 22.5, -22.5, 31.5, -31.5, 40.5, -40.5];
    const zOffset = Math.max(3.5, 1.0 + halfD);
    for (const colX of candidateCols) {
      for (const zSign of [-1, 1]) {
        const candZ = Number((zSign * zOffset).toFixed(2));
        if (!collides(colX, candZ)) {
          return { bounds_x: colX, bounds_z: candZ };
        }
      }
    }

    const maxRightEdge = existingSectors.reduce(
      (maxVal, s) => Math.max(maxVal, Number(s.bounds_x || 0) + Number(s.width_3d || 9.0) / 2),
      4.5
    );
    return {
      bounds_x: Number((maxRightEdge + halfW).toFixed(2)),
      bounds_z: Number((-zOffset).toFixed(2)),
    };
  }

  async findUnitById(unitId) {
    const id = Number(unitId);
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        'SELECT * FROM health_units WHERE id = ? AND is_active = 1 LIMIT 1',
        [id]
      );
      return rows[0] || null;
    }
    return this.units.find((u) => u.id === id) || null;
  }

  async findSectorById(sectorId) {
    const id = Number(sectorId);
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        'SELECT * FROM sectors WHERE id = ? LIMIT 1',
        [id]
      );
      return rows[0] || null;
    }
    return this.sectors.find((s) => s.id === id) || null;
  }

  async listSectorsByUnit(unitId) {
    const uid = Number(unitId);
    if (this.mode === 'mysql') {
      const [rows] = await this.pool.execute(
        'SELECT * FROM sectors WHERE unit_id = ? ORDER BY id ASC',
        [uid]
      );
      return rows;
    }
    return this.sectors.filter((s) => s.unit_id === uid);
  }

  async createUnit({
    name,
    code = '',
    unitType = 'USF',
    address = '',
    createDefaultSectors = true,
  }) {
    const cleanName = String(name || '').trim().slice(0, 120);
    if (!cleanName) {
      throw createDomainError('O nome da unidade de saúde é obrigatório.', 400);
    }

    const cleanType = String(unitType || 'USF').trim().toUpperCase();
    if (!ALLOWED_UNIT_TYPES.has(cleanType)) {
      throw createDomainError(
        `Tipo de unidade inválido (${cleanType}). Use: USF, POLICLINICA, CAPS, UPA, HOSPITAL, CEO ou SEDE.`,
        400
      );
    }

    const cleanAddress = String(address || '').trim().slice(0, 255) || 'Ipojuca - PE';
    const allUnits = await this.listUnitsWithSummary();
    const existingCodes = new Set(allUnits.map((u) => String(u.code || '').toUpperCase()));

    let finalCode;
    const rawExplicitCode = String(code || '').trim();
    if (rawExplicitCode) {
      finalCode = normalizeCode(rawExplicitCode, cleanName, 'UNI');
      if (existingCodes.has(finalCode)) {
        throw createDomainError(`Já existe uma unidade com a sigla '${finalCode}'.`, 409);
      }
    } else {
      const baseCode = normalizeCode('', cleanName, 'UNI').slice(0, 20);
      finalCode = baseCode;
      let suffix = 2;
      while (existingCodes.has(finalCode)) {
        finalCode = `${baseCode.slice(0, 16)}-${suffix}`;
        suffix += 1;
      }
    }

    let createdUnitId;
    if (this.mode === 'mysql') {
      const [result] = await this.pool.execute(
        `INSERT INTO health_units (code, name, unit_type, address, is_active)
         VALUES (?, ?, ?, ?, 1)`,
        [finalCode, cleanName, cleanType, cleanAddress]
      );
      createdUnitId = Number(result.insertId);
    } else {
      createdUnitId =
        this.units.reduce((maxId, u) => Math.max(maxId, Number(u.id || 0)), 0) + 1;
      this.units.push({
        id: createdUnitId,
        code: finalCode,
        name: cleanName,
        unit_type: cleanType,
        address: cleanAddress,
        is_active: 1,
      });
    }

    const defaultTemplates =
      createDefaultSectors !== false
        ? [
            { code: 'REC', name: 'Recepção e Triagem', roomTheme: 'REC', boundsX: -4.5, boundsZ: -3.5 },
            { code: 'CONS-01', name: 'Consultório Médico 01', roomTheme: 'CONS', boundsX: 4.5, boundsZ: -3.5 },
            { code: 'FARM', name: 'Farmácia e Vacinação', roomTheme: 'FARM', boundsX: -4.5, boundsZ: 3.5 },
            { code: 'ADM', name: 'Coordenação / Enfermagem', roomTheme: 'ADM', boundsX: 4.5, boundsZ: 3.5 },
          ]
        : [
            { code: 'REC', name: 'Recepção e Triagem', roomTheme: 'REC', boundsX: -4.5, boundsZ: -3.5 },
          ];

    for (const tpl of defaultTemplates) {
      await this.createSector(createdUnitId, {
        name: tpl.name,
        code: tpl.code,
        roomTheme: tpl.roomTheme,
        boundsX: tpl.boundsX,
        boundsZ: tpl.boundsZ,
        width3d: 9.0,
        depth3d: 5.0,
      });
    }

    const units = await this.listUnitsWithSummary();
    return units.find((u) => u.id === createdUnitId) || null;
  }

  async updateUnit(unitId, { name, code, unitType, address } = {}) {
    const id = Number(unitId);
    const existing = await this.findUnitById(id);
    if (!existing) {
      throw createDomainError('Unidade de saúde não encontrada.', 404);
    }

    const cleanName =
      name !== undefined ? String(name || '').trim().slice(0, 120) : existing.name;
    if (!cleanName) {
      throw createDomainError('O nome da unidade de saúde é obrigatório.', 400);
    }

    const cleanType =
      unitType !== undefined
        ? String(unitType || 'USF').trim().toUpperCase()
        : existing.unit_type;
    if (!ALLOWED_UNIT_TYPES.has(cleanType)) {
      throw createDomainError(`Tipo de unidade inválido (${cleanType}).`, 400);
    }

    const cleanAddress =
      address !== undefined
        ? String(address || '').trim().slice(0, 255) || 'Ipojuca - PE'
        : existing.address;

    let finalCode = existing.code;
    if (code !== undefined && String(code).trim()) {
      finalCode = normalizeCode(code, cleanName, existing.code);
      const allUnits = await this.listUnitsWithSummary();
      if (allUnits.some((u) => u.id !== id && String(u.code).toUpperCase() === finalCode)) {
        throw createDomainError(`Já existe outra unidade com a sigla '${finalCode}'.`, 409);
      }
    }

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE health_units SET code = ?, name = ?, unit_type = ?, address = ? WHERE id = ?`,
        [finalCode, cleanName, cleanType, cleanAddress, id]
      );
    } else {
      existing.code = finalCode;
      existing.name = cleanName;
      existing.unit_type = cleanType;
      existing.address = cleanAddress;
    }

    const units = await this.listUnitsWithSummary();
    return units.find((u) => u.id === id) || null;
  }

  async deleteUnit(unitId, { targetUnitId, targetSectorId } = {}) {
    const id = Number(unitId);
    const existing = await this.findUnitById(id);
    if (!existing) {
      throw createDomainError('Unidade de saúde não encontrada.', 404);
    }

    const allUnits = await this.listUnitsWithSummary();
    const otherUnits = allUnits.filter((u) => u.id !== id);
    if (otherUnits.length === 0) {
      throw createDomainError(
        'Não é possível excluir a única unidade ativa do sistema. Crie outra unidade antes.',
        400
      );
    }

    const unitMachines = await this.listMachines({ unitId: id });
    let destUnit = null;
    let destSector = null;
    const relocatedMachines = [];

    if (unitMachines.length > 0) {
      destUnit = targetUnitId
        ? otherUnits.find((u) => u.id === Number(targetUnitId))
        : otherUnits[0];
      if (!destUnit) {
        throw createDomainError('Unidade de destino inválida para realocação das máquinas.', 400);
      }

      let destSectors = await this.listSectorsByUnit(destUnit.id);
      if (destSectors.length === 0) {
        const fallbackSector = await this.createSector(destUnit.id, {
          name: 'Recepção Geral',
          code: 'REC',
          roomTheme: 'REC',
        });
        destSectors = [fallbackSector];
      }

      destSector = targetSectorId
        ? destSectors.find((s) => s.id === Number(targetSectorId))
        : destSectors[0];
      if (!destSector) {
        destSector = destSectors[0];
      }

      for (const m of unitMachines) {
        const updated = await this.updateMachineLocation(m.id, {
          unitId: destUnit.id,
          sectorId: destSector.id,
        });
        if (updated) relocatedMachines.push(updated);
      }
    }

    if (this.mode === 'mysql') {
      await this.pool.execute('DELETE FROM sectors WHERE unit_id = ?', [id]);
      await this.pool.execute('DELETE FROM health_units WHERE id = ?', [id]);
    } else {
      this.sectors = this.sectors.filter((s) => s.unit_id !== id);
      this.units = this.units.filter((u) => u.id !== id);
    }

    return {
      deletedId: id,
      deletedName: existing.name,
      relocatedMachinesCount: relocatedMachines.length,
      relocatedMachines,
      targetUnitId: destUnit?.id || null,
      targetSectorId: destSector?.id || null,
    };
  }

  async createSector(
    unitId,
    { name, code = '', roomTheme, boundsX, boundsZ, width3d = 9.0, depth3d = 5.0 } = {}
  ) {
    const uid = Number(unitId);
    const unit = await this.findUnitById(uid);
    if (!unit) {
      throw createDomainError('Unidade de saúde não encontrada.', 404);
    }

    const cleanName = String(name || '').trim().slice(0, 100);
    if (!cleanName) {
      throw createDomainError('O nome do setor é obrigatório.', 400);
    }

    const resolvedTheme = normalizeRoomTheme(roomTheme, code, cleanName);
    const existingSectors = await this.listSectorsByUnit(uid);
    const existingCodes = new Set(existingSectors.map((s) => String(s.code || '').toUpperCase()));

    let finalCode;
    const rawExplicitCode = String(code || '').trim();
    if (rawExplicitCode) {
      finalCode = normalizeCode(rawExplicitCode, cleanName, resolvedTheme);
      if (existingCodes.has(finalCode)) {
        throw createDomainError(
          `Já existe um setor com a sigla '${finalCode}' nesta unidade.`,
          409
        );
      }
    } else {
      const baseCode = normalizeCode('', cleanName, resolvedTheme).slice(0, 18);
      finalCode = baseCode;
      let suffix = 2;
      while (existingCodes.has(finalCode)) {
        finalCode = `${baseCode.slice(0, 14)}-${suffix}`;
        suffix += 1;
      }
    }

    const resolvedW = Math.min(24, Math.max(4, Number(width3d || 9.0) || 9.0));
    const resolvedD = Math.min(16, Math.max(3.5, Number(depth3d || 5.0) || 5.0));

    const hasManualX =
      boundsX !== undefined && boundsX !== null && boundsX !== '' && Number.isFinite(Number(boundsX));
    const hasManualZ =
      boundsZ !== undefined && boundsZ !== null && boundsZ !== '' && Number.isFinite(Number(boundsZ));

    const slot =
      hasManualX && hasManualZ
        ? { bounds_x: Number(boundsX), bounds_z: Number(boundsZ) }
        : this.computeNextFreeSectorSlot(existingSectors, resolvedW, resolvedD);

    if (this.mode === 'mysql') {
      const [result] = await this.pool.execute(
        `INSERT INTO sectors (unit_id, code, name, room_theme, bounds_x, bounds_z, width_3d, depth_3d)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [uid, finalCode, cleanName, resolvedTheme, slot.bounds_x, slot.bounds_z, resolvedW, resolvedD]
      );
      return this.findSectorById(result.insertId);
    }

    const nextId =
      this.sectors.reduce((maxId, s) => Math.max(maxId, Number(s.id || 0)), 0) + 1;
    const sector = {
      id: nextId,
      unit_id: uid,
      code: finalCode,
      name: cleanName,
      room_theme: resolvedTheme,
      bounds_x: slot.bounds_x,
      bounds_z: slot.bounds_z,
      width_3d: resolvedW,
      depth_3d: resolvedD,
    };
    this.sectors.push(sector);
    return sector;
  }

  async updateSector(
    sectorId,
    { name, code, roomTheme, boundsX, boundsZ, width3d, depth3d } = {}
  ) {
    const id = Number(sectorId);
    const existing = await this.findSectorById(id);
    if (!existing) {
      throw createDomainError('Setor não encontrado.', 404);
    }

    const cleanName =
      name !== undefined ? String(name || '').trim().slice(0, 100) : existing.name;
    if (!cleanName) {
      throw createDomainError('O nome do setor é obrigatório.', 400);
    }

    const siblings = await this.listSectorsByUnit(existing.unit_id);
    let finalCode = existing.code;
    if (code !== undefined && String(code).trim()) {
      finalCode = normalizeCode(code, cleanName, existing.code);
      if (siblings.some((s) => s.id !== id && String(s.code).toUpperCase() === finalCode)) {
        throw createDomainError(
          `Já existe outro setor com a sigla '${finalCode}' nesta unidade.`,
          409
        );
      }
    }

    const resolvedTheme =
      roomTheme !== undefined
        ? normalizeRoomTheme(roomTheme, finalCode, cleanName)
        : existing.room_theme || normalizeRoomTheme('', finalCode, cleanName);

    const resolvedW =
      width3d !== undefined && width3d !== '' && Number.isFinite(Number(width3d))
        ? Math.min(24, Math.max(4, Number(width3d)))
        : Number(existing.width_3d || 9.0);
    const resolvedD =
      depth3d !== undefined && depth3d !== '' && Number.isFinite(Number(depth3d))
        ? Math.min(16, Math.max(3.5, Number(depth3d)))
        : Number(existing.depth_3d || 5.0);
    const resolvedX =
      boundsX !== undefined && boundsX !== '' && Number.isFinite(Number(boundsX))
        ? Number(boundsX)
        : Number(existing.bounds_x || 0);
    const resolvedZ =
      boundsZ !== undefined && boundsZ !== '' && Number.isFinite(Number(boundsZ))
        ? Number(boundsZ)
        : Number(existing.bounds_z || 0);

    const positionChanged =
      resolvedX !== Number(existing.bounds_x) || resolvedZ !== Number(existing.bounds_z);

    if (this.mode === 'mysql') {
      await this.pool.execute(
        `UPDATE sectors
         SET code = ?, name = ?, room_theme = ?, bounds_x = ?, bounds_z = ?, width_3d = ?, depth_3d = ?
         WHERE id = ?`,
        [finalCode, cleanName, resolvedTheme, resolvedX, resolvedZ, resolvedW, resolvedD, id]
      );
    } else {
      existing.code = finalCode;
      existing.name = cleanName;
      existing.room_theme = resolvedTheme;
      existing.bounds_x = resolvedX;
      existing.bounds_z = resolvedZ;
      existing.width_3d = resolvedW;
      existing.depth_3d = resolvedD;
    }

    if (positionChanged) {
      const machinesInSector = await this.listMachines({ sectorId: id });
      for (const m of machinesInSector) {
        await this.updateMachineLocation(m.id, {
          unitId: existing.unit_id,
          sectorId: id,
        });
      }
    }

    return this.findSectorById(id);
  }

  async deleteSector(sectorId, { targetSectorId } = {}) {
    const id = Number(sectorId);
    const existing = await this.findSectorById(id);
    if (!existing) {
      throw createDomainError('Setor não encontrado.', 404);
    }

    const siblings = (await this.listSectorsByUnit(existing.unit_id)).filter((s) => s.id !== id);
    const sectorMachines = await this.listMachines({ sectorId: id });
    let destSector = null;
    const relocatedMachines = [];

    if (sectorMachines.length > 0) {
      if (targetSectorId) {
        destSector = await this.findSectorById(targetSectorId);
        if (!destSector || destSector.id === id) {
          throw createDomainError('Setor de destino inválido para realocação.', 400);
        }
      } else if (siblings.length > 0) {
        destSector = siblings[0];
      } else {
        throw createDomainError(
          'Este é o único setor da unidade e possui computadores vinculados. Crie outro setor antes de excluí-lo.',
          409
        );
      }

      for (const m of sectorMachines) {
        const updated = await this.updateMachineLocation(m.id, {
          unitId: destSector.unit_id,
          sectorId: destSector.id,
        });
        if (updated) relocatedMachines.push(updated);
      }
    }

    if (this.mode === 'mysql') {
      await this.pool.execute('DELETE FROM sectors WHERE id = ?', [id]);
    } else {
      this.sectors = this.sectors.filter((s) => s.id !== id);
    }

    return {
      deletedId: id,
      unitId: existing.unit_id,
      deletedName: existing.name,
      relocatedMachinesCount: relocatedMachines.length,
      relocatedMachines,
      targetSectorId: destSector?.id || null,
    };
  }
}

const repository = new RmmRepository();
module.exports = repository;
