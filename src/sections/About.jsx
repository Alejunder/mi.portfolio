import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next'; // Añadido
import TiltCard from "../components/TiltCard";
import "./about.css";

export default function About() {
  const { t } = useTranslation(); // Añadido

  return (
    <section id="about" className="about-section">
      <TiltCard className="about-tilt-wrapper">
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="about-title">{t('about.title')}</h2>
          <p className="about-text">
            {t('about.description')}
          </p>
        </motion.div>
      </TiltCard>
    </section>
  );
}