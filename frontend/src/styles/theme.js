export const theme = {
  colors: {
    bgCanvas: '#F4F5F2', // Linho neutro editorial
    bgSurface: '#FFFFFF', // Superfície limpa principal
    bgSurfaceSubtle: '#F6F7F4', // Superfície secundária discreta
    bgSurfaceHover: '#EEF1EC', // Hover sutil sem saturação
    bgElevated: '#FFFFFF',
    bgGlassHeavy: 'rgba(255, 255, 255, 0.96)',
    borderSubtle: 'rgba(30, 36, 32, 0.09)', // Hairline fino 1px
    borderStrong: 'rgba(30, 36, 32, 0.18)',
    textPrimary: '#1E2420', // Carvão quente de alto contraste (>= 12:1)
    textSecondary: '#5B655F', // Ardósia legível (>= 5.5:1)
    textMuted: '#7B857F',
    brandPrimary: '#2D6A4F', // Único acento institucional verde-floresta
    brandPrimaryHover: '#23533D',
    brandPrimaryLight: '#52796B',
    brandPrimarySubtle: 'rgba(45, 106, 79, 0.09)',
    accentMuted: '#3E5C52',
    status: {
      NORMAL: '#2D6A4F', // Online saudável
      WARNING: '#B45309', // Âmbar com contraste >= 4.5:1
      CRITICAL: '#C81E1E', // Vermelho editorial contido
      OFFLINE: '#64748B', // Ardósia neutra
    },
    statusBg: {
      NORMAL: 'rgba(45, 106, 79, 0.10)',
      WARNING: 'rgba(180, 83, 9, 0.10)',
      CRITICAL: 'rgba(200, 30, 30, 0.09)',
      OFFLINE: 'rgba(100, 116, 139, 0.11)',
    },
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '12px',
    pill: '999px',
  },
  motion: {
    ease: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    fast: '150ms',
    press: '90ms',
    panel: '200ms',
  },
  shadows: {
    sm: '0 1px 2px rgba(30, 36, 32, 0.04)',
    md: '0 6px 20px rgba(30, 36, 32, 0.07)',
    lg: '0 18px 44px rgba(30, 36, 32, 0.12)',
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
 * Compara versões semânticas (ex.: "2.4.0-native-exe" vs "2.3.0").
 * Retorna true apenas se a versão informada for estritamente inferior à mínima.
 */
export function isAgentOutdated(version, minVersion = '2.3.0') {
  if (!version || typeof version !== 'string') return false;
  const parse = (v) => {
    const match = String(v).match(/(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!match) return null;
    return [Number(match[1]), Number(match[2]), Number(match[3] || 0)];
  };
  const current = parse(version);
  const minimum = parse(minVersion);
  if (!current || !minimum) return false;
  for (let i = 0; i < 3; i += 1) {
    if (current[i] < minimum[i]) return true;
    if (current[i] > minimum[i]) return false;
  }
  return false;
}

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
