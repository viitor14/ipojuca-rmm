const crypto = require('crypto');
const env = require('../config/env');

/**
 * Serviço de integração com n8n (Inovação B - @n8n & @engineer).
 * Envia webhooks assinados com HMAC-SHA256 e chave de idempotência para evitar
 * chamados e mensagens de WhatsApp duplicadas.
 */
async function triggerN8nIncidentWebhook({ alert, machine, unit, sector }) {
  const payload = {
    incident_id: alert.incident_key,
    event_type: alert.severity === 'OFFLINE' ? 'MACHINE_OFFLINE' : 'MACHINE_CRITICAL',
    occurred_at: new Date().toISOString(),
    unit: {
      id: unit?.id || machine.unit_id,
      code: unit?.code || 'UNIDADE',
      name: unit?.name || 'Unidade de Saúde',
      type: unit?.unit_type || 'USF',
    },
    sector: {
      id: sector?.id || machine.sector_id,
      name: sector?.name || 'Setor Geral',
    },
    machine: {
      id: machine.id,
      agent_uuid: machine.agent_uuid,
      hostname: machine.hostname,
      ip_address: machine.ip_address,
      health_status: machine.health_status,
    },
    metric_name: alert.metric_name,
    reason: alert.message,
    metrics: {
      cpu_usage_pct: Number(machine.cpu_usage_pct),
      ram_usage_pct: Number(machine.ram_usage_pct),
      disk_usage_pct: Number(machine.disk_usage_pct),
      temperature_c: Number(machine.temperature_c),
    },
    dashboard_url: `${env.dashboardPublicUrl}/?machineId=${machine.id}`,
  };

  const rawBody = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', env.n8nWebhookSecret)
    .update(rawBody)
    .digest('hex');

  if (!env.n8nWebhookUrl) {
    return {
      delivered: true,
      simulated: true,
      external_ticket_id: `TCK-SIM-${alert.id}`,
      signature,
      payload,
    };
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(env.n8nWebhookUrl, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'X-RMM-Signature': `sha256=${signature}`,
        'X-Idempotency-Key': alert.incident_key,
      },
      body: rawBody,
    });
    clearTimeout(timer);
    const data = await response.json().catch(() => ({}));
    return {
      delivered: response.ok,
      simulated: false,
      external_ticket_id:
        data?.ticket_id || `TCK-N8N-${Date.now().toString().slice(-5)}`,
      signature,
      payload,
    };
  } catch (err) {
    return {
      delivered: false,
      simulated: false,
      error: err.message,
      external_ticket_id: `TCK-QUEUE-${alert.id}`,
      signature,
      payload,
    };
  }
}

module.exports = {
  triggerN8nIncidentWebhook,
};
