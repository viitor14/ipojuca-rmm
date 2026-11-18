const net = require('net');
const dns = require('dns');
const { execFile } = require('child_process');

const DISCOVERY_TTL_MS = 6 * 60 * 60 * 1000;
const PROBE_TIMEOUT_MS = 400;
const PROBE_CONCURRENCY = 64;
const PRINTER_PORTS = [9100, 631, 515];
const MAX_PRINTERS = 40;

let cache = { data: null, at: 0 };
let inflight = null;

const POWERSHELL_INSTALLED_PRINTERS = `
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
$list = @(Get-CimInstance Win32_Printer | ForEach-Object {
  [pscustomobject]@{
    name = $_.Name
    port = $_.PortName
    driver = $_.DriverName
    shared = [bool]$_.Shared
    network = [bool]$_.Network
  }
})
$list | ConvertTo-Json -Compress
`;

function cleanText(value, max = 120) {
  if (value === null || value === undefined) return null;
  const text = String(value).replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, max) : null;
}

function isPrivateIpv4(ip) {
  return /^(10\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}$/.test(ip);
}

function extractIpv4(value) {
  if (!value) return null;
  const match = String(value).match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
  if (!match) return null;
  return isPrivateIpv4(match[1]) ? match[1] : null;
}

function probePort(ip, port, timeoutMs = PROBE_TIMEOUT_MS) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;
    const finish = (ok) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(timeoutMs);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
    socket.connect(port, ip);
  });
}

async function probePrinter(ip) {
  for (const port of PRINTER_PORTS) {
    if (await probePort(ip, port)) return port;
  }
  return null;
}

function reverseHostname(ip) {
  return new Promise((resolve) => {
    dns.reverse(ip, (err, names) => resolve(!err && names && names.length ? names[0] : null));
  });
}

/**
 * Varre a sub-rede /24 do IP local procurando portas de impressao.
 * Somente leitura (TCP connect), sem enviar dados.
 */
async function scanSubnet(localIp, { concurrency = PROBE_CONCURRENCY } = {}) {
  const prefix = localIp.split('.').slice(0, 3).join('.');
  const targets = [];
  for (let i = 1; i <= 254; i += 1) {
    const ip = `${prefix}.${i}`;
    if (ip !== localIp) targets.push(ip);
  }

  const found = [];
  let cursor = 0;
  async function worker() {
    while (cursor < targets.length && found.length < MAX_PRINTERS) {
      const ip = targets[cursor];
      cursor += 1;
      const port = await probePrinter(ip);
      if (port) found.push({ ip_address: ip, port });
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  return found;
}

function runPowerShell(script, timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    const encoded = Buffer.from(script, 'utf16le').toString('base64');
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-EncodedCommand', encoded],
      { timeout: timeoutMs, windowsHide: true, maxBuffer: 1024 * 1024 },
      (err, stdout) => {
        if (err) return reject(err);
        resolve(String(stdout || '').trim());
      }
    );
  });
}

function parseInstalledPrinters(rawJson) {
  if (!rawJson) return [];
  let parsed;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return [];
  }
  const list = Array.isArray(parsed) ? parsed : [parsed];
  return list
    .map((item) => ({
      name: cleanText(item?.name, 64),
      port: cleanText(item?.port, 120),
      driver: cleanText(item?.driver, 80),
      network: Boolean(item?.network),
    }))
    .filter((item) => item.name);
}

async function listInstalledPrinters() {
  if (process.platform !== 'win32') return [];
  try {
    return parseInstalledPrinters(await runPowerShell(POWERSHELL_INSTALLED_PRINTERS));
  } catch {
    return [];
  }
}

/**
 * Descobre impressoras: as instaladas na estacao (WMI) e as alcancaveis na sub-rede local.
 * Cache de 6h; nunca inventa entradas.
 */
async function discoverPrinters({ localIp, force = false, cacheOnly = false } = {}) {
  const now = Date.now();
  if (cache.data && !force && (cacheOnly || now - cache.at < DISCOVERY_TTL_MS)) {
    return cache.data;
  }
  if (cacheOnly || process.platform !== 'win32' || !isPrivateIpv4(localIp || '')) {
    return { printers: [], errors: cacheOnly ? [] : ['descoberta_indisponivel'], collected_at: null };
  }
  if (inflight) return inflight;

  inflight = (async () => {
    const errors = [];
    const byIp = new Map();

    const installed = await listInstalledPrinters();
    for (const item of installed) {
      const ip = extractIpv4(item.port);
      if (ip) {
        byIp.set(ip, {
          ip_address: ip,
          name: item.name,
          model: item.driver,
          port: 9100,
          source: 'INSTALLED',
        });
      }
    }

    try {
      const scanned = await scanSubnet(localIp);
      for (const hit of scanned) {
        const existing = byIp.get(hit.ip_address);
        const hostname = existing ? null : await reverseHostname(hit.ip_address);
        byIp.set(hit.ip_address, {
          ip_address: hit.ip_address,
          name: existing?.name || hostname || `IMPRESSORA-${hit.ip_address.split('.').pop()}`,
          model: existing?.model || null,
          port: hit.port,
          source: existing ? 'INSTALLED' : 'NETWORK',
        });
      }
    } catch (err) {
      errors.push(`scan: ${cleanText(err.message, 100)}`);
    }

    const result = {
      printers: Array.from(byIp.values()).slice(0, MAX_PRINTERS),
      errors,
      collected_at: new Date().toISOString(),
    };
    cache = { data: result, at: Date.now() };
    return result;
  })();

  try {
    return await inflight;
  } finally {
    inflight = null;
  }
}

function resetPrinterCache() {
  cache = { data: null, at: 0 };
}

module.exports = {
  discoverPrinters,
  scanSubnet,
  parseInstalledPrinters,
  isPrivateIpv4,
  extractIpv4,
  resetPrinterCache,
};
