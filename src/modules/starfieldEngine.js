// Module pattern: lógica de dominio del starfield
const createStarfieldEngine = (canvas) => {
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const state = {
    stars: [],
    depth: 1500,
    baseSpeed: 0.2,
    speed: 0.2,
    speedBoost: 0,
    focalLength: 0,
    width: 0,
    height: 0,
    animationId: null,
    isWarping: false,
    targetMouseX: 0,
    targetMouseY: 0,
    mouseX: 0,
    mouseY: 0,
    targetScrollY: 0,
    scrollY: 0,
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    is3DActive: false,
    frameSkip: 0,
    lastFrameTime: 0,
  };
  
  // Cache de colores pre-calculados (optimización)
  const colorCache = new Map();
  const getColor = (alpha) => {
    const key = Math.round(alpha * 100);
    if (!colorCache.has(key)) {
      colorCache.set(key, `rgba(255,255,255,${alpha.toFixed(2)})`);
    }
    return colorCache.get(key);
  };

  const initStars = () => {
    state.stars = [];
    const isMobile = state.width < 768;
    // Reducir densidad para mejor performance
    const density = isMobile ? 0.002 : 0.004;
    const sizeMin = isMobile ? 0.3 : 0.5;
    const sizeMax = isMobile ? 0.9 : 1.4;
    const count = Math.floor(state.width * state.height * density);

    for (let i = 0; i < count; i++) {
      state.stars.push({
        x: (Math.random() - 0.5) * state.focalLength * 2,
        y: (Math.random() - 0.5) * state.height * 2,
        z: Math.random() * state.depth,
        size: Math.random() * (sizeMax - sizeMin) + sizeMin,
        life: 0,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.02,
      });
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    state.width = rect.width;
    state.height = rect.height;
    canvas.width = state.width * dpr;
    canvas.height = state.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    state.focalLength = state.width;
    initStars();
  };

  const handleMouseMove = (e) => {
    if (state.isWarping) return;
    
    const rect = canvas.getBoundingClientRect();
    state.targetMouseX = (e.clientX - rect.width / 2) / rect.width;
    state.targetMouseY = (e.clientY - rect.height / 2) / rect.height;
    
    if (state.isMobile || state.width < 768) {
      state.targetMouseX *= 0.5;
      state.targetMouseY *= 0.5;
    }
  };

  const handleScroll = () => {
    state.targetScrollY = window.scrollY || 0;
  };

  const handleSpeedBoost = (e) => {
    state.speedBoost = e.detail || 0;
    const isMobile = e.isMobile || state.width < 768;
    
    if (state.speedBoost > 0) {
      state.mouseX = 0;
      state.mouseY = 0;
      state.targetMouseX = 0;
      state.targetMouseY = 0;
      state.isWarping = true;
    }
    
    const warpDuration = isMobile ? 1200 : 1500;
    
    setTimeout(() => {
      state.speedBoost = 0;
      state.isWarping = false;
    }, warpDuration);
  };

  const handle3DSceneActive = (e) => {
    state.is3DActive = e.detail === true;
  };

  const animate = () => {
    // Throttling: saltarse frames cuando 3D está activo
    const now = performance.now();
    const targetFPS = state.is3DActive ? 30 : 60;
    const frameDelay = 1000 / targetFPS;
    
    if (now - state.lastFrameTime < frameDelay) {
      state.animationId = requestAnimationFrame(animate);
      return;
    }
    
    state.lastFrameTime = now;
    
    const w = state.width;
    const h = state.height;
    const cx = w / 2;
    const cy = h / 2;

    if (state.isWarping) {
      state.mouseX *= 0.9;
      state.mouseY *= 0.9;
      state.scrollY *= 0.9;
    } else {
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.05;
    }

    const scrollInfluence = state.speedBoost > 0 ? 0 : state.scrollY * 0.001;
    const speedBoost = state.speedBoost || 0;
    const effectiveSpeed = state.speed + scrollInfluence + speedBoost;
    
    const isMobile = state.width < 768;
    const warpFactor = speedBoost > 1 ? (isMobile ? 8 : 12) : 1;
    const sizeBoost = speedBoost > 1 ? 0.3 : 1;
    const mouseInfluence = state.speedBoost > 0 ? 0 : 50;

    // Limpiar canvas - más eficiente que clearRect
    ctx.fillStyle = speedBoost > 1 ? 'rgba(17,16,16,0.06)' : '#0e0d0d';
    ctx.fillRect(0, 0, w, h);

    // Batch de estrellas para optimización
    for (let i = 0; i < state.stars.length; i++) {
      const star = state.stars[i];
      
      star.z -= effectiveSpeed;
      if (star.z <= 0) {
        star.z = state.depth;
        star.life = 0;
        star.twinklePhase = Math.random() * Math.PI * 2;
      }

      star.life = Math.min(star.life + 0.02, 1);
      star.twinklePhase += star.twinkleSpeed;
      
      const perspective = state.focalLength / star.z;
      const x = star.x * perspective + cx + state.mouseX * mouseInfluence;
      const y = star.y * perspective + cy + state.mouseY * mouseInfluence;
      
      // Culling: solo renderizar estrellas visibles
      if (x < -50 || x > w + 50 || y < -50 || y > h + 50) continue;

      const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.5;
      const alpha = star.life * (0.6 + 0.4 * twinkle);
      const size = star.size * sizeBoost;

      // Trail solo si hay movimiento significativo
      if (effectiveSpeed > 0.5) {
        const prevZ = star.z + effectiveSpeed * warpFactor;
        const pk = state.focalLength / prevZ;
        const px = star.x * pk + cx + state.mouseX * mouseInfluence;
        const py = star.y * pk + cy + state.mouseY * mouseInfluence;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = getColor(alpha * 0.8);
        ctx.lineWidth = size;
        ctx.stroke();
      }

      // Estrella principal - círculo simple
      ctx.fillStyle = getColor(alpha);
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    }

    state.animationId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!state.animationId) animate();
  };

  const stop = () => {
    if (state.animationId) {
      cancelAnimationFrame(state.animationId);
      state.animationId = null;
    }
  };

  const destroy = () => {
    stop();
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('starfieldSpeedBoost', handleSpeedBoost);
    window.removeEventListener('starfield3DActive', handle3DSceneActive);
  };

  // Inicialización
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('starfieldSpeedBoost', handleSpeedBoost);
  window.addEventListener('starfield3DActive', handle3DSceneActive);
  start();

  // API pública
  return {
    destroy,
    triggerHyperspace: () => {
      window.dispatchEvent(new CustomEvent('starfieldSpeedBoost', { detail: 5 }));
    },
  };
};

export default createStarfieldEngine;
