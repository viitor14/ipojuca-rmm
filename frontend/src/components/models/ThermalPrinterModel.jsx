import React, { useMemo, useEffect } from 'react';
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

  useEffect(() => {
    modelInstance.traverse((child) => {
      if ((child.name === 'StatusLed_Printer' || child.name === 'SpoolerLed') && child.material) {
        if (isActive) {
          child.material.color.set('#10B981');
          if (child.material.emissive) {
            child.material.emissive.set('#10B981');
            child.material.emissiveIntensity = 2.5;
          }
        } else {
          child.material.color.set('#EF4444');
          if (child.material.emissive) {
            child.material.emissive.set('#EF4444');
            child.material.emissiveIntensity = 1.0;
          }
        }
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, isActive]);

  return <primitive object={modelInstance} position={position} rotation={rotation} />;
}

useGLTF.preload('/models/tech/thermal_printer.glb');

