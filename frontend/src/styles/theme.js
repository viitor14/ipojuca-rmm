export const theme = {
  colors: {
    bgCanvas: '#050507',
    bgSurface: 'rgba(11, 12, 16, 0.80)',
    bgElevated: 'rgba(20, 22, 29, 0.88)',
    bgGlassHeavy: 'rgba(8, 9, 12, 0.90)',
    borderSubtle: 'rgba(244, 244, 240, 0.11)',
    borderStrong: 'rgba(212, 255, 51, 0.55)',
    textPrimary: '#F4F4F0',
    textSecondary: '#8A90A2',
    brandPrimary: '#D4FF33', // Acid Lime / Titanium Highlight
    accentCyan: '#00E5FF',
    status: {
      NORMAL: '#00F5A0', // Bio-Phosphor Mint
      WARNING: '#FFB800', // Solar Amber
      CRITICAL: '#FF2A54', // Signal Vermilion
      OFFLINE: '#525866', // Carbon Slate
    },
  },
  fonts: {
    sans: "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
};

export const STATUS_LABELS = {
  NORMAL: 'NOMINAL',
  WARNING: 'ATENÇÃO',
  CRITICAL: 'ANOMALIA',
  OFFLINE: 'SILÊNCIO',
};
