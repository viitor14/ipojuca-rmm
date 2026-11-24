import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Html } from '@react-three/drei';
import styled, { keyframes, css } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding } from '../../styles/theme';

const statusPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.28); opacity: 0.65; }
`;

const STATUS_BADGE_THEME = {
  NORMAL: {
    dot: '#10B981',
    beacon: '#10B981',
    text: '#065F46',
    bg: 'rgba(255, 255, 255, 0.94)',
    pillBg: 'rgba(16, 185, 129, 0.14)',
    border: 'rgba(16, 185, 129, 0.45)',
    label: STATUS_LABELS.NORMAL,
    emissive: 1.6,
    fastPulse: false,
  },
  WARNING: {
    dot: '#F59E0B',
    beacon: '#F59E0B',
    text: '#92400E',
    bg: 'rgba(255, 251, 235, 0.97)',
    pillBg: 'rgba(245, 158, 11, 0.18)',
    border: 'rgba(245, 158, 11, 0.72)',
    label: STATUS_LABELS.WARNING,
    emissive: 2.4,
    fastPulse: true,
  },
  CRITICAL: {
    dot: '#EF4444',
    beacon: '#EF4444',
    text: '#991B1B',
    bg: 'rgba(254, 242, 242, 0.97)',
    pillBg: 'rgba(239, 68, 68, 0.18)',
    border: 'rgba(239, 68, 68, 0.80)',
    label: STATUS_LABELS.CRITICAL,
    emissive: 3.0,
    fastPulse: true,
  },
  OFFLINE: {
    dot: '#64748B',
    beacon: '#475569',
    text: '#475569',
    bg: 'rgba(248, 250, 252, 0.92)',
    pillBg: 'rgba(100, 116, 139, 0.14)',
    border: 'rgba(148, 163, 184, 0.55)',
    label: STATUS_LABELS.OFFLINE,
    emissive: 0.0,
    fastPulse: false,
  },
};

const StatusPillBadge = styled.button`
  pointer-events: auto;
  cursor: pointer;
  background: ${({ $badgeBg }) => $badgeBg};
  backdrop-filter: blur(8px);
  color: #1e293b;
  border: 1.5px solid ${({ $isSelected, $borderColor }) => ($isSelected ? '#3B82F6' : $borderColor)};
  border-radius: 999px;
  padding: 4px 9px;
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? '0 0 0 2px rgba(59, 130, 246, 0.25), 0 6px 16px rgba(15, 23, 42, 0.14)'
      : '0 4px 12px rgba(15, 23, 42, 0.12)'};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  line-height: 1.2;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px) scale(1.03);
  }

  .sp-top {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .sp-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $dotColor }) => $dotColor};
    box-shadow: 0 0 6px ${({ $dotColor }) => $dotColor};
    flex-shrink: 0;
    ${({ $animate, $fastPulse }) =>
      $animate &&
      css`
        animation: ${statusPulse} ${$fastPulse ? '1.1s' : '2.4s'} ease-in-out infinite;
      `}
  }

  .sp-host {
    font-weight: 700;
    color: #0f172a;
    max-width: 112px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sp-tag {
    font-size: 0.61rem;
    font-weight: 800;
    letter-spacing: 0.03em;
    color: ${({ $tagText }) => $tagText};
    background: ${({ $tagBg }) => $tagBg};
    padding: 1px 6px;
    border-radius: 999px;
  }

  .sp-extra {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.62rem;
    color: #475569;
    padding-top: 2px;
    border-top: 1px solid rgba(148, 163, 184, 0.28);
  }

  .sp-sector {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: 600;
    color: #52796b;
  }
`;

const _sharedFrameBoxGeometry = new THREE.BoxGeometry(1.44, 0.008, 0.72);

/** Moldura CAD de seleção (azul) ou alerta (âmbar/vermelho) sobre o tampo */
function StatusPerimeterFrame({ isSelected, isAlert, alertColor }) {
  if (!isSelected && !isAlert) return null;
  const frameColor = isSelected ? '#3B82F6' : alertColor;
  const bracketColor = isSelected ? '#60A5FA' : alertColor;

  return (
    <group position={[0, 0.004, 0]}>
      <lineSegments>
        <edgesGeometry args={[_sharedFrameBoxGeometry]} />
        <lineBasicMaterial color={frameColor} linewidth={2} />
      </lineSegments>
      {[-0.72, 0.72].map((cx) =>
        [-0.36, 0.36].map((cz) => (
          <mesh key={`bracket-${cx}-${cz}`} position={[cx, 0.006, cz]}>
            <boxGeometry args={[0.055, 0.010, 0.055]} />
            <meshBasicMaterial color={bracketColor} />
          </mesh>
        ))
      )}
    </group>
  );
}

/** Friso luminoso discreto centralizado no topo do gabinete (visível em 360°) */
function StatusBeacon3D({ badgeTheme, isOffline }) {
  return (
    <group>
      <mesh position={[0.36, 0.404, 0.0]}>
        <boxGeometry args={[0.042, 0.006, 0.26]} />
        <meshStandardMaterial
          color={badgeTheme.beacon}
          emissive={badgeTheme.beacon}
          emissiveIntensity={isOffline ? 0.0 : badgeTheme.emissive}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/** Pílula flutuante de status permanente e clicável acima da estação */
function WorkstationStatusPill({
  machine,
  badgeTheme,
  isOffline,
  isSelected,
  hovered,
  showLabel,
  onSelect,
  onHover,
}) {
  const isAlert = machine.health_status === 'WARNING' || machine.health_status === 'CRITICAL';
  if (!showLabel && !isAlert && !isSelected && !hovered) return null;

  const cpuPct = Math.round(Number(machine.cpu_usage_pct || 0));
  const ramPct = Math.round(Number(machine.ram_usage_pct || 0));

  return (
    <Html position={[0, 0.52, 0]} center distanceFactor={15} zIndexRange={[10, 0]}>
      <StatusPillBadge
        type="button"
        $badgeBg={badgeTheme.bg}
        $borderColor={badgeTheme.border}
        $dotColor={badgeTheme.dot}
        $tagText={badgeTheme.text}
        $tagBg={badgeTheme.pillBg}
        $isSelected={isSelected}
        $animate={!isOffline}
        $fastPulse={badgeTheme.fastPulse}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(machine);
        }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className="sp-top">
          <span className="sp-dot" />
          <span className="sp-host">{machine.hostname}</span>
          <span className="sp-tag">{badgeTheme.label}</span>
        </div>
        {(hovered || isSelected) && (
          <div className="sp-extra">
            <span>{machine.ip_address}</span>
            <span>CPU {cpuPct}%</span>
            <span>RAM {ramPct}%</span>
            {machine.sector_name && (
              <span className="sp-sector">{fixTextEncoding(machine.sector_name)}</span>
            )}
          </div>
        )}
      </StatusPillBadge>
    </Html>
  );
}

/**
 * Gera textura de tela realista de SO profissional em Canvas (evita telas monocromáticas neon)
 */
function createDesktopScreenTexture(isOffline) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 288;
  const ctx = canvas.getContext('2d');

  if (isOffline) {
    // Standby: tela escura com led apagado
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 0, 512, 288);
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(256, 144, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else {
    // Wallpaper corporativo dark moderno
    const grad = ctx.createLinearGradient(0, 0, 512, 288);
    grad.addColorStop(0, '#0F172A');
    grad.addColorStop(0.5, '#1E293B');
    grad.addColorStop(1, '#0B1329');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 288);

    // Curva decorativa sutil de fundo
    ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
    ctx.beginPath();
    ctx.moveTo(0, 240);
    ctx.bezierCurveTo(160, 120, 320, 280, 512, 140);
    ctx.lineTo(512, 288);
    ctx.lineTo(0, 288);
    ctx.fill();

    // Janela 1: Sistema RMM / Prontuário
    ctx.fillStyle = '#1E2430';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(40, 36, 260, 160, 6);
    } else {
      ctx.rect(40, 36, 260, 160);
    }
    ctx.fill();
    ctx.stroke();

    // Barra de título da janela
    ctx.fillStyle = '#262F40';
    ctx.fillRect(40, 36, 260, 24);

    // Controles de janela (mac/windows dots)
    ctx.fillStyle = '#EF4444'; ctx.beginPath(); ctx.arc(54, 48, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#F59E0B'; ctx.beginPath(); ctx.arc(66, 48, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#10B981'; ctx.beginPath(); ctx.arc(78, 48, 3.5, 0, Math.PI * 2); ctx.fill();

    // Linhas de conteúdo
    ctx.fillStyle = '#475569';
    ctx.fillRect(56, 74, 110, 6);
    ctx.fillRect(56, 88, 190, 5);
    ctx.fillRect(56, 100, 170, 5);
    ctx.fillRect(56, 112, 140, 5);

    // Janela 2: Gráfico de telemetria lateral
    ctx.fillStyle = '#1E2430';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(320, 48, 150, 136, 6);
    } else {
      ctx.rect(320, 48, 150, 136);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#262F40';
    ctx.fillRect(320, 48, 150, 22);

    // Barras de CPU/RAM em miniatura
    ctx.fillStyle = '#3B82F6'; ctx.fillRect(340, 120, 16, 40);
    ctx.fillStyle = '#10B981'; ctx.fillRect(368, 100, 16, 60);
    ctx.fillStyle = '#6366F1'; ctx.fillRect(396, 112, 16, 48);

    // Barra de Tarefas inferior
    ctx.fillStyle = '#090D16';
    ctx.fillRect(0, 256, 512, 32);

    // Ícone Iniciar
    ctx.fillStyle = '#3B82F6';
    ctx.fillRect(16, 263, 16, 16);

    // Ícones da barra
    ctx.fillStyle = '#475569';
    ctx.fillRect(40, 266, 12, 12);
    ctx.fillRect(58, 266, 12, 12);
    ctx.fillRect(76, 266, 12, 12);

    // Relógio
    ctx.fillStyle = '#94A3B8';
    ctx.font = '11px sans-serif';
    ctx.fillText('12:00', 466, 276);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

// Cache estático de texturas de tela para evitar memory leak de CanvasTexture no WebGL
let _desktopTextureOnline = null;
let _desktopTextureOffline = null;

function getCachedDesktopTexture(isOffline) {
  if (isOffline) {
    if (!_desktopTextureOffline) {
      _desktopTextureOffline = createDesktopScreenTexture(true);
    }
    return _desktopTextureOffline;
  }
  if (!_desktopTextureOnline) {
    _desktopTextureOnline = createDesktopScreenTexture(false);
  }
  return _desktopTextureOnline;
}

/**
 * MODELO PROFISSIONAL GLB DO BLENDER — ESTAÇÃO DE TRABALHO RMM
 * Sub-nós dinâmicos: ScreenDisplay (tela com OS realista), StatusLed (LED discreto), ActivityLed
 */
export function WorkstationModel({
  machine,
  isSelected = false,
  onSelect,
  showLabel = true,
  position = [0, 0.76, 0],
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF('/models/refined/workstation_pc.glb?v=48b');

  const statusKey = STATUS_BADGE_THEME[machine.health_status] ? machine.health_status : 'NORMAL';
  const badgeTheme = STATUS_BADGE_THEME[statusKey];
  const isOffline = statusKey === 'OFFLINE';
  const isAlert = statusKey === 'WARNING' || statusKey === 'CRITICAL';

  // Textura realista de área de trabalho obtida do cache singleton
  const screenTexture = useMemo(
    () => getCachedDesktopTexture(isOffline),
    [isOffline]
  );

  // Clona a cena do modelo para isolamento de materiais por instância
  const modelInstance = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  // Atualização atômica de propriedades PBR em useEffect (efeito colateral puro)
  useEffect(() => {
    modelInstance.traverse((child) => {
      // 1. Tela: Renderiza o desktop do SO com emissão suave e realista (nunca sólido verde/vermelho!)
      if (child.name === 'ScreenDisplay' && child.material) {
        child.material.map = screenTexture;
        child.material.emissiveMap = screenTexture;
        child.material.color.set('#FFFFFF');
        child.material.emissive.set(isOffline ? '#000000' : '#FFFFFF');
        child.material.emissiveIntensity = isOffline ? 0.0 : 0.22;
        child.material.roughness = 0.25;
        child.material.needsUpdate = true;
      }
      // 2. StatusLed: Indicador principal de estado de saúde do equipamento
      if (child.name === 'StatusLed' && child.material) {
        child.material.color.set(badgeTheme.beacon);
        if ('emissive' in child.material) {
          child.material.emissive.set(badgeTheme.beacon);
          child.material.emissiveIntensity = isOffline ? 0.0 : badgeTheme.emissive;
        }
        child.material.needsUpdate = true;
      }
      // 3. ActivityLed: Led de atividade do gabinete sincronizado com o status
      if (child.name === 'ActivityLed' && child.material) {
        child.material.color.set(isOffline ? '#374151' : badgeTheme.beacon);
        if ('emissive' in child.material) {
          child.material.emissive.set(isOffline ? '#000000' : badgeTheme.beacon);
          child.material.emissiveIntensity = isOffline ? 0.0 : badgeTheme.emissive * 0.9;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, screenTexture, isOffline, badgeTheme]);

  return (
    <group position={position} rotation={rotation}>
      {/* Camada 3: Moldura CAD semântica de seleção (azul) ou alerta (âmbar/vermelho) */}
      <StatusPerimeterFrame
        isSelected={isSelected}
        isAlert={isAlert}
        alertColor={badgeTheme.dot}
      />

      {/* Camada 2: Sinalizador luminoso 3D omnidirecional 360° no gabinete e base */}
      <StatusBeacon3D badgeTheme={badgeTheme} isOffline={isOffline} />

      {/* Modelo GLB Profissional Interativo */}
      <primitive
        object={modelInstance}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(machine);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      />

      {/* Camada 1: Pílula flutuante permanente de status (expande no hover/seleção) */}
      <WorkstationStatusPill
        machine={machine}
        badgeTheme={badgeTheme}
        isOffline={isOffline}
        isSelected={isSelected}
        hovered={hovered}
        showLabel={showLabel}
        onSelect={onSelect}
        onHover={setHovered}
      />
    </group>
  );
}

useGLTF.preload('/models/refined/workstation_pc.glb?v=48b');

/**
 * MODELO PROCEDURAL DE FALLBACK (Preservado para contingência de carregamento)
 */
export function FallbackWorkstationModel({
  machine,
  isSelected = false,
  onSelect,
  showLabel = true,
  position = [0, 0.76, 0],
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const statusKey = STATUS_BADGE_THEME[machine.health_status] ? machine.health_status : 'NORMAL';
  const badgeTheme = STATUS_BADGE_THEME[statusKey];
  const isOffline = statusKey === 'OFFLINE';
  const isAlert = statusKey === 'WARNING' || statusKey === 'CRITICAL';

  return (
    <group position={position} rotation={rotation}>
      <StatusPerimeterFrame
        isSelected={isSelected}
        isAlert={isAlert}
        alertColor={badgeTheme.dot}
      />
      <StatusBeacon3D badgeTheme={badgeTheme} isOffline={isOffline} />
      <group
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect(machine);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Monitor básico procedural */}
        <mesh position={[0, 0.22, -0.08]} castShadow>
          <boxGeometry args={[0.54, 0.32, 0.024]} />
          <meshStandardMaterial color="#1E232A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.22, -0.066]}>
          <boxGeometry args={[0.49, 0.27, 0.005]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.06, -0.08]}>
          <cylinderGeometry args={[0.016, 0.016, 0.12, 12]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.01, -0.08]}>
          <boxGeometry args={[0.22, 0.015, 0.16]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Gabinete procedural */}
        <mesh position={[0.42, 0.18, -0.06]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 0.36, 0.36]} />
          <meshStandardMaterial color="#1E232A" roughness={0.5} />
        </mesh>
        {/* Teclado e mouse procedurais */}
        <mesh position={[-0.04, 0.01, 0.14]}>
          <boxGeometry args={[0.38, 0.015, 0.13]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.22, 0.015, 0.14]}>
          <boxGeometry args={[0.06, 0.02, 0.10]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      </group>
      <WorkstationStatusPill
        machine={machine}
        badgeTheme={badgeTheme}
        isOffline={isOffline}
        isSelected={isSelected}
        hovered={hovered}
        showLabel={showLabel}
        onSelect={onSelect}
        onHover={setHovered}
      />
    </group>
  );
}
