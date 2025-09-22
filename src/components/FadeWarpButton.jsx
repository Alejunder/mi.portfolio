import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext";
import launchSound from "../assets/launch.mp3";
import "../styles/fadeWarpButton.css";
import "../styles/mobileStarfieldFix.css";

const FadeWarpButton = ({ to = "/" }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { controls } = useFadeOut();
  const [launched, setLaunched] = useState(false);

  const handleClick = async () => {
    if (launched) return;

    setLaunched(true);
    
    // Play sound effect
    try {
      const audio = new Audio(launchSound);
      audio.play().catch(() => console.log("Audio playback prevented"));
    } catch {
      console.log("Error playing audio");
    }

    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // Use more conservative speed boost on mobile for better performance and straight lines
    const speedBoostValue = isMobile ? 4 : 6;
    
    // Dispatch event with appropriate speed boost value based on device
    window.dispatchEvent(new CustomEvent("starfieldSpeedBoost", { 
      detail: speedBoostValue,
      // Pass additional data for mobile optimization
      isMobile: isMobile
    }));

    // Fade out the current page
    controls.start({
      opacity: 0,
      transition: { duration: 1.2, ease: "easeInOut" },
    });

    // Navigate after transition completes
    setTimeout(() => {
      navigate(to);
    }, 1200);
  };

  return (
    <motion.div className="star-warp-container" title={t('certifications.viewAll')}>
      <motion.button
        className={`star-button ${launched ? "star-off" : ""}`}
        onClick={handleClick}
        disabled={launched}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('certifications.viewAll')}
      >
        <div className="star-shape" />
        <span className="star-button-text">
          {launched ? t('certifications.launching') : t('certifications.viewAll')}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default FadeWarpButton;
