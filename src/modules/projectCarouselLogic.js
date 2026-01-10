/**
 * Project Carousel Logic Module
 * Maneja toda la lógica del carrusel de proyectos (navegación, transformaciones, etc.)
 * Siguiendo el Module Pattern para encapsulación
 */

/**
 * Detecta si el viewport actual es móvil
 */
export const isMobileView = () => {
  return typeof window !== 'undefined' && window.innerWidth <= 480;
};

/**
 * Calcula el índice anterior en el carrusel (circular)
 */
export const getPrevIndex = (currentIndex, totalItems) => {
  return currentIndex === 0 ? totalItems - 1 : currentIndex - 1;
};

/**
 * Calcula el índice siguiente en el carrusel (circular)
 */
export const getNextIndex = (currentIndex, totalItems) => {
  return currentIndex === totalItems - 1 ? 0 : currentIndex + 1;
};

/**
 * Determina la transformación CSS 3D para una tarjeta según su posición
 */
export const getCardTransform = (index, currentIndex, totalItems) => {
  // En móvil, no usamos transformaciones 3D (manejado por CSS)
  if (isMobileView()) {
    return 'none';
  }

  const prevIndex = getPrevIndex(currentIndex, totalItems);
  const nextIndex = getNextIndex(currentIndex, totalItems);

  // Tarjeta activa (centro)
  if (index === currentIndex) {
    return 'translateZ(150px) scale(1.1)';
  }
  
  // Tarjeta anterior (izquierda)
  if (index === prevIndex) {
    return 'translateX(-85%) translateZ(-200px) scale(0.7) rotateY(25deg)';
  }
  
  // Tarjeta siguiente (derecha)
  if (index === nextIndex) {
    return 'translateX(85%) translateZ(-200px) scale(0.7) rotateY(-25deg)';
  }

  // Tarjetas ocultas
  return 'translateX(0) translateZ(-400px) scale(0.5)';
};

/**
 * Determina el z-index para el apilamiento correcto de tarjetas
 */
export const getZIndex = (index, currentIndex, totalItems) => {
  const prevIndex = getPrevIndex(currentIndex, totalItems);
  const nextIndex = getNextIndex(currentIndex, totalItems);

  if (index === currentIndex) return 3;
  if (index === prevIndex || index === nextIndex) return 2;
  return 1;
};

/**
 * Calcula la opacidad de una tarjeta según su posición
 */
export const getOpacity = (index, currentIndex, totalItems) => {
  const prevIndex = getPrevIndex(currentIndex, totalItems);
  const nextIndex = getNextIndex(currentIndex, totalItems);

  // En móvil, solo la tarjeta activa es visible
  if (isMobileView()) {
    return index === currentIndex ? 1 : 0;
  }

  // Desktop: tarjeta activa completamente visible
  if (index === currentIndex) return 1;
  
  // Tarjetas adyacentes parcialmente visibles
  if (index === prevIndex || index === nextIndex) return 0.6;
  
  // Resto ocultas
  return 0;
};

/**
 * Verifica si una tarjeta debería ser visible en el DOM
 */
export const isCardVisible = (index, currentIndex, totalItems) => {
  const prevIndex = getPrevIndex(currentIndex, totalItems);
  const nextIndex = getNextIndex(currentIndex, totalItems);

  return index === currentIndex || index === prevIndex || index === nextIndex;
};

/**
 * Crea los manejadores de navegación del carrusel
 */
export const createNavigationHandlers = (setCurrentIndex, totalItems) => {
  const handleNext = () => {
    setCurrentIndex((prevIndex) => getNextIndex(prevIndex, totalItems));
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => getPrevIndex(prevIndex, totalItems));
  };

  const handleGoToIndex = (index) => {
    setCurrentIndex(index);
  };

  return { handleNext, handlePrevious, handleGoToIndex };
};

/**
 * Configuración del auto-rotación del carrusel
 */
export const CAROUSEL_CONFIG = {
  autoRotateInterval: 20000, // 20 segundos
};
