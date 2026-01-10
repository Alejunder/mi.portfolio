/**
 * Camera Transitions Module - Lógica de animaciones de cámara
 * Gestiona transiciones suaves entre estados del portal
 */

export const createCameraTransitions = () => {
  const transitions = {
    // Estado inicial - vista normal
    idle: {
      position: { x: 0, y: 0, z: 5 },
      fov: 75,
      duration: 1.5
    },
    
    // Estado activo - acercamiento sutil
    active: {
      position: { x: 0, y: 0, z: 4 },
      fov: 70,
      duration: 0.5
    },
    
    // Estado expandiéndose - acercarse mientras portal crece
    expanding: {
      position: { x: 0, y: 0, z: 0.5 },
      fov: 65,
      duration: 1.5
    },
    
    // Estado inmersivo - dentro del portal
    immersive: {
      position: { x: 0, y: 0, z: 8 },
      fov: 60,
      duration: 0.3
    },
    
    // Estado saliendo - retroceso suave
    exiting: {
      position: { x: 0, y: 0, z: 5 },
      fov: 75,
      duration: 1.5
    }
  };

  // Interpolar suavemente entre valores
  const lerp = (start, end, t) => {
    return start + (end - start) * t;
  };

  // Easing suave (ease-out cubic)
  const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Easing dramático para inmersivo (ease-in-out-back)
  const easeInOutBack = (t) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  };

  const getTransition = (state) => {
    return transitions[state] || transitions.idle;
  };

  const getEasing = (state) => {
    return state === 'immersive' ? easeInOutBack : easeOutCubic;
  };

  return {
    getTransition,
    getEasing,
    lerp
  };
};
