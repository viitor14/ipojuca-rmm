const crypto = require('crypto');

const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
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
  dbMode: process.env.DB_MODE || 'auto', // 'mysql' | 'memory' | 'auto'
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ipojuca_rmm',
  },
  // Limiar de presenca OFFLINE em tempo real (45s sem sinal leve de presenca/socket -> OFFLINE)
  // A coleta pesada de WMI/Telemetria permanece a cada 4h + no boot + botao manual.
  offlineThresholdSeconds: Number(process.env.OFFLINE_THRESHOLD_SECONDS || 45),
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || '',
  dashboardPublicUrl: process.env.DASHBOARD_PUBLIC_URL || 'http://localhost:5173',
};

module.exports = env;

