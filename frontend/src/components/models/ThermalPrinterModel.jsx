import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

export function ThermalPrinterModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isActive = true,
}) {
  const { scene } = useGLTF('/models/tech/thermal_printer.glb');

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

  useMemo(() => {
    modelInstance.traverse((child) => {
      if (child.name === 'SpoolerLed' && child.material) {
        child.material.color.set(isActive ? '#2D6A4F' : '#DC2626');
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, isActive]);

  return <primitive object={modelInstance} position={position} rotation={rotation} />;
}

useGLTF.preload('/models/tech/thermal_printer.glb');

