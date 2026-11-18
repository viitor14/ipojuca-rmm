import React from 'react';
import { RoundedBox } from '@react-three/drei';

/**
 * Mobiliário refinado da sala-piloto (Ciclo #34).
 *
 * Substitui os volumes de quina viva por geometria com chanfro real
 * (RoundedBox), mantendo proporções e posições originais. Nenhum dado de
 * telemetria ou interação é tocado: são apenas malhas de apresentação.
 */

const WOOD_TOP = '#C98A4B';
const WOOD_BODY = '#A96C33';
const WOOD_DARK = '#8A5526';
const METAL = '#B7C4CE';
const METAL_DARK = '#7C8B96';
const PLASTIC = '#F4F8FB';
const PLASTIC_DARK = '#CBD6DE';

function Rounded({ args, radius = 0.03, smoothness = 4, ...props }) {
  return <RoundedBox args={args} radius={radius} smoothness={smoothness} {...props} />;
}

/** Balcão de recepção em L, com tampo em balanço e saia rebaixada */
export function RefinedReceptionCounter({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Corpo principal */}
      <Rounded args={[3.5, 0.92, 0.92]} radius={0.035} position={[0, 0.46, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD_BODY} roughness={0.62} metalness={0.04} />
      </Rounded>
      {/* Tampo em balanço com chanfro generoso */}
      <Rounded args={[3.66, 0.09, 1.06]} radius={0.028} position={[0, 0.965, 0.02]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD_TOP} roughness={0.42} metalness={0.06} />
      </Rounded>
      {/* Saia frontal rebaixada */}
      <Rounded args={[3.42, 0.3, 0.06]} radius={0.02} position={[0, 0.72, 0.47]} castShadow>
        <meshStandardMaterial color={WOOD_DARK} roughness={0.55} />
      </Rounded>
      {/* Rodapé embutido */}
      <Rounded args={[3.3, 0.12, 0.78]} radius={0.02} position={[0, 0.06, 0]} castShadow>
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
      </Rounded>
      {/* Puxadores em perfil metálico */}
      {[-1.1, 0, 1.1].map((x) => (
        <Rounded key={`pull-${x}`} args={[0.42, 0.035, 0.035]} radius={0.014} position={[x, 0.86, 0.49]}>
          <meshStandardMaterial color={METAL} roughness={0.28} metalness={0.75} />
        </Rounded>
      ))}
    </group>
  );
}

/** Mesa de atendimento com tampo chanfrado e estrutura metálica aparente */
export function RefinedDesk({ position = [0, 0, 0], rotation = [0, 0, 0], width = 2.4, depth = 1.2 }) {
  return (
    <group position={position} rotation={rotation}>
      <Rounded args={[width, 0.07, depth]} radius={0.025} position={[0, 0.8, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD_TOP} roughness={0.4} metalness={0.05} />
      </Rounded>
      <Rounded args={[width - 0.16, 0.09, depth - 0.16]} radius={0.02} position={[0, 0.74, 0]} castShadow>
        <meshStandardMaterial color={WOOD_BODY} roughness={0.6} />
      </Rounded>
      {[
        [-(width / 2 - 0.12), -(depth / 2 - 0.12)],
        [width / 2 - 0.12, -(depth / 2 - 0.12)],
        [-(width / 2 - 0.12), depth / 2 - 0.12],
        [width / 2 - 0.12, depth / 2 - 0.12],
      ].map(([x, z], i) => (
        <Rounded key={`leg-${i}`} args={[0.07, 0.74, 0.07]} radius={0.02} position={[x, 0.37, z]} castShadow>
          <meshStandardMaterial color={METAL_DARK} roughness={0.35} metalness={0.7} />
        </Rounded>
      ))}
    </group>
  );
}

/** Cadeira com assento e encosto anatômicos estilizados e base em cinco pontas */
export function RefinedChair({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <Rounded args={[0.5, 0.09, 0.48]} radius={0.035} position={[0, 0.46, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={PLASTIC_DARK} roughness={0.55} />
      </Rounded>
      <Rounded
        args={[0.48, 0.52, 0.08]}
        radius={0.035}
        position={[0, 0.76, -0.21]}
        rotation={[-0.12, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color={PLASTIC} roughness={0.5} />
      </Rounded>
      <Rounded args={[0.06, 0.36, 0.06]} radius={0.02} position={[0, 0.26, 0]} castShadow>
        <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.8} />
      </Rounded>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <Rounded
            key={`spoke-${i}`}
            args={[0.28, 0.035, 0.05]}
            radius={0.015}
            position={[Math.cos(angle) * 0.14, 0.07, Math.sin(angle) * 0.14]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <meshStandardMaterial color={METAL_DARK} roughness={0.35} metalness={0.7} />
          </Rounded>
        );
      })}
    </group>
  );
}

/** Armário de arquivos com portas, puxadores em perfil e pés discretos */
export function RefinedStorageCabinet({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <Rounded args={[1.05, 1.72, 0.52]} radius={0.03} position={[0, 0.9, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={PLASTIC} roughness={0.55} />
      </Rounded>
      {[-0.26, 0.26].map((x) => (
        <Rounded key={`door-${x}`} args={[0.48, 1.6, 0.03]} radius={0.02} position={[x, 0.9, 0.27]} castShadow>
          <meshStandardMaterial color={PLASTIC_DARK} roughness={0.5} />
        </Rounded>
      ))}
      {[-0.26, 0.26].map((x) => (
        <Rounded key={`handle-${x}`} args={[0.03, 0.24, 0.035]} radius={0.012} position={[x, 0.9, 0.3]}>
          <meshStandardMaterial color={METAL} roughness={0.25} metalness={0.8} />
        </Rounded>
      ))}
      {[
        [-0.42, -0.18],
        [0.42, -0.18],
        [-0.42, 0.18],
        [0.42, 0.18],
      ].map(([x, z], i) => (
        <Rounded key={`foot-${i}`} args={[0.08, 0.08, 0.08]} radius={0.02} position={[x, 0.04, z]} castShadow>
          <meshStandardMaterial color={METAL_DARK} roughness={0.4} metalness={0.6} />
        </Rounded>
      ))}
    </group>
  );
}

/** Longarina de espera com assento ergonômico e estrutura metálica aparente */
export function RefinedWaitingBench({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <Rounded args={[2.4, 0.1, 0.52]} radius={0.035} position={[0, 0.44, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={WOOD_TOP} roughness={0.45} />
      </Rounded>
      <Rounded
        args={[2.4, 0.42, 0.08]}
        radius={0.03}
        position={[0, 0.72, -0.22]}
        rotation={[-0.1, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color={WOOD_BODY} roughness={0.5} />
      </Rounded>
      {[-1.0, 1.0].map((x) => (
        <Rounded key={`frame-${x}`} args={[0.07, 0.44, 0.46]} radius={0.02} position={[x, 0.22, 0]} castShadow>
          <meshStandardMaterial color={METAL_DARK} roughness={0.35} metalness={0.7} />
        </Rounded>
      ))}
      <Rounded args={[2.1, 0.05, 0.05]} radius={0.015} position={[0, 0.14, 0]} castShadow>
        <meshStandardMaterial color={METAL} roughness={0.3} metalness={0.75} />
      </Rounded>
    </group>
  );
}

/** Impressora térmica com bandeja de saída, botoeira e LED de status */
export function RefinedThermalPrinter({ position = [0, 0, 0], rotation = [0, 0, 0], isActive = true }) {
  return (
    <group position={position} rotation={rotation}>
      <Rounded args={[0.46, 0.26, 0.4]} radius={0.03} position={[0, 0.13, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#2B3440" roughness={0.5} metalness={0.15} />
      </Rounded>
      <Rounded args={[0.4, 0.05, 0.3]} radius={0.02} position={[0, 0.27, 0.02]} castShadow>
        <meshStandardMaterial color="#3A4552" roughness={0.45} />
      </Rounded>
      <Rounded args={[0.34, 0.012, 0.2]} radius={0.006} position={[0, 0.3, 0.03]}>
        <meshStandardMaterial color="#FFFDF7" roughness={0.9} />
      </Rounded>
      <Rounded args={[0.08, 0.03, 0.03]} radius={0.012} position={[0.14, 0.28, 0.19]}>
        <meshStandardMaterial
          color={isActive ? '#12B76A' : '#98A2B3'}
          emissive={isActive ? '#12B76A' : '#000000'}
          emissiveIntensity={isActive ? 1.4 : 0}
          roughness={0.3}
        />
      </Rounded>
    </group>
  );
}

/** Planta com folhagem em planos curvos e vaso de cerâmica */
export function RefinedPlant({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <Rounded args={[0.44, 0.54, 0.44]} radius={0.09} position={[0, 0.27, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#C4693F" roughness={0.7} />
      </Rounded>
      <Rounded args={[0.38, 0.04, 0.38]} radius={0.02} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#3D2817" roughness={0.95} />
      </Rounded>
      {[
        [0, 0.78, 0, 0.34, 0.3],
        [0.16, 0.92, 0.1, 0.26, 0.24],
        [-0.14, 0.88, -0.1, 0.24, 0.26],
        [0.04, 1.04, -0.04, 0.2, 0.18],
      ].map(([x, y, z, w, h], i) => (
        <Rounded
          key={`leaf-${i}`}
          args={[w, h, w]}
          radius={w * 0.42}
          smoothness={6}
          position={[x, y, z]}
          castShadow
        >
          <meshStandardMaterial color={i % 2 ? '#3E9B4F' : '#2C7A3B'} roughness={0.72} />
        </Rounded>
      ))}
    </group>
  );
}
