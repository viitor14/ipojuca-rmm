export const theme = {
  colors: {
    bgCanvas: '#F4F5F2', // Fundo linho neutro e acolhedor
    bgSurface: '#FFFFFF', // Superfícies e cartões brancos puros
    bgSurfaceSubtle: '#ECEFEB', // Superfícies secundárias neutras
    bgElevated: '#FFFFFF',
    bgGlassHeavy: 'rgba(255, 255, 255, 0.94)',
    borderSubtle: '#E4E8E3', // Divisórias discretas
    borderStrong: '#CBD3CB',
    textPrimary: '#242925', // Preto carvão de alto contraste
    textSecondary: '#737B75', // Ardósia neutra
    textMuted: '#9BA39D',
    brandPrimary: '#52796B', // Verde sálvia arquitetônico institucional
    brandPrimaryLight: '#6B9080',
    brandPrimarySubtle: 'rgba(82, 121, 107, 0.12)',
    accentMuted: '#3E5C52',
    status: {
      NORMAL: '#2D6A4F', // Verde moderado funcional
      WARNING: '#D97706', // Âmbar discreto
      CRITICAL: '#DC2626', // Vermelho reservado
      OFFLINE: '#718096', // Cinza ardósia neutro
    },
    statusBg: {
      NORMAL: 'rgba(45, 106, 79, 0.1)',
      WARNING: 'rgba(217, 119, 6, 0.12)',
      CRITICAL: 'rgba(220, 38, 38, 0.1)',
      OFFLINE: 'rgba(113, 128, 150, 0.12)',
    },
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 4px 14px rgba(0, 0, 0, 0.06)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.08)',
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
