const crypto = require('crypto');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

function parseCorsOrigin(rawOrigin) {
  if (!rawOrigin || rawOrigin.trim() === '*') return '*';
  const list = rawOrigin
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length <= 1 ? list[0] || '*' : list;
}

const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv,
  trustProxy:
    process.env.TRUST_PROXY === '1' ||
    process.env.TRUST_PROXY === 'true' ||
    isProd,
  corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN || (isProd ? '' : '*')),
  jwtSecret:
    process.env.JWT_SECRET ||
    crypto.createHash('sha256').update('ipojuca-rmm-dev-jwt-key').digest('hex'),
  taskSigningSecret:
    process.env.TASK_SIGNING_SECRET ||
    crypto.createHash('sha256').update('ipojuca-rmm-dev-task-key').digest('hex'),
  n8nWebhookSecret:
    process.env.N8N_WEBHOOK_SECRET ||
    crypto.createHash('sha256').update('ipojuca-rmm-dev-n8n-key').digest('hex'),
  agentEnrollmentKey:
    process.env.AGENT_ENROLLMENT_KEY || 'rmm-ipojuca-enroll-2026',
  seedPasswords: {
    admin: process.env.SEED_ADMIN_PASSWORD || (isProd ? '' : 'Admin@Rmm2026'),
    tech: process.env.SEED_TECH_PASSWORD || (isProd ? '' : 'Suporte@Rmm2026'),
    viewer: process.env.SEED_VIEWER_PASSWORD || (isProd ? '' : 'Gestao@Rmm2026'),
  },
  dbMode: process.env.DB_MODE || 'auto', // 'mysql' | 'memory' | 'auto'
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ipojuca_rmm',
  },
  // Janela de ciclo de 4h (15000s) para manter maquinas ativas ONLINE entre os envios de 4h,
  // enquanto desconexoes explicitas (/api/agent/disconnect ou WebSocket) marcam OFFLINE na hora.
  offlineThresholdSeconds: Number(process.env.OFFLINE_THRESHOLD_SECONDS || 15000),
  // Alerta automatico de inatividade prolongada (padrao: 24h = 86400s)
  inactivityAlertSeconds: Number(process.env.INACTIVITY_ALERT_SECONDS || 86400),
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || '',
  dashboardPublicUrl: process.env.DASHBOARD_PUBLIC_URL || 'http://localhost:5173',
};

function isWeakPlaceholder(value) {
  const str = String(value || '').trim();
  if (!str) return true;
  return /change[-_]in[-_]prod|change[-_]me|ipojuca-rmm-dev/i.test(str);
}

/**
 * Validacao fail-fast para ambiente de producao (@security).
 * Bloqueia boot com segredos fracos/placeholder ou CORS aberto (*).
 */
function validateProductionConfig() {
  if (env.nodeEnv !== 'production' || process.env.ALLOW_INSECURE_DEFAULTS === '1') {
    return;
  }

  const issues = [];
  if (isWeakPlaceholder(process.env.JWT_SECRET) || String(process.env.JWT_SECRET || '').length < 24) {
    issues.push('JWT_SECRET ausente, fraco ou placeholder (minimo 24 caracteres).');
  }
  if (
    isWeakPlaceholder(process.env.TASK_SIGNING_SECRET) ||
    String(process.env.TASK_SIGNING_SECRET || '').length < 24
  ) {
    issues.push('TASK_SIGNING_SECRET ausente, fraco ou placeholder (minimo 24 caracteres).');
  }
  if (
    isWeakPlaceholder(process.env.N8N_WEBHOOK_SECRET) ||
    String(process.env.N8N_WEBHOOK_SECRET || '').length < 16
  ) {
    issues.push('N8N_WEBHOOK_SECRET ausente, fraco ou placeholder (minimo 16 caracteres).');
  }
  if (
    !process.env.AGENT_ENROLLMENT_KEY ||
    String(process.env.AGENT_ENROLLMENT_KEY).trim().length < 12
  ) {
    issues.push('AGENT_ENROLLMENT_KEY ausente ou muito curta (minimo 12 caracteres).');
  }
  if (!process.env.CORS_ORIGIN || env.corsOrigin === '*') {
    issues.push('CORS_ORIGIN deve ser explicitamente configurado em producao (nao usar "*").');
  }

  if (issues.length > 0) {
    throw new Error(`[RMM-Security] Boot bloqueado em producao:\n - ${issues.join('\n - ')}`);
  }
}

env.validateProductionConfig = validateProductionConfig;

module.exports = env;
