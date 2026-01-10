/**
 * performanceStore - Estado singleton de performance
 * Observer pattern: notifica cambios de performance
 */

import { performanceDetector } from '../modules/performanceDetector';

const createPerformanceStore = () => {
  // Estado inicial
  let state = {
    level: 'high',
    config: {},
    fps: 60,
    isThrottled: false
  };

  const listeners = new Set();

  // Inicializar detección
  const init = () => {
    const level = performanceDetector.getPerformanceLevel();
    const config = performanceDetector.getQualityConfig(level);
    
    state = {
      level,
      config,
      fps: 60,
      isThrottled: false
    };

    notify();
    
    // Monitorear FPS
    performanceDetector.createFPSMonitor((fps) => {
      updateFPS(fps);
      
      // Auto-throttle si FPS cae mucho
      if (fps < 25 && !state.isThrottled && state.level !== 'low') {
        downgrade();
      }
    });
  };

  // Actualizar FPS
  const updateFPS = (fps) => {
    if (state.fps !== fps) {
      state = { ...state, fps };
      notify();
    }
  };

  // Bajar calidad automáticamente
  const downgrade = () => {
    const levels = ['high', 'medium', 'low'];
    const currentIndex = levels.indexOf(state.level);
    
    if (currentIndex < levels.length - 1) {
      const newLevel = levels[currentIndex + 1];
      state = {
        ...state,
        level: newLevel,
        config: performanceDetector.getQualityConfig(newLevel),
        isThrottled: true
      };
      
      console.warn(`⚠️ Performance downgrade: ${state.level}`);
      notify();
    }
  };

  // Observadores
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const notify = () => {
    listeners.forEach(listener => listener(state));
  };

  // Getters
  const getState = () => state;
  const getLevel = () => state.level;
  const getConfig = () => state.config;
  const getFPS = () => state.fps;
  const isLowPerformance = () => state.level === 'low';
  const isMobile = () => performanceDetector.isMobile();

  // API pública
  return {
    init,
    subscribe,
    getState,
    getLevel,
    getConfig,
    getFPS,
    isLowPerformance,
    isMobile,
    downgrade
  };
};

// Singleton
export const performanceStore = createPerformanceStore();
