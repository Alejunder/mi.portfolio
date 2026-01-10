/**
 * Tech Icons Factory - Factory de iconos tecnológicos
 * Crea configuraciones de iconos 3D con rutas a imágenes WEBP
 */

// Imports estáticos de imágenes para que Vite las procese correctamente
import htmlImg from '../assets/html-light.webp';
import cssImg from '../assets/css-light.webp';
import jsImg from '../assets/javascript.webp';
import reactImg from '../assets/reactjs.webp';
import viteImg from '../assets/vite.webp';
import tailwindImg from '../assets/tailwind.webp';
import nodeImg from '../assets/nodejs-alt.webp';
import postgresImg from '../assets/postgresql.webp';
import mongoImg from '../assets/mongodb.webp';
import supabaseImg from '../assets/supabase.webp';
import gitImg from '../assets/git.webp';
import githubImg from '../assets/github-light.webp';

export const createTechIconsFactory = () => {
  // Distribución circular para 12 iconos
  const radius = 5;
  const angleStep = (Math.PI * 2) / 12;

  const techIcons = [
    {
      id: 'html',
      name: 'HTML',
      image: htmlImg,
      position: [Math.cos(angleStep * 0) * radius, Math.sin(angleStep * 0) * radius, 0]
    },
    {
      id: 'css',
      name: 'CSS',
      image: cssImg,
      position: [Math.cos(angleStep * 1) * radius, Math.sin(angleStep * 1) * radius, 0]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      image: jsImg,
      position: [Math.cos(angleStep * 2) * radius, Math.sin(angleStep * 2) * radius, 0]
    },
    {
      id: 'react',
      name: 'React',
      image: reactImg,
      position: [Math.cos(angleStep * 3) * radius, Math.sin(angleStep * 3) * radius, 0]
    },
    {
      id: 'vite',
      name: 'Vite',
      image: viteImg,
      position: [Math.cos(angleStep * 4) * radius, Math.sin(angleStep * 4) * radius, 0]
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      image: tailwindImg,
      position: [Math.cos(angleStep * 5) * radius, Math.sin(angleStep * 5) * radius, 0]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      image: nodeImg,
      position: [Math.cos(angleStep * 6) * radius, Math.sin(angleStep * 6) * radius, 0]
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      image: postgresImg,
      position: [Math.cos(angleStep * 7) * radius, Math.sin(angleStep * 7) * radius, 0]
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      image: mongoImg,
      position: [Math.cos(angleStep * 8) * radius, Math.sin(angleStep * 8) * radius, 0]
    },
    {
      id: 'supabase',
      name: 'Supabase',
      image: supabaseImg,
      position: [Math.cos(angleStep * 9) * radius, Math.sin(angleStep * 9) * radius, 0]
    },
    {
      id: 'git',
      name: 'Git',
      image: gitImg,
      position: [Math.cos(angleStep * 10) * radius, Math.sin(angleStep * 10) * radius, 0]
    },
    {
      id: 'github',
      name: 'GitHub',
      image: githubImg,
      position: [Math.cos(angleStep * 11) * radius, Math.sin(angleStep * 11) * radius, 0]
    }
  ];

  const getTechIcons = () => techIcons;

  const getTechIconById = (id) => {
    return techIcons.find(icon => icon.id === id);
  };

  return {
    getTechIcons,
    getTechIconById
  };
};
