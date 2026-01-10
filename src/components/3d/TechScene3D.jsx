/**
 * TechScene3D - Escena con iconos tecnológicos 3D
 * Presentación: layout de iconos en 3D con texturas PNG
 */

import { OrbitControls } from '@react-three/drei';
import TechIcon3D from './TechIcon3D';
import { createTechIconsFactory } from '../../factories/techIconsFactory';

const techIconsFactory = createTechIconsFactory();

export default function TechScene3D() {
  const techIcons = techIconsFactory.getTechIcons();

  return (
    <group>
      {/* Luz adicional para los iconos 3D */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Iconos 3D con texturas WEBP - Billboard plano */}
      {techIcons.map((icon) => (
        <TechIcon3D
          key={icon.id}
          imagePath={icon.image}
          position={icon.position}
          scale={1.2}
          hoverScale={1.4}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={15}
        minDistance={3}
        autoRotate={false}
      />
    </group>
  );
}
