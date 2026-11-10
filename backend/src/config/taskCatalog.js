const crypto = require('crypto');
const env = require('./env');

/**
 * Catálogo fechado de tarefas remotas homologadas (@security & @engineer).
 * Bloqueia execução arbitrária de PowerShell ou comandos livres.
 */
const TASK_CATALOG = Object.freeze({
  SYNC_TELEMETRY_NOW: {
    code: 'SYNC_TELEMETRY_NOW',
    title: 'Coletar Telemetria Agora',
    description: 'Solicita coleta imediata de CPU, RAM, Disco, Temperatura e Spooler sob demanda.',
    riskLevel: 'LOW',
    allowedRoles: ['VIEWER', 'TECH_N1', 'ADMIN_N2'],
    validateParams() {
      return { valid: true, sanitized: {} };
    },
  },
  CLEAR_TEMP_CACHE: {
    code: 'CLEAR_TEMP_CACHE',
    title: 'Limpar Cache Temporário',
    description: 'Remove arquivos temporários obsoletos sem afetar documentos de usuários.',
    riskLevel: 'LOW',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams(params = {}) {
      if (
        params.include_system_temp !== undefined &&
        typeof params.include_system_temp !== 'boolean'
      ) {
        return { valid: false, error: 'Parâmetro include_system_temp deve ser booleano.' };
      }
      return {
        valid: true,
        sanitized: { include_system_temp: Boolean(params.include_system_temp) },
      };
    },
  },
  RESTART_SPOOLER: {
    code: 'RESTART_SPOOLER',
    title: 'Reiniciar Spooler de Impressão',
    description: 'Reinicia o serviço Spooler do Windows e limpa fila de impressão travada.',
    riskLevel: 'LOW',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams() {
      return { valid: true, sanitized: {} };
    },
  },
  COLLECT_NETWORK_DIAG: {
    code: 'COLLECT_NETWORK_DIAG',
    title: 'Diagnóstico de Rede Local',
    description: 'Coleta configuração de IP, Gateway, DNS e latência local da unidade.',
    riskLevel: 'LOW',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams() {
      return { valid: true, sanitized: {} };
    },
  },
  FLUSH_DNS_WINSOCK: {
    code: 'FLUSH_DNS_WINSOCK',
    title: 'Limpar Cache DNS',
    description: 'Executa flush do cache de resolução DNS no equipamento.',
    riskLevel: 'MEDIUM',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams() {
      return { valid: true, sanitized: {} };
    },
  },
  CHECK_DISK_HEALTH: {
    code: 'CHECK_DISK_HEALTH',
    title: 'Verificar Saúde de Disco (SMART/Volume)',
    description: 'Consulta indicadores de integridade física e lógica do volume do sistema.',
    riskLevel: 'MEDIUM',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams(params = {}) {
      const drive = params.drive || 'C';
      if (!/^[C-Z]$/.test(String(drive))) {
        return { valid: false, error: 'Letra de unidade inválida (permitido C-Z).' };
      }
      return { valid: true, sanitized: { drive: String(drive) } };
    },
  },
  INSTALL_APPROVED_PRINTER: {
    code: 'INSTALL_APPROVED_PRINTER',
    title: 'Instalar Impressora Homologada',
    description: 'Mapeia impressora de rede autorizada na sub-rede da unidade de saúde.',
    riskLevel: 'HIGH',
    allowedRoles: ['ADMIN_N2'],
    validateParams(params = {}) {
      const printerIp = String(params.printer_ip || '');
      const printerName = String(params.printer_name || '');
      const ipv4Regex =
        /^(10\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}$/;
      if (!ipv4Regex.test(printerIp)) {
        return {
          valid: false,
          error: 'printer_ip deve ser um endereço IPv4 privado válido da rede institucional.',
        };
      }
      if (!/^[a-zA-Z0-9_-]{3,32}$/.test(printerName)) {
        return {
          valid: false,
          error: 'printer_name deve conter apenas caracteres alfanuméricos, hífen ou underscore (3-32 chars).',
        };
      }
      return {
        valid: true,
        sanitized: { printer_ip: printerIp, printer_name: printerName },
      };
    },
  },
  UPDATE_AGENT: {
    code: 'UPDATE_AGENT',
    title: 'Atualizar Agente Windows (OTA)',
    description: 'Envia ordem de atualização remota para o computador baixar e instalar a versão mais recente do Agente mostrando aviso na tela.',
    riskLevel: 'MEDIUM',
    allowedRoles: ['TECH_N1', 'ADMIN_N2'],
    validateParams() {
      return { valid: true, sanitized: {} };
    },
  },
});

function signTaskPayload({ task_id, machine_id, task_code, expires_at }) {
  const canonical = `${task_id}:${machine_id}:${task_code}:${expires_at}`;
  return crypto
    .createHmac('sha256', env.taskSigningSecret)
    .update(canonical)
    .digest('hex');
}

function verifyTaskSignature({ task_id, machine_id, task_code, expires_at, signature }) {
  const expected = signTaskPayload({ task_id, machine_id, task_code, expires_at });
  if (!signature || signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

module.exports = {
  TASK_CATALOG,
  signTaskPayload,
  verifyTaskSignature,
};
