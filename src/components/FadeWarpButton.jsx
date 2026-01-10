import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext";
import { handleLaunch } from "../modules/fadeWarpLogic";
import launchSound from "../assets/launch.mp3";
import "./styles/fadeWarpButton.css";

const FadeWarpButton = ({ to = "/", textKey = "certifications.viewAll", launchingKey = "certifications.launching" }) => {
  const { t } = useTranslation();
  const { controls } = useFadeOut();
  const navigate = useNavigate();
  const [launched, setLaunched] = useState(false);

  const handleClick = () => {
    handleLaunch({
      launched,
      setLaunched,
      audioSrc: launchSound,
      controls,
      destination: to,
      navigate,
    });
  };

  return (
    <motion.div className="star-warp-container" title={t(textKey)}>
      <motion.button
        className={`star-button ${launched ? "star-off" : ""}`}
        onClick={handleClick}
        disabled={launched}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t(textKey)}
      >
        <div className="star-shape" />
        <span className="star-button-text">
          {launched ? t(launchingKey) : t(textKey)}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default FadeWarpButton;
