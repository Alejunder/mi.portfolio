import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { languageStore } from '../stores/languageStore';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(languageStore.getLanguage());

  useEffect(() => {
    const unsubscribe = languageStore.subscribe((lang) => {
      setCurrentLang(lang);
      i18n.changeLanguage(lang);
    });
    return unsubscribe;
  }, [i18n]);

  const toggleLanguage = () => {
    const nextLang = languageStore.toggleLanguage();
    i18n.changeLanguage(nextLang);
  };

  return (
    <button onClick={toggleLanguage} className="lang-switch">
      {currentLang === 'es' ? 'English' : 'Español'}
    </button>
  );
}
