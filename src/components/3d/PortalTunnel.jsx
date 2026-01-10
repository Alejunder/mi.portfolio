/**
 * PortalTunnel - Efecto de túnel/wormhole durante transición
 * Presentación: anillos concéntricos que dan sensación de viaje
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PortalTunnel({ isActive = false }) {
  const ringsRef = useRef([]);
  const progressRef = useRef(0);

  useFrame(() => {
    if (isActive && progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + 0.03, 1);
    } else if (!isActive && progressRef.current > 0) {
      progressRef.current = Math.max(progressRef.current - 0.05, 0);
    }

    const progress = progressRef.current;
    if (progress === 0) return;

    ringsRef.current.forEach((ring, index) => {
      if (!ring) return;
      
      const offset = index * 0.2;
      const time = progress * 3 + offset;
      
      // Mover hacia la cámara
      ring.position.z = -10 + (time * 15) % 20;
      
      // Escalar según distancia
      const distanceScale = 1 + Math.abs(ring.position.z) * 0.1;
      ring.scale.setScalar(distanceScale);
      
      // Fade según distancia para todos los meshes hijos
      const opacity = Math.max(0, 1 - Math.abs(ring.position.z) / 10);
      ring.children.forEach((mesh, meshIndex) => {
        // Cada capa tiene diferente opacidad base
        const baseOpacity = meshIndex === 0 ? 0.15 : meshIndex === 1 ? 0.25 : 0.3;
        mesh.material.opacity = opacity * baseOpacity;
      });
      
      // Rotación
      ring.rotation.z += 0.01;
    });
  });

  // Siempre renderizar, la visibilidad se maneja con opacidad
  return (
    <group>
      {Array.from({ length: 10 }).map((_, index) => (
        <group
          key={index}
          ref={(el) => (ringsRef.current[index] = el)}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {/* Anillo exterior difuso (gaseoso) */}
          <mesh>
            <torusGeometry args={[2 + index * 0.3 + 0.15, 0.12, 16, 32]} />
            <meshBasicMaterial
              color="#0088cc"
              transparent
              opacity={0.15}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          
          {/* Anillo principal */}
          <mesh>
            <torusGeometry args={[2 + index * 0.3, 0.08, 16, 32]} />
            <meshBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          
          {/* Anillo interno brillante */}
          <mesh>
            <torusGeometry args={[2 + index * 0.3 - 0.08, 0.05, 16, 32]} />
            <meshBasicMaterial
              color="#44ffff"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
