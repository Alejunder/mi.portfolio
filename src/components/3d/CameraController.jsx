/**
 * CameraController - Controla la cámara según el estado del portal
 * Presentación: animaciones de cámara para transiciones
 */

import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { createCameraTransitions } from '../../modules/cameraTransitions';

const cameraTransitions = createCameraTransitions();

export default function CameraController({ portalState }) {
  const { camera } = useThree();
  const transitionRef = useRef({
    isTransitioning: false,
    startTime: 0,
    startPos: { x: 0, y: 0, z: 5 },
    startFov: 75,
    targetState: 'idle',
    prevState: 'idle'
  });

  useFrame(() => {
    const transition = transitionRef.current;
    
    // Iniciar nueva transición si el estado cambió
    if (portalState !== transition.prevState) {
      transition.isTransitioning = true;
      transition.startTime = Date.now();
      transition.startPos = { 
        x: camera.position.x, 
        y: camera.position.y, 
        z: camera.position.z 
      };
      transition.startFov = camera.fov;
      transition.targetState = portalState;
      transition.prevState = portalState;
    }

    if (!transition.isTransitioning) return;

    const target = cameraTransitions.getTransition(transition.targetState);
    const elapsed = (Date.now() - transition.startTime) / 1000;
    const progress = Math.min(elapsed / target.duration, 1);
    const easing = cameraTransitions.getEasing(transition.targetState);
    const t = easing(progress);

    // Interpolar posición usando set() para evitar mutación directa
    camera.position.set(
      cameraTransitions.lerp(transition.startPos.x, target.position.x, t),
      cameraTransitions.lerp(transition.startPos.y, target.position.y, t),
      cameraTransitions.lerp(transition.startPos.z, target.position.z, t)
    );

    // Finalizar transición
    if (progress >= 1) {
      transition.isTransitioning = false;
    }
  });

  return null;
}
