/**
 * Três direções artísticas para a sala-piloto (recepção).
 *
 * Cada variante altera apenas apresentação: paleta de piso, paredes, tapete,
 * luz e fundo. Nenhum dado de telemetria, seleção ou interação é tocado.
 *
 * Balanço de luz (Modern Stylized Architectural Diorama): ambiente baixo,
 * chave definida e preenchimento discreto. Ambiente alto com chave baixa
 * produzia o aspecto lavado e sem profundidade das versões anteriores.
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
      hasRug: false,
      rugSize: [2.4, 1.5],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#EDE7DA',
      ambient: { intensity: 0.44, color: '#FFF6E8' },
      hemisphere: { sky: '#FFF8EC', ground: '#DCE3DA', intensity: 0.32 },
      key: { intensity: 2.05, color: '#FFF1DC' },
      fill: { intensity: 0.24, color: '#DCE7E0' },
    },
  },
  B: {
    id: 'B',
    name: 'Institucional Sereno',
    tagline: 'Porcelanato claro, azul institucional e verde vivo',
    swatches: ['#F6F8F3', '#CFE3DC', '#2E8B74', '#1F5F8B'],
    room: {
      wallColor: '#F6F8F3',
      wallCapColor: '#2E6B7A',
      baseboardColor: '#2C5F73',
      accentColor: '#E4A11B',
      floorType: 'porcelain',
      rugColor: '#6FA88F',
      rugBorderColor: '#EAF2EC',
      hasRug: false,
      rugSize: [2.4, 1.5],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#E9F0EA',
      ambient: { intensity: 0.42, color: '#FFFFFF' },
      hemisphere: { sky: '#F7FBFF', ground: '#D6E4DC', intensity: 0.34 },
      key: { intensity: 2.15, color: '#FFF6E6' },
      fill: { intensity: 0.26, color: '#DCEBF2' },
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
      floorType: 'porcelain',
      rugColor: '#C97B5A',
      rugBorderColor: '#F0DCC8',
      hasRug: false,
      rugSize: [2.4, 1.5],
      rugPos: [0.5, 0.0, -0.2],
    },
    lighting: {
      background: '#F0E2D2',
      ambient: { intensity: 0.4, color: '#FFEFD9' },
      hemisphere: { sky: '#FFE9CE', ground: '#E8D2BE', intensity: 0.34 },
      key: { intensity: 2.1, color: '#FFD9A8' },
      fill: { intensity: 0.26, color: '#F2D9C4' },
    },
  },
};

export const DEFAULT_VARIANT = 'B';

export function getReceptionVariant() {
  return RECEPTION_VARIANTS.B;
}
