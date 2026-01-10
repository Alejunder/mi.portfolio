// Facade: simplificar framer-motion para animaciones
let motionLib = null;

// Lazy load de framer-motion
const getMotion = async () => {
  if (!motionLib) {
    motionLib = await import('framer-motion');
  }
  return motionLib;
};

// API simplificada para animaciones
export const animationFacade = {
  // Crear controles de animación
  createControls: async () => {
    const { useAnimation } = await getMotion();
    return useAnimation();
  },
  
  // Wrapper simple para componentes motion
  Motion: {
    nav: null,
    button: null,
  },
  
  // Inicializar componentes motion
  init: async () => {
    const { motion } = await getMotion();
    animationFacade.Motion.nav = motion.nav;
    animationFacade.Motion.button = motion.button;
  },
};
