// Module: configuración de i18n
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/eng.json';
import es from '../locales/esp.json';

export const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        es: { translation: es },
      },
      lng: 'es',
      fallbackLng: 'es',
      interpolation: {
        escapeValue: false,
      },
    });
  
  return i18n;
};
