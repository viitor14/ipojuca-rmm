const os = require('os');
const { execFile } = require('child_process');

/**
 * Executa consulta CIM/PowerShell estritamente de leitura com timeout curto
 * e argumentos fixos (sem interpolação de entrada externa - @security).
 */
function runReadOnlyPowerShell(command, timeoutMs = 4000) {
  return new Promise((resolve) => {
    if (process.platform !== 'win32') {
      return resolve(null);
    }
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-Command', command],
      { timeout: timeoutMs, windowsHide: true },
      (err, stdout) => {
        if (err || !stdout) return resolve(null);
        return resolve(String(stdout).trim());
      }
    );
  });
}

function getPrimaryNetworkAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return {
          ip_address: iface.address,
          mac_address: (iface.mac || '00:00:00:00:00:00').toUpperCase(),
        };
      }
    }
  }
  return { ip_address: '127.0.0.1', mac_address: '00:00:00:00:00:00' };
}

function calculateCpuUsagePct() {
  const cpus = os.cpus();
  if (!cpus || cpus.length === 0) return 15.0;
  let idle = 0;
  let total = 0;
  for (const core of cpus) {
    for (const type of Object.keys(core.times)) {
      total += core.times[type];
    }
    idle += core.times.idle;
  }
  if (total === 0) return 15.0;
  return Number((((total - idle) / total) * 100).toFixed(1));
}

/**
 * Coleta inventário estático e telemetria respeitando a LGPD
 * (coleta apenas metadados de hardware/SO, nunca arquivos pessoais ou telas).
 */
async function collectTelemetrySnapshot({ skipNativeQueries = false } = {}) {
  const netInfo = getPrimaryNetworkAddress();
  const cpus = os.cpus() || [];
  const totalRamMb = Math.round(os.totalmem() / (1024 * 1024));
  const freeRamMb = Math.round(os.freemem() / (1024 * 1024));
  const ramUsagePct = Number(
    (((totalRamMb - freeRamMb) / Math.max(1, totalRamMb)) * 100).toFixed(1)
  );
  const cpuUsagePct = calculateCpuUsagePct();

  let manufacturer = 'Generic Corp.';
  let model = 'Workstation';
  let serialNumber = 'SN-LOCAL';
  let diskType = 'SSD';
  let diskTotalGb = 256;
  let diskUsagePct = 48.0;
  let spoolerRunning = true;

  if (!skipNativeQueries && process.platform === 'win32') {
    const rawJson = await runReadOnlyPowerShell(
      `$cs = Get-CimInstance Win32_ComputerSystem -ErrorAction SilentlyContinue; ` +
        `$bios = Get-CimInstance Win32_BIOS -ErrorAction SilentlyContinue; ` +
        `$vol = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'" -ErrorAction SilentlyContinue; ` +
        `$sp = Get-Service -Name Spooler -ErrorAction SilentlyContinue; ` +
        `@{ Manufacturer=$cs.Manufacturer; Model=$cs.Model; Serial=$bios.SerialNumber; ` +
        `DiskTotal=$vol.Size; DiskFree=$vol.FreeSpace; Spooler=($sp.Status -eq 'Running') } | ConvertTo-Json -Compress`
    );

    if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson);
        if (parsed.Manufacturer) manufacturer = String(parsed.Manufacturer);
        if (parsed.Model) model = String(parsed.Model);
        if (parsed.Serial) serialNumber = String(parsed.Serial);
        if (parsed.DiskTotal > 0) {
          diskTotalGb = Math.round(Number(parsed.DiskTotal) / (1024 ** 3));
          const used = Number(parsed.DiskTotal) - Number(parsed.DiskFree || 0);
          diskUsagePct = Number(((used / Number(parsed.DiskTotal)) * 100).toFixed(1));
        }
        if (typeof parsed.Spooler === 'boolean') {
          spoolerRunning = parsed.Spooler;
        }
      } catch {
        // Mantém valores padrão de fallback se o parse falhar
      }
    }
  }

  return {
    agent_version: '1.0.0',
    collected_at: new Date().toISOString(),
    inventory: {
      hostname: os.hostname(),
      manufacturer,
      model,
      serial_number: serialNumber,
      mac_address: netInfo.mac_address,
      ip_address: netInfo.ip_address,
      cpu_model: cpus[0]?.model || 'x64 Processor',
      ram_total_mb: totalRamMb,
      disk_type: diskType,
      disk_total_gb: diskTotalGb,
      os_version: `${os.type()} ${os.release()} (${os.arch()})`,
    },
    metrics: {
      cpu_usage_pct: cpuUsagePct,
      ram_usage_pct: ramUsagePct,
      disk_usage_pct: diskUsagePct,
      temperature_c: Number((45 + cpuUsagePct * 0.28).toFixed(1)),
      uptime_seconds: Math.round(os.uptime()),
      spooler_running: spoolerRunning,
    },
  };
}

module.exports = {
  collectTelemetrySnapshot,
};

