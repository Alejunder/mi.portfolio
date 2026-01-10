/**
 * Portal Logic Module - Lógica de dominio del portal
 * Gestiona transiciones, clicks y comportamiento del portal
 */

import { portalStore } from '../stores/portalStore';

export const createPortalLogic = () => {
  let clickCount = 0;
  let clickTimer = null;
  let clickObservers = new Set();

  const notifyClickObservers = () => {
    clickObservers.forEach(callback => callback(clickCount));
  };

  const handleClick = () => {
    if (portalStore.isImmersive()) return;

    clickCount++;
    notifyClickObservers();

    // Reset click counter después de 600ms
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      if (clickCount === 1) {
        // Si solo hubo 1 click, volver a idle
        portalStore.reset();
      }
      clickCount = 0;
      notifyClickObservers();
    }, 600);

    // Single click: activar
    if (clickCount === 1) {
      portalStore.activate();
    }
    // Double click: expandir portal progresivamente
    else if (clickCount === 2) {
      portalStore.enterExpanding();
      lockScroll();
      
      // Después de 1.5s de expansión, entrar a inmersivo
      setTimeout(() => {
        portalStore.enterImmersive();
      }, 1500);
      
      if (clickTimer) clearTimeout(clickTimer);
      clickCount = 0;
      notifyClickObservers();
    }
  };

  const handleClose = () => {
    // Animar contracción suave del portal
    portalStore.enterExiting();
    
    // Después de la animación de salida, resetear completamente
    setTimeout(() => {
      portalStore.reset();
      unlockScroll();
    }, 1500);
    
    clickCount = 0;
    notifyClickObservers();
  };

  const subscribeToClicks = (callback) => {
    clickObservers.add(callback);
    return () => clickObservers.delete(callback);
  };

  const getClickCount = () => clickCount;

  const lockScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('portal-immersive');
  };

  const unlockScroll = () => {
    document.body.style.overflow = '';
    document.body.classList.remove('portal-immersive');
  };

  return {
    handleClick,
    handleClose,
    subscribeToClicks,
    getClickCount,
    lockScroll,
    unlockScroll
  };
};
