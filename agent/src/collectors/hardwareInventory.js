const { execFile } = require('child_process');

const INVENTORY_TTL_MS = 24 * 60 * 60 * 1000;
const POWERSHELL_TIMEOUT_MS = 10000;

const POWERSHELL_SCRIPT = `
$ErrorActionPreference = 'SilentlyContinue'
$ProgressPreference = 'SilentlyContinue'
$r = [ordered]@{}
$bios = Get-CimInstance Win32_BIOS
$cs = Get-CimInstance Win32_ComputerSystem
$csp = Get-CimInstance Win32_ComputerSystemProduct
$cpu = @(Get-CimInstance Win32_Processor)
$os = Get-CimInstance Win32_OperatingSystem
$r.serial = $bios.SerialNumber
$r.manufacturer = $cs.Manufacturer
$r.model = $cs.Model
$r.smbios_uuid = $csp.UUID
$r.ram_bytes = $cs.TotalPhysicalMemory
$r.cpu_name = $cpu[0].Name
$r.cpu_cores = ($cpu | Measure-Object NumberOfCores -Sum).Sum
$r.cpu_threads = ($cpu | Measure-Object NumberOfLogicalProcessors -Sum).Sum
$r.os_caption = $os.Caption
$r.os_build = $os.BuildNumber
$disks = @(Get-CimInstance -Namespace root/Microsoft/Windows/Storage MSFT_PhysicalDisk)
$sys = $null
if ($disks.Count -eq 1) { $sys = $disks[0] }
elseif ($disks.Count -gt 1) {
  $part = Get-Partition -DriveLetter C
  if ($part) { $sys = $disks | Where-Object { [string]$_.DeviceId -eq [string]$part.DiskNumber } | Select-Object -First 1 }
}
$r.disk_media = $sys.MediaType
$r.disk_bus = $sys.BusType
$r | ConvertTo-Json -Compress
`;

let cache = { data: null, at: 0 };
let inflight = null;

function cleanText(value, max = 120) {
  if (value === null || value === undefined) return null;
  const text = String(value).replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, max) : null;
}

function toPositiveInt(value) {
  const n = Math.round(Number(value));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function resolveDiskType(media, bus) {
  const m = Number(media);
  if (m === 4) return 'SSD';
  if (m === 3) return 'HDD';
  if (Number(bus) === 17) return 'SSD';
  return 'UNKNOWN';
}

function buildOsLabel(caption, build) {
  const label = cleanText(caption, 80);
  const b = toPositiveInt(build);
  if (!label) return null;
  return b ? `${label} (Build ${b})` : label;
}

/**
 * Converte o JSON bruto do PowerShell em campos de inventario.
 * Nunca inventa valores: o que nao foi lido volta como null.
 */
function parseInventoryJson(rawJson) {
  const raw = JSON.parse(rawJson);
  const ramBytes = Number(raw.ram_bytes);
  return {
    serial_number: cleanText(raw.serial, 100),
    manufacturer: cleanText(raw.manufacturer, 100),
    model: cleanText(raw.model, 100),
    smbios_uuid: cleanText(raw.smbios_uuid, 36),
    cpu_model: cleanText(raw.cpu_name, 120),
    cpu_cores: toPositiveInt(raw.cpu_cores),
    cpu_threads: toPositiveInt(raw.cpu_threads),
    ram_total_mb: Number.isFinite(ramBytes) && ramBytes > 0 ? Math.round(ramBytes / (1024 * 1024)) : null,
    disk_type: resolveDiskType(raw.disk_media, raw.disk_bus),
    os_version: buildOsLabel(raw.os_caption, raw.os_build),
  };
}

function runPowerShell(script, timeoutMs) {
  return new Promise((resolve, reject) => {
    const encoded = Buffer.from(script, 'utf16le').toString('base64');
    execFile(
      'powershell.exe',
      [
        '-NoProfile',
        '-NonInteractive',
        '-WindowStyle',
        'Hidden',
        '-ExecutionPolicy',
        'Bypass',
        '-EncodedCommand',
        encoded,
      ],
      { timeout: timeoutMs, windowsHide: true, maxBuffer: 1024 * 1024 },
      (err, stdout) => {
        if (err) return reject(err);
        const out = String(stdout || '').trim();
        if (!out) return reject(new Error('PowerShell sem saida'));
        return resolve(out);
      }
    );
  });
}

/**
 * Inventario estatico em uma unica chamada oculta ao PowerShell, com cache de 24h.
 * Retorna { fields, errors, collected_at }.
 */
async function collectHardwareInventory({ force = false, cacheOnly = false } = {}) {
  const now = Date.now();
  if (cache.data && !force && (cacheOnly || now - cache.at < INVENTORY_TTL_MS)) {
    return cache.data;
  }
  if (cacheOnly || process.platform !== 'win32') {
    return { fields: {}, errors: cacheOnly ? [] : ['plataforma_nao_windows'], collected_at: null };
  }
  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const out = await runPowerShell(POWERSHELL_SCRIPT, POWERSHELL_TIMEOUT_MS);
      const result = {
        fields: parseInventoryJson(out),
        errors: [],
        collected_at: new Date().toISOString(),
      };
      cache = { data: result, at: Date.now() };
      return result;
    } catch (err) {
      return {
        fields: {},
        errors: [`cim: ${cleanText(err.message, 120)}`],
        collected_at: null,
      };
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

function resetInventoryCache() {
  cache = { data: null, at: 0 };
}

module.exports = {
  collectHardwareInventory,
  parseInventoryJson,
  resolveDiskType,
  resetInventoryCache,
};
