/**
 * Três direções artísticas para a sala-piloto (recepção).
 *
 * Cada variante altera apenas apresentação: paleta de piso, paredes, tapete,
 * luz e fundo. Nenhum dado de telemetria, seleção ou interação é tocado.
 */

export const RECEPTION_VARIANTS = {
  A: {
    id: 'A',
    name: 'Clínico Acolhedor',
    tagline: 'Madeira clara, branco quente e verde-sálvia',
    swatches: ['#F7F2E9', '#E3CFAE', '#A3B18A', '#2D6A4F'],
    room: {
      wallColor: '#F7F2E9',
      wallCapColor: '#B08968',
      baseboardColor: '#8A6A4F',
      floorType: 'parquet',
      rugColor: '#A3B18A',
      rugBorderColor: '#DAD7CD',
      hasRug: true,
      rugSize: [3.2, 2.0],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#EDE7DA',
      ambient: { intensity: 0.86, color: '#FFF6E8' },
      hemisphere: { sky: '#FFF8EC', ground: '#DCE3DA', intensity: 0.42 },
      key: { intensity: 1.22, color: '#FFF1DC' },
      fill: { intensity: 0.34, color: '#DCE7E0' },
    },
  },
  B: {
    id: 'B',
    name: 'Institucional Sereno',
    tagline: 'Porcelanato claro, cinza frio e azul institucional',
    swatches: ['#EDF1F4', '#DCE3E8', '#8FA9B8', '#1F4E79'],
    room: {
      wallColor: '#EDF1F4',
      wallCapColor: '#8FA3AD',
      baseboardColor: '#6B7C86',
      floorType: 'porcelain',
      rugColor: '#8FA9B8',
      rugBorderColor: '#E4EAEE',
      hasRug: true,
      rugSize: [3.2, 2.0],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#E7ECEF',
      ambient: { intensity: 0.9, color: '#FFFFFF' },
      hemisphere: { sky: '#F7FBFF', ground: '#DDE5EA', intensity: 0.4 },
      key: { intensity: 1.18, color: '#F2F7FF' },
      fill: { intensity: 0.4, color: '#E3ECF5' },
    },
  },
  C: {
    id: 'C',
    name: 'Terracota Humanizado',
    tagline: 'Cerâmica terracota, creme e luz de fim de tarde',
    swatches: ['#F6E7D8', '#D9A57F', '#C97B5A', '#B5563A'],
    room: {
      wallColor: '#F6E7D8',
      wallCapColor: '#A9714B',
      baseboardColor: '#8A5636',
      floorType: 'checker',
      checkerColor1: '#D9A57F',
      checkerColor2: '#CE9871',
      rugColor: '#C97B5A',
      rugBorderColor: '#F0DCC8',
      hasRug: true,
      rugSize: [3.2, 2.0],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#F0E2D2',
      ambient: { intensity: 0.8, color: '#FFEFD9' },
      hemisphere: { sky: '#FFE9CE', ground: '#E8D2BE', intensity: 0.46 },
      key: { intensity: 1.34, color: '#FFD9A8' },
      fill: { intensity: 0.44, color: '#F2D9C4' },
    },
  },
};

export const DEFAULT_VARIANT = 'B';

export function getReceptionVariant(id) {
  return RECEPTION_VARIANTS[id] || RECEPTION_VARIANTS[DEFAULT_VARIANT];
}
