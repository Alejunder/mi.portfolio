import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Starfield = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerHyperspace: () => {
      window.dispatchEvent(new CustomEvent('starfieldSpeedBoost', { detail: 5 }));
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    class Starfield {
      constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stars = [];
        this.depth = 1500;
        this.baseSpeed = 0.2;
        this.speed = this.baseSpeed;
        this.speedBoost = 0;
        this.focalLength = 0;
        this.width = 0;
        this.height = 0;
        this.animationId = null;
        this.isWarping = false; // Flag to track when warp effect is active

        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.targetScrollY = 0;
        this.scrollY = 0;
        
        // Detect mobile device
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        this.resize = this.resize.bind(this);
        this.animate = this.animate.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleSpeedBoost = this.handleSpeedBoost.bind(this);

        this.resize();

        window.addEventListener('resize', this.resize);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('starfieldSpeedBoost', this.handleSpeedBoost);

        this.start();
      }

      handleMouseMove = (e) => {
        // Skip mouse handling during warp effect for consistent straight lines
        if (this.isWarping) return;
        
        const rect = this.canvas.getBoundingClientRect();
        this.targetMouseX = (e.clientX - rect.width / 2) / rect.width;
        this.targetMouseY = (e.clientY - rect.height / 2) / rect.height;
        
        // Reduce mouse influence on mobile devices for more stable experience
        if (this.isMobile || this.width < 768) {
          this.targetMouseX *= 0.5;
          this.targetMouseY *= 0.5;
        }
      };

      handleScroll = () => {
        this.targetScrollY = window.scrollY || 0;
      };

      handleSpeedBoost = (e) => {
        // Set speedBoost value from event detail
        this.speedBoost = e.detail || 0;
        
        // Check if the event includes mobile information
        const isMobile = e.isMobile || this.width < 768;
        
        // Force mouse influence to zero during speed boost for straight lines
        if (this.speedBoost > 0) {
          // Reset all mouse influence immediately for consistent behavior
          this.mouseX = 0;
          this.mouseY = 0;
          this.targetMouseX = 0;
          this.targetMouseY = 0;
          
          // Temporarily disable mouse tracking for smoother animations
          this.isWarping = true;
        }
        
        // On mobile, use shorter warp duration for better performance
        const warpDuration = isMobile ? 1200 : 1500;
        
        // Reset speed boost after delay
        setTimeout(() => {
          this.speedBoost = 0;
          this.isWarping = false;
        }, warpDuration);
      };

      resize = () => {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);

        this.focalLength = this.width;
        this.initStars();
      };

      initStars = () => {
        this.stars = [];

        const isMobile = this.width < 768;
        const density = isMobile ? 0.0025 : 0.0055;
        const sizeMin = isMobile ? 0.2 : 0.4;
        const sizeMax = isMobile ? 0.8 : 1.6;
        const count = Math.floor(this.width * this.height * density);

        for (let i = 0; i < count; i++) {
          this.stars.push({
            x: (Math.random() - 0.5) * this.focalLength * 2,
            y: (Math.random() - 0.5) * this.height * 2,
            z: Math.random() * this.depth,
            size: Math.random() * (sizeMax - sizeMin) + sizeMin,
            life: 0,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.02 + Math.random() * 0.02,
          });
        }
      };

      start = () => {
        if (!this.animationId) this.animate();
      };

      stop = () => {
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      };

      destroy = () => {
        this.stop();
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('starfieldSpeedBoost', this.handleSpeedBoost);
      };

      animate = () => {
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;
        const cx = w / 2;
        const cy = h / 2;

        // During warping, force mouse position to center for straight lines
        if (this.isWarping) {
          this.mouseX *= 0.9; // Gradually move to center
          this.mouseY *= 0.9;
          this.scrollY *= 0.9;
        } else {
          // Normal mouse tracking during regular operation
          this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
          this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
          this.scrollY += (this.targetScrollY - this.scrollY) * 0.05;
        }

        // During speed boost, ignore scroll influence for more stable motion
        const scrollInfluence = this.speedBoost > 0 ? 0 : this.scrollY * 0.001;
        const speedBoost = this.speedBoost || 0;
        const effectiveSpeed = this.speed + scrollInfluence + speedBoost;
        
        // Increase warp factor but keep it more controlled on mobile
        const isMobile = this.width < 768;
        const warpFactor = speedBoost > 1 ? (isMobile ? 8 : 12) : 1;
        const sizeBoost = speedBoost > 1 ? 0.3 : 1; // ESTRELLAS MÁS FINAS en warp

        ctx.fillStyle = speedBoost > 1 ? 'rgba(17, 16, 16, 0.06)' : '#0e0d0d';
        ctx.fillRect(0, 0, w, h);

        for (const star of this.stars) {
          star.z -= effectiveSpeed;
          if (star.z <= 0) {
            star.z = this.depth;
            star.life = 0;
            star.twinklePhase = Math.random() * Math.PI * 2;
          }

          star.life = Math.min(star.life + 0.02, 1);
          star.twinklePhase += star.twinkleSpeed;
          const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
          const alpha = star.life * (0.6 + 0.4 * twinkle);

          // Calculate current position
          const perspective = this.focalLength / star.z;
          
          // Reduce mouse influence during warp for more stable lines
          const mouseInfluence = this.speedBoost > 0 ? 0 : 50;
          
          const x = star.x * perspective + cx + this.mouseX * mouseInfluence;
          const y = star.y * perspective + cy + this.mouseY * mouseInfluence;

          // Calculate previous position for drawing lines
          const prevZ = star.z + effectiveSpeed * warpFactor;
          const pk = this.focalLength / prevZ;
          
          // Use same mouse influence for previous position to ensure straight lines
          const px = star.x * pk + cx + this.mouseX * mouseInfluence;
          const py = star.y * pk + cy + this.mouseY * mouseInfluence;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = star.size * sizeBoost;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y, star.size * sizeBoost, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }

        this.animationId = requestAnimationFrame(this.animate);
      };
    }

    const engine = new Starfield(canvas);
    engineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
});

export default Starfield;
