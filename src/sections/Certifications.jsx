import { motion } from "framer-motion";
import { useFadeOut } from "../context/FadeOutContext";
import FadeWarpButton from "../components/FadeWarpButton";
import "./styles/Certifications.css";

const Certifications = () => {
  const { controls } = useFadeOut();

  return (
    <motion.section
      id="certifications"
      className="certifications-section only-button"
      initial={{ opacity: 1, scale: 1 }}
      animate={controls}
    >
      <div className="certification-button-container">
        <FadeWarpButton to="/certificaciones" />
      </div>
    </motion.section>
  );
};

export default Certifications;
