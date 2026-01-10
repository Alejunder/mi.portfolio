// Facade: simplificar typewriter-effect
let TypewriterComponent = null;

const getTypewriter = async () => {
  if (!TypewriterComponent) {
    const module = await import('typewriter-effect');
    TypewriterComponent = module.default;
  }
  return TypewriterComponent;
};

export const typewriterFacade = {
  Typewriter: null,
  
  init: async () => {
    typewriterFacade.Typewriter = await getTypewriter();
  },
  
  createOptions: (strings) => ({
    loop: true,
    delay: 50,
    deleteSpeed: 30,
    strings,
    autoStart: true,
    pauseFor: 1500,
  }),
};
