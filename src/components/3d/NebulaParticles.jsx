/**
 * NebulaParticles - Sistema de partículas de la nebulosa
 * Presentación: render de partículas flotantes con colores galácticos
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { performanceStore } from '../../stores/performanceStore';
import { nebulaShaders } from '../../modules/nebulaShaders';

export default function NebulaParticles({ isImmersive = false }) {
  const particlesRef = useRef();
  const expansionRef = useRef({ progress: 0, wasImmersive: false });
  
  // Calcular partículas según performance
  const particleCount = useMemo(() => {
    const config = performanceStore.getConfig();
    return config.particleCount || 2000;
  }, []);

  // Generar partículas con colores galácticos
  const particles = useMemo(() => {
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // Paleta galáctica: cyan, purple, pink, deep blue
    const galaxyColors = [
      { r: 0.0, g: 0.8, b: 1.0 },  // Cyan
      { r: 0.5, g: 0.0, b: 1.0 },  // Purple
      { r: 1.0, g: 0.2, b: 0.6 },  // Pink
      { r: 0.2, g: 0.4, b: 0.9 },  // Deep blue
      { r: 0.8, g: 0.5, b: 1.0 },  // Light purple
    ];

    // Función pura para generar valores
    const generateParticle = (seed) => {
      const rng = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      
      // Distribución esférica con más concentración en el centro
      const radius = Math.pow(rng(), 0.5) * 5 + 1;
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(rng() * 2 - 1);
      
      return { 
        radius, 
        theta, 
        phi, 
        colorIndex: Math.floor(rng() * galaxyColors.length),
        size: rng() * 0.03 + 0.02,
        brightness: rng() * 0.5 + 0.5
      };
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const particle = generateParticle(i + 1);
      
      // Posiciones en distribución esférica
      positions[i3] = particle.radius * Math.sin(particle.phi) * Math.cos(particle.theta);
      positions[i3 + 1] = particle.radius * Math.sin(particle.phi) * Math.sin(particle.theta);
      positions[i3 + 2] = particle.radius * Math.cos(particle.phi);

      // Colores galácticos
      const color = galaxyColors[particle.colorIndex];
      colors[i3] = color.r * particle.brightness;
      colors[i3 + 1] = color.g * particle.brightness;
      colors[i3 + 2] = color.b * particle.brightness;

      // Tamaños variados
      sizes[i] = particle.size;
    }

    return { positions, colors, sizes, count };
  }, [particleCount]);

  // Shader material para partículas con brillo variable
  const particleShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        size: { value: 0.04 }
      },
      vertexShader: nebulaShaders.particle.vertexShader,
      fragmentShader: nebulaShaders.particle.fragmentShader,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  // Animación suave y orgánica
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Actualizar uniform de tiempo
    if (particlesRef.current.material) {
      particlesRef.current.material.uniforms.time.value = time;
    }
    
    // Animación de expansión
    if (isImmersive && expansionRef.current.progress < 1) {
      expansionRef.current.progress = Math.min(expansionRef.current.progress + 0.015, 1);
    } else if (!isImmersive && expansionRef.current.progress > 0) {
      expansionRef.current.progress = Math.max(expansionRef.current.progress - 0.02, 0);
    }

    const explosionScale = 1 + expansionRef.current.progress * 4;
    
    // Rotación muy lenta y suave
    particlesRef.current.rotation.y = time * (0.02 + expansionRef.current.progress * 0.08);
    particlesRef.current.rotation.x = Math.sin(time * 0.05) * 0.05;
    particlesRef.current.rotation.z = Math.cos(time * 0.03) * 0.03;
    
    // Expansión radial de partículas
    particlesRef.current.scale.setScalar(explosionScale);
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={particleShaderMaterial} attach="material" />
    </points>
  );
}
