import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * MODO A — Maquete isométrica em pixel art (Canvas 2D).
 *
 * Renderiza uma sala de recepção em pixel art isométrica desenhada
 * proceduralmente, consumindo os mesmos dados de telemetria do gêmeo 3D.
 * Nada aqui altera backend, agentes ou telemetria: é apenas uma camada
 * de apresentação sobre `machines`, `activeUnit` e `selectedMachine`.
 */

const LOGICAL_W = 480;
const LOGICAL_H = 300;
// Supersampling: o buffer é rasterizado em 3x e reduzido com suavização,
// eliminando o aspecto pixelado sem alterar as coordenadas de desenho.
const SS = 3;
const TW = 30; // largura do tile isométrico (px lógicos)
const TH = 15; // altura do tile isométrico (2:1)
const OX = LOGICAL_W / 2;
const OY = 62;

const ROOM_W = 12;
const ROOM_D = 9;
const WALL_H = 2.2;

const PALETTE = {
  floorA: '#F2E4CC',
  floorB: '#E7D5B6',
  floorEdge: '#C9AE86',
  wallTop: '#FFF6E6',
  wallSouth: '#F0DFC4',
  wallEast: '#DCC7A6',
  wallCap: '#9C6B4A',
  baseboard: '#6B4F3A',
  rug: '#7FB069',
  rugBorder: '#F2C14E',
  woodTop: '#C98A4B',
  woodSouth: '#A96C33',
  woodEast: '#8A5526',
  deskTop: '#E0A458',
  deskSouth: '#BE8038',
  deskEast: '#9C6628',
  metal: '#B7C4CE',
  metalDark: '#7C8B96',
  plastic: '#F4F8FB',
  plasticDark: '#CBD6DE',
  paper: '#FFFDF7',
  plant: '#3E9B4F',
  plantDark: '#2C7A3B',
  pot: '#C4693F',
  glass: '#BFE6F5',
  glassFrame: '#6E8A96',
  ink: '#1F2933',
  inkSoft: '#52606D',
};

const STATUS_COLORS = {
  NORMAL: '#12B76A',
  WARNING: '#F79009',
  CRITICAL: '#F04438',
  OFFLINE: '#98A2B3',
};

const STATUS_LABELS = {
  NORMAL: 'ONLINE',
  WARNING: 'ATENÇÃO',
  CRITICAL: 'CRÍTICO',
  OFFLINE: 'OFFLINE',
};

/* ------------------------------------------------------------------ */
/* Utilidades de cor e projeção isométrica                             */
/* ------------------------------------------------------------------ */

function shade(hex, factor) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, Math.round(((n >> 16) & 255) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((n >> 8) & 255) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((n & 255) * factor)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function iso(x, y, z = 0) {
  return {
    sx: OX + (x - y) * (TW / 2),
    sy: OY + (x + y) * (TH / 2) - z * TH,
  };
}

function poly(ctx, points, fill) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(Math.round(points[0].sx), Math.round(points[0].sy));
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(Math.round(points[i].sx), Math.round(points[i].sy));
  }
  ctx.closePath();
  ctx.fill();
}

function drawTile(ctx, x, y, z, fill) {
  const a = iso(x, y, z);
  const b = iso(x + 1, y, z);
  const c = iso(x + 1, y + 1, z);
  const d = iso(x, y + 1, z);
  poly(ctx, [a, b, c, d], fill);
}

function drawBox(ctx, x, y, z, w, d, h, base) {
  const top = shade(base, 1);
  const south = shade(base, 0.82);
  const east = shade(base, 0.68);

  // face sul (+y)
  poly(
    ctx,
    [iso(x, y + d, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x, y + d, z)],
    south
  );
  // face leste (+x)
  poly(
    ctx,
    [iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x + w, y + d, z), iso(x + w, y, z)],
    east
  );
  // topo
  poly(
    ctx,
    [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)],
    top
  );
}

function drawFlat(ctx, x, y, z, w, d, fill) {
  poly(
    ctx,
    [iso(x, y, z), iso(x + w, y, z), iso(x + w, y + d, z), iso(x, y + d, z)],
    fill
  );
}

/* ------------------------------------------------------------------ */
/* Cena                                                                */
/* ------------------------------------------------------------------ */

function drawFloor(ctx) {
  for (let x = 0; x < ROOM_W; x += 1) {
    for (let y = 0; y < ROOM_D; y += 1) {
      const even = (x + y) % 2 === 0;
      drawTile(ctx, x, y, 0, even ? PALETTE.floorA : PALETTE.floorB);
    }
  }
  // rodapé do piso (borda frontal)
  poly(
    ctx,
    [
      iso(0, ROOM_D, 0),
      iso(ROOM_W, ROOM_D, 0),
      iso(ROOM_W, ROOM_D, -0.12),
      iso(0, ROOM_D, -0.12),
    ],
    PALETTE.floorEdge
  );
}

function drawWalls(ctx) {
  // parede norte (fundo)
  drawBox(ctx, -0.3, -0.3, 0, ROOM_W + 0.6, 0.3, WALL_H, PALETTE.wallSouth);
  // parede oeste (lateral)
  drawBox(ctx, -0.3, 0, 0, 0.3, ROOM_D, WALL_H, PALETTE.wallEast);

  // faixa superior das paredes
  drawFlat(ctx, -0.3, -0.3, WALL_H, ROOM_W + 0.6, 0.3, PALETTE.wallCap);
  drawFlat(ctx, -0.3, 0, WALL_H, 0.3, ROOM_D, PALETTE.wallCap);

  // janela na parede norte
  const wx = 4.2;
  const wy = 0.02;
  drawFlat(ctx, wx, wy, 1.05, 2.6, 0.02, PALETTE.glassFrame);
  drawFlat(ctx, wx + 0.12, wy + 0.01, 1.15, 2.36, 0.02, PALETTE.glass);
  // caixilho central
  drawFlat(ctx, wx + 1.26, wy + 0.01, 1.15, 0.08, 0.02, PALETTE.glassFrame);

  // porta na parede oeste
  drawFlat(ctx, 0.02, 6.0, 0, 0.02, 1.5, PALETTE.woodSouth);
  drawFlat(ctx, 0.03, 6.1, 0, 0.02, 1.3, PALETTE.woodTop);
  // maçaneta
  drawFlat(ctx, 0.04, 7.2, 0.95, 0.02, 0.12, '#D9B44A');
}

function drawRug(ctx) {
  drawFlat(ctx, 4.4, 4.1, 0.015, 3.4, 2.2, PALETTE.rugBorder);
  drawFlat(ctx, 4.55, 4.25, 0.02, 3.1, 1.9, PALETTE.rug);
}

function drawCounter(ctx) {
  // balcão de recepção
  drawBox(ctx, 7.4, 6.0, 0, 3.6, 0.9, 1.05, PALETTE.woodSouth);
  drawFlat(ctx, 7.35, 5.95, 1.05, 3.7, 1.0, PALETTE.woodTop);
  // tampo claro
  drawFlat(ctx, 7.45, 6.05, 1.07, 3.5, 0.8, '#E7D9C3');
}

function drawDesk(ctx) {
  drawBox(ctx, 2.1, 2.5, 0, 2.4, 1.2, 0.82, PALETTE.deskSouth);
  drawFlat(ctx, 2.05, 2.45, 0.82, 2.5, 1.3, PALETTE.deskTop);
}

function drawDeskTwo(ctx) {
  drawBox(ctx, 5.0, 2.2, 0, 2.2, 1.1, 0.82, PALETTE.deskSouth);
  drawFlat(ctx, 4.95, 2.15, 0.82, 2.3, 1.2, PALETTE.deskTop);
}

function drawChair(ctx) {
  drawBox(ctx, 2.7, 4.0, 0, 0.9, 0.9, 0.45, PALETTE.metalDark);
  drawBox(ctx, 2.7, 4.75, 0.45, 0.9, 0.18, 0.55, PALETTE.metal);
}

function drawPrinterTable(ctx) {
  drawBox(ctx, 9.4, 1.9, 0, 1.5, 1.2, 0.62, PALETTE.metalDark);
  drawFlat(ctx, 9.35, 1.85, 0.62, 1.6, 1.3, PALETTE.metal);
  // impressora
  drawBox(ctx, 9.55, 2.05, 0.62, 1.15, 0.85, 0.55, PALETTE.plasticDark);
  drawFlat(ctx, 9.6, 2.1, 1.17, 1.05, 0.3, PALETTE.plastic);
  // papel saindo
  drawFlat(ctx, 9.7, 2.45, 1.19, 0.85, 0.35, PALETTE.paper);
}

function drawPlant(ctx) {
  drawBox(ctx, 0.55, 0.9, 0, 0.55, 0.55, 0.4, PALETTE.pot);
  drawBox(ctx, 0.62, 0.97, 0.4, 0.4, 0.4, 0.45, PALETTE.plantDark);
  drawBox(ctx, 0.7, 1.05, 0.85, 0.24, 0.24, 0.3, PALETTE.plant);
}

/* ------------------------------------------------------------------ */
/* Computadores reais                                                  */
/* ------------------------------------------------------------------ */

const DESK_SLOTS = [
  { x: 2.95, y: 2.85, label: 'MESA 01', labelOffset: -2 },
  { x: 5.55, y: 2.55, label: 'MESA 02', labelOffset: -16 },
  { x: 8.15, y: 6.25, label: 'BALCÃO', labelOffset: -2 },
];

function isMachineInactive24h(machine) {
  if (!machine) return false;
  if (machine.health_status === 'OFFLINE') {
    if (!machine.last_seen_at) return false;
    return (Date.now() - new Date(machine.last_seen_at).getTime()) / 1000 >= 86400;
  }
  return Number(machine.idle_seconds || 0) >= 86400;
}

function drawComputer(ctx, slot, machine, isSelected, isHovered, blinkOn) {
  const status = machine?.health_status || 'OFFLINE';
  const screen = STATUS_COLORS[status] || STATUS_COLORS.OFFLINE;

  // base do monitor
  drawBox(ctx, slot.x, slot.y, 0.82, 0.85, 0.3, 0.12, PALETTE.metalDark);
  // haste
  drawBox(ctx, slot.x + 0.34, slot.y + 0.08, 0.94, 0.16, 0.12, 0.28, PALETTE.metal);
  // moldura do monitor
  drawBox(ctx, slot.x - 0.02, slot.y + 0.02, 1.2, 0.9, 0.14, 0.62, PALETTE.plasticDark);
  // tela
  drawFlat(ctx, slot.x + 0.04, slot.y + 0.03, 1.78, 0.78, 0.12, screen);
  // brilho da tela
  drawFlat(ctx, slot.x + 0.1, slot.y + 0.05, 1.79, 0.3, 0.06, shade(screen, 1.35));

  // teclado
  drawFlat(ctx, slot.x + 0.05, slot.y + 0.42, 0.84, 0.7, 0.28, PALETTE.plasticDark);

  // LED de status piscando
  const led = iso(slot.x + 0.86, slot.y + 0.1, 1.86);
  ctx.fillStyle = blinkOn || status !== 'NORMAL' ? screen : shade(screen, 0.6);
  ctx.fillRect(Math.round(led.sx) - 1, Math.round(led.sy) - 1, 3, 3);

  // destaque de seleção ou hover
  if (isSelected || isHovered) {
    const a = iso(slot.x - 0.25, slot.y - 0.25, 0.03);
    const b = iso(slot.x + 1.15, slot.y - 0.25, 0.03);
    const c = iso(slot.x + 1.15, slot.y + 0.85, 0.03);
    const d = iso(slot.x - 0.25, slot.y + 0.85, 0.03);
    ctx.strokeStyle = isSelected ? '#1F2937' : '#52796B';
    ctx.lineWidth = isSelected ? 1.4 : 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(a.sx), Math.round(a.sy));
    ctx.lineTo(Math.round(b.sx), Math.round(b.sy));
    ctx.lineTo(Math.round(c.sx), Math.round(c.sy));
    ctx.lineTo(Math.round(d.sx), Math.round(d.sy));
    ctx.closePath();
    ctx.stroke();
  }
}

function drawMachineLabel(ctx, slot, machine, isSelected, occupied = []) {
  const status = machine?.health_status || 'OFFLINE';
  const inactive24h = isMachineInactive24h(machine);
  const anchor = iso(slot.x + 0.45, slot.y + 0.2, 2.15);
  const full = machine?.hostname || 'SEM AGENTE';
  const short = inactive24h ? `${full} !24h` : full;
  ctx.font = '8px "Courier New", monospace';
  const w = Math.max(ctx.measureText(short).width + 18, 46);
  const x = Math.round(anchor.sx - w / 2);
  let y = Math.round(anchor.sy - 13 + (slot.labelOffset || 0));

  // Evita sobreposição entre rótulos: desloca para baixo até achar espaço livre
  const overlaps = (top) =>
    occupied.some((b) => x < b.x + b.w && x + w > b.x && top < b.y + b.h && top + 12 > b.y);
  let guard = 0;
  while (overlaps(y) && guard < 8) {
    y += 14;
    guard += 1;
  }
  const box = { x, y, w, h: 12 };
  occupied.push(box);

  ctx.fillStyle = isSelected
    ? '#1F2937'
    : inactive24h
      ? '#FEF2F2'
      : 'rgba(255,255,255,0.96)';
  ctx.fillRect(x, y, w, 12);
  ctx.strokeStyle = isSelected
    ? '#1F2937'
    : inactive24h
      ? '#DC2626'
      : 'rgba(31,41,55,0.3)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, 11);

  // LED de status dentro do rótulo
  ctx.fillStyle = inactive24h ? '#DC2626' : STATUS_COLORS[status] || STATUS_COLORS.OFFLINE;
  ctx.fillRect(x + 4, y + 4, 4, 4);

  ctx.fillStyle = isSelected ? '#FFFFFF' : inactive24h ? '#991B1B' : PALETTE.ink;
  ctx.textBaseline = 'middle';
  ctx.fillText(short, x + 11, y + 6.5);
  return box;
}

function drawSelectedCard(ctx, machine, cssW, cssH) {
  if (!machine) return;
  const status = machine.health_status || 'OFFLINE';
  const color = STATUS_COLORS[status] || STATUS_COLORS.OFFLINE;
  const x = 16;
  const w = 236;
  const h = 74;
  const y = cssH - h - 18;

  ctx.fillStyle = 'rgba(255,255,255,0.96)';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(31,41,55,0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 3, h);

  ctx.textBaseline = 'alphabetic';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillStyle = PALETTE.ink;
  ctx.fillText(machine.hostname || 'SEM AGENTE', x + 12, y + 18);

  ctx.font = '9px "Courier New", monospace';
  ctx.fillStyle = color;
  ctx.fillText(STATUS_LABELS[status] || status, x + 12, y + 32);

  ctx.fillStyle = PALETTE.inkSoft;
  ctx.fillText(`IP ${machine.ip_address || '—'}`, x + 12, y + 45);
  ctx.fillText(
    `CPU ${Number(machine.cpu_usage_pct ?? 0).toFixed(0)}%   RAM ${Number(machine.ram_usage_pct ?? 0).toFixed(0)}%`,
    x + 12,
    y + 57
  );
  const tempLabel =
    Number(machine.temperature_c) > 0 ? `${Number(machine.temperature_c).toFixed(0)}°C` : 'N/D';
  ctx.fillText(
    `DISCO ${Number(machine.disk_usage_pct ?? 0).toFixed(0)}%   TEMP ${tempLabel}`,
    x + 12,
    y + 69
  );
}

/* ------------------------------------------------------------------ */
/* Componente                                                          */
/* ------------------------------------------------------------------ */

const Stage = styled.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, #f7f4ec 0%, #e7e3d8 58%, #d8d4c7 100%);
  overflow: hidden;
  z-index: 0;
`;

const CanvasEl = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${({ $dragging, $hover }) => ($dragging ? 'grabbing' : $hover ? 'pointer' : 'grab')};
  image-rendering: auto;
`;

const Legend = styled.div`
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 7px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(31, 41, 55, 0.14);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #3b3b3b;
  pointer-events: none;
`;

const LegendDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: ${({ $color }) => $color};
  margin-right: 4px;
`;

const Hint = styled.div`
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 7px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(31, 41, 55, 0.14);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #3b3b3b;
  pointer-events: none;
`;

export function PixelArtTwin({
  activeUnit,
  machines = [],
  selectedMachine,
  selectedSector,
  onSelectMachine,
}) {
  const canvasRef = useRef(null);
  const bufferRef = useRef(null);
  const hitRef = useRef([]);
  const dragRef = useRef({ active: false, x: 0, y: 0, panX: 0, panY: 0 });
  const [view, setView] = useState({ zoom: 1.28, panX: 0, panY: 0 });
  const [dragging, setDragging] = useState(false);
  const [hoverId, setHoverId] = useState(null);
  const [blink, setBlink] = useState(true);

  const sectorMachines = useMemo(() => {
    const unitList = (machines || []).filter(
      (m) => !activeUnit?.id || Number(m.unit_id) === Number(activeUnit.id)
    );
    const filtered = selectedSector?.id
      ? unitList.filter((m) => Number(m.sector_id) === Number(selectedSector.id))
      : unitList;
    return [...filtered].sort((a, b) => Number(a.id) - Number(b.id));
  }, [machines, activeUnit?.id, selectedSector?.id]);

  // Apenas estações reais recebem computador na mesa (evita PCs fantasmas não selecionáveis)
  const slots = useMemo(
    () =>
      sectorMachines.map((machine, index) => {
        const baseSlot = DESK_SLOTS[index] || {
          x: 2.2 + ((index - DESK_SLOTS.length) % 4) * 2.1,
          y: 5.2 + Math.floor((index - DESK_SLOTS.length) / 4) * 1.6,
          label: `POSTO ${String(index + 1).padStart(2, '0')}`,
          labelOffset: -6,
        };
        return {
          ...baseSlot,
          machine,
        };
      }),
    [sectorMachines]
  );

  // pisca o LED sem custo relevante
  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 700);
    return () => clearInterval(id);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!bufferRef.current) {
      const buffer = document.createElement('canvas');
      buffer.width = LOGICAL_W * SS;
      buffer.height = LOGICAL_H * SS;
      bufferRef.current = buffer;
    }
    const buffer = bufferRef.current;
    const ctx = buffer.getContext('2d');
    ctx.setTransform(SS, 0, 0, SS, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, LOGICAL_W, LOGICAL_H);

    drawFloor(ctx);
    drawWalls(ctx);
    drawRug(ctx);
    drawCounter(ctx);
    drawDesk(ctx);
    drawDeskTwo(ctx);
    drawChair(ctx);
    drawPrinterTable(ctx);
    drawPlant(ctx);

    const hits = [];
    slots.forEach((slot) => {
      if (!slot.machine) return;
      const isSelected = Boolean(selectedMachine?.id) && selectedMachine.id === slot.machine.id;
      const isHovered = Boolean(hoverId) && hoverId === slot.machine.id;
      drawComputer(ctx, slot, slot.machine, isSelected, isHovered, blink);
      const anchor = iso(slot.x + 0.45, slot.y + 0.2, 1.2);
      hits.push({
        id: slot.machine.id,
        x: anchor.sx - 26,
        y: anchor.sy - 30,
        w: 52,
        h: 48,
      });
    });

    // etiquetas por último para ficarem legíveis (também clicáveis)
    const labelBoxes = [];
    slots.forEach((slot) => {
      if (!slot.machine) return;
      const labelBox = drawMachineLabel(
        ctx,
        slot,
        slot.machine,
        Boolean(selectedMachine?.id) && selectedMachine.id === slot.machine.id,
        labelBoxes
      );
      if (labelBox) {
        hits.push({
          id: slot.machine.id,
          x: labelBox.x - 2,
          y: labelBox.y - 2,
          w: labelBox.w + 4,
          h: labelBox.h + 4,
        });
      }
    });

    // cabeçalho e cartão são desenhados em espaço de tela, após o blit,
    // para não serem cortados pelo zoom/pan da maquete.

    hitRef.current = hits;

    // blit escalado com vizinho mais próximo (pixel art real)
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || LOGICAL_W;
    const cssH = canvas.clientHeight || LOGICAL_H;
    const targetW = Math.round(cssW * dpr);
    const targetH = Math.round(cssH * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    const out = canvas.getContext('2d');
    out.imageSmoothingEnabled = true;
    out.imageSmoothingQuality = 'high';
    out.setTransform(1, 0, 0, 1, 0, 0);
    out.clearRect(0, 0, targetW, targetH);

    const base = Math.min(cssW / LOGICAL_W, cssH / LOGICAL_H);
    const scale = base * view.zoom * dpr;
    const drawW = LOGICAL_W * scale;
    const drawH = LOGICAL_H * scale;
    const dx = (targetW - drawW) / 2 + view.panX * dpr;
    const dy = (targetH - drawH) / 2 + view.panY * dpr;
    out.drawImage(
      buffer,
      0,
      0,
      LOGICAL_W * SS,
      LOGICAL_H * SS,
      dx,
      dy,
      drawW,
      drawH
    );

    // HUD fixo em coordenadas CSS
    out.setTransform(dpr, 0, 0, dpr, 0, 0);
    out.imageSmoothingEnabled = true;
    out.textBaseline = 'alphabetic';
    out.font = 'bold 11px "Courier New", monospace';
    out.fillStyle = PALETTE.ink;
    const title = `${activeUnit?.code || 'USF'} // ${selectedSector?.name || 'VISÃO GERAL DA UNIDADE'}`;
    out.fillText(title.toUpperCase(), 16, 26);
    out.font = '9px "Courier New", monospace';
    out.fillStyle = PALETTE.inkSoft;
    out.fillText(
      `${sectorMachines.length} ESTAÇÃO(ÕES) • PIXEL ART • CANVAS 2D`,
      16,
      40
    );

    drawSelectedCard(out, selectedMachine, cssW, cssH);
  }, [slots, selectedMachine, hoverId, blink, view, activeUnit?.code, selectedSector?.name, sectorMachines.length]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const toLogical = useCallback(
    (clientX, clientY) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const cssW = rect.width;
      const cssH = rect.height;
      const base = Math.min(cssW / LOGICAL_W, cssH / LOGICAL_H);
      const scale = base * view.zoom;
      const drawW = LOGICAL_W * scale;
      const drawH = LOGICAL_H * scale;
      const dx = (cssW - drawW) / 2 + view.panX;
      const dy = (cssH - drawH) / 2 + view.panY;
      return {
        x: (clientX - rect.left - dx) / scale,
        y: (clientY - rect.top - dy) / scale,
      };
    },
    [view]
  );

  const pick = useCallback(
    (clientX, clientY) => {
      const p = toLogical(clientX, clientY);
      if (!p) return null;
      const hit = hitRef.current.find(
        (h) => p.x >= h.x && p.x <= h.x + h.w && p.y >= h.y && p.y <= h.y + h.h
      );
      return hit?.id ?? null;
    },
    [toLogical]
  );

  const handlePointerDown = (event) => {
    dragRef.current = {
      active: true,
      x: event.clientX,
      y: event.clientY,
      panX: view.panX,
      panY: view.panY,
      moved: false,
    };
    setDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (drag.active) {
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;
      setView((prev) => ({ ...prev, panX: drag.panX + dx, panY: drag.panY + dy }));
      return;
    }
    const id = pick(event.clientX, event.clientY);
    setHoverId((prev) => (prev === id ? prev : id));
  };

  const handlePointerUp = (event) => {
    const drag = dragRef.current;
    dragRef.current = { ...drag, active: false };
    setDragging(false);
    if (drag.moved) return;
    const id = pick(event.clientX, event.clientY);
    if (id && onSelectMachine) {
      const machine = sectorMachines.find((m) => m.id === id);
      if (machine) onSelectMachine(machine);
    }
  };

  const handleWheel = useCallback((event) => {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.12 : 0.89;
    setView((prev) => ({
      ...prev,
      zoom: Math.min(4, Math.max(0.6, prev.zoom * factor)),
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  return (
    <Stage>
      <CanvasEl
        ref={canvasRef}
        $dragging={dragging}
        $hover={Boolean(hoverId)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => {
          dragRef.current = { ...dragRef.current, active: false };
          setDragging(false);
          setHoverId(null);
        }}
        onDoubleClick={() => setView({ zoom: 1.28, panX: 0, panY: 0 })}
        title={hoverId ? 'Clique para abrir o diagnóstico' : 'Arraste para mover • roda para zoom'}
      />
      <Legend>
        <span><LegendDot $color={STATUS_COLORS.NORMAL} />ONLINE</span>
        <span><LegendDot $color={STATUS_COLORS.WARNING} />ATENÇÃO</span>
        <span><LegendDot $color={STATUS_COLORS.CRITICAL} />CRÍTICO</span>
        <span><LegendDot $color={STATUS_COLORS.OFFLINE} />OFFLINE</span>
      </Legend>
      <Hint>ARRASTE • RODA = ZOOM • DUPLO CLIQUE = CENTRALIZAR</Hint>
    </Stage>
  );
}

export default PixelArtTwin;
