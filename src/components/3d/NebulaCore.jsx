/**
 * NebulaCore - Núcleo luminoso de la nebulosa
 * Presentación: núcleo sutil con múltiples capas y pulsación suave
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { performanceStore } from '../../stores/performanceStore';
import { nebulaShaders } from '../../modules/nebulaShaders';

export default function NebulaCore({ isImmersive = false }) {
  const coreRef = useRef();
  const innerGlowRef = useRef();
  const outerGlowRef = useRef();
  const atmosphereRef = useRef();
  const expansionRef = useRef({ progress: 0 });
  
  // Calcular detalle según performance
  const geometryDetail = useMemo(() => {
    const level = performanceStore.getLevel();
    return level === 'low' ? 16 : level === 'medium' ? 24 : 32;
  }, []);

  // Materiales con shaders volumétricos
  const shaderMaterials = useMemo(() => {
    return {
      atmosphere: new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color('#8800ff') },
          color2: { value: new THREE.Color('#aa44ff') },
          color3: { value: new THREE.Color('#220044') },
          time: { value: 0 },
          opacity: { value: 0.08 },
          noiseScale: { value: 0.5 },
          pulseSpeed: { value: 0.5 }
        },
        vertexShader: nebulaShaders.volumetric.vertexShader,
        fragmentShader: nebulaShaders.volumetric.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
      outerGlow: new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color('#00ffff') },
          color2: { value: new THREE.Color('#0088cc') },
          color3: { value: new THREE.Color('#004466') },
          time: { value: 0 },
          opacity: { value: 0.15 },
          noiseScale: { value: 0.8 },
          pulseSpeed: { value: 0.8 }
        },
        vertexShader: nebulaShaders.volumetric.vertexShader,
        fragmentShader: nebulaShaders.volumetric.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
      innerGlow: new THREE.ShaderMaterial({
        uniforms: {
          color1: { value: new THREE.Color('#ffffff') },
          color2: { value: new THREE.Color('#00ffff') },
          color3: { value: new THREE.Color('#00aaff') },
          time: { value: 0 },
          opacity: { value: 0.25 },
          noiseScale: { value: 1.2 },
          pulseSpeed: { value: 1.2 }
        },
        vertexShader: nebulaShaders.volumetric.vertexShader,
        fragmentShader: nebulaShaders.volumetric.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Actualizar uniforms de tiempo en shaders
    if (atmosphereRef.current?.material) {
      atmosphereRef.current.material.uniforms.time.value = time;
    }
    if (outerGlowRef.current?.material) {
      outerGlowRef.current.material.uniforms.time.value = time;
    }
    if (innerGlowRef.current?.material) {
      innerGlowRef.current.material.uniforms.time.value = time;
    }
    
    // Animación de expansión al entrar a inmersivo
    if (isImmersive && expansionRef.current.progress < 1) {
      expansionRef.current.progress = Math.min(expansionRef.current.progress + 0.02, 1);
    } else if (!isImmersive && expansionRef.current.progress > 0) {
      expansionRef.current.progress = Math.max(expansionRef.current.progress - 0.03, 0);
    }

    const expansionScale = 1 + expansionRef.current.progress * 3;
    const expansionOpacity = 1 - expansionRef.current.progress * 0.8;
    
    // Pulsación muy suave y orgánica
    const pulse = Math.sin(time * 0.8) * 0.08 + 1;
    const secondaryPulse = Math.sin(time * 1.2 + Math.PI / 3) * 0.05 + 1;
    
    // Core central - pulsación principal + expansión
    if (coreRef.current) {
      coreRef.current.scale.setScalar(pulse * 0.8 * expansionScale);
      coreRef.current.rotation.y = time * (0.1 + expansionRef.current.progress * 0.5);
      coreRef.current.rotation.z = time * 0.05;
      coreRef.current.material.opacity = 0.9 * expansionOpacity;
    }
    
    // Inner glow - pulsación secundaria + expansión
    if (innerGlowRef.current) {
      innerGlowRef.current.scale.setScalar(pulse * 1.2 * expansionScale);
      innerGlowRef.current.rotation.y = -time * (0.15 + expansionRef.current.progress * 0.3);
    }
    
    // Outer glow - pulsación lenta + expansión dramática
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(secondaryPulse * 1.5 * expansionScale * 1.5);
      outerGlowRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    }

    // Atmósfera - explosión hacia afuera
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(pulse * 2 * expansionScale * 2);
      atmosphereRef.current.rotation.y = time * (0.05 + expansionRef.current.progress * 0.4);
      atmosphereRef.current.rotation.x = Math.cos(time * 0.2) * 0.05;
    }
  });

  return (
    <group>
      {/* Atmósfera exterior - shader volumétrico */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.8, geometryDetail, geometryDetail]} />
        <primitive object={shaderMaterials.atmosphere} attach="material" />
      </mesh>

      {/* Outer glow - shader volumétrico */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[1.2, geometryDetail, geometryDetail]} />
        <primitive object={shaderMaterials.outerGlow} attach="material" />
      </mesh>

      {/* Inner glow - shader volumétrico */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[0.7, geometryDetail, geometryDetail]} />
        <primitive object={shaderMaterials.innerGlow} attach="material" />
      </mesh>

      {/* Core central - más brillante con emissive */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, geometryDetail, geometryDetail]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
