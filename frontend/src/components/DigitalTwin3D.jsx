import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Grid } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import { theme, STATUS_LABELS } from '../styles/theme';

const StageContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 42% 48%, #0f131c 0%, #050507 72%);
  z-index: 0;
`;

const pulseBorder = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 42, 84, 0.7), 0 8px 24px rgba(0, 0, 0, 0.85); }
  50% { box-shadow: 0 0 0 6px rgba(255, 42, 84, 0), 0 8px 28px rgba(255, 42, 84, 0.45); }
`;

const CalloutCard = styled.div`
  min-width: 148px;
  padding: 6px 10px;
  background: ${({ $selected }) =>
    $selected ? 'rgba(212, 255, 51, 0.95)' : 'rgba(8, 9, 13, 0.88)'};
  color: ${({ $selected }) => ($selected ? '#050507' : '#F4F4F0')};
  border-left: 3px solid ${({ $color, $selected }) => ($selected ? '#050507' : $color)};
  border-top: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.16)'};
  border-right: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.16)'};
  border-bottom: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.16)'};
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
  font-family: 'IBM Plex Mono', monospace;
  cursor: pointer;
  transform: translate3d(-50%, -135%, 0);
  transition: transform 0.18s ease, background 0.18s ease;
  animation: ${({ $critical }) => ($critical ? pulseBorder : 'none')} 1.8s infinite;

  &:hover {
    transform: translate3d(-50%, -143%, 0) scale(1.04);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 9px;
    letter-spacing: 0.08em;
    opacity: 0.8;
  }

  .host {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    margin: 2px 0 4px 0;
  }

  .tele-row {
    display: flex;
    gap: 8px;
    font-size: 9px;
    font-weight: 600;
  }
`;

const SectorBlueprintTag = styled.div`
  padding: 3px 9px;
  background: rgba(5, 5, 7, 0.82);
  border: 1px solid rgba(244, 244, 240, 0.14);
  border-left: 2px solid #d4ff33;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(244, 244, 240, 0.75);
  white-space: nowrap;
  pointer-events: none;
`;

function CameraRig({ cameraMode, selectedMachine, controlsRef }) {
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }, delta) => {
    const mx = Number(selectedMachine?.pos_x || 0);
    const mz = Number(selectedMachine?.pos_z || 0);

    if (cameraMode === 'FOCUS' && selectedMachine) {
      targetPos.set(mx + 2.4, 3.4, mz + 3.6);
      targetLook.set(mx, 0.65, mz);
    } else if (cameraMode === 'TOP') {
      targetPos.set(0, 19.5, 0.01);
      targetLook.set(0, 0, 0);
    } else {
      targetPos.set(-1.5, 11.2, 13.8);
      targetLook.set(-0.5, 0, 0);
    }

    if (cameraMode !== 'FREE') {
      camera.position.lerp(targetPos, Math.min(1, delta * 3.2));
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLook, Math.min(1, delta * 4.0));
        controlsRef.current.update();
      }
    }
  });

  return null;
}

function SectorRoom3D({ sector, index }) {
  const x = Number(sector.bounds_x || 0);
  const z = Number(sector.bounds_z || 0);
  const w = Number(sector.width_3d || 7);
  const d = Number(sector.depth_3d || 5);

  const corners = [
    [-w / 2, -d / 2],
    [w / 2, -d / 2],
    [-w / 2, d / 2],
    [w / 2, d / 2],
  ];

  return (
    <group position={[x, 0, z]}>
      {/* Plataforma arquitetônica escura com reflexo acetinado */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[w - 0.12, 0.04, d - 0.12]} />
        <meshStandardMaterial color="#0b0d13" roughness={0.65} metalness={0.35} />
      </mesh>

      {/* Moldura de perímetro estilo planta CAD */}
      <mesh position={[0, 0.045, -d / 2 + 0.06]}>
        <boxGeometry args={[w, 0.02, 0.03]} />
        <meshBasicMaterial color="#2a3040" />
      </mesh>
      <mesh position={[0, 0.045, d / 2 - 0.06]}>
        <boxGeometry args={[w, 0.02, 0.03]} />
        <meshBasicMaterial color="#2a3040" />
      </mesh>
      <mesh position={[-w / 2 + 0.06, 0.045, 0]}>
        <boxGeometry args={[0.03, 0.02, d]} />
        <meshBasicMaterial color="#2a3040" />
      </mesh>
      <mesh position={[w / 2 - 0.06, 0.045, 0]}>
        <boxGeometry args={[0.03, 0.02, d]} />
        <meshBasicMaterial color="#2a3040" />
      </mesh>

      {/* Paredes divisórias de vidro arquitetônico fumê */}
      <mesh position={[0, 0.55, -d / 2 + 0.06]}>
        <boxGeometry args={[w - 0.2, 1.05, 0.04]} />
        <meshStandardMaterial color="#182030" transparent opacity={0.32} />
      </mesh>
      <mesh position={[-w / 2 + 0.06, 0.55, 0]}>
        <boxGeometry args={[0.04, 1.05, d - 0.2]} />
        <meshStandardMaterial color="#182030" transparent opacity={0.28} />
      </mesh>

      {/* Colunas técnicas nos 4 vértices do setor */}
      {corners.map(([cx, cz], idx) => (
        <mesh key={idx} position={[cx, 0.58, cz]}>
          <boxGeometry args={[0.06, 1.16, 0.06]} />
          <meshBasicMaterial color="#3b4356" />
        </mesh>
      ))}

      {/* Etiqueta CAD do Setor */}
      <Html position={[-w / 2 + 1.8, 1.25, -d / 2 + 0.2]} center distanceFactor={17}>
        <SectorBlueprintTag>
          SEC.0{index + 1} // {sector.name}
        </SectorBlueprintTag>
      </Html>
    </group>
  );
}

function ComputerAvatar3D({ machine, isSelected, onSelect }) {
  const screenLeftRef = useRef();
  const screenRightRef = useRef();
  const reticleRef = useRef();
  const beaconCrystalRef = useRef();
  const laserBeamRef = useRef();

  const statusColor = useMemo(
    () => theme.colors.status[machine.health_status] || theme.colors.status.NORMAL,
    [machine.health_status]
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (reticleRef.current) {
      reticleRef.current.rotation.z += delta * (isSelected ? 1.4 : 0.35);
    }

    if (beaconCrystalRef.current) {
      beaconCrystalRef.current.rotation.y += delta * 2.4;
      beaconCrystalRef.current.rotation.x += delta * 1.1;
      beaconCrystalRef.current.position.y = 1.65 + Math.sin(t * 4.5) * 0.12;
    }

    if (machine.health_status === 'CRITICAL') {
      const pulse = 0.6 + Math.abs(Math.sin(t * 8.0)) * 1.8;
      if (screenLeftRef.current) screenLeftRef.current.material.emissiveIntensity = pulse;
      if (screenRightRef.current) screenRightRef.current.material.emissiveIntensity = pulse;
      if (laserBeamRef.current) {
        laserBeamRef.current.material.opacity = 0.14 + Math.abs(Math.sin(t * 6.0)) * 0.28;
      }
    } else {
      const baseIntensity = machine.health_status === 'OFFLINE' ? 0.08 : 0.75;
      if (screenLeftRef.current)
        screenLeftRef.current.material.emissiveIntensity = baseIntensity;
      if (screenRightRef.current)
        screenRightRef.current.material.emissiveIntensity = baseIntensity;
    }
  });

  const posX = Number(machine.pos_x || 0);
  const posZ = Number(machine.pos_z || 0);
  const isCritical = machine.health_status === 'CRITICAL';

  return (
    <group
      position={[posX, 0, posZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(machine);
      }}
    >
      {/* Mesa de comando com estrutura metálica */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.06, 0.9]} />
        <meshStandardMaterial
          color={isSelected ? '#232918' : '#141821'}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>
      <mesh position={[-0.72, 0.21, 0]}>
        <boxGeometry args={[0.05, 0.42, 0.8]} />
        <meshStandardMaterial color="#0b0d12" metalness={0.8} />
      </mesh>
      <mesh position={[0.72, 0.21, 0]}>
        <boxGeometry args={[0.05, 0.42, 0.8]} />
        <meshStandardMaterial color="#0b0d12" metalness={0.8} />
      </mesh>

      {/* Cadeira técnica da estação */}
      <mesh position={[0, 0.28, 0.58]}>
        <boxGeometry args={[0.46, 0.06, 0.44]} />
        <meshStandardMaterial color="#10131a" />
      </mesh>
      <mesh position={[0, 0.52, 0.78]}>
        <boxGeometry args={[0.44, 0.45, 0.06]} />
        <meshStandardMaterial color="#10131a" />
      </mesh>

      {/* Workstation CPU Tower com barra de LED frontal */}
      <mesh position={[-0.56, 0.66, -0.08]} castShadow>
        <boxGeometry args={[0.24, 0.44, 0.48]} />
        <meshStandardMaterial color="#090b0f" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.435, 0.66, 0.1]}>
        <boxGeometry args={[0.015, 0.36, 0.03]} />
        <meshBasicMaterial color={statusColor} />
      </mesh>

      {/* Monitor Principal + Monitor Secundário Angulado */}
      <mesh
        ref={screenLeftRef}
        position={[0.02, 0.74, -0.14]}
        rotation={[0, 0.08, 0]}
        castShadow
      >
        <boxGeometry args={[0.62, 0.38, 0.04]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh
        ref={screenRightRef}
        position={[0.52, 0.74, -0.04]}
        rotation={[0, -0.32, 0]}
        castShadow
      >
        <boxGeometry args={[0.42, 0.34, 0.04]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Retícula de Mira Orbital no Piso */}
      <mesh
        ref={reticleRef}
        position={[0, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.85, 0.92, 6]} />
        <meshBasicMaterial
          color={isSelected ? '#D4FF33' : statusColor}
          wireframe={isSelected}
          transparent
          opacity={isSelected ? 0.95 : isCritical ? 0.85 : 0.35}
        />
      </mesh>

      {/* Feixe Holográfico Vertical + Cristal Octaédrico para Anomalias Críticas */}
      {isCritical && (
        <>
          <mesh ref={laserBeamRef} position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.03, 0.55, 4.2, 16, 1, true]} />
            <meshBasicMaterial
              color="#FF2A54"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={beaconCrystalRef} position={[0, 1.65, 0]}>
            <octahedronGeometry args={[0.24, 0]} />
            <meshBasicMaterial color="#FF2A54" wireframe />
          </mesh>
        </>
      )}

      {/* Callout Tático Flutuante */}
      <Html position={[0, 1.38, 0]} center distanceFactor={15}>
        <CalloutCard
          $color={statusColor}
          $selected={isSelected}
          $critical={isCritical}
          onClick={() => onSelect(machine)}
        >
          <div className="top-row">
            <span>NODE.{machine.id}</span>
            <span style={{ fontWeight: 700 }}>
              {STATUS_LABELS[machine.health_status]}
            </span>
          </div>
          <div className="host">{machine.hostname}</div>
          <div className="tele-row">
            <span>CPU {Number(machine.cpu_usage_pct).toFixed(0)}%</span>
            <span>HD {Number(machine.disk_usage_pct).toFixed(0)}%</span>
            <span>{Number(machine.temperature_c).toFixed(0)}°C</span>
          </div>
        </CalloutCard>
      </Html>
    </group>
  );
}

export function DigitalTwin3D({
  activeUnit,
  machines,
  selectedMachine,
  onSelectMachine,
  cameraMode = 'ISO',
  onUserOrbit,
}) {
  const sectors = activeUnit?.sectors || [];
  const controlsRef = useRef();

  return (
    <StageContainer>
      <Canvas
        shadows
        camera={{ position: [-1.5, 11.2, 13.8], fov: 42 }}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 16, 36]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[12, 18, 10]} intensity={1.25} castShadow />
        <pointLight position={[-10, 8, -8]} intensity={0.6} color="#00F5A0" />
        <pointLight position={[10, 6, 8]} intensity={0.45} color="#D4FF33" />

        <CameraRig
          cameraMode={cameraMode}
          selectedMachine={selectedMachine}
          controlsRef={controlsRef}
        />

        <Grid
          position={[0, 0, 0]}
          args={[44, 44]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#11141d"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#1e2433"
          fadeDistance={34}
        />

        {sectors.map((sector, idx) => (
          <SectorRoom3D key={sector.id} sector={sector} index={idx} />
        ))}

        {machines.map((machine) => (
          <ComputerAvatar3D
            key={machine.id}
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onSelect={onSelectMachine}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          onStart={() => {
            if (onUserOrbit) onUserOrbit();
          }}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={3.5}
          maxDistance={26}
        />
      </Canvas>
    </StageContainer>
  );
}
