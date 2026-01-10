// Facade: simplificar i18n para los componentes
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configuración inicial
const initI18n = (resources) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'es',
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false,
      },
    });
};

// API simplificada
export const i18nFacade = {
  init: initI18n,
  getCurrentLanguage: () => i18n.language,
  changeLanguage: (lang) => i18n.changeLanguage(lang),
  translate: (key) => i18n.t(key),
  getI18nInstance: () => i18n,
};
