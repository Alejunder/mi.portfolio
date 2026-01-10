// Store: estado del idioma con patrón Observer
const createLanguageStore = () => {
  let currentLanguage = 'es';
  const observers = new Set();

  const notify = () => {
    observers.forEach((callback) => callback(currentLanguage));
  };

  return {
    getLanguage: () => currentLanguage,
    
    setLanguage: (lang) => {
      if (lang !== currentLanguage) {
        currentLanguage = lang;
        notify();
      }
    },
    
    toggleLanguage: () => {
      const nextLang = currentLanguage === 'es' ? 'en' : 'es';
      currentLanguage = nextLang;
      notify();
      return nextLang;
    },
    
    subscribe: (callback) => {
      observers.add(callback);
      return () => observers.delete(callback);
    },
  };
};

// Singleton store
export const languageStore = createLanguageStore();
