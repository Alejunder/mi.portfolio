// src/components/SectionFadeIn.jsx
import { motion } from "framer-motion";

function SectionFadeIn({ children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="section-container"
    >
      <div className="backdrop-blur"></div>
      {children}
    </motion.section>
  );
}

export default SectionFadeIn;
