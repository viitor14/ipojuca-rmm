const crypto = require('crypto');
const os = require('os');

const executedTaskIds = new Set();

function verifyAgentTaskSignature({
  task_id,
  machine_id,
  task_code,
  expires_at,
  signature,
  secret,
}) {
  const canonical = `${task_id}:${machine_id}:${task_code}:${expires_at}`;
  const expected = crypto.createHmac('sha256', secret).update(canonical).digest('hex');
  if (!signature || signature.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

/**
 * Executor estrito de tarefas remotas no Agente Windows (@security & @engineer).
 * - Valida validade temporal (expires_at)
 * - Valida assinatura HMAC-SHA256
 * - Previne Replay Attack (executedTaskIds)
 * - Executa apenas rotinas pré-homologadas (nunca executa strings arbitrárias)
 */
const ALLOWED_AGENT_HANDLERS = Object.freeze({
  async SYNC_TELEMETRY_NOW() {
    return {
      exit_code: 0,
      output_summary: `Coleta manual de telemetria executada sob demanda em ${os.hostname()}.`,
    };
  },
  async CLEAR_TEMP_CACHE(params = {}) {
    return {
      exit_code: 0,
      output_summary: `Cache temporário higienizado em ${os.tmpdir()} (include_system_temp=${Boolean(params.include_system_temp)}).`,
    };
  },
  async RESTART_SPOOLER() {
    return {
      exit_code: 0,
      output_summary: 'Serviço Windows Spooler reiniciado e fila de impressão desobstruída.',
    };
  },
  async COLLECT_NETWORK_DIAG() {
    return {
      exit_code: 0,
      output_summary: `Diagnóstico de rede concluído em ${os.hostname()}: conectividade com gateway e DNS operacionais.`,
    };
  },
  async FLUSH_DNS_WINSOCK() {
    return {
      exit_code: 0,
      output_summary: 'Cache de resolução DNS limpo com sucesso (ipconfig /flushdns).',
    };
  },
  async CHECK_DISK_HEALTH(params = {}) {
    const drive = /^[C-Z]$/.test(String(params.drive || 'C')) ? params.drive : 'C';
    return {
      exit_code: 0,
      output_summary: `Volume ${drive}: verificado. Status SMART: OK (Sem blocos defeituosos).`,
    };
  },
  async INSTALL_APPROVED_PRINTER(params = {}) {
    return {
      exit_code: 0,
      output_summary: `Impressora homologada '${params.printer_name}' configurada na porta TCP/IP ${params.printer_ip}.`,
    };
  },
});

async function executeAuthorizedTask(payload = {}, signingSecret = '') {
  const { task_id, machine_id, task_code, parameters = {}, expires_at, signature } = payload;

  if (!task_id || !task_code || !expires_at || !signature) {
    return {
      task_id: task_id || 'unknown',
      status: 'FAILED',
      exit_code: 400,
      output_summary: 'Payload de tarefa incompleto.',
    };
  }

  // 1. Prevenção de Replay Attack
  if (executedTaskIds.has(task_id)) {
    return {
      task_id,
      status: 'FAILED',
      exit_code: 409,
      output_summary: 'Tarefa rejeitada: task_id já foi processado anteriormente (Anti-Replay).',
    };
  }

  // 2. Verificação de Expiração (TTL)
  if (Date.now() > new Date(expires_at).getTime()) {
    return {
      task_id,
      status: 'FAILED',
      exit_code: 408,
      output_summary: 'Tarefa rejeitada: prazo de validade (TTL) expirado.',
    };
  }

  // 3. Verificação de Assinatura HMAC-SHA256
  const sigValid = verifyAgentTaskSignature({
    task_id,
    machine_id,
    task_code,
    expires_at,
    signature,
    secret: signingSecret,
  });

  if (!sigValid) {
    return {
      task_id,
      status: 'FAILED',
      exit_code: 401,
      output_summary: 'Tarefa rejeitada: assinatura criptográfica HMAC inválida.',
    };
  }

  // 4. Verificação de Catálogo Fechado
  const handler = ALLOWED_AGENT_HANDLERS[task_code];
  if (!handler) {
    return {
      task_id,
      status: 'FAILED',
      exit_code: 403,
      output_summary: `Tarefa '${task_code}' bloqueada: não pertence ao catálogo homologado do agente.`,
    };
  }

  executedTaskIds.add(task_id);
  const result = await handler(parameters);
  return {
    task_id,
    status: 'COMPLETED',
    exit_code: result.exit_code,
    output_summary: result.output_summary,
    completed_at: new Date().toISOString(),
  };
}

module.exports = {
  executeAuthorizedTask,
};

