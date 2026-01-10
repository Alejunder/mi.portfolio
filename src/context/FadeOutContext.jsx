// src/context/FadeOutContext.jsx
import { createContext, useContext, useMemo } from "react";
import { useAnimation } from "framer-motion";

const FadeOutContext = createContext(null);

export const FadeOutProvider = ({ children }) => {
  const controls = useAnimation();

  // Memoizamos el value para evitar renders innecesarios
  const value = useMemo(() => ({ controls }), [controls]);

  return (
    <FadeOutContext.Provider value={value}>
      {children}
    </FadeOutContext.Provider>
  );
};

export const useFadeOut = () => {
  const context = useContext(FadeOutContext);
  if (!context) {
    throw new Error("useFadeOut must be used within a FadeOutProvider");
  }
  return context;
};
