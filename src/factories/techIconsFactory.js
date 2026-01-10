/**
 * Tech Icons Factory - Factory de iconos tecnológicos
 * Crea configuraciones de iconos 3D con rutas a imágenes WEBP
 */

export const createTechIconsFactory = () => {
  // Distribución circular para 12 iconos
  const radius = 5;
  const angleStep = (Math.PI * 2) / 12;

  const techIcons = [
    {
      id: 'html',
      name: 'HTML',
      image: '/src/assets/html-light.webp',
      position: [Math.cos(angleStep * 0) * radius, Math.sin(angleStep * 0) * radius, 0]
    },
    {
      id: 'css',
      name: 'CSS',
      image: '/src/assets/css-light.webp',
      position: [Math.cos(angleStep * 1) * radius, Math.sin(angleStep * 1) * radius, 0]
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      image: '/src/assets/javascript.webp',
      position: [Math.cos(angleStep * 2) * radius, Math.sin(angleStep * 2) * radius, 0]
    },
    {
      id: 'react',
      name: 'React',
      image: '/src/assets/reactjs.webp',
      position: [Math.cos(angleStep * 3) * radius, Math.sin(angleStep * 3) * radius, 0]
    },
    {
      id: 'vite',
      name: 'Vite',
      image: '/src/assets/vite.webp',
      position: [Math.cos(angleStep * 4) * radius, Math.sin(angleStep * 4) * radius, 0]
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      image: '/src/assets/tailwind.webp',
      position: [Math.cos(angleStep * 5) * radius, Math.sin(angleStep * 5) * radius, 0]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      image: '/src/assets/nodejs-alt.webp',
      position: [Math.cos(angleStep * 6) * radius, Math.sin(angleStep * 6) * radius, 0]
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      image: '/src/assets/postgresql.webp',
      position: [Math.cos(angleStep * 7) * radius, Math.sin(angleStep * 7) * radius, 0]
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      image: '/src/assets/mongodb.webp',
      position: [Math.cos(angleStep * 8) * radius, Math.sin(angleStep * 8) * radius, 0]
    },
    {
      id: 'supabase',
      name: 'Supabase',
      image: '/src/assets/supabase.webp',
      position: [Math.cos(angleStep * 9) * radius, Math.sin(angleStep * 9) * radius, 0]
    },
    {
      id: 'git',
      name: 'Git',
      image: '/src/assets/git.webp',
      position: [Math.cos(angleStep * 10) * radius, Math.sin(angleStep * 10) * radius, 0]
    },
    {
      id: 'github',
      name: 'GitHub',
      image: '/src/assets/github-light.webp',
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
