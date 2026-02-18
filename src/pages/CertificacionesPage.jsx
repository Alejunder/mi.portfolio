import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext"; 
import FadeWarpButton from "../components/FadeWarpButton";
import { getCertifications } from "../services/api";
import "../pages/styles/certificationsGallery.css";

const CertificacionesPage = () => {
  const { t, i18n } = useTranslation();
  const { controls } = useFadeOut(); 
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const currentLanguage = i18n.language || 'en';
  
  // Fetch certifications from API
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true);
        const response = await getCertifications();
        
        if (response.success && response.data) {
          setCertifications(response.data);
        } else {
          setError(response.error || 'Failed to load certifications');
        }
      } catch (err) {
        setError('Failed to load certifications');
        console.error('Error fetching certifications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);
  
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
          Loading certifications...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          {error}
        </div>
      ) : certifications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
          No certifications available
        </div>
      ) : (
        <>
          <div className="cert-list">
            {certifications.map((cert, index) => {
              const certTitle = cert.title?.[currentLanguage] || cert.title?.en || 'Certification';
              
              return (
                <button
                  key={cert.id || index}
                  className={`cert-title-btn ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {certTitle}
                </button>
              );
            })}
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
                    src={certifications[activeIndex].imageUrl}
                    alt={certifications[activeIndex].title?.[currentLanguage] || certifications[activeIndex].title?.en}
                    className="cert-image"
                    onClick={() => openModal(certifications[activeIndex].imageUrl)}
                  />
                  <motion.a
                    href={certifications[activeIndex].credentialUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-2 caption-button"
                    style={{
                      pointerEvents: certifications[activeIndex].credentialUrl ? 'auto' : 'none',
                      opacity: certifications[activeIndex].credentialUrl ? 1 : 0.5,
                    }}
                  >
                    <p className="caption">
                      {certifications[activeIndex].title?.[currentLanguage] || certifications[activeIndex].title?.en}
                    </p>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}

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
