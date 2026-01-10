import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  isMobileView,
  getCardTransform,
  getZIndex,
  getOpacity,
  isCardVisible,
  createNavigationHandlers,
  CAROUSEL_CONFIG,
} from "../modules/projectCarouselLogic";

// Componente de navegación
const Navigation = ({ onPrevious, onNext }) => (
  <div className="carousel-navigation">
    <button
      className="carousel-btn carousel-btn-prev"
      onClick={onPrevious}
      aria-label="Previous project"
    >
      &lt;
    </button>

    <button
      className="carousel-btn carousel-btn-next"
      onClick={onNext}
      aria-label="Next project"
    >
      &gt;
    </button>
  </div>
);

const ProjectCarousel = ({ projects }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef({});
  const [isHovered, setIsHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar móvil en el primer render y al cambiar tamaño
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileView());
    };
    
    // Ejecutar inmediatamente
    checkMobile();
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Obtener manejadores de navegación del módulo
  const { handleNext, handlePrevious, handleGoToIndex } =
    createNavigationHandlers(setCurrentIndex, projects.length);

  // Auto-rotación del carrusel
  useEffect(() => {
    const interval = setInterval(
      handleNext,
      CAROUSEL_CONFIG.autoRotateInterval
    );
    return () => clearInterval(interval);
  }, [handleNext]);

  // Forzar re-render en cambio de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex((prevIndex) => prevIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="project-carousel">
      {!isMobile && (
        <Navigation onPrevious={handlePrevious} onNext={handleNext} />
      )}

      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-track">
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const isVisible = isCardVisible(
              index,
              currentIndex,
              projects.length
            );
            const isHiddenButton = project.key === "project1";

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`project-card-alt carousel-card ${
                  isActive ? "active" : ""
                } ${isVisible ? "visible" : ""}`}
                style={{
                  borderLeft: `4px solid ${project.accent}`,
                  transform: getCardTransform(
                    index,
                    currentIndex,
                    projects.length
                  ),
                  zIndex: getZIndex(index, currentIndex, projects.length),
                  opacity: getOpacity(index, currentIndex, projects.length),
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="project-content">
                  <h3 style={{ color: project.accent }}>
                    {t(`projects.${project.key}.title`)}
                  </h3>
                  <div className="carousel-project-description">
                    <p>{t(`projects.${project.key}.description`)}</p>
                  </div>
                  <motion.a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn-futuristic"
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    initial={{ opacity: isHiddenButton ? 0 : 1 }}
                    animate={{ opacity: isHiddenButton ? 0 : 1 }}
                    style={{
                      pointerEvents: isHiddenButton ? "none" : "auto",
                      cursor: isHiddenButton ? "default" : "pointer",
                      visibility: isHiddenButton ? "hidden" : "visible",
                    }}
                  >
                    <span>
                      {isHovered === index
                        ? t("projects.buttonHover")
                        : t("projects.button")}
                    </span>
                  </motion.a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isMobile && (
        <Navigation onPrevious={handlePrevious} onNext={handleNext} />
      )}

      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleGoToIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
