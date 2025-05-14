import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button onClick={toggleLanguage} className="lang-switch">
      {i18n.language === "es" ? "English" : "Español"}
    </button>
  );
}
