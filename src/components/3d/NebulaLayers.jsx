/**
 * NebulaLayers - Capas atmosféricas con profundidad
 * Presentación: múltiples capas de gas galáctico a diferentes velocidades
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { performanceStore } from '../../stores/performanceStore';

export default function NebulaLayers({ isImmersive = false }) {
  const layer1Ref = useRef();
  const layer2Ref = useRef();
  const layer3Ref = useRef();
  const expansionRef = useRef({ progress: 0 });
  
  // Calcular detalle según performance
  const geometryDetail = useMemo(() => {
    const level = performanceStore.getLevel();
    return level === 'low' 
      ? { radial: 8, tubular: 50 }
      : level === 'medium'
      ? { radial: 12, tubular: 75 }
      : { radial: 16, tubular: 100 };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animación de expansión
    if (isImmersive && expansionRef.current.progress < 1) {
      expansionRef.current.progress = Math.min(expansionRef.current.progress + 0.012, 1);
    } else if (!isImmersive && expansionRef.current.progress > 0) {
      expansionRef.current.progress = Math.max(expansionRef.current.progress - 0.015, 0);
    }

    const explosionScale = 1 + expansionRef.current.progress * 3;
    const speedMultiplier = 1 + expansionRef.current.progress * 2;
    
    // Cada capa rota a velocidad diferente para profundidad
    if (layer1Ref.current) {
      layer1Ref.current.rotation.y = time * 0.03 * speedMultiplier;
      layer1Ref.current.rotation.x = Math.sin(time * 0.1) * 0.02;
      layer1Ref.current.scale.setScalar(explosionScale);
    }
    
    if (layer2Ref.current) {
      layer2Ref.current.rotation.y = -time * 0.04 * speedMultiplier;
      layer2Ref.current.rotation.z = Math.cos(time * 0.08) * 0.02;
      layer2Ref.current.scale.setScalar(explosionScale * 1.2);
    }
    
    if (layer3Ref.current) {
      layer3Ref.current.rotation.y = time * 0.025 * speedMultiplier;
      layer3Ref.current.rotation.x = -Math.sin(time * 0.06) * 0.03;
      layer3Ref.current.scale.setScalar(explosionScale * 1.4);
    }
  });

  return (
    <group>
      {/* Capa 1 - Purple nebula (más lejana) - Multicapa gaseosa */}
      <group ref={layer1Ref} position={[0, 0, -1]}>
        {/* Anillo exterior difuso */}
        <mesh>
          <torusGeometry args={[3.3, 1.5, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#6600cc"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo principal */}
        <mesh>
          <torusGeometry args={[3, 1.2, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#8800ff"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo interno brillante */}
        <mesh>
          <torusGeometry args={[2.7, 0.8, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#aa44ff"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Capa 2 - Cyan nebula (media) - Multicapa gaseosa */}
      <group ref={layer2Ref} position={[0, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        {/* Anillo exterior difuso */}
        <mesh>
          <torusGeometry args={[2.8, 1.0, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#0088cc"
            transparent
            opacity={0.05}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo principal */}
        <mesh>
          <torusGeometry args={[2.5, 0.8, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#00ddff"
            transparent
            opacity={0.09}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo interno brillante */}
        <mesh>
          <torusGeometry args={[2.2, 0.5, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#44eeff"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Capa 3 - Pink nebula (cercana) - Multicapa gaseosa */}
      <group ref={layer3Ref} position={[0, 0, 0.5]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        {/* Anillo exterior difuso */}
        <mesh>
          <torusGeometry args={[2.3, 0.8, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#cc0088"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo principal */}
        <mesh>
          <torusGeometry args={[2, 0.6, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#ff00aa"
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        
        {/* Anillo interno brillante */}
        <mesh>
          <torusGeometry args={[1.7, 0.4, geometryDetail.radial, geometryDetail.tubular]} />
          <meshBasicMaterial
            color="#ff55cc"
            transparent
            opacity={0.11}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
