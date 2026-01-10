import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext"; 
import FadeWarpButton from "../components/FadeWarpButton";
import "../pages/styles/certificationsGallery.css";

import postgresImg from "/certificationsjpg/diploma-postgresql.jpg";
import backendImg from "/certificationsjpg/diploma-backend.jpg";
import nodeImg from "/certificationsjpg/diploma-nodejs.jpg";
import backendnodeImg from "/certificationsjpg/diploma-backend-nodejs.jpg";
import promptImg from "/certificationsjpg/diploma-prompt-engineering.jpg";  

const certifications = [
  {
    title: "PostgreSQL",
    img: postgresImg,
    link: "https://platzi.com/p/alecamdev/curso/12074-postgresql/diploma/detalle/",
  },
  {
    title: "Backend",
    img: backendImg,
    link: "https://platzi.com/p/alecamdev/curso/4656-backend/diploma/detalle/",
  },
  {
    title: "Node.JS",
    img: nodeImg,
    link: "https://platzi.com/p/alecamdev/curso/11982-nodejs/diploma/detalle/",
  },
  {
    title: "Api REST + Express.JS",
    img: backendnodeImg,
    link: "https://platzi.com/p/alecamdev/curso/2485-backend-nodejs/diploma/detalle/",
  },
  {
    title: "Prompt Engineering",
    img: promptImg,
    link: "https://platzi.com/p/alecamdev/curso/12001-prompt-engineering/diploma/detalle/",
  },
];

const CertificacionesPage = () => {
  const { t } = useTranslation();
  const { controls } = useFadeOut(); 
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClick = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const openModal = (img) => {
    setModalImg(img);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsClosing(true);
    // Close modal after animation completes
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setModalImg(null);
    }, 600); // Reduced timeout to match the animation duration
  };

  return (
    <motion.section
      className="certifications-page"
      initial={{ opacity: 1 }}
      animate={controls} 
    >
      <h2 className="gallery-title">{t('certifications.title')}</h2>

      <div className="cert-list">
        {certifications.map((cert, index) => (
          <button
            key={index}
            className={`cert-title-btn ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {cert.title}
          </button>
        ))}
      </div>

      <div className="cert-display">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              className="cert-preview"
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.8,
                rotateZ: -15,
                perspective: 1000,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                y: 80,
                scale: 0.8,
                rotateZ: 15,
                transition: { duration: 0.5, ease: [0.55, 0.085, 0.68, 0.53] },
              }}
            >
              <img
                src={certifications[activeIndex].img}
                alt={certifications[activeIndex].title}
                className="cert-image"
                onClick={() => openModal(certifications[activeIndex].img)}
              />
              <motion.a
                href={certifications[activeIndex].link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-2 caption-button"
              >
                <p className="caption">{certifications[activeIndex].title}</p>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              className="modal-overlay"
              onClick={handleModalClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              style={{ 
                background: "transparent",
                backdropFilter: isClosing ? "none" : "blur(4px)"
              }}
            >
              <motion.div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={
                  isClosing
                    ? {
                        x: [0, -3, 3, -2, 2, -1, 0],
                        scale: 0.85,
                        opacity: 0,
                      }
                    : {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                      }
                }
                transition={{
                  duration: isClosing ? 0.5 : 0.6,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                <img src={modalImg} alt={t('certifications.title')} />
                <motion.button
                  className="close-btn"
                  onClick={handleModalClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close"
                >
                  &times;
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="certifications-fadewarpbutton" title={t('certifications.goBack')}>
        <FadeWarpButton to="/" textKey="certifications.goBack" launchingKey="certifications.launching" />
      </div>
    </motion.section>
  );
};

export default CertificacionesPage;
