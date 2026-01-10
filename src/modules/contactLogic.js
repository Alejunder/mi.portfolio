/**
 * Contact Form Logic Module
 * Maneja toda la lógica del formulario de contacto
 * Siguiendo el Module Pattern
 */

import confetti from "canvas-confetti";

/**
 * Reproduce un sonido de éxito usando Web Audio API
 */
export const playSuccessSound = () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.2);
};

/**
 * Dispara un efecto de confeti
 */
export const triggerConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};

/**
 * Celebra el envío exitoso del formulario
 */
export const celebrateSuccess = () => {
  playSuccessSound();
  triggerConfetti();
};

/**
 * Maneja el cambio de un campo del formulario
 */
export const handleFieldChange = (e, form, setForm) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

/**
 * Resetea el formulario a su estado inicial
 */
export const resetForm = (setForm) => {
  setForm({ name: "", email: "", message: "" });
};

/**
 * Maneja el éxito del envío
 */
export const handleSubmitSuccess = (setSuccess, setError, setForm) => {
  setSuccess(true);
  setError(false);
  resetForm(setForm);
  celebrateSuccess();
  
  // Auto-ocultar mensaje después de 5 segundos
  setTimeout(() => setSuccess(false), 5000);
};

/**
 * Maneja el error del envío
 */
export const handleSubmitError = (setError, setSuccess) => {
  setError(true);
  setSuccess(false);
  
  // Auto-ocultar mensaje después de 5 segundos
  setTimeout(() => setError(false), 5000);
};

/**
 * Configuración de efectos visuales
 */
export const CONTACT_CONFIG = {
  messageTimeout: 5000, // 5 segundos
};
