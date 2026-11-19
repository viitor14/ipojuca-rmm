import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function PlantModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/refined/decorative_plant.glb?v=40');

  const modelInstance = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={modelInstance} position={position} rotation={rotation} />;
}

useGLTF.preload('/models/refined/decorative_plant.glb?v=40');
