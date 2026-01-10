/**
 * TechIcon3D - Componente reutilizable de ícono 3D
 * Presentación: billboard plano sin shaders complejos
 */

import { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, DoubleSide } from 'three';

export default function TechIcon3D({ 
  imagePath,
  position = [0, 0, 0], 
  scale = 1,
  hoverScale = 1.2
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scaleRef = useRef(scale);
  
  const texture = useLoader(TextureLoader, imagePath);

  const targetScale = hovered ? scale * hoverScale : scale;

  useFrame(() => {
    scaleRef.current += (targetScale - scaleRef.current) * 0.1;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scaleRef.current);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        alphaTest={0.5}
        depthWrite={false}
        side={DoubleSide}
      />
    </mesh>
  );
}
