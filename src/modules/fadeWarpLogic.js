/**
 * Fade Warp Button Logic Module
 * Maneja la lógica de navegación, detección de dispositivo y efectos
 * Siguiendo el Module Pattern
 */

/**
 * Detecta si el dispositivo es móvil
 */
export const isMobileDevice = () => {
  const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const screenWidth = window.innerWidth < 768;
  
  return userAgent || screenWidth;
};

/**
 * Reproduce el sonido de lanzamiento
 */
export const playLaunchSound = (audioSrc) => {
  try {
    const audio = new Audio(audioSrc);
    audio.play().catch(() => console.log("Audio playback prevented"));
  } catch {
    console.log("Error playing audio");
  }
};

/**
 * Dispara el evento de aceleración del starfield
 */
export const triggerStarfieldBoost = () => {
  const isMobile = isMobileDevice();
  const speedBoostValue = isMobile ? 4 : 6;
  
  window.dispatchEvent(
    new CustomEvent("starfieldSpeedBoost", {
      detail: speedBoostValue,
      isMobile: isMobile,
    })
  );
};

/**
 * Ejecuta la animación de fade out
 */
export const triggerFadeOut = (controls) => {
  return controls.start({
    opacity: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
  });
};

/**
 * Maneja el proceso completo de lanzamiento y navegación
 */
export const handleLaunch = async ({
  launched,
  setLaunched,
  audioSrc,
  controls,
  destination,
  navigate,
}) => {
  if (launched) return;

  setLaunched(true);

  // Efectos de lanzamiento
  playLaunchSound(audioSrc);
  triggerStarfieldBoost();
  triggerFadeOut(controls);

  // Navegar después de la transición
  setTimeout(() => {
    navigate(destination);
  }, WARP_CONFIG.transitionDuration);
};

/**
 * Configuración del botón warp
 */
export const WARP_CONFIG = {
  transitionDuration: 1200, // ms
  mobileSpeedBoost: 4,
  desktopSpeedBoost: 6,
};
