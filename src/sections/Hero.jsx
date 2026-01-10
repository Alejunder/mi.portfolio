import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { useTranslation } from 'react-i18next';
import { createHeroLogic } from '../modules/heroLogic';
import { languageStore } from '../stores/languageStore';
import './styles/Hero.css';

const heroLogic = createHeroLogic();

function Hero() {
  const { t } = useTranslation();
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = languageStore.subscribe(() => {
      forceUpdate({});
    });
    return unsubscribe;
  }, []);

  const typewriterStrings = heroLogic.getTypewriterStrings({
    greeting: t('hero.greeting'),
    title: t('hero.title'),
  });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 className="logo-font">
          <Typewriter
            options={{
              loop: true,
              delay: 50,
              deleteSpeed: 30,
              strings: typewriterStrings,
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
