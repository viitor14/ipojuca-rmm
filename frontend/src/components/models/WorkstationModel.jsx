import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, Html } from '@react-three/drei';
import styled from 'styled-components';
import { theme, fixTextEncoding } from '../../styles/theme';

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
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * MODELO PROFISSIONAL GLB DO BLENDER — ESTAÇÃO DE TRABALHO RMM
 * Sub-nós dinâmicos: ScreenDisplay (tela com OS realista), StatusLed (LED discreto), ActivityLed
 */
export function WorkstationModel({
  machine,
  isSelected = false,
  onSelect,
  position = [0, 0.76, 0],
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const { scene } = useGLTF('/models/tech/workstation_pc.glb');

  const statusColor = theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;
  const isOffline = machine.health_status === 'OFFLINE';

  // Textura realista de área de trabalho de computador (não monocromática!)
  const screenTexture = useMemo(
    () => createDesktopScreenTexture(isOffline),
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

  // Atualização atômica de propriedades PBR sem destruir/reconstruir malha
  useMemo(() => {
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
        child.material.color.set(statusColor);
        if ('emissive' in child.material) {
          child.material.emissive.set(statusColor);
          child.material.emissiveIntensity = isOffline ? 0.0 : 2.0;
        }
        child.material.needsUpdate = true;
      }
      // 3. ActivityLed: Led de atividade do gabinete
      if (child.name === 'ActivityLed' && child.material) {
        child.material.color.set(isOffline ? '#374151' : '#3B82F6');
        if ('emissive' in child.material) {
          child.material.emissive.set(isOffline ? '#000000' : '#3B82F6');
          child.material.emissiveIntensity = isOffline ? 0.0 : 1.5;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, screenTexture, isOffline, statusColor]);

  return (
    <group position={position} rotation={rotation}>
      {/* Contorno de seleção elegante e discreto (substitui o halo luminoso por contorno fino com cantos CAD) */}
      {isSelected && (
        <group position={[0, 0.005, 0]}>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.38, 0.012, 0.82)]} />
            <lineBasicMaterial color="#3B82F6" linewidth={2} />
          </lineSegments>
          {[-0.69, 0.69].map((cx) =>
            [-0.41, 0.41].map((cz) => (
              <mesh key={`bracket-${cx}-${cz}`} position={[cx, 0.008, cz]}>
                <boxGeometry args={[0.06, 0.015, 0.06]} />
                <meshBasicMaterial color="#60A5FA" />
              </mesh>
            ))
          )}
        </group>
      )}

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

      {/* Tooltip flutuante no hover */}
      {hovered && (
        <Html position={[0, 0.55, 0]} distanceFactor={14}>
          <DeviceTooltip $statusColor={statusColor}>
            <div className="tt-head">
              <span className="tt-status-dot" />
              <span>{machine.hostname}</span>
            </div>
            <div className="tt-meta">{machine.ip_address}</div>
            <div className="tt-sector">{fixTextEncoding(machine.sector_name)}</div>
          </DeviceTooltip>
        </Html>
      )}
    </group>
  );
}

useGLTF.preload('/models/tech/workstation_pc.glb');

/**
 * MODELO PROCEDURAL DE FALLBACK (Preservado para as demais máquinas até validação)
 */
export function FallbackWorkstationModel({
  machine,
  isSelected = false,
  onSelect,
  position = [0, 0.76, 0],
  rotation = [0, 0, 0],
}) {
  const [hovered, setHovered] = useState(false);
  const statusColor = theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  return (
    <group position={position} rotation={rotation}>
      {isSelected && (
        <mesh position={[0, -0.74, 0]}>
          <planeGeometry args={[1.7, 1.5]} />
          <meshBasicMaterial color="#52796B" transparent opacity={0.2} side={THREE.DoubleSide} />
        </mesh>
      )}
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
      {hovered && (
        <Html position={[0, 0.6, 0]} distanceFactor={14}>
          <DeviceTooltip $statusColor={statusColor}>
            <div className="tt-head">
              <span className="tt-status-dot" />
              <span>{machine.hostname}</span>
            </div>
            <div className="tt-meta">{machine.ip_address}</div>
            <div className="tt-sector">{fixTextEncoding(machine.sector_name)}</div>
          </DeviceTooltip>
        </Html>
      )}
    </group>
  );
}
