import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next'; // Importación añadida
import '../styles/Hero.css';

function Hero() {
  const { t } = useTranslation(); // Hook de traducción
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Textos traducidos
  const typewriterStrings = [
    t('hero.greeting'),
    t('hero.title')
  ];

  return (
    <section id="hero" className="hero-section">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: true,
            zIndex: -1,
          },
          background: {
            color: '#0d0d0d',
          },
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                area: 800,
              },
            },
            color: {
              value: '#ffffff',
            },
            opacity: {
              value: 0.5,
            },
            size: {
              value: 1.5,
            },
            move: {
              enable: true,
              speed: 0.6,
            },
          },
        }}
      />

      <div className="hero-content">
        <h1 className="logo-font">
          <Typewriter
            options={{
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              strings: typewriterStrings, // Usamos las cadenas traducidas
              autoStart: true,
              pauseFor: 1500,
            }}
          />
        </h1>
      </div>
    </section>
  );
}

export default Hero;