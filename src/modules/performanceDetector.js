/**
 * performanceDetector - Módulo de detección de capacidades del dispositivo
 * Module pattern: lógica pura de detección sin dependencias UI
 */

const createPerformanceDetector = () => {
  // Detección de dispositivo móvil
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Detección de tablet
  const isTablet = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua);
  };

  // Detectar GPU débil basado en renderer
  const hasWeakGPU = () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return true;
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
      
      // GPUs débiles conocidas
      const weakGPUs = [
        'intel', 'swiftshader', 'mesa', 
        'qualcomm adreno 3', 'qualcomm adreno 4',
        'mali-t', 'mali-4', 'mali-3',
        'powervr sgx'
      ];
      
      return weakGPUs.some(weak => renderer.includes(weak));
    }
    
    return false;
  };

  // Detectar memoria disponible
  const hasLowMemory = () => {
    // Navigator.deviceMemory es experimental pero útil
    if ('deviceMemory' in navigator) {
      return navigator.deviceMemory < 4; // < 4GB
    }
    
    // Fallback: asumir bajo en móvil
    return isMobile();
  };

  // Nivel de performance: high, medium, low
  const getPerformanceLevel = () => {
    const mobile = isMobile();
    const tablet = isTablet();
    const weakGPU = hasWeakGPU();
    const lowMemory = hasLowMemory();
    
    // Puntuación de performance (menor = peor)
    let score = 100;
    
    if (mobile) score -= 30;
    if (tablet) score -= 15;
    if (weakGPU) score -= 40;
    if (lowMemory) score -= 20;
    
    if (score >= 70) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  };

  // Configuración de calidad según nivel
  const getQualityConfig = (level = null) => {
    const perfLevel = level || getPerformanceLevel();
    
    const configs = {
      high: {
        particleCount: 2000,
        shadowsEnabled: false, // Nunca usamos shadows por performance
        antialiasing: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        maxFPS: 60,
        enablePostProcessing: false
      },
      medium: {
        particleCount: 1000,
        shadowsEnabled: false,
        antialiasing: true,
        pixelRatio: 1,
        maxFPS: 60,
        enablePostProcessing: false
      },
      low: {
        particleCount: 500,
        shadowsEnabled: false,
        antialiasing: false,
        pixelRatio: 1,
        maxFPS: 30,
        enablePostProcessing: false
      }
    };
    
    return configs[perfLevel];
  };

  // Monitorear FPS en tiempo real usando interval (no RAF)
  // Evita conflicto con RAF del starfield y del Canvas 3D
  const createFPSMonitor = (callback) => {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 60;
    
    // Incrementar contador en cada frame actual
    const countFrame = () => {
      frameCount++;
      requestAnimationFrame(countFrame);
    };
    
    // Medir FPS cada segundo usando setInterval
    const interval = setInterval(() => {
      const currentTime = performance.now();
      const delta = currentTime - lastTime;
      
      if (delta >= 1000) {
        fps = Math.round((frameCount * 1000) / delta);
        frameCount = 0;
        lastTime = currentTime;
        callback(fps);
      }
    }, 1000);
    
    countFrame();
    
    // Retornar función de limpieza
    return () => clearInterval(interval);
  };

  // API pública
  return {
    isMobile,
    isTablet,
    hasWeakGPU,
    hasLowMemory,
    getPerformanceLevel,
    getQualityConfig,
    createFPSMonitor
  };
};

// Singleton: una sola instancia
export const performanceDetector = createPerformanceDetector();
// Force recompile
