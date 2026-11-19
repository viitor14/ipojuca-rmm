import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Bebedouro de coluna hospitalar (water_dispenser.glb).
 * Gerado no Blender headless com bevel e subdivision surface.
 * O nó StatusLed_Dispenser recebe a cor do estado de monitoramento.
 */
export function WaterDispenserModel({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isActive = true,
}) {
  const { scene } = useGLTF('/models/refined/water_dispenser.glb?v=42');

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
      if (child.name === 'StatusLed_Dispenser' && child.material) {
        const color = isActive ? '#10B981' : '#EF4444';
        child.material.color.set(color);
        if (child.material.emissive) {
          child.material.emissive.set(color);
          child.material.emissiveIntensity = isActive ? 2.2 : 1.0;
        }
        child.material.needsUpdate = true;
      }
    });
  }, [modelInstance, isActive]);

  return <primitive object={modelInstance} position={position} rotation={rotation} />;
}

useGLTF.preload('/models/refined/water_dispenser.glb?v=42');
