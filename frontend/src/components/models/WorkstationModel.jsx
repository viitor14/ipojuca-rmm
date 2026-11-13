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
  const isCritical = machine.health_status === 'CRITICAL';
  const isWarning = machine.health_status === 'WARNING';
  const isOffline = machine.health_status === 'OFFLINE';

  const screenColor = isOffline
    ? '#2D3748'
    : isCritical
      ? '#DC2626'
      : isWarning
        ? '#D97706'
        : '#2D6A4F';

  const screenEmissive = isOffline ? '#000000' : screenColor;
  const screenEmissiveIntensity = isOffline ? 0 : isCritical ? 0.65 : 0.45;

  // Clona a cena do modelo para que cada máquina tenha instâncias independentes de materiais dinâmicos
  const modelInstance = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Clona os materiais para mutação atômica por nó
        if (child.material) {
          child.material = child.material.clone();
        }
      }
    });
    return clone;
  }, [scene]);

  // Atualiza apenas as propriedades do material dos nós de tela e LED quando a telemetria mudar
  useMemo(() => {
    modelInstance.traverse((child) => {
      if (child.name === 'ScreenDisplay' && child.material) {
        child.material.color.set(screenColor);
        child.material.emissive.set(screenEmissive);
        child.material.emissiveIntensity = screenEmissiveIntensity;
        child.material.needsUpdate = true;
      }
      if (child.name === 'StatusLed' && child.material) {
        child.material.color.set(statusColor);
        child.material.needsUpdate = true;
      }
      if (child.name === 'ActivityLed' && child.material) {
        child.material.color.set(statusColor);
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, screenColor, screenEmissive, screenEmissiveIntensity, statusColor]);

  return (
    <group position={position} rotation={rotation}>
      {/* Halo de seleção no piso */}
      {isSelected && (
        <mesh position={[0, -0.74, 0]}>
          <planeGeometry args={[1.7, 1.5]} />
          <meshBasicMaterial
            color="#52796B"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Modelo GLB Interativo */}
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
        <Html position={[0, 0.9, 0]} distanceFactor={14}>
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
