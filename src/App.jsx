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
        <meta name="description" content="Joven programador especializado en JavaScript, React y desarrollo frontend en Mallorca, España. Creo aplicaciones web rápidas con Vite, diseño interfaces atractivas y optimizadas para SEO. Experto en maquetación HTML/CSS, integración de ChatGPT en webs y desarrollo con Node.js. ¿Buscas un desarrollador front-end creativo y eficiente? ¡Contáctame!" />
        <meta name="keywords" content="Desarrollador Frontend, Programador JavaScript, Desarrollador React, Maquetación HTML CSS, Desarrollo con Vite, Aplicaciones web rápidas, Optimización SEO, Diseño responsivo, Integración ChatGPT, Node.js, Joven programador, Portafolio desarrollador web, desarrollo web en mallorca, javascript Mallorca" />
        <meta name="author" content="Alejandro Camayo" />
        <meta property="og:title" content="Mi portfolio" />
        <meta property="og:description" content="Desarrollador que lleva todo a la novedad y máxima calidad" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://alecam.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-site-verification" content="ReW9F-aWf7qV0cD-Z1Uoq5BhdtMNBOa7iLrszL_oIGk" />
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
