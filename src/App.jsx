import { Helmet } from 'react-helmet-async';

import './styles/globals.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SectionFadeIn from './components/SectionFadeIn.jsx';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';

function App() {
  return (
    <>
      <Helmet>
        <title>AleCam Developer</title>
        <meta name="description" content=" Desarrollador Front-End apasionado con experiencia en JavaScript, React, Vite, CSS, HTML y Node.js. Creo interfaces web rápidas, dinámicas y responsivas utilizando las últimas tecnologías. Me especializo en desarrollo con React y Vite para aplicaciones modernas, optimizadas para SEO y alto rendimiento. También trabajo con ChatGPT para integrar soluciones de IA en proyectos web. ¿Buscas un desarrollador front-end creativo y eficiente? ¡Contáctame!" />
        <meta name="keywords" content="Desarrollador Front-End Programador JavaScript, Muy bueno en React, Desarrollo con Vite, Maquetación CSS y HTML, Integración de ChatGPT en web, Programador Node.js, Aplicaciones web rápidas, Optimización SEO front-end y Diseño responsivo" />
        <meta name="author" content="Alejandro Camayo" />
        <meta property="og:title" content="Mi portfolio" />
        <meta property="og:description" content="Desarrollador que lleva todo a la novedad y máxima calidad" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/imagen-og.jpg" />
        <meta property="og:url" content="https://alecam.dev" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Navbar />
      <Hero />
      <main>
        <SectionFadeIn id="About"><About /></SectionFadeIn>
        <SectionFadeIn id="Skills"><Skills /></SectionFadeIn>
        <SectionFadeIn id="Projects"><Projects /></SectionFadeIn>
        <SectionFadeIn id="Contact"><Contact /></SectionFadeIn>
      </main>
      <Footer />
    </>
  );
}

export default App;
