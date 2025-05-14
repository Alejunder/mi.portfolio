// src/components/SectionFadeIn.jsx
import { motion } from "framer-motion";

function SectionFadeIn({ children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 60, scale: 0.95, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="section-container"
    >
      <div className="backdrop-blur"></div>
      {children}
    </motion.section>
  );
}

export default SectionFadeIn;
