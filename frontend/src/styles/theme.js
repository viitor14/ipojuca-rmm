export const theme = {
  colors: {
    bgCanvas: '#050609',
    bgSurface: 'rgba(13, 16, 23, 0.88)',
    bgElevated: 'rgba(20, 24, 34, 0.94)',
    bgGlassHeavy: 'rgba(9, 11, 16, 0.94)',
    borderSubtle: 'rgba(244, 244, 240, 0.13)',
    borderStrong: 'rgba(212, 255, 51, 0.55)',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    brandPrimary: '#D4FF33', // Acid Lime / Titanium Highlight
    accentCyan: '#00E5FF',
    status: {
      NORMAL: '#10B981', // Bio-Phosphor Mint
      WARNING: '#F59E0B', // Solar Amber
      CRITICAL: '#EF4444', // Signal Vermilion
      OFFLINE: '#64748B', // Carbon Slate
    },
  },
  fonts: {
    sans: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'JetBrains Mono', 'Consolas', monospace",
  },
};

export const STATUS_LABELS = {
  NORMAL: 'ONLINE',
  WARNING: 'ATENÇÃO',
  CRITICAL: 'CRÍTICO',
  OFFLINE: 'OFFLINE',
};

export const RISK_LABELS = {
  LOW: 'Baixo',
  MEDIUM: 'Médio',
  HIGH: 'Alto',
};

/**
 * Corrige automaticamente qualquer string corrompida por encoding UTF-8/Latin1
 * (ex: "Nossa Senhora do Ã“" -> "Nossa Senhora do Ó", "RecepÃ§Ã£o" -> "Recepção")
 */
export function fixTextEncoding(str) {
  if (!str || typeof str !== 'string') return str || '';
  if (!str.includes('Ã') && !str.includes('Â')) return str;
  try {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      bytes[i] = str.charCodeAt(i) & 0xff;
    }
    const decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
    if (!decoded.includes('\uFFFD')) {
      return decoded;
    }
  } catch (_) {
    // fallback manual
  }
  return str
    .replace(/Ã“/g, 'Ó')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã£/g, 'ã')
    .replace(/Ã¡/g, 'á')
    .replace(/Ã©/g, 'é')
    .replace(/Ã­/g, 'í')
    .replace(/Ã³/g, 'ó')
    .replace(/Ãº/g, 'ú')
    .replace(/Ã¢/g, 'â')
    .replace(/Ãª/g, 'ê')
    .replace(/Ã´/g, 'ô')
    .replace(/Ã‡/g, 'Ç')
    .replace(/Ãƒ/g, 'Ã');
}
