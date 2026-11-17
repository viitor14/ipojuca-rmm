const crypto = require('crypto');

const GENERIC_SERIALS = new Set([
  'TO BE FILLED BY O.E.M.',
  'TO BE FILLED BY OEM',
  'DEFAULT STRING',
  'SYSTEM SERIAL NUMBER',
  'SYSTEM SERIAL',
  'SERIAL NUMBER',
  'NONE',
  'N/A',
  'NA',
  'NULL',
  'UNKNOWN',
  'NOT SPECIFIED',
  'NOT APPLICABLE',
  'O.E.M.',
  'OEM',
  '123456789',
  '1234567890',
  '0123456789',
]);

function normalizeSerial(raw) {
  if (raw === null || raw === undefined) return null;
  const value = String(raw).trim();
  if (value.length < 3 || value.length > 100) return null;
  const upper = value.toUpperCase();
  if (GENERIC_SERIALS.has(upper)) return null;
  if (/^[0\s\-.]+$/.test(upper) || /^F+$/.test(upper)) return null;
  if (/^SN-/i.test(value)) return null;
  return value;
}

function normalizeMac(raw) {
  if (raw === null || raw === undefined) return null;
  const hex = String(raw).replace(/[^0-9a-fA-F]/g, '').toUpperCase();
  if (hex.length !== 12) return null;
  if (/^0+$/.test(hex) || /^F+$/.test(hex)) return null;
  return hex.match(/.{2}/g).join(':');
}

function normalizeSmbiosUuid(raw) {
  if (raw === null || raw === undefined) return null;
  const value = String(raw).trim().toUpperCase();
  if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/.test(value)) {
    return null;
  }
  if (/^[0-]+$/.test(value) || /^[F-]+$/.test(value)) return null;
  return value;
}

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * Calcula a identidade de hardware no backend (nao confia em chave enviada pelo agente).
 * HIGH = serial valido | MEDIUM = apenas MAC valido | LOW = nenhum identificador confiavel.
 */
function computeHardwareIdentity(inventory = {}) {
  const serial = normalizeSerial(inventory.serial_number);
  const mac = normalizeMac(inventory.mac_address);
  const smbiosUuid = normalizeSmbiosUuid(inventory.smbios_uuid);

  let hardwareKey = null;
  let confidence = 'LOW';
  if (serial) {
    hardwareKey = sha256(`SN:${serial.toUpperCase()}`);
    confidence = 'HIGH';
  } else if (mac) {
    hardwareKey = sha256(`MAC:${mac}`);
    confidence = 'MEDIUM';
  }

  return {
    serial_number: serial,
    mac_address: mac,
    smbios_uuid: smbiosUuid,
    hardware_key: hardwareKey,
    identity_confidence: confidence,
  };
}

const TRACKED_FIELDS = [
  'hostname',
  'cpu_model',
  'ram_total_mb',
  'disk_total_gb',
  'disk_type',
  'mac_address',
];

function diffInventory(before = {}, after = {}) {
  const changes = [];
  for (const field of TRACKED_FIELDS) {
    const oldValue = before[field] === undefined || before[field] === null ? null : String(before[field]);
    const newValue = after[field] === undefined || after[field] === null ? null : String(after[field]);
    if (oldValue !== null && newValue !== null && oldValue !== newValue) {
      changes.push({ field_name: field, old_value: oldValue.slice(0, 255), new_value: newValue.slice(0, 255) });
    }
  }
  return changes;
}

module.exports = {
  normalizeSerial,
  normalizeMac,
  normalizeSmbiosUuid,
  computeHardwareIdentity,
  diffInventory,
  TRACKED_FIELDS,
};
