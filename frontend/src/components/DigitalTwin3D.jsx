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

/* Rig de Câmera Isométrica com interpolação suave e foco por setor/máquina */
function CameraRig({ cameraMode, selectedMachine, selectedSector, controlsRef }) {
  const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
  const targetCamPos = useRef(new THREE.Vector3(-11.5, 11.0, 11.5));

  useFrame(({ camera }) => {
    if (cameraMode === 'FOCUS' && selectedMachine) {
      const posX = Number(selectedMachine.pos_x || 0);
      const posZ = Number(selectedMachine.pos_z || 0);
      targetLookAt.current.set(posX, 0.8, posZ);
      targetCamPos.current.set(posX - 4.2, 4.4, posZ + 4.2);
    } else if (cameraMode === 'SECTOR' && selectedSector) {
      const secX = Number(selectedSector.bounds_x || 0);
      const secZ = Number(selectedSector.bounds_z || 0);
      targetLookAt.current.set(secX, 0.7, secZ);
      targetCamPos.current.set(secX - 5.4, 6.4, secZ + 5.4);
    } else if (cameraMode === 'TOP') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 17.5, 0.01);
    } else if (cameraMode === 'ORBIT') {
      const time = Date.now() * 0.00035;
      const radius = 15;
      targetLookAt.current.set(0, 0.5, 0);
      targetCamPos.current.set(
        Math.cos(time) * radius,
        11.0,
        Math.sin(time) * radius
      );
    } else {
      // ISO Padrão Habblaude equilibrado e aproximado
      targetLookAt.current.set(0, 0.5, 0);
      targetCamPos.current.set(-11.5, 11.0, 11.5);
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

/* Base de Madeira e Concreto Arquitetônico da Maquete (Enquadramento Compacto Habblaude) */
function IsometricBoard() {
  return (
    <group position={[0, -0.35, 0]}>
      {/* Plinto de concreto neutro e equilibrado com o tamanho dos setores */}
      <mesh receiveShadow position={[0, -0.25, 0]}>
        <boxGeometry args={[20.4, 0.5, 15.4]} />
        <meshStandardMaterial color="#D5D9D3" roughness={0.7} />
      </mesh>
      {/* Moldura de madeira carvalho natural do diorama */}
      <mesh receiveShadow position={[0, 0.04, 0]}>
        <boxGeometry args={[19.8, 0.12, 14.8]} />
        <meshStandardMaterial color="#C5B095" roughness={0.55} />
      </mesh>
      {/* Base interna plana acolchoada da maquete */}
      <mesh receiveShadow position={[0, 0.11, 0]}>
        <boxGeometry args={[19.2, 0.04, 14.2]} />
        <meshStandardMaterial color="#F4F2ED" roughness={0.8} />
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

/* Mobiliários clínicos e de escritório em Voxel/Pixel-Art inspirados no Habblaude */
function ClinicalFurnitureVoxel({ sector }) {
  const baseX = Number(sector.bounds_x || 0);
  const baseZ = Number(sector.bounds_z || 0);
  const isReception = sector.code === 'REC' || sector.id === 1;
  const isConsult = sector.code === 'MED' || sector.code === 'CONS-01' || sector.id === 2;
  const isPharma = sector.code === 'FAR' || sector.code === 'FARM' || sector.id === 3;
  const isNurse = sector.code === 'ENF' || sector.code === 'ADM' || sector.id === 4 || sector.id === 6;
  const isServer = sector.code === 'TI' || sector.id === 8;
  const halfW = Number(sector.width_3d || 6.5) / 2;
  const halfD = Number(sector.depth_3d || 5) / 2;
  const backZ = -halfD + 0.5; // mobiliário encostado na parede dos fundos (livre das estações)

  return (
    <group position={[baseX, 0, baseZ]}>
      {/* 1. RECEPÇÃO & TRIAGEM: Balcão bi-partido, Bebedouro de galão, Planta Voxel e Banco de Espera */}
      {isReception && (
        <group>
          {/* Balcão de atendimento com tampo de madeira nobre e frisos */}
          <group position={[-1.2, 0, backZ + 0.1]}>
            {/* Corpo do balcão */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.1, 1.0, 0.65]} />
              <meshStandardMaterial color="#FAF9F6" roughness={0.7} />
            </mesh>
            {/* Friso decorativo no rodapé do balcão */}
            <mesh position={[0, 0.08, 0.33]}>
              <boxGeometry args={[2.08, 0.16, 0.02]} />
              <meshStandardMaterial color="#E2DCD2" roughness={0.6} />
            </mesh>
            {/* Tampo de madeira em carvalho suave */}
            <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 0.07, 0.75]} />
              <meshStandardMaterial color="#C8B298" roughness={0.45} />
            </mesh>
            {/* Divisória protetora acrílica de atendimento */}
            <mesh position={[0, 1.25, 0.15]}>
              <boxGeometry args={[1.8, 0.38, 0.02]} />
              <meshStandardMaterial color="#E0F2FE" transparent opacity={0.35} roughness={0.1} />
            </mesh>
          </group>

          {/* Bebedouro de coluna com galão de água mineral azul translúcido */}
          <group position={[halfW - 0.8, 0, backZ + 0.1]}>
            {/* Gabinete metálico do bebedouro */}
            <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.38, 0.96, 0.38]} />
              <meshStandardMaterial color="#ECEEF0" roughness={0.4} />
            </mesh>
            {/* Bandeja de pingadeira preta */}
            <mesh position={[0, 0.62, 0.18]}>
              <boxGeometry args={[0.26, 0.04, 0.1]} />
              <meshStandardMaterial color="#374151" roughness={0.8} />
            </mesh>
            {/* Torneiras vermelha (quente) e azul (fria) */}
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
              <cylinderGeometry args={[0.16, 0.16, 0.06, 12]} />
              <meshStandardMaterial color="#CBD5E1" />
            </mesh>
            {/* Galão de 20L azul água translúcido */}
            <mesh position={[0, 1.24, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.44, 12]} />
              <meshStandardMaterial
                color="#60A5FA"
                transparent
                opacity={0.78}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>
            {/* Tampa azul escura do galão */}
            <mesh position={[0, 1.48, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.05, 8]} />
              <meshStandardMaterial color="#1D4ED8" />
            </mesh>
          </group>

          {/* Vaso de cerâmica com planta verde exuberante voxel (estilo monstera/samambaia) */}
          <group position={[halfW - 0.5, 0, halfD - 0.5]}>
            {/* Vaso de cerâmica cilíndrico */}
            <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.17, 0.56, 10]} />
              <meshStandardMaterial color="#DFD7CB" roughness={0.75} />
            </mesh>
            <mesh position={[0, 0.56, 0]}>
              <cylinderGeometry args={[0.21, 0.21, 0.04, 10]} />
              <meshStandardMaterial color="#5C4033" roughness={0.9} />
            </mesh>
            {/* Folhagens volumétricas em cubos voxelados */}
            <mesh position={[0, 0.72, 0]} castShadow>
              <boxGeometry args={[0.28, 0.28, 0.28]} />
              <meshStandardMaterial color="#2D6A4F" roughness={0.8} />
            </mesh>
            <mesh position={[0.14, 0.88, 0.08]} castShadow>
              <boxGeometry args={[0.22, 0.2, 0.22]} />
              <meshStandardMaterial color="#40916C" roughness={0.8} />
            </mesh>
            <mesh position={[-0.12, 0.84, -0.09]} castShadow>
              <boxGeometry args={[0.2, 0.22, 0.2]} />
              <meshStandardMaterial color="#52B788" roughness={0.8} />
            </mesh>
          </group>

          {/* Longarina de espera de 3 lugares para pacientes */}
          <group position={[-halfW + 0.55, 0, 0.2]} rotation={[0, Math.PI / 2, 0]}>
            {/* Barra tubular metálica de sustentação */}
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[1.7, 0.04, 0.06]} />
              <meshStandardMaterial color="#64748B" metalness={0.4} />
            </mesh>
            {/* Pés da longarina */}
            <mesh position={[-0.75, 0.1, 0]}>
              <boxGeometry args={[0.04, 0.2, 0.36]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
            <mesh position={[0.75, 0.1, 0]}>
              <boxGeometry args={[0.04, 0.2, 0.36]} />
              <meshStandardMaterial color="#475569" />
            </mesh>
            {/* 3 Assentos ergonômicos em tecido cinza suave */}
            {[-0.55, 0, 0.55].map((xOffset, idx) => (
              <group key={`seat-${idx}`} position={[xOffset, 0, 0]}>
                {/* Assento */}
                <mesh position={[0, 0.26, 0.02]} castShadow>
                  <boxGeometry args={[0.42, 0.06, 0.38]} />
                  <meshStandardMaterial color="#94A3B8" roughness={0.7} />
                </mesh>
                {/* Encosto */}
                <mesh position={[0, 0.48, -0.16]} castShadow>
                  <boxGeometry args={[0.42, 0.36, 0.05]} />
                  <meshStandardMaterial color="#94A3B8" roughness={0.7} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      )}

      {/* 2. CONSULTÓRIO MÉDICO / ENFERMAGEM: Maca clínica completa, Suporte de Soro, Biombo e Escadinha */}
      {(isConsult || isNurse) && (
        <group>
          {/* Maca de Exame Clínico Detalhada */}
          <group position={[halfW - 1.5, 0, backZ + 0.1]}>
            {/* Estrutura metálica tubular branca/cinza */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.7, 0.6, 0.72]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.2} roughness={0.5} />
            </mesh>
            {/* Colchão hospitalar acolchoado */}
            <mesh position={[0, 0.64, 0]} castShadow>
              <boxGeometry args={[1.74, 0.12, 0.76]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.8} />
            </mesh>
            {/* Lençol / Papel de maca estendido na parte central */}
            <mesh position={[0.1, 0.71, 0]}>
              <boxGeometry args={[1.3, 0.015, 0.72]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
            </mesh>
            {/* Travesseiro anatômico na cabeceira */}
            <mesh position={[-0.68, 0.73, 0]} castShadow>
              <boxGeometry args={[0.3, 0.07, 0.56]} />
              <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
            </mesh>
            {/* Escadinha clínica de 2 degraus ao lado da maca */}
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

          {/* Suporte de Soro Fisiológico Cromado com bolsa translúcida */}
          <group position={[-0.4, 0, backZ + 0.1]}>
            {/* Base com 4 rodízios em cruz */}
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.36, 0.04, 0.06]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <boxGeometry args={[0.06, 0.04, 0.36]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            {/* Haste metálica vertical */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 1.55, 8]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Gancho duplo superior */}
            <mesh position={[0, 1.58, 0]}>
              <boxGeometry args={[0.18, 0.02, 0.02]} />
              <meshStandardMaterial color="#64748B" metalness={0.5} />
            </mesh>
            {/* Bolsa de soro translúcida pendurada */}
            <mesh position={[-0.06, 1.45, 0]}>
              <boxGeometry args={[0.08, 0.18, 0.04]} />
              <meshStandardMaterial color="#BAE6FD" transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Biombo hospitalar sanfonado com 3 folhas articuladas */}
          <group position={[-halfW + 0.5, 0, 0.2]}>
            {/* Folha 1 */}
            <mesh position={[0, 0.75, -0.42]} rotation={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            {/* Folha 2 */}
            <mesh position={[0.06, 0.75, 0]} rotation={[0, -0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            {/* Folha 3 */}
            <mesh position={[0, 0.75, 0.42]} rotation={[0, 0.15, 0]} castShadow>
              <boxGeometry args={[0.04, 1.4, 0.42]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
          </group>
        </group>
      )}

      {/* 3. FARMÁCIA & VACINAÇÃO: Estantes duplas repletas de caixas de remédios em tons pastéis */}
      {isPharma && (
        <group position={[0, 0, backZ]}>
          {/* Armário / Estante estruturada com prateleiras de madeira clara e moldura branca */}
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.5, 1.9, 0.5]} />
            <meshStandardMaterial color="#F8FAF8" roughness={0.7} />
          </mesh>
          {/* 4 Prateleiras em carvalho claro */}
          {[0.35, 0.75, 1.15, 1.55].map((y, idx) => (
            <group key={`shelf-${idx}`}>
              <mesh position={[0, y, 0.24]}>
                <boxGeometry args={[2.42, 0.035, 0.08]} />
                <meshStandardMaterial color="#C8B298" roughness={0.5} />
              </mesh>
              {/* Voxel caixas de remédios coloridas em tons pastéis organizadas */}
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
          {/* Balcão de dispensação com vidro protetor */}
          <group position={[halfW - 0.5, 0, halfD - 0.3]} rotation={[0, -Math.PI / 2, 0]}>
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

      {/* 4. SALA DE SERVIDORES / TI: Mini-rack 19" estruturado com switch, organizador de cabos e no-break */}
      {isServer && (
        <group position={[0, 0, backZ + 0.2]}>
          {/* Gabinete Rack 19" preto fosco com estrutura de aço */}
          <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 1.9, 0.85]} />
            <meshStandardMaterial color="#1E232A" roughness={0.65} metalness={0.2} />
          </mesh>
          {/* Porta de vidro temperado fumê translúcida */}
          <mesh position={[0, 0.95, 0.43]}>
            <boxGeometry args={[0.88, 1.72, 0.02]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} transparent opacity={0.82} />
          </mesh>
          {/* Puxador da porta do rack */}
          <mesh position={[0.4, 0.95, 0.45]}>
            <boxGeometry args={[0.02, 0.2, 0.03]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>

          {/* Bandejas internas de Switch & Patch Panel */}
          {/* Patch Panel UTP */}
          <mesh position={[0, 1.5, 0.4]}>
            <boxGeometry args={[0.82, 0.09, 0.06]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          {/* Switch Gerenciável 24 Portas com LEDs */}
          <mesh position={[0, 1.35, 0.4]}>
            <boxGeometry args={[0.82, 0.11, 0.06]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
          {/* LEDs de link de rede do switch */}
          {[-0.32, -0.24, -0.16, -0.08, 0.0, 0.08, 0.16, 0.24, 0.32].map((x, idx) => (
            <mesh key={`led-${idx}`} position={[x, 1.35, 0.435]}>
              <boxGeometry args={[0.025, 0.025, 0.01]} />
              <meshBasicMaterial color={idx % 4 === 0 ? '#D97706' : '#2D6A4F'} />
            </mesh>
          ))}

          {/* Servidor 2U com baias de disco hot-swap */}
          <mesh position={[0, 1.15, 0.4]}>
            <boxGeometry args={[0.82, 0.14, 0.06]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          {/* No-break (UPS) de piso ao lado do rack */}
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

/* Distribui as estações em grade dentro de cada setor (sem sobreposição e longe do mobiliário) */
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
    const ordered = [...list].sort((a, b) => Number(a.id) - Number(b.id));
    if (!sector) {
      ordered.forEach((m) =>
        result.set(m.id, { x: Number(m.pos_x || 0), z: Number(m.pos_z || 0) })
      );
      return;
    }
    const bx = Number(sector.bounds_x || 0);
    const bz = Number(sector.bounds_z || 0);
    const w = Number(sector.width_3d || 6.5);
    const cols = ordered.length <= 4 ? 2 : 3;
    const spacing = Math.min(2.2, (w - 1.6) / cols);
    ordered.forEach((m, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      result.set(m.id, {
        x: bx + (col - (cols - 1) / 2) * spacing,
        z: bz - 0.5 + row * 1.9,
      });
    });
  });
  return result;
}

/* Estação de Trabalho com Mesa Habblaude, Cadeira Ergonômica e Miniatura Rica de Computador */
function ComputerAvatarVoxel({ machine, isSelected, onSelect, layoutPos }) {
  const [hovered, setHovered] = useState(false);
  const posX = layoutPos ? layoutPos.x : Number(machine.pos_x || 0);
  const posZ = layoutPos ? layoutPos.z : Number(machine.pos_z || 0);
  const statusColor = theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  const isCritical = machine.health_status === 'CRITICAL';
  const isWarning = machine.health_status === 'WARNING';
  const isOffline = machine.health_status === 'OFFLINE';

  // Cores semânticas da tela do monitor para identificação imediata na maquete
  const screenColor = isOffline
    ? '#2D3748'
    : isCritical
      ? '#DC2626'
      : isWarning
        ? '#D97706'
        : '#2D6A4F';

  const screenEmissive = isOffline ? '#000000' : screenColor;
  const screenEmissiveIntensity = isOffline ? 0 : isCritical ? 0.7 : 0.45;

  return (
    <group position={[posX, 0, posZ]}>
      {/* Halo discreto no piso sob a mesa se selecionado */}
      {isSelected && (
        <mesh position={[0, 0.02, 0]}>
          <planeGeometry args={[1.6, 1.4]} />
          <meshBasicMaterial
            color="#52796B"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 1. MESA DE TRABALHO: Tampo espesso de carvalho, gaveteiro integrado e pernas estruturadas */}
      <group position={[0, 0, 0]}>
        {/* Tampo espesso em madeira clara acetinada */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.34, 0.08, 0.82]} />
          <meshStandardMaterial color="#C8B298" roughness={0.48} />
        </mesh>

        {/* Gaveteiro lateral integrado à direita com puxadores metálicos */}
        <group position={[0.42, 0.35, 0]}>
          {/* Caixa do gaveteiro */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.64, 0.68]} />
            <meshStandardMaterial color="#FAF9F6" roughness={0.7} />
          </mesh>
          {/* 3 Frentes de gavetas com puxadores metálicos escovados */}
          {[-0.18, 0, 0.18].map((yOffset, gIdx) => (
            <group key={`drawer-${gIdx}`} position={[0, yOffset, 0.345]}>
              <mesh>
                <boxGeometry args={[0.34, 0.16, 0.015]} />
                <meshStandardMaterial color="#F3F4F6" roughness={0.6} />
              </mesh>
              {/* Puxador da gaveta */}
              <mesh position={[0, 0, 0.015]}>
                <boxGeometry args={[0.1, 0.015, 0.015]} />
                <meshStandardMaterial color="#94A3B8" metalness={0.7} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Pernas metálicas tubulares à esquerda com travessa de sustentação */}
        <mesh position={[-0.58, 0.34, -0.32]} castShadow>
          <boxGeometry args={[0.05, 0.68, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
        <mesh position={[-0.58, 0.34, 0.32]} castShadow>
          <boxGeometry args={[0.05, 0.68, 0.05]} />
          <meshStandardMaterial color="#4A4F55" roughness={0.4} />
        </mesh>
        {/* Travessa inferior de reforço da mesa */}
        <mesh position={[-0.58, 0.16, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#4A4F55" />
        </mesh>
      </group>

      {/* 2. CADEIRA DE ESCRITÓRIO ERGONÔMICA: Assento, encosto com lombar, apoios de braço e base aranha */}
      <group position={[-0.08, 0, 0.54]}>
        {/* Assento acolchoado cinza grafite */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <boxGeometry args={[0.44, 0.07, 0.42]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
        </mesh>
        {/* Encosto anatômico com curvatura */}
        <mesh position={[0, 0.74, 0.18]} castShadow>
          <boxGeometry args={[0.42, 0.46, 0.06]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
        </mesh>
        {/* Braços da cadeira (Apoios de braço) */}
        <mesh position={[-0.24, 0.56, 0.06]}>
          <boxGeometry args={[0.04, 0.18, 0.22]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
        <mesh position={[0.24, 0.56, 0.06]}>
          <boxGeometry args={[0.04, 0.18, 0.22]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
        {/* Coluna central do pistão pneumático */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.42, 8]} />
          <meshStandardMaterial color="#6B7280" metalness={0.5} />
        </mesh>
        {/* Base estrela de 5 pontas no chão */}
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.03, 5]} />
          <meshStandardMaterial color="#1F2937" />
        </mesh>
      </group>

      {/* 3. EQUIPAMENTOS EM MINIATURA (Monitor, Teclado, Mouse, Gabinete e Impressora) */}
      <group
        position={[0, 0.76, 0]}
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
        {/* Monitor Slim de Alta Definição */}
        <group position={[-0.08, 0.23, -0.1]}>
          {/* Base e haste do monitor */}
          <mesh position={[0, -0.19, 0]}>
            <boxGeometry args={[0.24, 0.02, 0.18]} />
            <meshStandardMaterial color="#1F242B" />
          </mesh>
          <mesh position={[0, -0.09, -0.02]}>
            <boxGeometry args={[0.04, 0.2, 0.03]} />
            <meshStandardMaterial color="#374151" metalness={0.3} />
          </mesh>
          {/* Carcaça / Moldura traseira fosca */}
          <mesh castShadow position={[0, 0.06, 0]}>
            <boxGeometry args={[0.56, 0.34, 0.03]} />
            <meshStandardMaterial color="#1F242B" roughness={0.7} />
          </mesh>

          {/* Display frontal aceso na cor semântica do status */}
          <mesh position={[0, 0.06, 0.018]}>
            <boxGeometry args={[0.5, 0.28, 0.005]} />
            <meshStandardMaterial
              color={screenColor}
              emissive={screenEmissive}
              emissiveIntensity={screenEmissiveIntensity}
              roughness={0.25}
            />
          </mesh>

          {/* Micro-LED de status no canto inferior do bezel */}
          <mesh position={[0.23, -0.07, 0.022]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={statusColor} />
          </mesh>
        </group>

        {/* Gabinete Compacto Torre com aletas de ventilação frontais */}
        <group position={[0.46, 0.19, -0.08]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.17, 0.38, 0.38]} />
            <meshStandardMaterial color="#1F2937" roughness={0.6} />
          </mesh>
          {/* Grade de ventilação frontal */}
          <mesh position={[0, 0.04, 0.192]}>
            <boxGeometry args={[0.13, 0.16, 0.005]} />
            <meshStandardMaterial color="#111827" roughness={0.9} />
          </mesh>
          {/* Botão Power circular */}
          <mesh position={[0, 0.14, 0.193]}>
            <cylinderGeometry args={[0.015, 0.015, 0.005, 8]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#9CA3AF" metalness={0.8} />
          </mesh>
          {/* Micro-LED frontal de atividade da máquina */}
          <mesh position={[0, 0.10, 0.193]}>
            <boxGeometry args={[0.06, 0.015, 0.005]} />
            <meshBasicMaterial color={statusColor} />
          </mesh>
        </group>

        {/* Mousepad retangular cinza escuro */}
        <mesh position={[0.18, 0.005, 0.15]}>
          <boxGeometry args={[0.18, 0.006, 0.18]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Mouse óptico ergonômico */}
        <mesh position={[0.18, 0.018, 0.15]} castShadow>
          <boxGeometry args={[0.05, 0.02, 0.08]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>

        {/* Teclado slim com relevo e layout de teclas */}
        <group position={[-0.08, 0.01, 0.15]}>
          {/* Base do teclado */}
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.016, 0.13]} />
            <meshStandardMaterial color="#374151" />
          </mesh>
          {/* Teclas em relevo */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.35, 0.008, 0.10]} />
            <meshStandardMaterial color="#4B5563" roughness={0.5} />
          </mesh>
        </group>

        {/* Impressora homologada se o serviço de spooler estiver ativo */}
        {machine.spooler_running && (
          <group position={[-0.48, 0.11, 0]}>
            {/* Corpo da impressora branca/cinza */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.32, 0.2, 0.28]} />
              <meshStandardMaterial color="#F9FAFB" roughness={0.5} />
            </mesh>
            {/* Bandeja de saída */}
            <mesh position={[0, 0.1, 0.05]}>
              <boxGeometry args={[0.22, 0.02, 0.14]} />
              <meshStandardMaterial color="#E5E7EB" />
            </mesh>
            {/* Folha de papel branca na bandeja */}
            <mesh position={[0, 0.115, 0.06]}>
              <boxGeometry args={[0.18, 0.006, 0.12]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
            </mesh>
            {/* Painel e LED verde de prontidão */}
            <mesh position={[0.11, 0.08, 0.145]}>
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
  const machineLayout = useMemo(
    () => computeMachineLayout(machines, sectors),
    [machines, sectors]
  );
  const focusMachine = selectedMachine
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
        camera={{ position: [-11.5, 11.0, 11.5], fov: 36 }}
      >
        <color attach="background" args={['#EAECE8']} />

        {/* Iluminação suave e agradável de maquete */}
        <ambientLight intensity={0.9} color="#FFFDF9" />
        <directionalLight
          position={[16, 24, 12]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-14}
          shadow-camera-right={14}
          shadow-camera-top={14}
          shadow-camera-bottom={-14}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-14, 10, -12]} intensity={0.35} color="#DCE3DD" />

        {/* Controlador Suave de Câmera */}
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
          minDistance={4.0}
          maxDistance={32}
        />
      </Canvas>
    </StageContainer>
  );
}
