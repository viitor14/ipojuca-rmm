import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function StorageCabinetModel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF('/models/furniture/storage_cabinet.glb');

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

useGLTF.preload('/models/furniture/storage_cabinet.glb');

