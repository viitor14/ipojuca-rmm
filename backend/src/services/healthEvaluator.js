/**
 * Avaliador determinístico de saúde da máquina (@engineer & @pm).
 * Classifica o computador em NORMAL, WARNING ou CRITICAL e detalha os motivos.
 */
function evaluateMachineHealth(metrics = {}) {
  const cpu = Number(metrics.cpu_usage_pct || 0);
  const ram = Number(metrics.ram_usage_pct || 0);
  const disk = Number(metrics.disk_usage_pct || 0);
  const temp = Number(metrics.temperature_c || 45);
  const spoolerRunning =
    metrics.spooler_running === undefined ? true : Boolean(metrics.spooler_running);

  const reasons = [];
  let status = 'NORMAL';
  let primaryMetric = 'HEALTH';

  // Verificações CRITICAL
  if (disk >= 95) {
    status = 'CRITICAL';
    primaryMetric = 'DISK';
    reasons.push(`Uso de disco crítico em ${disk.toFixed(1)}% (limite: 95%)`);
  }
  if (cpu >= 95) {
    status = 'CRITICAL';
    if (primaryMetric === 'HEALTH') primaryMetric = 'CPU';
    reasons.push(`Uso de CPU crítico em ${cpu.toFixed(1)}% (limite: 95%)`);
  }
  if (ram >= 95) {
    status = 'CRITICAL';
    if (primaryMetric === 'HEALTH') primaryMetric = 'RAM';
    reasons.push(`Uso de memória RAM crítico em ${ram.toFixed(1)}% (limite: 95%)`);
  }
  if (temp >= 85) {
    status = 'CRITICAL';
    if (primaryMetric === 'HEALTH') primaryMetric = 'TEMPERATURE';
    reasons.push(`Temperatura elevada da CPU em ${temp.toFixed(1)}°C (limite: 85°C)`);
  }

  // Verificações WARNING (caso não seja CRITICAL)
  if (status !== 'CRITICAL') {
    if (disk >= 85) {
      status = 'WARNING';
      primaryMetric = 'DISK';
      reasons.push(`Disco em nível de atenção: ${disk.toFixed(1)}%`);
    }
    if (cpu >= 80) {
      status = 'WARNING';
      if (primaryMetric === 'HEALTH') primaryMetric = 'CPU';
      reasons.push(`CPU em nível de atenção: ${cpu.toFixed(1)}%`);
    }
    if (ram >= 85) {
      status = 'WARNING';
      if (primaryMetric === 'HEALTH') primaryMetric = 'RAM';
      reasons.push(`RAM em nível de atenção: ${ram.toFixed(1)}%`);
    }
    if (!spoolerRunning) {
      status = 'WARNING';
      if (primaryMetric === 'HEALTH') primaryMetric = 'SPOOLER';
      reasons.push('Serviço de Spooler de Impressão parado');
    }
  }

  return {
    health_status: status,
    primary_metric: primaryMetric,
    reason: reasons.length > 0 ? reasons.join(' | ') : 'Parâmetros operacionais normais',
    reasons,
  };
}

module.exports = {
  evaluateMachineHealth,
};

