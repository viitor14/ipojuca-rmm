import React, { Suspense, useMemo, useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Cena isolada de homologacao (Ciclo #35).
 * Mesa + cadeira + computador + impressora, sem paredes e sem geometria de caixa.
 * Acesso: /?showcase=1&angle=iso|front|close
 *
 * Orientacao medida nos GLBs:
 *  - mesa: gavetas em -Z (lado do usuario), painel de modestia em +Z
 *  - monitor: tela em +Z, teclado/mouse em -Z
 *  - cadeira: encosto em +Z por padrao, portanto rotacao PI para o usuario olhar o monitor
 */

const REFINED = '/models/refined';

function Piece({ file, version = '35', position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(`${REFINED}/${file}.glb?v=${version}`);
  const clone = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return c;
  }, [scene]);
  return <primitive object={clone} position={position} rotation={rotation} scale={scale} />;
}

function Workstation() {
  return (
    <group position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
      <Piece file="office_desk" />
      <Piece file="ergonomic_chair" position={[-0.15, 0, -0.52]} rotation={[0, Math.PI, 0]} />
      <Piece file="workstation_pc" version="48b" position={[0, 0.816, 0]} />
    </group>
  );
}

const ANGLES = {
  iso: { pos: [3.1, 2.5, 3.4], target: [0, 0.55, 0] },
  front: { pos: [0, 1.9, 4.6], target: [0, 0.6, 0] },
  close: { pos: [1.15, 1.35, 1.75], target: [-0.05, 0.72, -0.1] },
};

function Camera({ angle }) {
  const cfg = ANGLES[angle] || ANGLES.iso;
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    camera.position.set(...cfg.pos);
    camera.lookAt(new THREE.Vector3(...cfg.target));
    camera.fov = 32;
    camera.near = 0.05;
    camera.far = 60;
    camera.aspect = size.width / Math.max(1, size.height);
    camera.updateProjectionMatrix();
  }, [camera, cfg, size.width, size.height]);

  return null;
}

function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color="#E7E9E4" roughness={0.95} metalness={0} />
      </mesh>
      <ContactShadows
        position={[0, 0.002, 0]}
        opacity={0.34}
        scale={9}
        blur={2.4}
        far={2.2}
        resolution={1024}
        color="#3B3A36"
      />
    </>
  );
}

export default function ModelShowcase({ angle = 'iso' }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#EAECE8' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
          powerPreference: 'high-performance',
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={['#EAECE8']} />
        <Camera angle={angle} />

        <hemisphereLight args={['#FFFFFF', '#D9D2C5', 0.55]} />
        <directionalLight
          position={[5.5, 9.5, 6.5]}
          intensity={2.2}
          color="#FFF4E6"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0004}
          shadow-radius={3}
        >
          <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.5, 30]} />
        </directionalLight>
        <directionalLight position={[-6, 5, -4]} intensity={0.65} color="#DFE9F5" />

        <Suspense
          fallback={
            <Html center>
              <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#4A5058' }}>
                carregando modelos…
              </span>
            </Html>
          }
        >
          <Environment preset="city" environmentIntensity={0.45} />
          <Ground />
          <Workstation />
        </Suspense>
      </Canvas>
    </div>
  );
}

['office_desk', 'ergonomic_chair'].forEach((f) => {
  useGLTF.preload(`${REFINED}/${f}.glb?v=35`);
});
useGLTF.preload(`${REFINED}/workstation_pc.glb?v=48b`);
