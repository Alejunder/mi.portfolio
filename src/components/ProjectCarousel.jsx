import React, { useState, useRef, useEffect, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

const ProjectCarousel = ({ projects }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const cardRefs = useRef({});
  const [isHovered, setIsHovered] = useState(null);
  
  // Get indices of previous, current and next cards using useCallback to avoid dependency issues
  const getPrevIndex = useCallback((index) => {
    return index === 0 ? projects.length - 1 : index - 1;
  }, [projects.length]);
  
  const getNextIndex = useCallback((index) => {
    return index === projects.length - 1 ? 0 : index + 1;
  }, [projects.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => getNextIndex(prevIndex));
  }, [getNextIndex]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => getPrevIndex(prevIndex));
  }, [getPrevIndex]);

  // Track button hover state
  const handleBtnHover = (id) => {
    setIsHovered(id);
  };

  // Check if we're on mobile
  const isMobileView = () => {
    return typeof window !== 'undefined' && window.innerWidth <= 480;
  };
  
  // Determine card position and transforms based on carousel state
  const getCardTransform = (index) => {
    // For mobile, we don't want any transforms as we're using CSS to handle the display
    if (isMobileView()) {
      return 'none'; // This will be overridden by !important in CSS
    }
    
    // Desktop view with 3D transforms
    if (index === currentIndex) {
      return 'translateZ(150px) scale(1.1)';
    } else if (index === getPrevIndex(currentIndex)) {
      return 'translateX(-85%) translateZ(-200px) scale(0.7) rotateY(25deg)';
    } else if (index === getNextIndex(currentIndex)) {
      return 'translateX(85%) translateZ(-200px) scale(0.7) rotateY(-25deg)';
    } else {
      return 'translateX(0) translateZ(-400px) scale(0.5) opacity(0)';
    }
  };

  // Determine z-index for proper card stacking
  const getZIndex = (index) => {
    if (index === currentIndex) return 3;
    if (index === getPrevIndex(currentIndex) || index === getNextIndex(currentIndex)) return 2;
    return 1;
  };

  // Control card opacity based on position
  const getOpacity = (index) => {
    // For mobile, we only want the current card to be visible
    if (isMobileView()) {
      return index === currentIndex ? 1 : 0;
    }
    
    // Desktop opacity settings
    if (index === currentIndex) return 1;
    if (index === getPrevIndex(currentIndex) || index === getNextIndex(currentIndex)) return 0.6;
    return 0;
  };

  // Auto-rotation effect for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 20000); // Change slide every 20 seconds

    return () => clearInterval(interval);
  }, [handleNext]);
  
  // Add window resize handler to update mobile/desktop view
  useEffect(() => {
    const handleResize = () => {
      // Force re-render to update transforms
      setCurrentIndex(prevIndex => {
        // This trick forces a re-render without changing the state
        return prevIndex;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render buttons differently for mobile vs desktop
  const renderNavigation = () => {
    return (
      <div className="carousel-navigation">
        <button 
          className="carousel-btn carousel-btn-prev" 
          onClick={handlePrevious}
          aria-label="Previous project"
        >
          &lt;
        </button>
        
        <button 
          className="carousel-btn carousel-btn-next" 
          onClick={handleNext}
          aria-label="Next project"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="project-carousel">
      {/* Render navigation at the top for desktop */}
      {!isMobileView() && renderNavigation()}

      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-track">
          {projects.map((project, index) => {
            const isActive = index === currentIndex;
            const isVisible = index === currentIndex || 
                             index === getPrevIndex(currentIndex) || 
                             index === getNextIndex(currentIndex);
            const isHiddenButton = project.key === "project1";

            return (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`project-card-alt carousel-card ${isActive ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
                style={{
                  borderLeft: `4px solid ${project.accent}`,
                  transform: getCardTransform(index),
                  zIndex: getZIndex(index),
                  opacity: getOpacity(index),
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
              >
                <div className="project-content">
                  <h3 style={{ color: project.accent }}>{t(`projects.${project.key}.title`)}</h3>
                  <p>{t(`projects.${project.key}.description`)}</p>
                  <motion.a
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn-futuristic"
                    onMouseEnter={() => handleBtnHover(index)}
                    onMouseLeave={() => setIsHovered(null)}
                    initial={{ opacity: isHiddenButton ? 0 : 1 }}
                    animate={{ opacity: isHiddenButton ? 0 : 1 }}
                    style={{
                      pointerEvents: isHiddenButton ? 'none' : 'auto',
                      cursor: isHiddenButton ? 'default' : 'pointer',
                      visibility: isHiddenButton ? 'hidden' : 'visible'
                    }}
                  >
                    <span>{isHovered === index ? t('projects.buttonHover') : t('projects.button')}</span>
                  </motion.a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render navigation buttons below the carousel for mobile */}
      {isMobileView() && renderNavigation()}

      <div className="carousel-dots">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;
