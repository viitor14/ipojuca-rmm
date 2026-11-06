import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Grid, Line } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import { theme, STATUS_LABELS } from '../styles/theme';

const StageContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(circle at 46% 42%, rgba(0, 245, 160, 0.055) 0%, transparent 45%),
    radial-gradient(circle at 38% 52%, #101622 0%, #050507 76%);
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(rgba(212, 255, 51, 0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(212, 255, 51, 0.015) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 50% 50%, transparent 55%, black 100%);
  }
`;

const pulseBorder = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 42, 84, 0.75), 0 10px 28px rgba(0, 0, 0, 0.9); }
  50% { box-shadow: 0 0 0 7px rgba(255, 42, 84, 0), 0 10px 32px rgba(255, 42, 84, 0.55); }
`;

const CalloutCard = styled.div`
  min-width: 168px;
  padding: 7px 11px;
  background: ${({ $selected }) =>
    $selected ? 'rgba(212, 255, 51, 0.96)' : 'rgba(7, 9, 14, 0.90)'};
  color: ${({ $selected }) => ($selected ? '#050507' : '#F4F4F0')};
  border-left: 3px solid ${({ $color, $selected }) => ($selected ? '#050507' : $color)};
  border-top: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.18)'};
  border-right: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.18)'};
  border-bottom: 1px solid
    ${({ $selected }) =>
      $selected ? 'rgba(212, 255, 51, 1)' : 'rgba(244, 244, 240, 0.18)'};
  clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%);
  font-family: 'IBM Plex Mono', monospace;
  cursor: pointer;
  transform: translate3d(-50%, -142%, 0);
  transition: transform 0.18s ease, background 0.18s ease;
  animation: ${({ $critical }) => ($critical ? pulseBorder : 'none')} 1.8s infinite;
  backdrop-filter: blur(12px);

  &:hover {
    transform: translate3d(-50%, -150%, 0) scale(1.05);
  }

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 9px;
    letter-spacing: 0.08em;
    opacity: 0.85;
  }

  .host {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.03em;
    margin: 2px 0 3px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }

  .ip-line {
    font-size: 8.5px;
    opacity: 0.72;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
  }

  .tele-row {
    display: flex;
    gap: 7px;
    font-size: 9px;
    font-weight: 600;
    border-top: 1px solid
      ${({ $selected }) =>
        $selected ? 'rgba(5, 5, 7, 0.2)' : 'rgba(244, 244, 240, 0.1)'};
    padding-top: 4px;
  }
`;

const SectorBlueprintTag = styled.div`
  padding: 4px 10px;
  background: rgba(6, 8, 13, 0.88);
  border: 1px solid rgba(244, 244, 240, 0.16);
  border-left: 3px solid ${({ $accent }) => $accent || '#d4ff33'};
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: rgba(244, 244, 240, 0.88);
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.65);

  .sec-sub {
    display: block;
    font-size: 7.5px;
    color: #8a90a2;
    margin-top: 1px;
  }
`;

const CoreRackBadge = styled.div`
  padding: 3px 8px;
  background: rgba(5, 8, 14, 0.9);
  border: 1px solid rgba(0, 229, 255, 0.45);
  border-left: 2px solid #00e5ff;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #00e5ff;
  white-space: nowrap;
  pointer-events: none;
`;

function CameraRig({ cameraMode, selectedMachine, controlsRef }) {
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, clock }, delta) => {
    const mx = Number(selectedMachine?.pos_x || 0);
    const mz = Number(selectedMachine?.pos_z || 0);

    if (cameraMode === 'ORBIT') {
      const t = clock.getElapsedTime() * 0.22;
      const radius = 16.5;
      targetPos.set(Math.sin(t) * radius, 10.5, Math.cos(t) * radius);
      targetLook.set(0, 0.4, 0);
      camera.position.lerp(targetPos, Math.min(1, delta * 2.5));
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLook, Math.min(1, delta * 3.5));
        controlsRef.current.update();
      }
      return;
    }

    if (cameraMode === 'FOCUS' && selectedMachine) {
      targetPos.set(mx + 2.2, 2.85, mz + 3.15);
      targetLook.set(mx, 0.68, mz);
    } else if (cameraMode === 'TOP') {
      targetPos.set(0, 20.5, 0.01);
      targetLook.set(0, 0, 0);
    } else {
      targetPos.set(-1.8, 11.4, 14.4);
      targetLook.set(-0.3, 0.2, 0);
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

function VolumetricSpotBeam({ position = [0, 4.2, 0], color = '#00F5A0', radius = 2.4, opacity = 0.045 }) {
  return (
    <mesh position={position}>
      <coneGeometry args={[radius, 4.2, 24, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function CentralArchitectureHub({ sectors, showVolumetric }) {
  const pulseRingRef = useRef();
  const rackLedRef = useRef();

  const corridorSpan = useMemo(() => {
    if (!sectors || sectors.length === 0) return { minX: -9, maxX: 9 };
    let minX = -6;
    let maxX = 6;
    sectors.forEach((s) => {
      const x = Number(s.bounds_x || 0);
      const w = Number(s.width_3d || 7);
      if (x - w / 2 < minX) minX = x - w / 2;
      if (x + w / 2 > maxX) maxX = x + w / 2;
    });
    return { minX: minX - 1.2, maxX: maxX + 1.2 };
  }, [sectors]);

  const corridorWidth = Math.max(14, corridorSpan.maxX - corridorSpan.minX);
  const corridorCenterX = (corridorSpan.minX + corridorSpan.maxX) / 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulseRingRef.current) {
      const s = 1 + (t % 3.5) * 0.45;
      pulseRingRef.current.scale.set(s, s, 1);
      pulseRingRef.current.material.opacity = Math.max(0, 0.22 - (t % 3.5) * 0.06);
    }
    if (rackLedRef.current) {
      rackLedRef.current.material.opacity = 0.55 + Math.abs(Math.sin(t * 7)) * 0.45;
    }
  });

  return (
    <group>
      {/* Anéis de Radar Polar Arquitetônico no Piso */}
      {[5.5, 10.5, 15.5, 20.5].map((r, idx) => (
        <mesh key={idx} position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r, r + 0.035, 64]} />
          <meshBasicMaterial
            color={idx === 0 ? '#00E5FF' : '#1e2638'}
            transparent
            opacity={idx === 0 ? 0.28 : 0.32}
          />
        </mesh>
      ))}

      {/* Onda de Radar Expansiva do Bastidor Central */}
      <mesh ref={pulseRingRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.32, 48]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} />
      </mesh>

      {/* Passarela / Corredor Central Integrado da Unidade de Saúde */}
      <group position={[corridorCenterX, 0.012, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[corridorWidth, 0.024, 2.25]} />
          <meshStandardMaterial color="#0a0d14" roughness={0.5} metalness={0.45} />
        </mesh>
        {/* Faixas Guia Luminosas de Circulação Hospitalar */}
        <mesh position={[0, 0.014, -1.05]}>
          <boxGeometry args={[corridorWidth, 0.008, 0.035]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.45} />
        </mesh>
        <mesh position={[0, 0.014, 1.05]}>
          <boxGeometry args={[corridorWidth, 0.008, 0.035]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.45} />
        </mesh>
        {/* Marcações de Eixo Central Tracejadas */}
        {Array.from({ length: Math.floor(corridorWidth / 2.2) }).map((_, i) => {
          const dashX = -corridorWidth / 2 + 1.2 + i * 2.2;
          return (
            <mesh key={i} position={[dashX, 0.014, 0]}>
              <boxGeometry args={[0.75, 0.006, 0.025]} />
              <meshBasicMaterial color="#2a354b" />
            </mesh>
          );
        })}
      </group>

      {/* Bastidor Core de Telecomunicações (Switch Core & Patch Panel) no Centro (0, 0, 0) */}
      <group position={[0, 0, 0]}>
        {/* Base Antivibração do Rack */}
        <mesh position={[0, 0.04, 0]}>
          <boxGeometry args={[0.92, 0.08, 0.92]} />
          <meshStandardMaterial color="#121722" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Gabinete Metálico 42U Compacto */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.68, 1.32, 0.68]} />
          <meshStandardMaterial color="#0b0e15" metalness={0.82} roughness={0.24} />
        </mesh>
        {/* Painel Frontal de Switches com LEDs de Fibra */}
        {[0.38, 0.56, 0.74, 0.92, 1.1].map((py, idx) => (
          <group key={idx} position={[0, py, 0.345]}>
            <mesh>
              <boxGeometry args={[0.56, 0.09, 0.02]} />
              <meshStandardMaterial color="#161c28" metalness={0.6} />
            </mesh>
            <mesh ref={idx === 0 ? rackLedRef : null} position={[-0.18, 0, 0.014]}>
              <boxGeometry args={[0.14, 0.025, 0.01]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#00E5FF' : '#00F5A0'} transparent opacity={0.9} />
            </mesh>
            <mesh position={[0.14, 0, 0.014]}>
              <boxGeometry args={[0.18, 0.02, 0.01]} />
              <meshBasicMaterial color="#D4FF33" />
            </mesh>
          </group>
        ))}

        {/* Coluna Holográfica do Core de Rede */}
        {showVolumetric && (
          <VolumetricSpotBeam position={[0, 2.2, 0]} color="#00E5FF" radius={1.35} opacity={0.055} />
        )}

        <Html position={[0, 1.62, 0]} center distanceFactor={16}>
          <CoreRackBadge>CORE.SWITCH // FIBRA ÓPTICA</CoreRackBadge>
        </Html>
      </group>
    </group>
  );
}

function FiberOpticConduit({ machine }) {
  const packetRef = useRef();
  const posX = Number(machine.pos_x || 0);
  const posZ = Number(machine.pos_z || 0);

  const statusColor = useMemo(
    () => theme.colors.status[machine.health_status] || theme.colors.status.NORMAL,
    [machine.health_status]
  );

  const points = useMemo(() => {
    const midZ = posZ >= 0 ? Math.min(0.95, posZ * 0.35) : Math.max(-0.95, posZ * 0.35);
    return [
      [0, 0.032, 0],
      [posX, 0.032, midZ],
      [posX, 0.032, posZ],
    ];
  }, [posX, posZ]);

  useFrame(({ clock }) => {
    if (!packetRef.current || machine.health_status === 'OFFLINE') return;
    const speed = machine.health_status === 'CRITICAL' ? 1.65 : 0.75;
    const progress = (clock.getElapsedTime() * speed + (machine.id || 1) * 0.37) % 1;

    const p0 = points[0];
    const p1 = points[1];
    const p2 = points[2];

    if (progress < 0.5) {
      const t = progress * 2;
      packetRef.current.position.set(
        THREE.MathUtils.lerp(p0[0], p1[0], t),
        0.045,
        THREE.MathUtils.lerp(p0[2], p1[2], t)
      );
    } else {
      const t = (progress - 0.5) * 2;
      packetRef.current.position.set(
        THREE.MathUtils.lerp(p1[0], p2[0], t),
        0.045,
        THREE.MathUtils.lerp(p1[2], p2[2], t)
      );
    }
  });

  return (
    <group>
      <Line
        points={points}
        color={statusColor}
        lineWidth={machine.health_status === 'CRITICAL' ? 2.2 : 1.3}
        transparent
        opacity={machine.health_status === 'OFFLINE' ? 0.18 : 0.52}
      />
      {machine.health_status !== 'OFFLINE' && (
        <mesh ref={packetRef} position={[0, 0.045, 0]}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshBasicMaterial color={statusColor} />
        </mesh>
      )}
    </group>
  );
}

function SectorClinicalFurniture({ sector }) {
  const w = Number(sector.width_3d || 7);
  const d = Number(sector.depth_3d || 5);
  const codeAndName = `${sector.code || ''} ${sector.name || ''}`.toUpperCase();

  const isReception =
    codeAndName.includes('REC') ||
    codeAndName.includes('TRI') ||
    codeAndName.includes('ATEND') ||
    codeAndName.includes('REG');
  const isPharmacy =
    codeAndName.includes('FARM') ||
    codeAndName.includes('VAC') ||
    codeAndName.includes('IMUNO') ||
    codeAndName.includes('DISP');
  const isClinical =
    codeAndName.includes('CONS') ||
    codeAndName.includes('MED') ||
    codeAndName.includes('ENF') ||
    codeAndName.includes('ODONTO') ||
    codeAndName.includes('ACOLH');

  if (isReception) {
    return (
      <group>
        {/* Balcão Chanfrado de Atendimento & Acolhimento */}
        <group position={[w / 2 - 1.35, 0, 0.55]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <boxGeometry args={[1.55, 0.92, 0.42]} />
            <meshStandardMaterial color="#121824" roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.95, 0.04]}>
            <boxGeometry args={[1.62, 0.04, 0.5]} />
            <meshStandardMaterial color="#1d2638" roughness={0.25} metalness={0.7} />
          </mesh>
          {/* Faixa de LED Frontal do Balcão */}
          <mesh position={[0, 0.72, 0.22]}>
            <boxGeometry args={[1.48, 0.025, 0.01]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
        </group>

        {/* Totem de Senha / Triagem Digital */}
        <group position={[w / 2 - 0.55, 0, -d / 2 + 0.75]}>
          <mesh position={[0, 0.68, 0]} castShadow>
            <boxGeometry args={[0.34, 1.32, 0.24]} />
            <meshStandardMaterial color="#0e131d" metalness={0.75} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.92, 0.125]} rotation={[-0.12, 0, 0]}>
            <boxGeometry args={[0.26, 0.38, 0.02]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
        </group>

        {/* Longarina Hospitalar de Espera (3 Assentos) */}
        <group position={[-w / 2 + 1.25, 0, d / 2 - 0.72]}>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[1.65, 0.05, 0.42]} />
            <meshStandardMaterial color="#192232" metalness={0.6} />
          </mesh>
          {[-0.52, 0, 0.52].map((sx, idx) => (
            <group key={idx} position={[sx, 0, 0]}>
              <mesh position={[0, 0.27, 0]}>
                <boxGeometry args={[0.42, 0.05, 0.4]} />
                <meshStandardMaterial color="#162030" />
              </mesh>
              <mesh position={[0, 0.46, -0.17]} rotation={[0.12, 0, 0]}>
                <boxGeometry args={[0.42, 0.34, 0.05]} />
                <meshStandardMaterial color="#162030" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
    );
  }

  if (isPharmacy) {
    return (
      <group>
        {/* Câmara Fria Científica para Termolábeis / Vacinas (+4.0°C) */}
        <group position={[w / 2 - 0.78, 0, -d / 2 + 0.65]}>
          <mesh position={[0, 0.85, 0]} castShadow>
            <boxGeometry args={[0.78, 1.66, 0.68]} />
            <meshStandardMaterial color="#141c29" metalness={0.65} roughness={0.3} />
          </mesh>
          {/* Porta de Vidro Térmico Iluminada */}
          <mesh position={[0, 0.78, 0.345]}>
            <boxGeometry args={[0.64, 1.22, 0.02]} />
            <meshStandardMaterial color="#00E5FF" transparent opacity={0.28} />
          </mesh>
          {/* Display Termômetro Digital (+4°C Nominal) */}
          <mesh position={[0, 1.52, 0.35]}>
            <boxGeometry args={[0.32, 0.09, 0.02]} />
            <meshBasicMaterial color="#00F5A0" />
          </mesh>
        </group>

        {/* Estantes Modulares de Medicamentos e Insumos */}
        {[-0.65, 0.45].map((ez, idx) => (
          <group key={idx} position={[-w / 2 + 0.55, 0, ez]}>
            <mesh position={[0, 0.65, 0]} castShadow>
              <boxGeometry args={[0.42, 1.28, 0.88]} />
              <meshStandardMaterial color="#111722" metalness={0.6} roughness={0.4} />
            </mesh>
            {[0.28, 0.58, 0.88, 1.15].map((shY, sIdx) => (
              <mesh key={sIdx} position={[0.04, shY, 0]}>
                <boxGeometry args={[0.38, 0.03, 0.82]} />
                <meshStandardMaterial color="#222d42" />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    );
  }

  if (isClinical) {
    return (
      <group>
        {/* Maca Clínica de Exame com Cabeceira Inclinada */}
        <group position={[w / 2 - 1.15, 0, 0.35]}>
          {/* Colchão Clínico */}
          <mesh position={[0, 0.52, 0]} castShadow>
            <boxGeometry args={[0.76, 0.1, 1.78]} />
            <meshStandardMaterial color="#1a2639" roughness={0.45} metalness={0.2} />
          </mesh>
          {/* Cabeceira Elevada */}
          <mesh position={[0, 0.64, -0.66]} rotation={[0.36, 0, 0]}>
            <boxGeometry args={[0.72, 0.09, 0.46]} />
            <meshStandardMaterial color="#22324a" />
          </mesh>
          {/* Estrutura Tubular Metálica */}
          {[
            [-0.32, -0.78],
            [0.32, -0.78],
            [-0.32, 0.78],
            [0.32, 0.78],
          ].map(([lx, lz], idx) => (
            <mesh key={idx} position={[lx, 0.25, lz]}>
              <cylinderGeometry args={[0.025, 0.025, 0.48, 8]} />
              <meshStandardMaterial color="#4b566e" metalness={0.85} />
            </mesh>
          ))}
        </group>

        {/* Armário Vitrine de Prontuários / Insumos Médicos */}
        <group position={[w / 2 - 0.55, 0, -d / 2 + 0.48]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[0.75, 1.42, 0.38]} />
            <meshStandardMaterial color="#101520" metalness={0.6} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.78, 0.195]}>
            <boxGeometry args={[0.64, 1.1, 0.015]} />
            <meshStandardMaterial color="#00F5A0" transparent opacity={0.16} />
          </mesh>
        </group>

        {/* Biombo Hospitalar Técnico */}
        <group position={[w / 2 - 1.95, 0, 0.25]} rotation={[0, 0.28, 0]}>
          <mesh position={[0, 0.62, 0]}>
            <boxGeometry args={[0.03, 1.18, 0.85]} />
            <meshStandardMaterial color="#182234" transparent opacity={0.55} />
          </mesh>
        </group>
      </group>
    );
  }

  // Fallback: Setor Administrativo / Regulação / TI
  return (
    <group>
      {/* Bastidor Secundário / Armário Técnico */}
      <group position={[w / 2 - 0.65, 0, -d / 2 + 0.55]}>
        <mesh position={[0, 0.68, 0]} castShadow>
          <boxGeometry args={[0.62, 1.34, 0.52]} />
          <meshStandardMaterial color="#101520" metalness={0.75} roughness={0.28} />
        </mesh>
        <mesh position={[0, 1.05, 0.265]}>
          <boxGeometry args={[0.42, 0.04, 0.01]} />
          <meshBasicMaterial color="#D4FF33" />
        </mesh>
      </group>
    </group>
  );
}

function SectorRoom3D({
  sector,
  index,
  sectorMachines,
  showFurniture,
  showLabels,
  showVolumetric,
}) {
  const x = Number(sector.bounds_x || 0);
  const z = Number(sector.bounds_z || 0);
  const w = Number(sector.width_3d || 7);
  const d = Number(sector.depth_3d || 5);

  const sectorStatusColor = useMemo(() => {
    if (!sectorMachines || sectorMachines.length === 0) return '#2a3346';
    if (sectorMachines.some((m) => m.health_status === 'CRITICAL')) {
      return theme.colors.status.CRITICAL;
    }
    if (sectorMachines.some((m) => m.health_status === 'WARNING')) {
      return theme.colors.status.WARNING;
    }
    if (sectorMachines.some((m) => m.health_status === 'NORMAL')) {
      return theme.colors.status.NORMAL;
    }
    return theme.colors.status.OFFLINE;
  }, [sectorMachines]);

  const corners = [
    [-w / 2, -d / 2],
    [w / 2, -d / 2],
    [-w / 2, d / 2],
    [w / 2, d / 2],
  ];

  // Abertura da porta voltada para o corredor central (z = 0)
  const doorOnNorthWall = z > 0;
  const frontWallZ = doorOnNorthWall ? -d / 2 + 0.06 : d / 2 - 0.06;
  const backWallZ = doorOnNorthWall ? d / 2 - 0.06 : -d / 2 + 0.06;

  return (
    <group position={[x, 0, z]}>
      {/* Plataforma Arquitetônica Principal com Acabamento Acetinado */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <boxGeometry args={[w - 0.1, 0.04, d - 0.1]} />
        <meshStandardMaterial color="#0b0e15" roughness={0.58} metalness={0.38} />
      </mesh>

      {/* Tapete Técnico Antiestático Central do Setor */}
      <mesh position={[0, 0.042, 0]} receiveShadow>
        <boxGeometry args={[w - 1.1, 0.008, d - 1.1]} />
        <meshStandardMaterial color="#0e131d" roughness={0.75} metalness={0.2} />
      </mesh>

      {/* Rodapé Luminoso Reativo ao Estado de Saúde do Setor */}
      <mesh position={[0, 0.048, backWallZ]}>
        <boxGeometry args={[w, 0.024, 0.035]} />
        <meshBasicMaterial color={sectorStatusColor} />
      </mesh>
      <mesh position={[-w / 2 + 0.06, 0.048, 0]}>
        <boxGeometry args={[0.035, 0.024, d]} />
        <meshBasicMaterial color={sectorStatusColor} />
      </mesh>
      <mesh position={[w / 2 - 0.06, 0.048, 0]}>
        <boxGeometry args={[0.035, 0.024, d]} />
        <meshBasicMaterial color="#263044" />
      </mesh>

      {/* Parede de Fundo de Vidro Arquitetônico Fumê */}
      <mesh position={[0, 0.62, backWallZ]}>
        <boxGeometry args={[w - 0.18, 1.18, 0.04]} />
        <meshStandardMaterial color="#162032" transparent opacity={0.34} roughness={0.2} />
      </mesh>

      {/* Paredes Laterais de Vidro Fumê */}
      <mesh position={[-w / 2 + 0.06, 0.62, 0]}>
        <boxGeometry args={[0.04, 1.18, d - 0.18]} />
        <meshStandardMaterial color="#162032" transparent opacity={0.3} roughness={0.2} />
      </mesh>
      <mesh position={[w / 2 - 0.06, 0.62, 0]}>
        <boxGeometry args={[0.04, 1.18, d - 0.18]} />
        <meshStandardMaterial color="#162032" transparent opacity={0.22} roughness={0.2} />
      </mesh>

      {/* Parede Frontal Voltada ao Corredor com Pórtico de Acesso (Vão de Porta) */}
      <mesh position={[-w / 4 - 0.35, 0.62, frontWallZ]}>
        <boxGeometry args={[w / 2 - 0.8, 1.18, 0.04]} />
        <meshStandardMaterial color="#162032" transparent opacity={0.26} />
      </mesh>
      <mesh position={[w / 4 + 0.35, 0.62, frontWallZ]}>
        <boxGeometry args={[w / 2 - 0.8, 1.18, 0.04]} />
        <meshStandardMaterial color="#162032" transparent opacity={0.26} />
      </mesh>
      {/* Verga Superior Iluminada do Pórtico de Entrada */}
      <mesh position={[0, 1.2, frontWallZ]}>
        <boxGeometry args={[1.55, 0.05, 0.06]} />
        <meshBasicMaterial color={sectorStatusColor} />
      </mesh>

      {/* Colunas Estruturais Chanfradas nos 4 Vértices */}
      {corners.map(([cx, cz], idx) => (
        <group key={idx} position={[cx, 0, cz]}>
          <mesh position={[0, 0.64, 0]}>
            <boxGeometry args={[0.08, 1.28, 0.08]} />
            <meshStandardMaterial color="#2e374a" metalness={0.8} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <boxGeometry args={[0.1, 0.03, 0.1]} />
            <meshBasicMaterial color={sectorStatusColor} />
          </mesh>
        </group>
      ))}

      {/* Mobiliário Clínico / Técnico Contextual do Setor */}
      {showFurniture && <SectorClinicalFurniture sector={sector} />}

      {/* Feixe Volumétrico Atmosférico do Setor */}
      {showVolumetric && (
        <VolumetricSpotBeam
          position={[0, 2.35, 0]}
          color={sectorStatusColor === '#2a3346' ? '#D4FF33' : sectorStatusColor}
          radius={Math.min(w, d) * 0.42}
          opacity={0.032}
        />
      )}

      {/* Etiqueta CAD Holográfica do Setor */}
      {showLabels && (
        <Html position={[-w / 2 + 1.85, 1.48, backWallZ]} center distanceFactor={17}>
          <SectorBlueprintTag $accent={sectorStatusColor}>
            <span>
              SEC.0{index + 1} // {sector.name}
            </span>
            <span className="sec-sub">
              [{sector.code}] • {sectorMachines.length} ESTAÇÃO(ÕES) ATIVA(S)
            </span>
          </SectorBlueprintTag>
        </Html>
      )}
    </group>
  );
}

function ComputerAvatar3D({ machine, isSelected, onSelect, showLabels }) {
  const screenLeftRef = useRef();
  const screenRightRef = useRef();
  const reticleRef = useRef();
  const outerRingRef = useRef();
  const beaconCrystalRef = useRef();
  const laserBeamRef = useRef();
  const spoolerLedRef = useRef();

  const statusColor = useMemo(
    () => theme.colors.status[machine.health_status] || theme.colors.status.NORMAL,
    [machine.health_status]
  );

  const spoolerOk = Boolean(machine.spooler_running);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    if (reticleRef.current) {
      reticleRef.current.rotation.z += delta * (isSelected ? 1.5 : 0.38);
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * (isSelected ? 0.9 : 0.2);
    }

    if (beaconCrystalRef.current) {
      beaconCrystalRef.current.rotation.y += delta * 2.4;
      beaconCrystalRef.current.rotation.x += delta * 1.1;
      beaconCrystalRef.current.position.y = 1.72 + Math.sin(t * 4.5) * 0.1;
    }

    if (spoolerLedRef.current && !spoolerOk) {
      spoolerLedRef.current.material.opacity = 0.35 + Math.abs(Math.sin(t * 6.5)) * 0.65;
    }

    if (machine.health_status === 'CRITICAL') {
      const pulse = 0.65 + Math.abs(Math.sin(t * 8.0)) * 1.85;
      if (screenLeftRef.current) screenLeftRef.current.material.emissiveIntensity = pulse;
      if (screenRightRef.current) screenRightRef.current.material.emissiveIntensity = pulse;
      if (laserBeamRef.current) {
        laserBeamRef.current.material.opacity = 0.14 + Math.abs(Math.sin(t * 6.0)) * 0.28;
      }
    } else {
      const baseIntensity = machine.health_status === 'OFFLINE' ? 0.08 : 0.82;
      if (screenLeftRef.current) {
        screenLeftRef.current.material.emissiveIntensity = baseIntensity;
      }
      if (screenRightRef.current) {
        screenRightRef.current.material.emissiveIntensity = baseIntensity * 0.85;
      }
    }
  });

  const posX = Number(machine.pos_x || 0);
  const posZ = Number(machine.pos_z || 0);
  const isCritical = machine.health_status === 'CRITICAL';
  const cpuRatio = Math.min(1, Math.max(0.08, Number(machine.cpu_usage_pct || 0) / 100));

  return (
    <group
      position={[posX, 0, posZ]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(machine);
      }}
    >
      {/* Bancada Técnica Chanfrada com Acabamento de Engenharia */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.76, 0.055, 0.92]} />
        <meshStandardMaterial
          color={isSelected ? '#232b16' : '#141923'}
          roughness={0.36}
          metalness={0.65}
        />
      </mesh>
      {/* Fita de LED Frontal na Borda da Bancada */}
      <mesh position={[0, 0.44, 0.465]}>
        <boxGeometry args={[1.72, 0.016, 0.012]} />
        <meshBasicMaterial color={isSelected ? '#D4FF33' : statusColor} />
      </mesh>
      {/* Pés Metálicos em U da Bancada */}
      <mesh position={[-0.78, 0.22, 0]} castShadow>
        <boxGeometry args={[0.055, 0.44, 0.82]} />
        <meshStandardMaterial color="#0a0d13" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0.78, 0.22, 0]} castShadow>
        <boxGeometry args={[0.055, 0.44, 0.82]} />
        <meshStandardMaterial color="#0a0d13" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Cadeira Ergonômica Executiva / Operador de TI (Base Estrela + Pistão + Braços) */}
      <group position={[0, 0, 0.62]}>
        {/* Pistão Central e Estrela de Rodízios */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.26, 10]} />
          <meshStandardMaterial color="#252c3d" metalness={0.85} />
        </mesh>
        {[0, 1.25, 2.51, 3.76, 5.02].map((ang, i) => (
          <mesh
            key={i}
            position={[Math.sin(ang) * 0.14, 0.035, Math.cos(ang) * 0.14]}
            rotation={[0, ang, 0]}
          >
            <boxGeometry args={[0.03, 0.025, 0.28]} />
            <meshStandardMaterial color="#1c2230" metalness={0.8} />
          </mesh>
        ))}
        {/* Assento Estofado */}
        <mesh position={[0, 0.29, 0]} castShadow>
          <boxGeometry args={[0.48, 0.06, 0.46]} />
          <meshStandardMaterial color="#111520" roughness={0.6} />
        </mesh>
        {/* Encosto Anatômico + Apoio de Cabeça */}
        <mesh position={[0, 0.56, 0.21]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.45, 0.5, 0.055]} />
          <meshStandardMaterial color="#111520" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.86, 0.23]}>
          <boxGeometry args={[0.26, 0.11, 0.05]} />
          <meshStandardMaterial color="#181e2c" />
        </mesh>
        {/* Apoios de Braço */}
        <mesh position={[-0.25, 0.41, 0.02]}>
          <boxGeometry args={[0.04, 0.03, 0.28]} />
          <meshStandardMaterial color="#222a3a" />
        </mesh>
        <mesh position={[0.25, 0.41, 0.02]}>
          <boxGeometry args={[0.04, 0.03, 0.28]} />
          <meshStandardMaterial color="#222a3a" />
        </mesh>
      </group>

      {/* Gabinete Workstation Tower com Janela Acrílica e Iluminação Interna */}
      <group position={[-0.62, 0.69, -0.08]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.46, 0.48]} />
          <meshStandardMaterial color="#090c12" metalness={0.78} roughness={0.26} />
        </mesh>
        {/* Barra de LED Frontal de Telemetria */}
        <mesh position={[0.122, 0, 0.14]}>
          <boxGeometry args={[0.012, 0.38, 0.025]} />
          <meshBasicMaterial color={statusColor} />
        </mesh>
        {/* Janela Lateral Acrílica com Cooler/GPU Iluminado */}
        <mesh position={[0.123, 0.02, -0.02]}>
          <boxGeometry args={[0.008, 0.3, 0.32]} />
          <meshStandardMaterial
            color={statusColor}
            emissive={statusColor}
            emissiveIntensity={0.45}
            transparent
            opacity={0.45}
          />
        </mesh>
      </group>

      {/* Suporte Articulado Duplo + Monitores de Borda Fina */}
      <mesh position={[0.12, 0.58, -0.28]}>
        <cylinderGeometry args={[0.028, 0.035, 0.28, 12]} />
        <meshStandardMaterial color="#1e2536" metalness={0.85} />
      </mesh>
      {/* Monitor Principal */}
      <group position={[-0.04, 0.76, -0.16]} rotation={[0, 0.06, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.66, 0.4, 0.03]} />
          <meshStandardMaterial color="#0c0f17" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={screenLeftRef} position={[0, 0, 0.018]}>
          <boxGeometry args={[0.62, 0.36, 0.008]} />
          <meshStandardMaterial
            color={statusColor}
            emissive={statusColor}
            emissiveIntensity={0.82}
            roughness={0.18}
          />
        </mesh>
      </group>
      {/* Monitor Secundário Angulado */}
      <group position={[0.48, 0.75, -0.06]} rotation={[0, -0.34, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.36, 0.03]} />
          <meshStandardMaterial color="#0c0f17" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={screenRightRef} position={[0, 0, 0.018]}>
          <boxGeometry args={[0.42, 0.32, 0.008]} />
          <meshStandardMaterial
            color={statusColor}
            emissive={statusColor}
            emissiveIntensity={0.68}
            roughness={0.18}
          />
        </mesh>
      </group>

      {/* Teclado Mecânico Retroiluminado + Mousepad + Mouse */}
      <group position={[-0.02, 0.475, 0.16]}>
        <mesh>
          <boxGeometry args={[0.42, 0.018, 0.15]} />
          <meshStandardMaterial color="#0f141e" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.011, 0]}>
          <boxGeometry args={[0.38, 0.004, 0.11]} />
          <meshBasicMaterial color={isSelected ? '#D4FF33' : statusColor} transparent opacity={0.55} />
        </mesh>
      </group>
      <group position={[0.32, 0.472, 0.18]}>
        <mesh>
          <boxGeometry args={[0.22, 0.006, 0.2]} />
          <meshStandardMaterial color="#0b0e15" />
        </mesh>
        <mesh position={[0, 0.014, 0]}>
          <boxGeometry args={[0.06, 0.022, 0.1]} />
          <meshStandardMaterial color="#1a2130" metalness={0.5} />
        </mesh>
      </group>

      {/* Impressora Física de Prontuário / Receituário (Sincronizada com spooler_running) */}
      <group position={[0.64, 0.56, 0.18]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.19, 0.28]} />
          <meshStandardMaterial color="#161c28" roughness={0.4} metalness={0.45} />
        </mesh>
        {/* Bandeja de Papel Superior / Folha Impressa */}
        <mesh position={[0, 0.11, -0.06]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.2, 0.01, 0.16]} />
          <meshBasicMaterial color="#e6e8ee" />
        </mesh>
        {/* LED Indicador do Serviço de Spooler */}
        <mesh ref={spoolerLedRef} position={[-0.1, 0.06, 0.145]}>
          <boxGeometry args={[0.06, 0.02, 0.01]} />
          <meshBasicMaterial
            color={spoolerOk ? '#00F5A0' : '#FF2A54'}
            transparent
            opacity={0.95}
          />
        </mesh>
      </group>

      {/* Retícula Holográfica Interna + Arco de Carga de CPU no Piso */}
      <mesh
        ref={reticleRef}
        position={[0, 0.048, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.92, 0.99, 6]} />
        <meshBasicMaterial
          color={isSelected ? '#D4FF33' : statusColor}
          wireframe={isSelected}
          transparent
          opacity={isSelected ? 0.95 : isCritical ? 0.85 : 0.4}
        />
      </mesh>
      <mesh
        ref={outerRingRef}
        position={[0, 0.045, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.08, 1.13, 32, 1, 0, Math.PI * 2 * cpuRatio]} />
        <meshBasicMaterial
          color={isSelected ? '#D4FF33' : statusColor}
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Feixe Holográfico Vertical + Cristal Octaédrico para Anomalias Críticas */}
      {isCritical && (
        <>
          <mesh ref={laserBeamRef} position={[0, 2.25, 0]}>
            <cylinderGeometry args={[0.035, 0.58, 4.3, 18, 1, true]} />
            <meshBasicMaterial
              color="#FF2A54"
              transparent
              opacity={0.26}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh ref={beaconCrystalRef} position={[0, 1.72, 0]}>
            <octahedronGeometry args={[0.25, 0]} />
            <meshBasicMaterial color="#FF2A54" wireframe />
          </mesh>
        </>
      )}

      {/* Callout Holográfico Tático Flutuante */}
      {showLabels && (
        <Html position={[0, 1.44, 0]} center distanceFactor={15}>
          <CalloutCard
            $color={statusColor}
            $selected={isSelected}
            $critical={isCritical}
            onClick={() => onSelect(machine)}
          >
            <div className="top-row">
              <span>NODE.{machine.id} // {machine.sector_code || 'SETOR'}</span>
              <span style={{ fontWeight: 700 }}>
                {STATUS_LABELS[machine.health_status]}
              </span>
            </div>
            <div className="host">
              <span>{machine.hostname}</span>
            </div>
            <div className="ip-line">
              <span>IP: {machine.ip_address}</span>
              <span style={{ color: spoolerOk ? '#00F5A0' : '#FF2A54' }}>
                {spoolerOk ? 'PRN:OK' : 'PRN:ERR'}
              </span>
            </div>
            <div className="tele-row">
              <span>CPU {Number(machine.cpu_usage_pct).toFixed(0)}%</span>
              <span>RAM {Number(machine.ram_usage_pct).toFixed(0)}%</span>
              <span>HD {Number(machine.disk_usage_pct).toFixed(0)}%</span>
              <span>{Number(machine.temperature_c).toFixed(0)}°C</span>
            </div>
          </CalloutCard>
        </Html>
      )}
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
  sceneLayers = {
    furniture: true,
    network: true,
    labels: true,
    volumetric: true,
  },
}) {
  const sectors = activeUnit?.sectors || [];
  const controlsRef = useRef();

  return (
    <StageContainer>
      <Canvas
        shadows
        camera={{ position: [-1.8, 11.4, 14.4], fov: 41 }}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 17, 38]} />

        <ambientLight intensity={0.62} />
        <directionalLight position={[14, 20, 12]} intensity={1.35} castShadow />
        <pointLight position={[-12, 9, -9]} intensity={0.68} color="#00F5A0" />
        <pointLight position={[12, 7, 9]} intensity={0.52} color="#D4FF33" />
        <pointLight position={[0, 5, 0]} intensity={0.55} color="#00E5FF" />

        <CameraRig
          cameraMode={cameraMode}
          selectedMachine={selectedMachine}
          controlsRef={controlsRef}
        />

        <Grid
          position={[0, 0, 0]}
          args={[48, 48]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#111622"
          sectionSize={5}
          sectionThickness={1.1}
          sectionColor="#1f283b"
          fadeDistance={36}
        />

        {/* Espinha Dorsal Arquitetônica: Corredor Central + Rack Core de Rede */}
        <CentralArchitectureHub
          sectors={sectors}
          showVolumetric={sceneLayers.volumetric}
        />

        {/* Eletrocalhas e Pulsos de Fibra Óptica ligando o Core Switch às Estações */}
        {sceneLayers.network &&
          machines.map((machine) => (
            <FiberOpticConduit key={`fiber-${machine.id}`} machine={machine} />
          ))}

        {/* Salas/Setores com Paredes de Vidro, Pórticos e Mobiliário Clínico */}
        {sectors.map((sector, idx) => {
          const sectorMachines = machines.filter(
            (m) => Number(m.sector_id) === Number(sector.id)
          );
          return (
            <SectorRoom3D
              key={sector.id}
              sector={sector}
              index={idx}
              sectorMachines={sectorMachines}
              showFurniture={sceneLayers.furniture}
              showLabels={sceneLayers.labels}
              showVolumetric={sceneLayers.volumetric}
            />
          );
        })}

        {/* Estações de Trabalho Realistas + Impressoras + Hologramas */}
        {machines.map((machine) => (
          <ComputerAvatar3D
            key={machine.id}
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onSelect={onSelectMachine}
            showLabels={sceneLayers.labels}
          />
        ))}

        <OrbitControls
          ref={controlsRef}
          enablePan
          enableZoom
          onStart={() => {
            if (onUserOrbit) onUserOrbit();
          }}
          maxPolarAngle={Math.PI / 2.08}
          minDistance={3.0}
          maxDistance={28}
        />
      </Canvas>
    </StageContainer>
  );
}
