// Module: lógica del Hero
export const createHeroLogic = () => {
  const getTypewriterStrings = (translations) => [
    translations.greeting,
    translations.title,
  ];

  return {
    getTypewriterStrings,
  };
};
