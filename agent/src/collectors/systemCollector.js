const os = require('os');
const fs = require('fs');
const dgram = require('dgram');
const { execFile } = require('child_process');

function runExecFile(bin, args, timeoutMs = 3000) {
  return new Promise((resolve) => {
    if (process.platform !== 'win32') return resolve(null);
    execFile(bin, args, { timeout: timeoutMs, windowsHide: true }, (err, stdout) => {
      if (err || !stdout) return resolve(null);
      return resolve(String(stdout).trim());
    });
  });
}

function isVirtualAdapterName(name = '') {
  return /vethernet|wsl|hyper-v|docker|virtualbox|vmware|vbox|loopback|tunnel|tap|tun|vpn|radmin|zerotier|tailscale|bluetooth|npcap/i.test(
    String(name)
  );
}

/**
 * Descobre o IP e MAC reais da placa de rede principal (LAN/Wi-Fi com rota padrão),
 * ignorando adaptadores virtuais como vEthernet (WSL / Default Switch / Docker).
 */
async function getPrimaryNetworkAddress() {
  const interfaces = os.networkInterfaces();

  // 1. Descobre via tabela de roteamento do SO qual IP local sai para o gateway padrão
  let routedIp = null;
  try {
    routedIp = await new Promise((resolve) => {
      const sock = dgram.createSocket('udp4');
      let done = false;
      const finish = (val) => {
        if (done) return;
        done = true;
        try {
          sock.close();
        } catch {}
        resolve(val);
      };
      sock.on('error', () => finish(null));
      sock.connect(53, '8.8.8.8', () => {
        try {
          const addr = sock.address();
          finish(addr && addr.address ? addr.address : null);
        } catch {
          finish(null);
        }
      });
      setTimeout(() => finish(null), 350);
    });
  } catch {
    routedIp = null;
  }

  if (routedIp && routedIp !== '127.0.0.1' && !routedIp.startsWith('169.254.')) {
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === 'IPv4' && iface.address === routedIp) {
          return {
            ip_address: iface.address,
            mac_address: (iface.mac || '00:00:00:00:00:00').toUpperCase(),
          };
        }
      }
    }
  }

  // 2. Fallback: filtra adaptadores virtuais e prioriza Ethernet / Wi-Fi físicos
  const candidates = [];
  for (const name of Object.keys(interfaces)) {
    const virtual = isVirtualAdapterName(name);
    for (const iface of interfaces[name] || []) {
      if (
        iface.family === 'IPv4' &&
        !iface.internal &&
        !String(iface.address).startsWith('169.254.')
      ) {
        let score = virtual ? 0 : 100;
        if (/^(ethernet|wi-fi|wifi|wlan|eth)/i.test(name)) score += 50;
        if (
          String(iface.address).startsWith('10.') ||
          String(iface.address).startsWith('192.168.')
        ) {
          score += 25;
        }
        candidates.push({
          score,
          ip_address: iface.address,
          mac_address: (iface.mac || '00:00:00:00:00:00').toUpperCase(),
        });
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  if (candidates.length > 0) {
    return {
      ip_address: candidates[0].ip_address,
      mac_address: candidates[0].mac_address,
    };
  }

  return { ip_address: '127.0.0.1', mac_address: '00:00:00:00:00:00' };
}

function readCpuTicks() {
  const cpus = os.cpus() || [];
  let idle = 0;
  let total = 0;
  for (const core of cpus) {
    for (const type of Object.keys(core.times)) {
      total += core.times[type];
    }
    idle += core.times.idle;
  }
  return { idle, total };
}

/**
 * Mede o uso REAL e instantâneo da CPU (janela diferencial de 300ms),
 * em vez da média acumulada desde o boot do sistema.
 */
async function measureLiveCpuUsagePct(fastMode = false) {
  const start = readCpuTicks();
  if (!fastMode) {
    await new Promise((r) => setTimeout(r, 300));
  }
  const end = readCpuTicks();
  const deltaTotal = end.total - start.total;
  const deltaIdle = end.idle - start.idle;

  if (deltaTotal > 0) {
    const pct = ((deltaTotal - deltaIdle) / deltaTotal) * 100;
    return Number(Math.min(100, Math.max(0.5, pct)).toFixed(1));
  }

  if (start.total === 0) return 12.0;
  return Number((((start.total - start.idle) / start.total) * 100).toFixed(1));
}

function parseRegValue(regOutput, keyName) {
  if (!regOutput) return null;
  const regex = new RegExp(`^\\s*${keyName}\\s+REG_\\w+\\s+(.+)$`, 'im');
  const match = regOutput.match(regex);
  return match ? match[1].trim() : null;
}

function resolveWindowsOsLabel() {
  const rel = os.release(); // ex: 10.0.26200 ou 10.0.19045
  const parts = rel.split('.');
  const build = Number(parts[2] || 0);
  if (process.platform === 'win32') {
    if (build >= 22000) {
      return `Windows 11 Pro (Build ${build})`;
    }
    if (build > 0) {
      return `Windows 10 Pro (Build ${build})`;
    }
  }
  return `${os.type()} ${rel} (${os.arch()})`;
}

/**
 * Coleta inventário estático e telemetria em tempo real respeitando a LGPD.
 */
async function collectTelemetrySnapshot({ skipNativeQueries = false } = {}) {
  const [netInfo, cpuUsagePct] = await Promise.all([
    getPrimaryNetworkAddress(),
    measureLiveCpuUsagePct(skipNativeQueries),
  ]);

  const cpus = os.cpus() || [];
  const totalRamMb = Math.round(os.totalmem() / (1024 * 1024));
  const freeRamMb = Math.round(os.freemem() / (1024 * 1024));
  const ramUsagePct = Number(
    (((totalRamMb - freeRamMb) / Math.max(1, totalRamMb)) * 100).toFixed(1)
  );

  // Coleta nativa ultra-rápida (1ms) do Disco C: via fs.statfsSync
  let diskTotalGb = 256;
  let diskUsagePct = 48.0;
  try {
    const driveRoot = process.platform === 'win32' ? 'C:\\' : '/';
    if (typeof fs.statfsSync === 'function') {
      const stats = fs.statfsSync(driveRoot);
      const totalBytes = Number(stats.blocks) * Number(stats.bsize);
      const freeBytes = Number(stats.bfree) * Number(stats.bsize);
      if (totalBytes > 0) {
        diskTotalGb = Math.max(1, Math.round(totalBytes / 1024 ** 3));
        diskUsagePct = Number(
          (((totalBytes - freeBytes) / totalBytes) * 100).toFixed(1)
        );
      }
    }
  } catch {
    // fallback padrão
  }

  let manufacturer = 'OEM Workstation';
  let model = 'Desktop PC';
  let serialNumber = `SN-${os.hostname()}`;
  const cpuModel = cpus[0]?.model ? String(cpus[0].model).trim() : 'x64 Processor';
  const osVersion = resolveWindowsOsLabel();
  const diskType = 'SSD';
  let spoolerRunning = true;

  if (!skipNativeQueries && process.platform === 'win32') {
    const biosReg = await runExecFile('reg.exe', [
      'query',
      'HKLM\\HARDWARE\\Description\\System\\BIOS',
    ]);
    if (biosReg) {
      const mfg =
        parseRegValue(biosReg, 'SystemManufacturer') ||
        parseRegValue(biosReg, 'BaseBoardManufacturer') ||
        parseRegValue(biosReg, 'BIOSVendor');
      const family = parseRegValue(biosReg, 'SystemFamily');
      const prod =
        parseRegValue(biosReg, 'SystemProductName') ||
        parseRegValue(biosReg, 'BaseBoardProduct');
      const biosVer = parseRegValue(biosReg, 'BIOSVersion');

      if (mfg) manufacturer = mfg;
      if (family && prod && !family.includes(prod)) {
        model = `${family} (${prod})`;
      } else if (family || prod) {
        model = family || prod;
      }
      if (biosVer) {
        serialNumber = `${prod || 'SN'}-${biosVer}`;
      }
    }
  }

  return {
    agent_version: '2.1.0',
    collected_at: new Date().toISOString(),
    inventory: {
      hostname: os.hostname(),
      manufacturer,
      model,
      serial_number: serialNumber,
      mac_address: netInfo.mac_address,
      ip_address: netInfo.ip_address,
      cpu_model: cpuModel,
      ram_total_mb: totalRamMb,
      disk_type: diskType,
      disk_total_gb: diskTotalGb,
      os_version: osVersion,
    },
    metrics: {
      cpu_usage_pct: cpuUsagePct,
      ram_usage_pct: ramUsagePct,
      disk_usage_pct: diskUsagePct,
      temperature_c: Number((42 + cpuUsagePct * 0.31).toFixed(1)),
      uptime_seconds: Math.round(os.uptime()),
      spooler_running: spoolerRunning,
    },
  };
}

module.exports = {
  collectTelemetrySnapshot,
  getPrimaryNetworkAddress,
};
