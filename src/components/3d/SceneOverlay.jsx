/**
 * SceneOverlay - Overlay para salir del modo inmersivo
 * Presentación: botón cerrar + instrucciones (auto-hide 7s)
 */

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { languageStore } from '../../stores/languageStore';
import audioAle from '../../assets/audioale.mp3';
import audioMorgan from '../../assets/audionmorgan.mp3';

export default function SceneOverlay({ onClose }) {
  const { t } = useTranslation();

  useEffect(() => {
    // Reproducir audio de bienvenida después de que terminen las instrucciones (15s)
    const audioTimer = setTimeout(() => {
      try {
        const currentLanguage = languageStore.getLanguage();
        const audioFile = currentLanguage === 'es' ? audioAle : audioMorgan;
        
        const audio = new Audio(audioFile);
        audio.volume = 0.7;
        audio.play().catch((err) => {
          console.log('Audio playback prevented:', err);
        });
      } catch (error) {
        console.log('Error playing welcome audio:', error);
      }
    }, 15000); // 15 segundos, cuando termina la animación instructionsFadeInOut

    return () => clearTimeout(audioTimer);
  }, []);

  return (
    <>
      <div className="scene-overlay"></div>
      
      <div className="overlay-instructions">
        <div className="instructions-title">{t('sceneOverlay.title')}</div>
        <div className="instructions-text">
          <strong>{t('sceneOverlay.title-mobile')}</strong> {t('sceneOverlay.mobile')}
          <br />
          <strong>{t('sceneOverlay.title-computer')}</strong> {t('sceneOverlay.computer')}
        </div>
      </div>

      <button className="scene-close-button" onClick={onClose}>
        <span className="close-icon">✕</span>
        <span className="close-text">{t('sceneOverlay.exit')}</span>
      </button>
    </>
  );
}
