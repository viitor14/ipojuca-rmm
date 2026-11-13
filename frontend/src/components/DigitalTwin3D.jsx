import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding } from '../styles/theme';
import { WorkstationModel, FallbackWorkstationModel } from './models/WorkstationModel';
import { DeskModel } from './models/DeskModel';
import { ChairModel } from './models/ChairModel';
import { ReceptionCounterModel } from './models/ReceptionCounterModel';
import { StorageCabinetModel } from './models/StorageCabinetModel';
import { ThermalPrinterModel } from './models/ThermalPrinterModel';
import { WaitingBenchModel } from './models/WaitingBenchModel';

const StageContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #eaece8;
  overflow: hidden;
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.9); }
`;

/* Tooltip elegante e minimalista ao passar o mouse */
const DeviceTooltip = styled.div`
  pointer-events: none;
  background: #ffffff;
  color: #242925;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  padding: 8px 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.74rem;
  line-height: 1.35;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 3px;
  transform: translate3d(-50%, -120%, 0);

  .tt-head {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #242925;
  }

  .tt-status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $statusColor }) => $statusColor};
    display: inline-block;
  }

  .tt-meta {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    color: #737b75;
  }

  .tt-sector {
    font-size: 0.7rem;
    color: #52796b;
    font-weight: 600;
  }
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

/* Rig de Câmera Isométrica com interpolação suave e foco detalhado */
function CameraRig({ cameraMode, selectedMachine, selectedSector, controlsRef }) {
  const targetLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const targetCamPos = useRef(new THREE.Vector3(-11.2, 10.0, 11.2));

  useFrame(({ camera }) => {
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
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 18.0, 0.01);
    } else if (cameraMode === 'ORBIT') {
      const time = Date.now() * 0.00035;
      const radius = 15.0;
      targetLookAt.current.set(0, 0.4, 0);
      targetCamPos.current.set(
        Math.cos(time) * radius,
        10.5,
        Math.sin(time) * radius
      );
    } else {
      // ISO Padrão Habblaude Premium equilibrado e centrado na edificação
      targetLookAt.current.set(0, 0.4, 0);
      targetCamPos.current.set(-11.2, 10.0, 11.2);
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
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = '#E2DED4';
    ctx.fillRect(0, 0, 128, 128);
    const size = 64;
    for (let y = 0; y < 128; y += size) {
      for (let x = 0; x < 128; x += size) {
        ctx.fillStyle = '#F7F6F2';
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.fillRect(x + 2, y + 2, size - 4, 1);
      }
    }
  } else if (type === 'grass') {
    // Gramado aveludado e suave de maquete, sem estática agressiva
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = '#5A874B';
    ctx.fillRect(0, 0, 128, 128);
    const softColors = ['#5F8E50', '#568247', '#649554', '#527C43'];
    for (let y = 0; y < 128; y += 16) {
      for (let x = 0; x < 128; x += 16) {
        const idx = (Math.floor(x / 16) + Math.floor(y / 16)) % softColors.length;
        ctx.fillStyle = softColors[idx];
        ctx.fillRect(x, y, 16, 16);
      }
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

/* Base de Diorama Isométrico com Proporção Otimizada (Edificação Ocupa 80%+) */
function IsometricBoard() {
  const grassTex = useMemo(() => {
    const tex = getHabblaudeTexture('grass');
    if (tex) {
      const cloned = tex.clone();
      cloned.repeat.set(12, 9);
      cloned.needsUpdate = true;
      return cloned;
    }
    return null;
  }, []);

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

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Substrato de sustentação do diorama (Reduzido para enquadramento perfeito) */}
      <mesh receiveShadow position={[0, -0.42, 0]}>
        <boxGeometry args={[20.6, 0.50, 14.6]} />
        <meshStandardMaterial color="#3A2515" roughness={0.9} />
      </mesh>

      {/* 2. Gramado Verde Vivo do Perímetro Externo (Margem discreta de jardim) */}
      <mesh receiveShadow position={[0, -0.16, 0]}>
        <boxGeometry args={[20.1, 0.14, 14.1]} />
        {grassTex ? (
          <meshStandardMaterial map={grassTex} roughness={0.75} />
        ) : (
          <meshStandardMaterial color="#558048" roughness={0.75} />
        )}
      </mesh>

      {/* 3. Laje Estrutural Contígua da Edificação (100% da área sob salas e corredor) */}
      <group position={[0, -0.05, 0]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[18.4, 0.14, 12.4]} />
          <meshStandardMaterial color="#D7DDD5" roughness={0.65} />
        </mesh>
        {/* Rodapé externo de pedra */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[18.5, 0.04, 12.5]} />
          <meshStandardMaterial color="#86958B" roughness={0.8} />
        </mesh>
      </group>

      {/* 4. Deck de madeira na entrada frontal da fachada oeste (acesso à recepção) */}
      <mesh receiveShadow position={[-9.8, -0.04, 0]}>
        <boxGeometry args={[1.6, 0.08, 3.2]} />
        {deckTex ? (
          <meshStandardMaterial map={deckTex} roughness={0.55} />
        ) : (
          <meshStandardMaterial color="#B08968" roughness={0.55} />
        )}
      </mesh>
      {/* Rampa suave de acessibilidade */}
      <mesh receiveShadow position={[-10.75, -0.07, 0]} rotation={[0, 0, 0.12]}>
        <boxGeometry args={[0.5, 0.04, 3.0]} />
        <meshStandardMaterial color="#A57D5C" roughness={0.65} />
      </mesh>
      {/* Capacho de boas-vindas hospitalar */}
      <mesh receiveShadow position={[-8.4, 0.021, 0]}>
        <boxGeometry args={[1.0, 0.006, 1.8]} />
        <meshStandardMaterial color="#1E3A8A" roughness={0.85} />
      </mesh>

      {/* 5. Corredor Central Interno de Circulação Hospitalar com Passadeira */}
      <group position={[0, 0, 0]}>
        {/* Piso de circulação em porcelanato polido claro */}
        <mesh receiveShadow position={[0, 0.01, 0]}>
          <boxGeometry args={[18.0, 0.02, 2.0]} />
          <meshStandardMaterial color="#F3EFEB" roughness={0.4} />
        </mesh>
        {/* Passadeira central cinza-azulada com bordas (Sem Z-fighting) */}
        <mesh receiveShadow position={[0, 0.023, 0]}>
          <boxGeometry args={[17.8, 0.004, 1.1]} />
          <meshStandardMaterial color="#557385" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.026, -0.53]}>
          <boxGeometry args={[17.8, 0.003, 0.04]} />
          <meshStandardMaterial color="#304757" />
        </mesh>
        <mesh position={[0, 0.026, 0.53]}>
          <boxGeometry args={[17.8, 0.003, 0.04]} />
          <meshStandardMaterial color="#304757" />
        </mesh>

        {/* Soleiras em madeira nobre nos 4 vãos de porta */}
        <mesh position={[-4.5, 0.023, -0.99]}>
          <boxGeometry args={[1.3, 0.006, 0.16]} />
          <meshStandardMaterial color="#6B472B" roughness={0.45} />
        </mesh>
        <mesh position={[4.5, 0.023, -0.99]}>
          <boxGeometry args={[1.3, 0.006, 0.16]} />
          <meshStandardMaterial color="#6B472B" roughness={0.45} />
        </mesh>
        <mesh position={[-4.5, 0.023, 0.99]}>
          <boxGeometry args={[1.3, 0.006, 0.16]} />
          <meshStandardMaterial color="#6B472B" roughness={0.45} />
        </mesh>
        <mesh position={[4.5, 0.023, 0.99]}>
          <boxGeometry args={[1.3, 0.006, 0.16]} />
          <meshStandardMaterial color="#6B472B" roughness={0.45} />
        </mesh>

        {/* Longarinas no corredor */}
        <group position={[2.0, 0.02, -0.74]}>
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[1.6, 0.03, 0.06]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[-0.7, 0.09, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.32]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          <mesh position={[0.7, 0.09, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.32]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          {[-0.5, 0, 0.5].map((offX, idx) => (
            <group key={`bench-n-${idx}`} position={[offX, 0, 0]}>
              <mesh position={[0, 0.22, 0]}>
                <boxGeometry args={[0.42, 0.05, 0.38]} />
                <meshStandardMaterial color="#1E3A8A" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.40, -0.16]}>
                <boxGeometry args={[0.42, 0.32, 0.05]} />
                <meshStandardMaterial color="#1E3A8A" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Extintor de incêndio na parede central */}
        <group position={[-0.1, 0.65, -0.92]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.28, 12]} />
            <meshStandardMaterial color="#DC2626" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.16, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
            <meshStandardMaterial color="#1F2937" metalness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 6. Cercas Vivas Discretas no Perímetro Externo */}
      <group position={[-9.6, 0.22, -6.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-9.6, 0.22, 6.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[9.4, 0.22, -6.6]}>
        <mesh castShadow position={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.35, 1.0]} />
          <meshStandardMaterial color="#345E3B" roughness={0.8} />
        </mesh>
      </group>
      <group position={[9.4, 0.22, 6.6]}>
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
    floorType: 'parquet',
    wallColor: '#F5EBE0',
    wallCapColor: '#8D6E63',
    baseboardColor: '#5C4033',
    hasRug: true,
    rugColor: '#1D4ED8',
    rugBorderColor: '#60A5FA',
    rugSize: [3.2, 2.0],
    rugPos: [0.5, 0.0, -0.2],
    hasClock: true,
    hasArt: true,
    hasPanel: true,
  },
  CONS: {
    floorType: 'porcelain',
    wallColor: '#DCE9E2',
    wallCapColor: '#8D6E63',
    baseboardColor: '#5C4033',
    hasRug: true,
    rugColor: '#84A98C',
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
    hasRug: true,
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

function getSectorTheme(sector) {
  const code = String(sector?.code || '').toUpperCase();
  if (code.includes('REC') || sector?.id === 1) return SECTOR_THEMES.REC;
  if (code.includes('MED') || code.includes('CONS') || sector?.id === 2) return SECTOR_THEMES.CONS;
  if (code.includes('FAR') || sector?.id === 3) return SECTOR_THEMES.FARM;
  if (code.includes('TI') || sector?.id === 8) return SECTOR_THEMES.TI;
  return SECTOR_THEMES.ADM;
}

/* Paredes arquitetônicas com vãos de portas, rodapés nobres e janelas translúcidas */
function SectorRoomVoxel({ sector, sectorMachines = [], showLabels = true }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const width = Number(sector.width_3d || 9.0);
  const depth = Number(sector.depth_3d || 5.0);

  const themeConfig = getSectorTheme(sector);
  const wallHeight = 1.45;
  const wallThickness = 0.18;

  const isNorth = baseZ < 0;
  const isSouth = baseZ > 0;
  const isWest = baseX < 0;
  const isEast = baseX > 0;

  // Textura suave e refinada sem ruído
  const floorTexture = useMemo(() => {
    let tex = null;
    if (themeConfig.floorType === 'parquet') {
      tex = getHabblaudeTexture('parquet');
      if (tex) {
        const cloned = tex.clone();
        cloned.repeat.set(Math.round(width * 0.8), Math.round(depth * 0.8));
        cloned.needsUpdate = true;
        return cloned;
      }
    } else if (themeConfig.floorType === 'checker') {
      tex = getHabblaudeTexture('checker', themeConfig.checkerColor1, themeConfig.checkerColor2);
      if (tex) {
        const cloned = tex.clone();
        cloned.repeat.set(Math.round(width * 0.8), Math.round(depth * 0.8));
        cloned.needsUpdate = true;
        return cloned;
      }
    } else {
      tex = getHabblaudeTexture('porcelain');
      if (tex) {
        const cloned = tex.clone();
        cloned.repeat.set(Math.round(width * 0.8), Math.round(depth * 0.8));
        cloned.needsUpdate = true;
        return cloned;
      }
    }
    return null;
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
          <mesh receiveShadow>
            <boxGeometry args={[width, wallHeight, wallThickness]} />
            <meshStandardMaterial color={themeConfig.wallColor} roughness={0.85} />
          </mesh>
          <mesh position={[0, -wallHeight / 2 + 0.06, wallThickness / 2 + 0.01]}>
            <boxGeometry args={[width + 0.02, 0.12, 0.02]} />
            <meshStandardMaterial color={themeConfig.baseboardColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
            <boxGeometry args={[width + 0.02, 0.05, wallThickness + 0.02]} />
            <meshStandardMaterial color={themeConfig.wallCapColor} roughness={0.5} />
          </mesh>

          {/* Duas Janelas Arquitetônicas com vidro translúcido voltadas para o jardim */}
          {[-width / 3.4, width / 3.4].map((winX, idx) => (
            <group key={`win-n-${idx}`} position={[winX, 0.22, 0]}>
              <mesh position={[0, 0, wallThickness / 2 + 0.015]}>
                <boxGeometry args={[1.3, 0.75, 0.03]} />
                <meshStandardMaterial color="#5C4033" roughness={0.55} />
              </mesh>
              <mesh position={[0, 0, wallThickness / 2 + 0.02]}>
                <boxGeometry args={[1.14, 0.61, 0.01]} />
                <meshStandardMaterial color="#D1E8FA" transparent opacity={0.65} roughness={0.1} />
              </mesh>
              <mesh position={[0, 0, wallThickness / 2 + 0.025]}>
                <boxGeometry args={[0.04, 0.61, 0.012]} />
                <meshStandardMaterial color="#4A3326" />
              </mesh>
              <mesh position={[0, 0, wallThickness / 2 + 0.025]}>
                <boxGeometry args={[1.14, 0.04, 0.012]} />
                <meshStandardMaterial color="#4A3326" />
              </mesh>
              <mesh position={[0, -0.40, wallThickness / 2 + 0.03]}>
                <boxGeometry args={[1.4, 0.05, 0.08]} />
                <meshStandardMaterial color="#4A3326" roughness={0.5} />
              </mesh>
            </group>
          ))}

          {/* Painel ripado decorativo na recepção */}
          {themeConfig.hasPanel && (
            <mesh position={[0, 0.05, wallThickness / 2 + 0.015]}>
              <boxGeometry args={[2.4, 0.85, 0.02]} />
              <meshStandardMaterial color="#DDB892" roughness={0.5} />
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

          {/* Quadro de arte emoldurado */}
          {themeConfig.hasArt && (
            <group position={[-width / 3.4, 0.22, wallThickness / 2 + 0.05]}>
              <mesh>
                <boxGeometry args={[0.9, 0.65, 0.025]} />
                <meshStandardMaterial color="#6B472B" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0, 0.015]}>
                <boxGeometry args={[0.78, 0.53, 0.005]} />
                <meshStandardMaterial color="#588157" roughness={0.65} />
              </mesh>
              <mesh position={[0.18, 0.12, 0.02]}>
                <circleGeometry args={[0.08, 12]} />
                <meshBasicMaterial color="#F4A261" />
              </mesh>
            </group>
          )}

          {/* Mural de avisos (ADM) */}
          {themeConfig.hasNoticeBoard && (
            <group position={[-width / 3.4, 0.22, wallThickness / 2 + 0.05]}>
              <mesh>
                <boxGeometry args={[1.1, 0.65, 0.025]} />
                <meshStandardMaterial color="#C5A059" roughness={0.8} />
              </mesh>
              <mesh position={[-0.32, 0.12, 0.016]}>
                <boxGeometry args={[0.16, 0.16, 0.005]} />
                <meshBasicMaterial color="#FDE047" />
              </mesh>
              <mesh position={[0.05, 0.12, 0.016]}>
                <boxGeometry args={[0.16, 0.16, 0.005]} />
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

        {/* Janela lateral oeste com vidros duplos */}
        {isWest && (
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

      {/* 6. PAREDE LATERAL LESTE (X+) */}
      {isEast && (
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
function ReceptionPilotFurniture({ halfW, halfD, backZ }) {
  return (
    <group>
      {/* 1. BALCÃO DE ATENDIMENTO EM L (reception_counter.glb) - Ponto focal na entrada */}
      <ReceptionCounterModel position={[-2.2, 0, 0.8]} />

      {/* 2. IMPRESSORA TÉRMICA DE PRONTUÁRIO NO BALCÃO (thermal_printer.glb) */}
      <ThermalPrinterModel position={[-1.4, 1.08, 0.8]} isActive={true} />

      {/* 3. ARMÁRIO DE ARQUIVOS E PRONTUÁRIOS (storage_cabinet.glb) - Rente à alvenaria norte */}
      <StorageCabinetModel position={[-3.6, 0, backZ + 0.3]} rotation={[0, Math.PI, 0]} />

      {/* 4. BEBEDOURO DE COLUNA HOSPITALAR (WaterDispenserHabblaude) */}
      <group position={[halfW - 0.75, 0, backZ + 0.15]}>
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.38, 0.96, 0.38]} />
          <meshStandardMaterial color="#ECEEF0" roughness={0.4} />
        </mesh>
        {/* Pingadeira preta */}
        <mesh position={[0, 0.62, 0.18]}>
          <boxGeometry args={[0.26, 0.04, 0.1]} />
          <meshStandardMaterial color="#374151" roughness={0.8} />
        </mesh>
        {/* Torneiras quente/fria */}
        <mesh position={[-0.06, 0.72, 0.18]}>
          <boxGeometry args={[0.03, 0.06, 0.04]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[0.06, 0.72, 0.18]}>
          <boxGeometry args={[0.03, 0.06, 0.04]} />
          <meshStandardMaterial color="#EF4444" />
        </mesh>
        {/* Suporte do galão */}
        <mesh position={[0, 0.99, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
          <meshStandardMaterial color="#CBD5E1" />
        </mesh>
        {/* Galão de 20L de água mineral azul cristalina */}
        <mesh position={[0, 1.24, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.44, 16]} />
          <meshStandardMaterial
            color="#60A5FA"
            transparent
            opacity={0.78}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>
        {/* Tampa do galão */}
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.05, 10]} />
          <meshStandardMaterial color="#1D4ED8" />
        </mesh>
      </group>

      {/* 5. PLANTA DECORATIVA EM VASO DE CERÂMICA (IndoorPlantHabblaude) */}
      <group position={[halfW - 0.55, 0, halfD - 0.6]}>
        {/* Vaso cerâmico fosco esmaltado */}
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.17, 0.56, 16]} />
          <meshStandardMaterial color="#DFD7CB" roughness={0.7} />
        </mesh>
        {/* Terra vegetal escura */}
        <mesh position={[0, 0.56, 0]}>
          <cylinderGeometry args={[0.21, 0.21, 0.04, 16]} />
          <meshStandardMaterial color="#3D2817" roughness={0.9} />
        </mesh>
        {/* Folhagem volumétrica escalonada */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial color="#2D6A4F" roughness={0.75} />
        </mesh>
        <mesh position={[0.14, 0.88, 0.08]} castShadow>
          <boxGeometry args={[0.22, 0.20, 0.22]} />
          <meshStandardMaterial color="#40916C" roughness={0.75} />
        </mesh>
        <mesh position={[-0.12, 0.84, -0.09]} castShadow>
          <boxGeometry args={[0.20, 0.22, 0.20]} />
          <meshStandardMaterial color="#52B788" roughness={0.75} />
        </mesh>
      </group>

      {/* 6. LONGARINA DE ESPERA PARA PACIENTES (waiting_bench.glb) - Parede oeste, frente livre */}
      <WaitingBenchModel position={[-halfW + 0.55, 0, -0.3]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}

/* Mobiliários clínicos para os demais setores (Consultório, Farmácia, TI) */
function ClinicalFurnitureVoxel({ sector }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const isReception = sector.code === 'REC' || sector.id === 1;
  const isConsult = sector.code === 'MED' || sector.code === 'CONS-01' || sector.id === 2;
  const isPharma = sector.code === 'FAR' || sector.code === 'FARM' || sector.id === 3;
  const isNurse = sector.code === 'ENF' || sector.code === 'ADM' || sector.id === 4 || sector.id === 6;
  const isServer = sector.code === 'TI' || sector.id === 8;
  const halfW = Number(sector.width_3d || 9.0) / 2;
  const halfD = Number(sector.depth_3d || 5.0) / 2;
  const isNorth = baseZ < 0;
  const backZ = isNorth ? -halfD + 0.6 : halfD - 0.6;

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* 1. RECEPÇÃO & TRIAGEM: Renderiza a Sala-Piloto de Alta Fidelidade */}
      {isReception && (
        <ReceptionPilotFurniture halfW={halfW} halfD={halfD} backZ={backZ} />
      )}

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
    const isReception = sector.code === 'REC' || Number(sector.id) === 1;

    if (isReception) {
      // Layout ergonômico e desobstruído da Recepção (Ciclo #22)
      const receptionSlots = [
        // Posto 1: Atendimento Principal (Piloto machine.id = 9) integrado à bancada do balcão em L
        { x: bx - 1.85, z: bz + 0.95, rotY: 0, hideDesk: true },
        // Posto 2: Atendimento Secundário / Apoio (Mesa executiva independente)
        { x: bx + 2.20, z: bz + 0.85, rotY: 0 },
        // Posto 3: Triagem Clínica (Quadrante norte, voltado para a circulação)
        { x: bx - 1.20, z: bz - 1.25, rotY: Math.PI },
        // Posto 4: Regulação / Pós-Consulta (Quadrante nordeste, voltado para a circulação)
        { x: bx + 2.20, z: bz - 1.25, rotY: Math.PI },
      ];
      ordered.forEach((m, i) => {
        const slot = receptionSlots[i] || {
          x: bx + (i % 2 === 0 ? -2.0 : 2.0),
          z: bz + (Math.floor(i / 2) * 1.5),
          rotY: 0,
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
          rotY: 0,
        });
      });
    }
  });
  return result;
}

/* =========================================================================
 * ESTAÇÃO DE TRABALHO: MESA, CADEIRA E COMPUTADOR EM MODELOS GLB MODULARES
 * ========================================================================= */
function ComputerAvatarVoxel({ machine, isSelected, onSelect, layoutPos }) {
  const posX = layoutPos ? layoutPos.x : Number(machine.pos_x || 0);
  const posZ = layoutPos ? layoutPos.z : Number(machine.pos_z || 0);
  const rotY = layoutPos?.rotY || 0;
  const hideDesk = Boolean(layoutPos?.hideDesk);

  return (
    <group position={[posX, 0, posZ]} rotation={[0, rotY, 0]}>
      {/* 1. MESA DE TRABALHO EXECUTIVA (office_desk.glb) - Omitida quando integrada à bancada do balcão */}
      {!hideDesk && <DeskModel position={[0, 0, 0]} />}

      {/* 2. CADEIRA DE ESCRITÓRIO ERGONÔMICA (ergonomic_chair.glb) */}
      <ChairModel position={[-0.08, 0, 0.54]} />

      {/* 3. ESTAÇÃO DE TRABALHO PC: Modelo GLB profissional workstation_pc.glb */}
      <WorkstationModel
        machine={machine}
        isSelected={isSelected}
        onSelect={onSelect}
        position={[0, 0.76, 0]}
      />

      {/* 4. IMPRESSORA ACOPLADA SE SPOOLER ATIVO (thermal_printer.glb) */}
      {machine.spooler_running && (
        <ThermalPrinterModel position={[-0.48, 0.76, 0]} isActive={true} />
      )}
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
  sceneLayers = {
    furniture: true,
    labels: true,
  },
}) {
  const sectors = activeUnit?.sectors || [];
  const controlsRef = useRef();

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

  return (
    <StageContainer>
      <Canvas
        shadows
        camera={{ position: [-11.2, 10.0, 11.2], fov: 34 }}
      >
        <color attach="background" args={['#EAECE8']} />

        {/* ILUMINAÇÃO SUAVE DE MAQUETE FÍSICA CONTROLADA (ESTÚDIO) */}
        {/* 1. Luz ambiente difusa uniforme */}
        <ambientLight intensity={0.92} color="#FFFDF9" />

        {/* 2. Luz de hemisfério para preenchimento de faces verticais */}
        <hemisphereLight skyColor="#FFFDF7" groundColor="#DCE3DA" intensity={0.4} />

        {/* 3. Luz direcional principal com sombras suaves (Soft Contact Shadows) */}
        <directionalLight
          position={[12, 22, 12]}
          intensity={1.15}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.00004}
          shadow-normalBias={0.025}
          shadow-radius={2.5}
        />

        {/* 4. Luz secundária de preenchimento (Fill Light) para eliminar faixas escuras */}
        <directionalLight position={[-12, 12, -10]} intensity={0.35} color="#E2E7E2" />

        {/* Rig de Câmera com interpolação fluida */}
        <CameraRig
          cameraMode={cameraMode}
          selectedMachine={focusMachine}
          selectedSector={selectedSector}
          controlsRef={controlsRef}
        />

        {/* Base da Maquete */}
        <IsometricBoard />

        {/* Salas e Setores da Unidade com Paredes Cutaway */}
        {sectors.map((sector) => {
          const sectorMachines = unitMachines.filter(
            (m) => Number(m.sector_id) === Number(sector.id)
          );
          return (
            <group key={`sector-${sector.id}`}>
              <SectorRoomVoxel
                sector={sector}
                sectorMachines={sectorMachines}
                showLabels={sceneLayers.labels !== false}
              />
              {sceneLayers.furniture !== false && (
                <ClinicalFurnitureVoxel sector={sector} />
              )}
            </group>
          );
        })}

        {/* Computadores Reais com Miniaturas sobre as Mesas */}
        {unitMachines.map((machine) => (
          <ComputerAvatarVoxel
            key={`machine-${machine.id}`}
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onSelect={onSelectMachine}
            layoutPos={machineLayout.get(machine.id)}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          enableDamping
          dampingFactor={0.06}
          onStart={() => {
            if (onUserOrbit) onUserOrbit();
          }}
          maxPolarAngle={Math.PI / 2.15}
          minDistance={3.5}
          maxDistance={28}
        />
      </Canvas>
    </StageContainer>
  );
}
