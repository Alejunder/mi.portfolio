import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TiltCard from '../components/TiltCard';
import './styles/About.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="About" className="about-section">
      <TiltCard className="about-tilt-wrapper">
        <motion.div
          className="about-card"
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="about-title">{t('about.title')}</h2>
          <p className="about-text" style={{ whiteSpace: 'pre-line' }}>
            {t('about.description')}
          </p>
        </motion.div>
      </TiltCard>
    </section>
  );
}