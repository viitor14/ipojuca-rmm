import React, { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding } from '../styles/theme';

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
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border: 1px solid #e4e8e3;
  color: #52796b;
  border-radius: 6px;
  padding: 3px 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transform: translate3d(-50%, -50%, 0);
  white-space: nowrap;
`;

/* Rig de Câmera Isométrica com interpolação suave */
function CameraRig({ cameraMode, selectedMachine, controlsRef }) {
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const targetCamPos = useRef(new THREE.Vector3(-14, 14, 14));

  useFrame(({ camera }) => {
    if (cameraMode === 'FOCUS' && selectedMachine) {
      const posX = Number(selectedMachine.pos_x || 0);
      const posZ = Number(selectedMachine.pos_z || 0);
      targetLookAt.current.set(posX, 0.8, posZ);
      targetCamPos.current.set(posX - 4.5, 4.8, posZ + 4.5);
    } else if (cameraMode === 'TOP') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 22, 0.01);
    } else if (cameraMode === 'ORBIT') {
      const time = Date.now() * 0.00035;
      const radius = 18;
      targetLookAt.current.set(0, 0.5, 0);
      targetCamPos.current.set(
        Math.cos(time) * radius,
        13.5,
        Math.sin(time) * radius
      );
    } else {
      // ISO Padrão Habblaude
      targetLookAt.current.set(0, 0.5, 0);
      targetCamPos.current.set(-14, 13.5, 14);
    }

    if (cameraMode !== 'FREE') {
      camera.position.lerp(targetCamPos.current, 0.055);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, 0.055);
        controlsRef.current.update();
      }
    }
  });

  return null;
}

/* Base de Madeira e Concreto Arquitetônico da Maquete */
function IsometricBoard() {
  return (
    <group position={[0, -0.4, 0]}>
      {/* Plinto de concreto neutro */}
      <mesh receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[27, 0.6, 21]} />
        <meshStandardMaterial color="#D9DDD7" roughness={0.7} />
      </mesh>
      {/* Borda de madeira natural de diorama */}
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[26.4, 0.15, 20.4]} />
        <meshStandardMaterial color="#C5B095" roughness={0.55} />
      </mesh>
      {/* Base plana acolchoada da maquete */}
      <mesh receiveShadow position={[0, 0.14, 0]}>
        <boxGeometry args={[25.8, 0.06, 19.8]} />
        <meshStandardMaterial color="#F3F1EC" roughness={0.8} />
      </mesh>
    </group>
  );
}

/* Paleta de pisos suaves por tipo de setor */
const SECTOR_FLOOR_COLORS = {
  1: '#E8E5DD', // Recepção (ladrilho claro bege)
  2: '#E1EBE6', // Consultório Médico (menta suave)
  3: '#DFE8E3', // Farmácia (verde sálvia pastel)
  4: '#DEE7EC', // Vacinação (azul pastel acolhedor)
  5: '#EBE7DE', // Coordenação (madeira clara suave)
  6: '#E4E9E5', // Enfermagem
  7: '#EAE6E1', // Administrativo
  8: '#D2D7D4', // Sala de Servidores / TI (cinza técnico)
};

/* Sala com paredes seccionadas (Cutaway) em estilo Habblaude */
function SectorRoomVoxel({ sector, sectorMachines = [], showLabels = true }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const width = Number(sector.width_3d || 4.8);
  const depth = Number(sector.depth_3d || 4.2);

  const floorColor = SECTOR_FLOOR_COLORS[sector.id] || '#E8E6E0';
  const wallColor = '#FFFFFF';
  const wallCapColor = '#DCD8CE';
  const wallHeight = 1.25;
  const wallThickness = 0.18;

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* Piso modular do setor */}
      <mesh receiveShadow position={[0, 0.01, 0]}>
        <boxGeometry args={[width - 0.08, 0.04, depth - 0.08]} />
        <meshStandardMaterial color={floorColor} roughness={0.65} />
      </mesh>

      {/* Grade sutil dos ladrilhos do chão */}
      <gridHelper
        position={[0, 0.032, 0]}
        args={[Math.max(width, depth), Math.round(Math.max(width, depth)), '#CBD3CB', '#CBD3CB']}
      />

      {/* Paredes seccionadas (Cutaway Walls) — Apenas fundos para não tapar visão isométrica */}
      {/* Parede Traseira Z- (Back Wall) */}
      <group position={[0, wallHeight / 2, -depth / 2 + wallThickness / 2]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, wallHeight, wallThickness]} />
          <meshStandardMaterial color={wallColor} roughness={0.8} />
        </mesh>
        {/* Rodapé e acabamento superior de madeira */}
        <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
          <boxGeometry args={[width + 0.02, 0.05, wallThickness + 0.02]} />
          <meshStandardMaterial color={wallCapColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Parede Lateral X- (Left Wall) */}
      <group position={[-width / 2 + wallThickness / 2, wallHeight / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, depth]} />
          <meshStandardMaterial color={wallColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, wallHeight / 2 + 0.02, 0]}>
          <boxGeometry args={[wallThickness + 0.02, 0.05, depth + 0.02]} />
          <meshStandardMaterial color={wallCapColor} roughness={0.5} />
        </mesh>
      </group>

      {/* Rótulo de identificação do setor */}
      {showLabels && (
        <Html position={[0, 1.45, 0]} center distanceFactor={16}>
          <SectorTag3D>
            {fixTextEncoding(sector.name)} ({sectorMachines.length} PCs)
          </SectorTag3D>
        </Html>
      )}
    </group>
  );
}

/* Mobiliários clínicos e de escritório em Voxel/Pixel-Art */
function ClinicalFurnitureVoxel({ sector }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const isReception = sector.code === 'REC' || sector.id === 1;
  const isConsult = sector.code === 'MED' || sector.id === 2;
  const isPharma = sector.code === 'FAR' || sector.id === 3;
  const isNurse = sector.code === 'ENF' || sector.id === 6;
  const isServer = sector.code === 'TI' || sector.id === 8;

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* Recepção: Balcão de atendimento e cadeiras de espera */}
      {isReception && (
        <group position={[-0.8, 0, 0.8]}>
          {/* Balcão em L em madeira e branco */}
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 1.0, 0.6]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.01, 0]}>
            <boxGeometry args={[2.05, 0.05, 0.65]} />
            <meshStandardMaterial color="#C5B095" roughness={0.5} />
          </mesh>
          {/* Planta decorativa em vaso */}
          <group position={[1.4, 0, 0]}>
            <mesh position={[0, 0.3, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.16, 0.6, 8]} />
              <meshStandardMaterial color="#E0D7C6" />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshStandardMaterial color="#4A7C59" roughness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* Consultório / Enfermagem: Maca clínica estilizada */}
      {(isConsult || isNurse) && (
        <group position={[1.3, 0, -0.8]}>
          {/* Pés metálicos da maca */}
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.6, 0.7]} />
            <meshStandardMaterial color="#D1D5DB" metalness={0.2} roughness={0.4} />
          </mesh>
          {/* Colchão hospitalar bege claro */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <boxGeometry args={[1.54, 0.14, 0.74]} />
            <meshStandardMaterial color="#F3F4F6" roughness={0.9} />
          </mesh>
          {/* Travesseiro */}
          <mesh position={[-0.6, 0.74, 0]}>
            <boxGeometry args={[0.26, 0.08, 0.55]} />
            <meshStandardMaterial color="#E5E7EB" />
          </mesh>
        </group>
      )}

      {/* Farmácia: Estantes e armários de medicamentos */}
      {isPharma && (
        <group position={[0.2, 0, -1.5]}>
          <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 1.8, 0.45]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
          </mesh>
          {/* Prateleiras com remédios estilizados */}
          <mesh position={[0, 0.9, 0.23]}>
            <boxGeometry args={[2.0, 0.04, 0.02]} />
            <meshStandardMaterial color="#C5B095" />
          </mesh>
        </group>
      )}

      {/* Sala de Servidores: Mini-rack de telecomunicações estilizado */}
      {isServer && (
        <group position={[0, 0, -0.6]}>
          {/* Gabinete Rack 19" preto fosco */}
          <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 1.8, 0.8]} />
            <meshStandardMaterial color="#2B303A" roughness={0.6} />
          </mesh>
          {/* Porta de vidro fumê */}
          <mesh position={[0, 0.9, 0.41]}>
            <boxGeometry args={[0.8, 1.6, 0.04]} />
            <meshStandardMaterial color="#1E232A" roughness={0.3} transparent opacity={0.85} />
          </mesh>
          {/* LEDs discretos de switch no rack */}
          <mesh position={[-0.2, 1.3, 0.43]}>
            <boxGeometry args={[0.04, 0.04, 0.02]} />
            <meshBasicMaterial color="#2D6A4F" />
          </mesh>
          <mesh position={[-0.1, 1.3, 0.43]}>
            <boxGeometry args={[0.04, 0.04, 0.02]} />
            <meshBasicMaterial color="#38A169" />
          </mesh>
          <mesh position={[0, 1.3, 0.43]}>
            <boxGeometry args={[0.04, 0.04, 0.02]} />
            <meshBasicMaterial color="#D97706" />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* Estação de Trabalho com Mesa, Cadeira e Miniatura de Computador */
function ComputerAvatarVoxel({ machine, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const posX = Number(machine.pos_x || 0);
  const posZ = Number(machine.pos_z || 0);
  const statusColor = theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  const isCritical = machine.health_status === 'CRITICAL';
  const isOffline = machine.health_status === 'OFFLINE';

  return (
    <group position={[posX, 0, posZ]}>
      {/* Destaque sutil no piso sob a mesa se selecionado */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]}>
          <planeGeometry args={[1.5, 1.3]} />
          <meshBasicMaterial
            color="#52796B"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Mesa de Trabalho em Madeira e Pés de Metal */}
      <group position={[0, 0, 0]}>
        {/* Tampo da Mesa */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 0.06, 0.8]} />
          <meshStandardMaterial color="#C5B095" roughness={0.5} />
        </mesh>
        {/* Pés metálicos da mesa */}
        <mesh position={[-0.58, 0.36, -0.34]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
        <mesh position={[0.58, 0.36, -0.34]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
        <mesh position={[-0.58, 0.36, 0.34]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
        <mesh position={[0.58, 0.36, 0.34]} castShadow>
          <boxGeometry args={[0.05, 0.72, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
      </group>

      {/* Cadeira de Escritório Estilizada */}
      <group position={[0, 0, 0.52]}>
        {/* Assento */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <boxGeometry args={[0.42, 0.06, 0.42]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
        </mesh>
        {/* Encosto */}
        <mesh position={[0, 0.72, 0.18]} castShadow>
          <boxGeometry args={[0.4, 0.42, 0.05]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
        </mesh>
        {/* Haste do pistão */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 8]} />
          <meshStandardMaterial color="#6B7280" metalness={0.4} />
        </mesh>
      </group>

      {/* Computador em Miniatura (Gabinete + Monitor + Teclado + Mouse) */}
      <group
        position={[0, 0.75, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(machine);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* Monitor Slim */}
        <group position={[0, 0.22, -0.1]}>
          {/* Base e haste do monitor */}
          <mesh position={[0, -0.18, 0]}>
            <boxGeometry args={[0.22, 0.02, 0.16]} />
            <meshStandardMaterial color="#1F242B" />
          </mesh>
          <mesh position={[0, -0.09, -0.02]}>
            <boxGeometry args={[0.04, 0.18, 0.03]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
          {/* Tela do monitor */}
          <mesh castShadow position={[0, 0.06, 0]}>
            <boxGeometry args={[0.54, 0.32, 0.03]} />
            <meshStandardMaterial color="#111827" roughness={0.4} />
          </mesh>

          {/* Micro-LED de status no monitor */}
          <mesh position={[0.22, -0.06, 0.02]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={statusColor} />
          </mesh>
        </group>

        {/* Gabinete Compacto ao lado da mesa */}
        <mesh position={[0.45, 0.18, -0.05]} castShadow>
          <boxGeometry args={[0.16, 0.36, 0.36]} />
          <meshStandardMaterial color="#1F2937" roughness={0.6} />
        </mesh>

        {/* Teclado e Mouse */}
        <mesh position={[0, 0.01, 0.14]}>
          <boxGeometry args={[0.36, 0.015, 0.12]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        <mesh position={[0.26, 0.01, 0.14]}>
          <boxGeometry args={[0.05, 0.015, 0.08]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>

        {/* Impressora homologada se tiver spooler ativo */}
        {machine.spooler_running && (
          <group position={[-0.42, 0.1, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.28, 0.18, 0.26]} />
              <meshStandardMaterial color="#F9FAFB" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.09, 0.02]}>
              <boxGeometry args={[0.18, 0.02, 0.1]} />
              <meshStandardMaterial color="#E5E7EB" />
            </mesh>
            {/* LED de prontuário da impressora */}
            <mesh position={[0.1, 0.07, 0.135]}>
              <sphereGeometry args={[0.012, 6, 6]} />
              <meshBasicMaterial color="#2D6A4F" />
            </mesh>
          </group>
        )}
      </group>

      {/* Tooltip flutuante e elegante ao passar o mouse */}
      {hovered && (
        <Html position={[0, 1.6, 0]} distanceFactor={14}>
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

/* Gêmeo Digital 3D Principal (Habblaude Isométrico) */
export function DigitalTwin3D({
  activeUnit,
  machines = [],
  selectedMachine,
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

  return (
    <StageContainer>
      <Canvas
        shadows
        camera={{ position: [-14, 14, 14], fov: 38 }}
      >
        <color attach="background" args={['#EAECE8']} />

        {/* Iluminação suave e agradável de maquete */}
        <ambientLight intensity={0.85} color="#FFFDF9" />
        <directionalLight
          position={[18, 26, 14]}
          intensity={1.15}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={60}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-16, 12, -14]} intensity={0.4} color="#DCE3DD" />

        {/* Controlador Suave de Câmera */}
        <CameraRig
          cameraMode={cameraMode}
          selectedMachine={selectedMachine}
          controlsRef={controlsRef}
        />

        {/* Base da Maquete */}
        <IsometricBoard />

        {/* Salas e Setores da Unidade com Paredes Cutaway */}
        {sectors.map((sector) => {
          const sectorMachines = machines.filter(
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
        {machines.map((machine) => (
          <ComputerAvatarVoxel
            key={`machine-${machine.id}`}
            machine={machine}
            isSelected={selectedMachine?.id === machine.id}
            onSelect={onSelectMachine}
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
          minDistance={4.0}
          maxDistance={32}
        />
      </Canvas>
    </StageContainer>
  );
}
