import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next'; // Importación añadida
import '../styles/Hero.css';

function Hero() {
  const { t } = useTranslation(); // Hook de traducción

  // Textos traducidos
  const typewriterStrings = [
    t('hero.greeting'),
    t('hero.title')
  ];

  return (
    <section id="hero" className="hero-section">
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
