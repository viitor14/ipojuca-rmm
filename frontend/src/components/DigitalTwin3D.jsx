import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import styled from 'styled-components';
import { fixTextEncoding } from '../styles/theme';
import { WorkstationModel } from './models/WorkstationModel';
import { DeskModel } from './models/DeskModel';
import { ChairModel } from './models/ChairModel';
import { ReceptionCounterModel } from './models/ReceptionCounterModel';
import { StorageCabinetModel } from './models/StorageCabinetModel';
import { ThermalPrinterModel } from './models/ThermalPrinterModel';
import { WaitingBenchModel } from './models/WaitingBenchModel';
import { PlantModel } from './models/PlantModel';
import { WaterDispenserModel } from './models/WaterDispenserModel';
import { computeCorridorBands, computeCorridorDoors } from './twin/floorPlan';

const StageContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #eaece8;
  overflow: hidden;
`;

const SectorTag3D = styled.div`
  pointer-events: none;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border: 1px solid #e4e8e3;
  color: #43695b;
  border-radius: 6px;
  padding: 3px 9px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.67rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transform: translate3d(-50%, -50%, 0);
  white-space: nowrap;
`;

function computeBoardBounds(sectors = []) {
  if (!sectors.length) {
    return {
      minX: -9.0,
      maxX: 9.0,
      minZ: -6.0,
      maxZ: 6.0,
      spanX: 18.0,
      spanZ: 12.0,
      centerX: 0,
      centerZ: 0,
      scale: 1,
    };
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;

  for (const s of sectors) {
    const bx = Number(s.bounds_x || 0);
    const bz = Number(s.bounds_z || 0);
    const hw = Number(s.width_3d || 9.0) / 2;
    const hd = Number(s.depth_3d || 5.0) / 2;
    minX = Math.min(minX, bx - hw);
    maxX = Math.max(maxX, bx + hw);
    minZ = Math.min(minZ, bz - hd);
    maxZ = Math.max(maxZ, bz + hd);
  }

  // Margem discreta em volta das salas: o tabuleiro acompanha a planta em vez
  // de manter um piso fixo grande, que deixava uma laje vazia na maquete.
  const pad = 0.6;
  minX -= pad;
  maxX += pad;
  minZ -= pad;
  maxZ += pad;

  const spanX = Math.max(6.0, maxX - minX);
  const spanZ = Math.max(6.0, maxZ - minZ);
  const centerX = (minX + maxX) / 2;
  const centerZ = (minZ + maxZ) / 2;
  const scale = Math.max(1, spanX / 18.0, spanZ / 12.0);

  return { minX, maxX, minZ, maxZ, spanX, spanZ, centerX, centerZ, scale };
}

/* Rig de Câmera Isométrica com interpolação suave e foco detalhado */
function CameraRig({
  cameraMode,
  selectedMachine,
  selectedSector,
  controlsRef,
  boardBounds,
  camScale = 1,
}) {
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const targetCamPos = useRef(new THREE.Vector3(-11.2, 10.0, 11.2));

  useFrame(({ camera }) => {
    const cx = boardBounds?.centerX || 0;
    const cz = boardBounds?.centerZ || 0;
    const scale = boardBounds?.scale || 1;

    if (cameraMode === 'FOCUS' && selectedMachine) {
      const posX = Number(selectedMachine.pos_x || 0);
      const posZ = Number(selectedMachine.pos_z || 0);
      targetLookAt.current.set(posX, 0.75, posZ);
      targetCamPos.current.set(posX - 3.8, 3.8, posZ + 3.8);
    } else if (cameraMode === 'SECTOR' && selectedSector) {
      const secX = Number(selectedSector.bounds_x || 0);
      const secZ = Number(selectedSector.bounds_z || 0);
      targetLookAt.current.set(secX, 0.65, secZ);
      targetCamPos.current.set(secX - 4.8, 5.8, secZ + 4.8);
    } else if (cameraMode === 'TOP') {
      targetLookAt.current.set(cx, 0, cz);
      targetCamPos.current.set(cx, 18.0 * scale, cz + 0.01);
    } else if (cameraMode === 'ORBIT') {
      const time = Date.now() * 0.00035;
      const radius = 15.0 * scale;
      targetLookAt.current.set(cx, 0.4, cz);
      targetCamPos.current.set(
        cx + Math.cos(time) * radius,
        10.5 * Math.min(1.6, scale),
        cz + Math.sin(time) * radius
      );
    } else {
      // ISO Padrão Habblaude Premium equilibrado e centrado na edificação
      targetLookAt.current.set(cx, 0.4, cz);
      targetCamPos.current.set(
        cx - 11.2 * scale * camScale,
        10.0 * Math.min(1.65, scale) * camScale,
        cz + 11.2 * scale * camScale
      );
    }

    if (cameraMode !== 'FREE') {
      camera.position.lerp(targetCamPos.current, 0.06);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, 0.06);
        controlsRef.current.update();
      }
    }
  });

  return null;
}

/* Texturas Procedurais e Materiais Estilo Habblaude de Baixo Ruído */
const _habblaudeTextureCache = new Map();

function getHabblaudeTexture(type, p1, p2) {
  if (typeof document === 'undefined') return null;
  const key = `${type}_${p1 || ''}_${p2 || ''}`;
  if (_habblaudeTextureCache.has(key)) return _habblaudeTextureCache.get(key);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (type === 'parquet') {
    // Parquet em carvalho nobre com réguas suaves e sem ruído pixelado
    canvas.width = 256;
    canvas.height = 256;
    ctx.fillStyle = '#D4BC9B';
    ctx.fillRect(0, 0, 256, 256);

    const plankH = 32;
    const plankW = 128;
    const colors = ['#DBC4A5', '#D1B795', '#D8BE9D', '#CAAE89'];

    for (let y = 0; y < 256; y += plankH) {
      const rowIndex = Math.floor(y / plankH);
      const shift = (rowIndex % 2 === 0) ? 0 : 64;
      for (let x = -64; x < 256; x += plankW) {
        const px = x + shift;
        const colIdx = Math.abs((rowIndex * 3 + Math.floor(px / plankW)) % colors.length);
        ctx.fillStyle = colors[colIdx];
        ctx.fillRect(px + 1, y + 1, plankW - 2, plankH - 2);

        // Chanfro superior sutil (highlight)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.fillRect(px + 2, y + 1, plankW - 4, 1);

        // Chanfro inferior sutil (sombra suave)
        ctx.fillStyle = 'rgba(80, 52, 24, 0.12)';
        ctx.fillRect(px + 2, y + plankH - 2, plankW - 4, 1);
      }
      // Linha de rejunte horizontal contínua fina
      ctx.fillStyle = '#9C7E5A';
      ctx.fillRect(0, y, 256, 1);
    }
  } else if (type === 'checker') {
    canvas.width = 128;
    canvas.height = 128;
    const c1 = p1 || '#FAF9F6';
    const c2 = p2 || '#CDE5D7';
    ctx.fillStyle = '#AFC8BA';
    ctx.fillRect(0, 0, 128, 128);
    const size = 64;
    for (let y = 0; y < 128; y += size) {
      for (let x = 0; x < 128; x += size) {
        ctx.fillStyle = (x / size + y / size) % 2 === 0 ? c1 : c2;
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(x + 2, y + 2, size - 4, 1);
      }
    }
  } else if (type === 'porcelain') {
    // Porcelanato de grande formato: tonalidade uniforme, veio discreto e rejunte fino.
    // Evita o aspecto de tabuleiro do xadrez e a repeticao visivel.
    canvas.width = 512;
    canvas.height = 512;
    ctx.fillStyle = '#EDEAE3';
    ctx.fillRect(0, 0, 512, 512);
    const size = 256;
    const shades = ['#F2F0EA', '#EDEAE3', '#E8E4DC'];
    for (let y = 0; y < 512; y += size) {
      for (let x = 0; x < 512; x += size) {
        const tone = Math.abs((x / size) * 7 + (y / size) * 13) % shades.length;
        ctx.fillStyle = shades[tone];
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

        // Veio mineral sutil, sem contraste
        ctx.strokeStyle = 'rgba(176, 168, 154, 0.10)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + size * 0.12, y + size * 0.72);
        ctx.bezierCurveTo(
          x + size * 0.34, y + size * 0.54,
          x + size * 0.62, y + size * 0.82,
          x + size * 0.88, y + size * 0.58
        );
        ctx.stroke();
      }
    }
    // Rejunte fino
    ctx.strokeStyle = 'rgba(150, 143, 130, 0.30)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 512; i += size) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(512, i);
      ctx.stroke();
    }
  } else if (type === 'grass') {
    // Gramado aveludado e uniforme de maquete: sem blocos quadriculados.
    canvas.width = 256;
    canvas.height = 256;
    const grad = ctx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#6E9A5C');
    grad.addColorStop(0.5, '#628F52');
    grad.addColorStop(1, '#6A9758');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    // Variação tonal muito discreta, sem formar padrão
    for (let i = 0; i < 900; i += 1) {
      const x = (i * 97) % 256;
      const y = (i * 61) % 256;
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(40,70,35,0.045)';
      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'deck') {
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = '#B08968';
    ctx.fillRect(0, 0, 128, 128);
    for (let x = 0; x < 128; x += 32) {
      ctx.fillStyle = '#C29C7C';
      ctx.fillRect(x + 1, 0, 30, 128);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.fillRect(x + 2, 0, 1, 128);
      ctx.fillStyle = '#7F5539';
      ctx.fillRect(x + 31, 0, 1, 128);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  _habblaudeTextureCache.set(key, texture);
  return texture;
}

/* Base de Diorama Isométrico Adaptativa ao Tamanho da Unidade */
function CorridorFloor({ sectors = [] }) {
  const bands = useMemo(() => computeCorridorBands(sectors), [sectors]);
  if (!bands.length) return null;

  return (
    <group>
      {bands.map((band, index) => {
        const width = band.x1 - band.x0;
        const depth = band.z1 - band.z0;
        const cx = (band.x0 + band.x1) / 2;
        const cz = (band.z0 + band.z1) / 2;
        return (
          <group key={`corridor-${index}`} position={[cx, 0, cz]}>
            {/* Piso de circulação em vinílico claro, distinto do porcelanato das salas */}
            <mesh receiveShadow position={[0, 0.018, 0]}>
              <boxGeometry args={[width, 0.02, depth]} />
              <meshStandardMaterial color="#DCD8CF" roughness={0.62} metalness={0.02} />
            </mesh>
            {/* Faixa central discreta, orienta o percurso sem competir com os equipamentos */}
            <mesh receiveShadow position={[0, 0.029, 0]}>
              <boxGeometry args={[width - 0.6, 0.004, Math.max(0.12, depth * 0.16)]} />
              <meshStandardMaterial color="#C4BFB4" roughness={0.7} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function IsometricBoard({ sectors = [], boardBounds }) {
  const bounds = boardBounds || computeBoardBounds(sectors);
  const { minX, maxX, minZ, maxZ, spanX, spanZ, centerX, centerZ } = bounds;

  const grassTex = useMemo(() => {
    const tex = getHabblaudeTexture('grass');
    if (tex) {
      const cloned = tex.clone();
      cloned.repeat.set(Math.round((spanX / 18) * 12), Math.round((spanZ / 12) * 9));
      cloned.needsUpdate = true;
      return cloned;
    }
    return null;
  }, [spanX, spanZ]);

  const deckTex = useMemo(() => {
    const tex = getHabblaudeTexture('deck');
    if (tex) {
      const cloned = tex.clone();
      cloned.repeat.set(3, 6);
      cloned.needsUpdate = true;
      return cloned;
    }
    return null;
  }, []);

  const corridorBands = useMemo(() => computeCorridorBands(sectors), [sectors]);
  const doorwayThresholds = useMemo(
    () => computeCorridorDoors(sectors, corridorBands),
    [sectors, corridorBands]
  );
  const entranceZ =
    corridorBands.length > 0
      ? (corridorBands[0].z0 + corridorBands[0].z1) / 2
      : centerZ;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Substrato de sustentação do diorama */}
      <mesh receiveShadow position={[centerX, -0.42, centerZ]}>
        <boxGeometry args={[spanX + 2.6, 0.50, spanZ + 2.6]} />
        <meshStandardMaterial color="#3A2515" roughness={0.9} />
      </mesh>

      {/* 2. Gramado Verde Vivo do Perímetro Externo */}
      <mesh receiveShadow position={[centerX, -0.16, centerZ]}>
        <boxGeometry args={[spanX + 2.1, 0.14, spanZ + 2.1]} />
        {grassTex ? (
          <meshStandardMaterial map={grassTex} roughness={0.75} />
        ) : (
          <meshStandardMaterial color="#558048" roughness={0.75} />
        )}
      </mesh>

      {/* 3. Laje Estrutural Contígua da Edificação */}
      <group position={[centerX, -0.05, centerZ]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[spanX + 0.4, 0.14, spanZ + 0.4]} />
          <meshStandardMaterial color="#D7DDD5" roughness={0.65} />
        </mesh>
        {/* Rodapé externo de pedra */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[spanX + 0.5, 0.04, spanZ + 0.5]} />
          <meshStandardMaterial color="#86958B" roughness={0.8} />
        </mesh>
      </group>

      {/* 4. Deck de madeira alinhado ao corredor derivado da planta (fachada oeste) */}
      <mesh receiveShadow position={[minX - 0.8, -0.04, entranceZ]}>
        <boxGeometry args={[1.6, 0.08, 2.4]} />
        {deckTex ? (
          <meshStandardMaterial map={deckTex} roughness={0.55} />
        ) : (
          <meshStandardMaterial color="#B08968" roughness={0.55} />
        )}
      </mesh>
      {/* Rampa suave de acessibilidade */}
      <mesh receiveShadow position={[minX - 1.75, -0.07, entranceZ]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.5, 0.04, 2.2]} />
        <meshStandardMaterial color="#A57D5C" roughness={0.65} />
      </mesh>
      {/* Capacho de boas-vindas hospitalar no acesso do corredor */}
      {corridorBands.length > 0 && (
        <mesh receiveShadow position={[minX + 0.55, 0.031, entranceZ]}>
          <boxGeometry args={[0.9, 0.005, 1.4]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.85} />
        </mesh>
      )}

      {/* 5. Soleiras em madeira nobre derivadas dinamicamente dos vãos voltados ao corredor */}
      {doorwayThresholds.map((th) => (
        <mesh key={`thresh-${th.id}`} position={[th.x, 0.031, th.z]}>
          <boxGeometry args={[1.3, 0.006, 0.16]} />
          <meshStandardMaterial color="#6B472B" roughness={0.45} />
        </mesh>
      ))}

      {/* 6. Cercas Vivas Discretas no Perímetro Externo */}
      <group position={[minX - 0.6, 0.22, minZ - 0.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[minX - 0.6, 0.22, maxZ + 0.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[maxX + 0.4, 0.22, minZ - 0.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[maxX + 0.4, 0.22, maxZ + 0.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

/* Configurações visuais aconchegantes por setor */
const SECTOR_THEMES = {
  REC: {
    floorType: 'porcelain',
    wallColor: '#FBEAD1',
    wallCapColor: '#1F8A70',
    baseboardColor: '#6B4A32',
    accentColor: '#E07A5F',
    hasRug: false,
    rugColor: '#4FA37A',
    rugBorderColor: '#F6E7C8',
    rugSize: [3.2, 2.0],
    rugPos: [0.5, 0.0, -0.2],
    hasClock: true,
    hasArt: true,
    hasPanel: true,
  },
  CONS: {
    floorType: 'porcelain',
    wallColor: '#E3F0E8',
    wallCapColor: '#8D6E63',
    baseboardColor: '#5C4033',
    accentColor: '#3D8B7D',
    hasRug: false,
    rugColor: '#7FB98A',
    rugBorderColor: '#DAD7CD',
    rugSize: [2.6, 1.8],
    rugPos: [0.6, 0.0, 0.6],
    hasClock: true,
    hasArt: true,
    hasPanel: false,
  },
  FARM: {
    floorType: 'checker',
    checkerColor1: '#FAF9F6',
    checkerColor2: '#CDE5D7',
    wallColor: '#E6F0EE',
    wallCapColor: '#78909C',
    baseboardColor: '#546E7A',
    hasRug: false,
    hasClock: true,
    hasCross: true,
    hasArt: false,
    hasPanel: false,
  },
  ADM: {
    floorType: 'parquet',
    wallColor: '#D7E3E7',
    wallCapColor: '#8D6E63',
    baseboardColor: '#5C4033',
    hasRug: false,
    rugColor: '#386641',
    rugBorderColor: '#E9D8A6',
    rugSize: [3.0, 2.2],
    rugPos: [0.4, 0.0, 0.4],
    hasClock: true,
    hasNoticeBoard: true,
    hasArt: true,
    hasPanel: false,
  },
  TI: {
    floorType: 'porcelain',
    wallColor: '#D2DCE4',
    wallCapColor: '#455A64',
    baseboardColor: '#263238',
    hasRug: false,
    hasClock: false,
    hasNoticeBoard: true,
    hasArt: false,
    hasPanel: true,
  },
};

const VALID_SECTOR_ARCHETYPES = new Set(['REC', 'CONS', 'FARM', 'ADM', 'TI']);

function resolveSectorArchetype(sector) {
  const explicit = String(sector?.room_theme || '').trim().toUpperCase();
  if (VALID_SECTOR_ARCHETYPES.has(explicit)) return explicit;

  const combined = `${sector?.code || ''} ${sector?.name || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();

  if (combined.includes('REC') || sector?.id === 1) return 'REC';
  if (combined.includes('MED') || combined.includes('CONS') || combined.includes('PSI') || sector?.id === 2) {
    return 'CONS';
  }
  if (combined.includes('FAR') || combined.includes('VAC') || combined.includes('MEDIC') || sector?.id === 3) {
    return 'FARM';
  }
  if (combined.includes('TI') || combined.includes('CPD') || sector?.id === 8) return 'TI';
  return 'ADM';
}

function getSectorTheme(sector, variant = null) {
  const archetype = resolveSectorArchetype(sector);
  const base = SECTOR_THEMES[archetype] || SECTOR_THEMES.ADM;
  // A variante artística de recepção aplica-se apenas à sala-piloto (REC),
  // preservando os acabamentos próprios de Consultórios, Farmácia, ADM e TI.
  if (!variant || archetype !== 'REC') return base;
  return { ...base, ...variant.room, hasRug: false };
}

/* Paredes arquitetônicas com vãos de portas, rodapés nobres e janelas translúcidas */
function SectorRoomVoxel({ sector, allSectors = [], sectorMachines = [], showLabels = true, variant = null }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const width = Number(sector.width_3d || 9.0);
  const depth = Number(sector.depth_3d || 5.0);

  const themeConfig = getSectorTheme(sector, variant);
  const wallHeight = 1.45;
  const wallThickness = 0.18;
  // Vãos reais de janela: o pano de parede é dividido em faixas, deixando abertura
  // de verdade (não um adesivo colado na parede).
  const winHalf = 0.65;
  const winXs = [-width / 3.4, width / 3.4];
  const winSillY = -0.155; // base do vão, em coordenada local da parede
  const winTopY = 0.595; // topo do vão
  const midSegments = [
    [-width / 2, winXs[0] - winHalf],
    [winXs[0] + winHalf, winXs[1] - winHalf],
    [winXs[1] + winHalf, width / 2],
  ]
    .map(([a, b]) => ({ w: b - a, c: (a + b) / 2 }))
    .filter((s) => s.w > 0.02);

  const isNorth = baseZ < 0;
  const hasWestNeighbor = allSectors.some((other) => {
    if (Number(other.id) === Number(sector.id)) return false;
    const ox = Number(other.bounds_x || 0);
    const oz = Number(other.bounds_z || 0);
    const ohw = Number(other.width_3d || 9.0) / 2;
    const ohd = Number(other.depth_3d || 5.0) / 2;
    const sameZBand = Math.abs(oz - baseZ) < depth / 2 + ohd - 0.5;
    return sameZBand && Math.abs(ox + ohw - (baseX - width / 2)) < 0.35;
  });
  const hasEastNeighbor = allSectors.some((other) => {
    if (Number(other.id) === Number(sector.id)) return false;
    const ox = Number(other.bounds_x || 0);
    const oz = Number(other.bounds_z || 0);
    const ohw = Number(other.width_3d || 9.0) / 2;
    const ohd = Number(other.depth_3d || 5.0) / 2;
    const sameZBand = Math.abs(oz - baseZ) < depth / 2 + ohd - 0.5;
    return sameZBand && Math.abs(ox - ohw - (baseX + width / 2)) < 0.35;
  });

  // Textura suave e refinada sem ruído.
  // A repetição é calculada em metros para manter a escala real das placas,
  // em vez de multiplicar a dimensão da sala por um fator arbitrário.
  const floorTexture = useMemo(() => {
    const cloneWithRepeat = (tex, rx, rz) => {
      if (!tex) return null;
      const cloned = tex.clone();
      cloned.wrapS = THREE.RepeatWrapping;
      cloned.wrapT = THREE.RepeatWrapping;
      cloned.repeat.set(Math.max(1, Math.round(rx)), Math.max(1, Math.round(rz)));
      cloned.needsUpdate = true;
      return cloned;
    };

    if (themeConfig.floorType === 'parquet') {
      return cloneWithRepeat(getHabblaudeTexture('parquet'), width / 1.6, depth / 1.6);
    }
    if (themeConfig.floorType === 'checker') {
      return cloneWithRepeat(
        getHabblaudeTexture('checker', themeConfig.checkerColor1, themeConfig.checkerColor2),
        width / 1.2,
        depth / 1.2
      );
    }
    // Porcelanato: 2 placas por textura, placa final de ~1,2 m
    return cloneWithRepeat(getHabblaudeTexture('porcelain'), width / 2.4, depth / 2.4);
  }, [themeConfig, width, depth]);

  const doorWidth = 1.2;
  const wallSegmentW = Math.max(0.5, (width - doorWidth) / 2);

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* 1. Piso modular do setor com textura refinada contígua à laje */}
      <mesh receiveShadow position={[0, 0.015, 0]}>
        <boxGeometry args={[width - 0.02, 0.025, depth - 0.02]} />
        {floorTexture ? (
          <meshStandardMaterial map={floorTexture} roughness={0.55} />
        ) : (
          <meshStandardMaterial color={themeConfig.wallColor} roughness={0.65} />
        )}
      </mesh>

      {/* 2. Tapete decorativo característico do Habblaude (Sem Z-Fighting nem Shadow Acne) */}
      {themeConfig.hasRug && (
        <group position={themeConfig.rugPos}>
          {/* Borda decorativa externa do tapete */}
          <mesh receiveShadow position={[0, 0.029, 0]}>
            <boxGeometry args={[themeConfig.rugSize[0] + 0.12, 0.004, themeConfig.rugSize[1] + 0.12]} />
            <meshStandardMaterial color={themeConfig.rugBorderColor} roughness={0.85} />
          </mesh>
          {/* Corpo aveludado interno do tapete */}
          <mesh receiveShadow position={[0, 0.032, 0]}>
            <boxGeometry args={[themeConfig.rugSize[0], 0.004, themeConfig.rugSize[1]]} />
            <meshStandardMaterial color={themeConfig.rugColor} roughness={0.9} />
          </mesh>
        </group>
      )}

      {/* 3. PAREDE NORTE (Z-) */}
      {isNorth ? (
        /* Parede Externa dos Fundos do Prédio (Altura Total com 2 Janelas e Decorações) */
        <group position={[0, wallHeight / 2, -depth / 2 + wallThickness / 2]}>
          {/* Faixa inferior (peitoril): parede contínua até a base dos vãos */}
          <mesh receiveShadow position={[0, -wallHeight / 2 + 0.285, 0]}>
            <boxGeometry args={[width, 0.57, wallThickness]} />
            <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
          </mesh>
          {/* Faixa superior (verga): parede contínua acima dos vãos */}
          <mesh receiveShadow position={[0, wallHeight / 2 - 0.065, 0]}>
            <boxGeometry args={[width, 0.13, wallThickness]} />
            <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
          </mesh>
          {/* Faixa intermediária: dividida em segmentos para abrir os dois vãos reais */}
          {midSegments.map((seg, idx) => (
            <mesh key={`wall-n-mid-${idx}`} receiveShadow position={[seg.c, 0.22, 0]}>
              <boxGeometry args={[seg.w, 0.75, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
          ))}
          <mesh position={[0, -wallHeight / 2 + 0.06, wallThickness / 2 + 0.01]}>
            <boxGeometry args={[width + 0.02, 0.12, 0.02]} />
            <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
            <boxGeometry args={[width + 0.02, 0.05, wallThickness + 0.02]} />
            <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
          </mesh>

          {/* Fundo de jardim atrás dos vãos: dá profundidade real à janela */}
          <mesh position={[0, 0.22, -wallThickness / 2 - 0.22]}>
            <planeGeometry args={[width, 1.5]} />
            <meshBasicMaterial color="#CFE9F7" />
          </mesh>
          <mesh position={[0, -0.30, -wallThickness / 2 - 0.21]}>
            <planeGeometry args={[width, 0.55]} />
            <meshBasicMaterial color="#9CCFA8" />
          </mesh>

          {/* Duas janelas com vão real: moldura, vidro, travessas e peitoril saliente */}
          {winXs.map((winX, idx) => (
            <group key={`win-n-${idx}`} position={[winX, 0.22, 0]}>
              {/* Moldura em quatro barras, embutida na espessura da parede */}
              <mesh position={[0, 0.345, 0]} castShadow>
                <boxGeometry args={[1.3, 0.06, wallThickness + 0.02]} />
                <meshStandardMaterial color="#7A5230" roughness={0.5} />
              </mesh>
              <mesh position={[0, -0.345, 0]} castShadow>
                <boxGeometry args={[1.3, 0.06, wallThickness + 0.02]} />
                <meshStandardMaterial color="#7A5230" roughness={0.5} />
              </mesh>
              <mesh position={[-0.62, 0, 0]} castShadow>
                <boxGeometry args={[0.06, 0.75, wallThickness + 0.02]} />
                <meshStandardMaterial color="#7A5230" roughness={0.5} />
              </mesh>
              <mesh position={[0.62, 0, 0]} castShadow>
                <boxGeometry args={[0.06, 0.75, wallThickness + 0.02]} />
                <meshStandardMaterial color="#7A5230" roughness={0.5} />
              </mesh>
              {/* Vidro translúcido dentro do vão */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.18, 0.63, 0.02]} />
                <meshStandardMaterial
                  color="#BFE6FA"
                  transparent
                  opacity={0.34}
                  roughness={0.06}
                  metalness={0.15}
                />
              </mesh>
              {/* Travessas internas */}
              <mesh position={[0, 0, 0.014]}>
                <boxGeometry args={[0.035, 0.63, 0.012]} />
                <meshStandardMaterial color="#7A5230" />
              </mesh>
              <mesh position={[0, 0, 0.014]}>
                <boxGeometry args={[1.18, 0.035, 0.012]} />
                <meshStandardMaterial color="#7A5230" />
              </mesh>
              {/* Peitoril saliente, para dentro e para fora */}
              <mesh position={[0, -0.40, wallThickness / 2 + 0.03]} castShadow>
                <boxGeometry args={[1.42, 0.05, 0.16]} />
                <meshStandardMaterial color="#8A5F38" roughness={0.45} />
              </mesh>
            </group>
          ))}

          {/* Painel ripado decorativo na recepção */}
          {themeConfig.hasPanel && (
            <mesh position={[0, 0.05, wallThickness / 2 + 0.015]}>
              <boxGeometry args={[1.8, 0.85, 0.02]} />
              <meshStandardMaterial color={themeConfig.accentColor || '#DDB892'} roughness={0.5} />
            </mesh>
          )}

          {/* Relógio analógico redondo de madeira com ponteiros */}
          {themeConfig.hasClock && (
            <group position={[0, 0.32, wallThickness / 2 + 0.02]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.03, 20]} />
                <meshStandardMaterial color="#4A3326" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.01, 20]} />
                <meshStandardMaterial color="#FFFDF7" roughness={0.35} />
              </mesh>
              {/* Ponteiro das horas */}
              <mesh position={[0, 0.03, 0.025]}>
                <boxGeometry args={[0.02, 0.08, 0.005]} />
                <meshBasicMaterial color="#1F242B" />
              </mesh>
              {/* Ponteiro dos minutos */}
              <mesh position={[0.03, 0, 0.025]}>
                <boxGeometry args={[0.08, 0.02, 0.005]} />
                <meshBasicMaterial color="#1F242B" />
              </mesh>
            </group>
          )}

          {/* Quadro de arte emoldurado (posicionado no pano de parede livre, fora da janela) */}
          {themeConfig.hasArt && (
            <group position={[-1.45, 0.22, wallThickness / 2 + 0.03]}>
              <mesh>
                <boxGeometry args={[0.76, 0.58, 0.025]} />
                <meshStandardMaterial color="#6B472B" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0, 0.015]}>
                <boxGeometry args={[0.64, 0.46, 0.005]} />
                <meshStandardMaterial color="#588157" roughness={0.65} />
              </mesh>
              <mesh position={[0.14, 0.10, 0.02]}>
                <circleGeometry args={[0.07, 12]} />
                <meshBasicMaterial color="#F4A261" />
              </mesh>
            </group>
          )}

          {/* Mural de avisos (ADM - posicionado fora da janela) */}
          {themeConfig.hasNoticeBoard && (
            <group position={[-1.45, 0.22, wallThickness / 2 + 0.03]}>
              <mesh>
                <boxGeometry args={[0.82, 0.58, 0.025]} />
                <meshStandardMaterial color="#C5A059" roughness={0.8} />
              </mesh>
              <mesh position={[-0.22, 0.10, 0.016]}>
                <boxGeometry args={[0.15, 0.15, 0.005]} />
                <meshBasicMaterial color="#FDE047" />
              </mesh>
              <mesh position={[0.06, 0.10, 0.016]}>
                <boxGeometry args={[0.15, 0.15, 0.005]} />
                <meshBasicMaterial color="#93C5FD" />
              </mesh>
            </group>
          )}
        </group>
      ) : (
        /* Parede Divisória Interna Voltada Para o Corredor (Com Vão de Porta de 1.2m e Portal de Madeira) */
        <group position={[0, 0, -depth / 2 + wallThickness / 2]}>
          <group position={[-doorWidth / 2 - wallSegmentW / 2, wallHeight / 2, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[wallSegmentW, wallHeight, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, -wallHeight / 2 + 0.06, wallThickness / 2 + 0.01]}>
              <boxGeometry args={[wallSegmentW, 0.12, 0.02]} />
              <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
            </mesh>
            <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
              <boxGeometry args={[wallSegmentW, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          <group position={[doorWidth / 2 + wallSegmentW / 2, wallHeight / 2, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[wallSegmentW, wallHeight, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, -wallHeight / 2 + 0.06, wallThickness / 2 + 0.01]}>
              <boxGeometry args={[wallSegmentW, 0.12, 0.02]} />
              <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
            </mesh>
            <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
              <boxGeometry args={[wallSegmentW, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          <group position={[0, 1.28, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[doorWidth + 0.02, 0.34, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.17 + 0.02, 0]}>
              <boxGeometry args={[doorWidth + 0.02, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          {/* Batentes de madeira no vão da porta */}
          <group position={[0, 0, 0]}>
            <mesh position={[-doorWidth / 2, 0.55, 0]}>
              <boxGeometry args={[0.08, 1.12, wallThickness + 0.03]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[doorWidth / 2, 0.55, 0]}>
              <boxGeometry args={[0.08, 1.12, wallThickness + 0.03]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.11, 0]}>
              <boxGeometry args={[doorWidth + 0.08, 0.08, wallThickness + 0.04]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.25, -wallThickness / 2 - 0.02]}>
              <boxGeometry args={[1.0, 0.16, 0.02]} />
              <meshStandardMaterial color="#2B3A42" roughness={0.3} />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. PAREDE SUL (Z+) */}
      {isNorth ? (
        /* Parede Divisória Interna Voltada Para o Corredor (Com Vão de Porta de 1.2m e Portal de Madeira) */
        <group position={[0, 0, depth / 2 - wallThickness / 2]}>
          <group position={[-doorWidth / 2 - wallSegmentW / 2, wallHeight / 2, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[wallSegmentW, wallHeight, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, -wallHeight / 2 + 0.06, -wallThickness / 2 - 0.01]}>
              <boxGeometry args={[wallSegmentW, 0.12, 0.02]} />
              <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
            </mesh>
            <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
              <boxGeometry args={[wallSegmentW, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          <group position={[doorWidth / 2 + wallSegmentW / 2, wallHeight / 2, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[wallSegmentW, wallHeight, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, -wallHeight / 2 + 0.06, -wallThickness / 2 - 0.01]}>
              <boxGeometry args={[wallSegmentW, 0.12, 0.02]} />
              <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
            </mesh>
            <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
              <boxGeometry args={[wallSegmentW, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          <group position={[0, 1.28, 0]}>
            <mesh receiveShadow>
              <boxGeometry args={[doorWidth + 0.02, 0.34, wallThickness]} />
              <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.17 + 0.02, 0]}>
              <boxGeometry args={[doorWidth + 0.02, 0.05, wallThickness + 0.02]} />
              <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
            </mesh>
          </group>

          <group position={[0, 0, 0]}>
            <mesh position={[-doorWidth / 2, 0.55, 0]}>
              <boxGeometry args={[0.08, 1.12, wallThickness + 0.03]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[doorWidth / 2, 0.55, 0]}>
              <boxGeometry args={[0.08, 1.12, wallThickness + 0.03]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.11, 0]}>
              <boxGeometry args={[doorWidth + 0.08, 0.08, wallThickness + 0.04]} />
              <meshStandardMaterial color="#5C4033" roughness={0.5} />
            </mesh>
            <mesh position={[0, 1.25, wallThickness / 2 + 0.02]}>
              <boxGeometry args={[1.0, 0.16, 0.02]} />
              <meshStandardMaterial color="#2B3A42" roughness={0.3} />
            </mesh>
          </group>
        </group>
      ) : (
        /* Parede Frontal Externa em Perfil Baixo Cutaway (SEM sombras duras que cortem a sala) */
        <group position={[0, 0.18, depth / 2 - wallThickness / 2]}>
          <mesh receiveShadow>
            <boxGeometry args={[width, 0.36, wallThickness]} />
            <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.12, -wallThickness / 2 - 0.01]}>
            <boxGeometry args={[width + 0.02, 0.12, 0.02]} />
            <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.18 + 0.015, 0]}>
            <boxGeometry args={[width + 0.02, 0.04, wallThickness + 0.02]} />
            <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
          </mesh>
        </group>
      )}

      {/* 5. PAREDE LATERAL OESTE (X-) */}
      <group position={[-width / 2 + wallThickness / 2, wallHeight / 2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, depth]} />
          <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
        </mesh>
        <mesh position={[wallThickness / 2 + 0.01, -wallHeight / 2 + 0.06, 0]}>
          <boxGeometry args={[0.02, 0.12, depth + 0.02]} />
          <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
        </mesh>
        <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
          <boxGeometry args={[wallThickness + 0.02, 0.05, depth + 0.02]} />
          <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
        </mesh>

        {/* Janela lateral oeste com vidros duplos (apenas fachada externa) */}
        {!hasWestNeighbor && (
          <group position={[0, 0.22, 0]}>
            <mesh position={[wallThickness / 2 + 0.015, 0, 0]}>
              <boxGeometry args={[0.03, 0.75, 1.2]} />
              <meshStandardMaterial color="#5C4033" roughness={0.55} />
            </mesh>
            <mesh position={[wallThickness / 2 + 0.02, 0, 0]}>
              <boxGeometry args={[0.01, 0.61, 1.06]} />
              <meshStandardMaterial color="#D1E8FA" transparent opacity={0.65} roughness={0.1} />
            </mesh>
            <mesh position={[wallThickness / 2 + 0.025, 0, 0]}>
              <boxGeometry args={[0.012, 0.61, 0.04]} />
              <meshStandardMaterial color="#4A3326" />
            </mesh>
            <mesh position={[wallThickness / 2 + 0.025, 0, 0]}>
              <boxGeometry args={[0.012, 0.04, 1.06]} />
              <meshStandardMaterial color="#4A3326" />
            </mesh>
          </group>
        )}
      </group>

      {/* 6. PAREDE LATERAL LESTE (X+) — fechada quando não há sala vizinha colada à direita */}
      {!hasEastNeighbor && (
        <group position={[width / 2 - wallThickness / 2, wallHeight / 2, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[wallThickness, wallHeight, depth]} />
            <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
          </mesh>
          <mesh position={[-wallThickness / 2 - 0.01, -wallHeight / 2 + 0.06, 0]}>
            <boxGeometry args={[0.02, 0.12, depth + 0.02]} />
            <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
            <boxGeometry args={[wallThickness + 0.02, 0.05, depth + 0.02]} />
            <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
          </mesh>
          {baseX > 0 && (
            <group position={[0, 0.22, 0]}>
              <mesh position={[-wallThickness / 2 - 0.015, 0, 0]}>
                <boxGeometry args={[0.03, 0.75, 1.2]} />
                <meshStandardMaterial color="#5C4033" roughness={0.55} />
              </mesh>
              <mesh position={[-wallThickness / 2 - 0.02, 0, 0]}>
                <boxGeometry args={[0.01, 0.61, 1.06]} />
                <meshStandardMaterial color="#D1E8FA" transparent opacity={0.65} roughness={0.1} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* Rótulo 3D de identificação do setor */}
      {showLabels && (
        <Html position={[0, 1.65, 0]} center distanceFactor={16}>
          <SectorTag3D>
            {fixTextEncoding(sector.name)} ({sectorMachines.length} PCs)
          </SectorTag3D>
        </Html>
      )}
    </group>
  );
}

/* =========================================================================
 * SALA-PILOTO (RECEPÇÃO): MOBILIÁRIO E AMBIENTAÇÃO DE ALTA FIDELIDADE
 * ========================================================================= */
const RECEPTION_COUNTER = { x: -2.2, z: 0.55, topY: 1.02 };

function ReceptionPilotFurniture({ halfW, halfD }) {
  return (
    <group>
      {/* 1. BALCÃO DE ATENDIMENTO EM L (reception_counter.glb) - Ponto focal na entrada */}
      <ReceptionCounterModel position={[RECEPTION_COUNTER.x, 0, RECEPTION_COUNTER.z]} />

      {/* 2. IMPRESSORA TÉRMICA DE PRONTUÁRIO NO BALCÃO (thermal_printer.glb) - tampo em 0.99 */}
      <ThermalPrinterModel position={[-2.95, 1.04, 0.40]} isActive={true} />

      {/* 3. ARMÁRIO DE ARQUIVOS E PRONTUÁRIOS (storage_cabinet.glb)
          Posicionado a partir de halfW/halfD reais do setor: o rodapé projeta 0.11
          além da face interna da parede, e o armário tem 0.464 de meio-largura. */}
      <StorageCabinetModel
        position={[-halfW + 0.80, 0, -halfD + 0.60]}
        rotation={[0, Math.PI, 0]}
      />

      {/* 4. BEBEDOURO DE COLUNA HOSPITALAR (water_dispenser.glb) - bevel e subsurf no Blender */}
      <WaterDispenserModel position={[halfW - 0.65, 0, -halfD + 0.42]} isActive={true} />

      {/* 5. PLANTA DECORATIVA EM VASO DE CERÂMICA (decorative_plant.glb, folhagem orgânica) */}
      <PlantModel position={[halfW - 0.55, 0, halfD - 0.6]} />

      {/* 6. LONGARINA DE ESPERA PARA PACIENTES (waiting_bench.glb) - Parede oeste, assentos voltados para a sala (+X) */}
      <WaitingBenchModel position={[-halfW + 0.55, 0, -0.35]} rotation={[0, -Math.PI / 2, 0]} />
    </group>
  );
}

/* Mobiliários clínicos para os demais setores (Consultório, Farmácia, TI) */
function ClinicalFurnitureVoxel({ sector }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const archetype = resolveSectorArchetype(sector);
  const isReception = archetype === 'REC' && Number(sector.width_3d || 9.0) >= 7.5;
  const isConsult = archetype === 'CONS';
  const isPharma = archetype === 'FARM';
  const isNurse = archetype === 'ADM';
  const isServer = archetype === 'TI';
  const halfW = Number(sector.width_3d || 9.0) / 2;
  const halfD = Number(sector.depth_3d || 5.0) / 2;
  const isNorth = baseZ < 0;
  const backZ = isNorth ? -halfD + 0.6 : halfD - 0.6;

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* 1. RECEPÇÃO & TRIAGEM: Renderiza a Sala-Piloto de Alta Fidelidade */}
      {isReception && <ReceptionPilotFurniture halfW={halfW} halfD={halfD} />}

      {/* 2. CONSULTÓRIO MÉDICO / ENFERMAGEM */}
      {(isConsult || isNurse) && (
        <group>
          {/* Maca de Exame Clínico Detalhada */}
          <group position={[halfW - 1.5, 0, backZ + 0.1]}>
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.7, 0.6, 0.72]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.2} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.64, 0]} castShadow>
              <boxGeometry args={[1.74, 0.12, 0.76]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
            </mesh>
            <mesh position={[0.1, 0.71, 0]}>
              <boxGeometry args={[1.3, 0.015, 0.72]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
            </mesh>
            <mesh position={[-0.68, 0.73, 0]} castShadow>
              <boxGeometry args={[0.3, 0.07, 0.56]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
            </mesh>
            <group position={[0, 0, 0.54]}>
              <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[0.42, 0.2, 0.3]} />
                <meshStandardMaterial color="#CBD5E1" />
              </mesh>
              <mesh position={[0, 0.25, -0.06]}>
                <boxGeometry args={[0.42, 0.15, 0.16]} />
                <meshStandardMaterial color="#94A3B8" />
              </mesh>
            </group>
          </group>

          {/* Suporte de Soro Fisiológico */}
          <group position={[-0.4, 0, backZ + 0.1]}>
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.36, 0.04, 0.06]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.06, 0.04, 0.36]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 1.55, 8]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.58, 0]}>
              <boxGeometry args={[0.18, 0.02, 0.02]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            <mesh position={[-0.06, 1.45, 0]}>
              <boxGeometry args={[0.08, 0.18, 0.04]} />
              <meshStandardMaterial color="#BAE6FD" transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Biombo hospitalar sanfonado */}
          <group position={[-halfW + 0.5, 0, 0.2]}>
            <mesh position={[0, 0.75, -0.42]} rotation={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            <mesh position={[0.06, 0.75, 0]} rotation={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.75, 0.42]} rotation={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. FARMÁCIA & VACINAÇÃO */}
      {isPharma && (
        <group>
          <group position={[-halfW + 0.6, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.5, 1.9, 0.5]} />
              <meshStandardMaterial color="#F8FAF8" roughness={0.7} />
            </mesh>
            {[0.35, 0.75, 1.15, 1.55].map((y, idx) => (
              <group key={`shelf-${idx}`}>
                <mesh position={[0, y, 0.24]}>
                  <boxGeometry args={[2.42, 0.035, 0.08]} />
                  <meshStandardMaterial color="#C8B298" roughness={0.5} />
                </mesh>
                {[-0.95, -0.65, -0.35, -0.05, 0.25, 0.55, 0.85].map((x, cIdx) => {
                  const colors = ['#93C5FD', '#A7F3D0', '#FDE68A', '#FBCFE8', '#E5E7EB', '#6EE7B7', '#BAE6FD'];
                  const boxColor = colors[(idx * 3 + cIdx) % colors.length];
                  return (
                    <mesh key={`box-${cIdx}`} position={[x, y + 0.08, 0.22]} castShadow>
                      <boxGeometry args={[0.18, 0.12, 0.08]} />
                      <meshStandardMaterial color={boxColor} roughness={0.7} />
                    </mesh>
                  );
                })}
              </group>
            ))}
          </group>
          <group position={[1.5, 0, halfD - 0.7]}>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 1.0, 0.5]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
            </mesh>
            <mesh position={[0, 1.02, 0]}>
              <boxGeometry args={[1.85, 0.05, 0.55]} />
              <meshStandardMaterial color="#C8B298" roughness={0.4} />
            </mesh>
          </group>
        </group>
      )}

      {/* 4. SALA DE SERVIDORES / TI */}
      {isServer && (
        <group position={[0, 0, backZ + 0.2]}>
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 1.9, 0.85]} />
            <meshStandardMaterial color="#1E232A" roughness={0.65} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.95, 0.43]}>
            <boxGeometry args={[0.88, 1.72, 0.02]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} transparent opacity={0.82} />
          </mesh>
          <mesh position={[0.4, 0.95, 0.45]}>
            <boxGeometry args={[0.02, 0.2, 0.03]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.5, 0.4]}>
            <boxGeometry args={[0.82, 0.09, 0.06]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0, 1.35, 0.4]}>
            <boxGeometry args={[0.82, 0.11, 0.06]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
          {[-0.32, -0.24, -0.16, -0.08, 0.0, 0.08, 0.16, 0.24, 0.32].map((x, idx) => (
            <mesh key={`led-${idx}`} position={[x, 1.35, 0.435]}>
              <boxGeometry args={[0.025, 0.025, 0.01]} />
              <meshBasicMaterial color={idx % 4 === 0 ? '#D97706' : '#2D6A4F'} />
            </mesh>
          ))}
          <mesh position={[0, 1.15, 0.4]}>
            <boxGeometry args={[0.82, 0.14, 0.06]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <group position={[0.75, 0, 0]}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <boxGeometry args={[0.3, 0.5, 0.5]} />
              <meshStandardMaterial color="#0F172A" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.4, 0.26]}>
              <boxGeometry args={[0.06, 0.03, 0.01]} />
              <meshBasicMaterial color="#3B82F6" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}

/* Distribui as estações de forma espacialmente coerente em cada setor */
function computeMachineLayout(machines, sectors) {
  const result = new Map();
  const bySector = new Map();
  machines.forEach((m) => {
    const key = Number(m.sector_id);
    if (!bySector.has(key)) bySector.set(key, []);
    bySector.get(key).push(m);
  });
  bySector.forEach((list, sectorId) => {
    const sector = sectors.find((sec) => Number(sec.id) === sectorId);
    if (!sector) return;
    const ordered = [...list].sort((a, b) => {
      // Prioriza a estação-piloto (id 9 ou DESKTOP-32HK6KT) como posto principal
      if (Number(a.id) === 9 || a.hostname === 'DESKTOP-32HK6KT') return -1;
      if (Number(b.id) === 9 || b.hostname === 'DESKTOP-32HK6KT') return 1;
      return Number(a.id) - Number(b.id);
    });
    const bx = Number(sector.bounds_x || 0);
    const bz = Number(sector.bounds_z || 0);
    const isReception =
      resolveSectorArchetype(sector) === 'REC' && Number(sector.width_3d || 9.0) >= 7.5;

    if (isReception) {
      // Layout ergonômico e 100% livre de colisões da Recepção (Ciclo #24)
      const receptionSlots = [
        // Posto 1: Atendimento Principal (Piloto machine.id = 9) na bancada interna do balcão em L
        // Derivado das constantes do balcão: nunca flutua se bounds_x/bounds_z mudarem via CRUD
        {
          x: bx + RECEPTION_COUNTER.x + 0.45,
          z: bz + RECEPTION_COUNTER.z + 0.30,
          rotY: Math.PI,
          hideDesk: true,
          surfaceY: RECEPTION_COUNTER.topY,
          showPrinter: false,
        },
        // Posto 2: Atendimento Secundário / Apoio (Mesa executiva sul)
        { x: bx + 2.20, z: bz + 0.85, rotY: Math.PI, surfaceY: 0.816 },
        // Posto 3: Triagem Clínica (Quadrante norte, tela voltada para o usuário e câmera)
        { x: bx - 1.20, z: bz - 1.20, rotY: Math.PI, surfaceY: 0.816 },
        // Posto 4: Regulação / Pós-Consulta (Quadrante nordeste)
        { x: bx + 2.20, z: bz - 1.20, rotY: Math.PI, surfaceY: 0.816 },
      ];
      ordered.forEach((m, i) => {
        const slot = receptionSlots[i] || {
          x: bx + (i % 2 === 0 ? -2.0 : 2.0),
          z: bz + (Math.floor(i / 2) * 1.5),
          rotY: Math.PI,
          surfaceY: 0.816,
        };
        result.set(m.id, slot);
      });
    } else {
      // Distribuição padrão em grade para os demais setores clínicos
      const w = Number(sector.width_3d || 9.0);
      const cols = ordered.length <= 4 ? 2 : 3;
      const spacing = Math.min(2.4, (w - 2.0) / cols);
      ordered.forEach((m, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        result.set(m.id, {
          x: bx + (col - (cols - 1) / 2) * spacing,
          z: bz - 0.5 + row * 1.85,
          rotY: Math.PI,
          surfaceY: 0.816,
        });
      });
    }
  });
  return result;
}

/* =========================================================================
 * ESTAÇÃO DE TRABALHO: MESA, CADEIRA E COMPUTADOR EM MODELOS GLB MODULARES
 * ========================================================================= */
function ComputerAvatarVoxel({ machine, isSelected, onSelect, layoutPos, showLabels = true }) {
  const posX = layoutPos ? layoutPos.x : Number(machine.pos_x || 0);
  const posZ = layoutPos ? layoutPos.z : Number(machine.pos_z || 0);
  const rotY = layoutPos?.rotY || 0;
  const hideDesk = Boolean(layoutPos?.hideDesk);
  // Altura exata do tampo da mesa (0.815) ou tampo do balcão (1.02)
  const surfaceY = layoutPos?.surfaceY ?? 0.816;

  return (
    <group position={[posX, 0, posZ]} rotation={[0, rotY, 0]}>
      {/* 1. MESA DE TRABALHO EXECUTIVA (office_desk.glb) - Omitida quando integrada à bancada do balcão */}
      {!hideDesk && <DeskModel position={[0, 0, 0]} />}

      {/* 2. CADEIRA DE ESCRITÓRIO ERGONÔMICA (ergonomic_chair.glb) */}
      <ChairModel position={[-0.15, 0, -0.52]} rotation={[0, Math.PI, 0]} />

      {/* 3. ESTAÇÃO DE TRABALHO PC: Modelo GLB profissional workstation_pc.glb */}
      <WorkstationModel
        machine={machine}
        isSelected={isSelected}
        onSelect={onSelect}
        showLabel={showLabels}
        position={[0, surfaceY, 0]}
      />
    </group>
  );
}

/* =========================================================================
 * COMPONENTE PRINCIPAL: GÊMEO DIGITAL 3D (HABBLAUDE PREMIUM ISOMÉTRICO)
 * ========================================================================= */
export function DigitalTwin3D({
  activeUnit,
  machines = [],
  selectedMachine,
  selectedSector,
  onSelectMachine,
  cameraMode = 'ISO',
  onUserOrbit,
  roomVariant = null,
  sceneLayers = {
    furniture: true,
    labels: true,
  },
}) {
  const sectors = activeUnit?.sectors || [];
  const controlsRef = useRef();

  const boardBounds = useMemo(() => computeBoardBounds(sectors), [sectors]);

  const validSectorIds = useMemo(
    () => new Set(sectors.map((s) => Number(s.id))),
    [sectors]
  );

  const unitMachines = useMemo(() => {
    return (machines || []).filter((m) => {
      const matchSector = m.sector_id && validSectorIds.has(Number(m.sector_id));
      const matchUnit = activeUnit?.id && Number(m.unit_id) === Number(activeUnit.id);
      return matchSector || matchUnit;
    });
  }, [machines, validSectorIds, activeUnit?.id]);

  const machineLayout = useMemo(
    () => computeMachineLayout(unitMachines, sectors),
    [unitMachines, sectors]
  );

  const isSelectedValid =
    selectedMachine && unitMachines.some((m) => m.id === selectedMachine.id);

  const focusMachine = isSelectedValid
    ? {
        ...selectedMachine,
        pos_x: machineLayout.get(selectedMachine.id)?.x ?? selectedMachine.pos_x,
        pos_z: machineLayout.get(selectedMachine.id)?.z ?? selectedMachine.pos_z,
      }
    : null;

  const variantLight = roomVariant?.lighting || null;
  // Hook de QA: ?dpr=2 força resolução de captura sem alterar o padrão de produção.
  const dprOverride = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const raw = new URLSearchParams(window.location.search).get('dpr');
    const n = Number(raw);
    return Number.isFinite(n) && n >= 1 && n <= 3 ? n : null;
  }, []);

  // Hook de QA: ?cam=1.4 afasta a câmera isométrica para capturas de conjunto.
  const camScale = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    const n = Number(new URLSearchParams(window.location.search).get('cam'));
    return Number.isFinite(n) && n >= 0.6 && n <= 3 ? n : 1;
  }, []);

  return (
    <StageContainer>
      <Canvas
        shadows
        dpr={dprOverride || [1, 2]}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [-11.2, 10.0, 11.2], fov: 34 }}
      >
        <color attach="background" args={[variantLight?.background || '#EAECE8']} />

        {/* ILUMINAÇÃO DE MAQUETE ARQUITETÔNICA: ambiente baixo, chave definida,
            preenchimento suave. Evita o aspecto lavado de ambiente alto + chave baixa. */}
        {/* 1. Luz ambiente difusa uniforme */}
        <ambientLight
          intensity={variantLight?.ambient?.intensity ?? 0.42}
          color={variantLight?.ambient?.color || '#FFF8EE'}
        />

        {/* 2. Luz de hemisfério para preenchimento de faces verticais */}
        <hemisphereLight
          skyColor={variantLight?.hemisphere?.sky || '#FFF6E8'}
          groundColor={variantLight?.hemisphere?.ground || '#C9D6C4'}
          intensity={variantLight?.hemisphere?.intensity ?? 0.34}
        />

        {/* 3. Luz direcional principal com sombras suaves (Soft Contact Shadows) */}
        <directionalLight
          position={[
            (boardBounds?.centerX || 0) + 12 * (boardBounds?.scale || 1),
            22 * Math.min(1.6, boardBounds?.scale || 1),
            (boardBounds?.centerZ || 0) + 12 * (boardBounds?.scale || 1),
          ]}
          intensity={variantLight?.key?.intensity ?? 2.15}
          color={variantLight?.key?.color || '#FFF6E6'}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={Math.max(50, Math.round(50 * (boardBounds?.scale || 1)))}
          shadow-camera-left={-12 * (boardBounds?.scale || 1)}
          shadow-camera-right={12 * (boardBounds?.scale || 1)}
          shadow-camera-top={12 * (boardBounds?.scale || 1)}
          shadow-camera-bottom={-12 * (boardBounds?.scale || 1)}
          shadow-bias={-0.00004}
          shadow-normalBias={0.025}
          shadow-radius={4.5}
        />

        {/* 4. Luz secundária de preenchimento (Fill Light) para eliminar faixas escuras */}
        <directionalLight
          position={[-12, 12, -10]}
          intensity={variantLight?.fill?.intensity ?? 0.26}
          color={variantLight?.fill?.color || '#E2E7E2'}
        />

        {/* Rig de Câmera com interpolação fluida */}
        <CameraRig
          cameraMode={cameraMode}
          selectedMachine={focusMachine}
          selectedSector={selectedSector}
          controlsRef={controlsRef}
          boardBounds={boardBounds}
          camScale={camScale}
        />

        {/* Base da Maquete (Adaptativa à quantidade e largura dos setores) */}
        <IsometricBoard sectors={sectors} boardBounds={boardBounds} />
        <CorridorFloor sectors={sectors} />

        {/* Salas e Setores da Unidade com Paredes Cutaway */}
        {sectors.map((sector) => {
          const sectorMachines = unitMachines.filter(
            (m) => Number(m.sector_id) === Number(sector.id)
          );
          return (
            <group key={`sector-${sector.id}`}>
              <SectorRoomVoxel
                sector={sector}
                allSectors={sectors}
                sectorMachines={sectorMachines}
                showLabels={sceneLayers.labels !== false}
                variant={roomVariant}
              />
              {sceneLayers.furniture !== false && (
                <ClinicalFurnitureVoxel sector={sector} />
              )}
            </group>
          );
        })}

        {/* Computadores Reais com Miniaturas sobre as Mesas e Identificação de Status em 3 Camadas */}
        {unitMachines.map((machine) => (
          <ComputerAvatarVoxel
            key={`machine-${machine.id}`}
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onSelect={onSelectMachine}
            layoutPos={machineLayout.get(machine.id)}
            showLabels={sceneLayers.labels !== false}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan
          enableZoom
          enableDamping
          dampingFactor={0.06}
          onStart={() => {
            if (onUserOrbit) onUserOrbit();
          }}
          maxPolarAngle={Math.PI / 2.15}
          minDistance={3.5}
          maxDistance={Math.max(28, Math.round(28 * (boardBounds.scale || 1)))}
        />
      </Canvas>
    </StageContainer>
  );
}
