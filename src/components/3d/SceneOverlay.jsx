/**
 * SceneOverlay - Overlay para salir del modo inmersivo
 * Presentación: botón cerrar + instrucciones (auto-hide 7s)
 */

import { useTranslation } from 'react-i18next';

export default function SceneOverlay({ onClose }) {
  const { t } = useTranslation();

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
