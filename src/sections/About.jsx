import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TiltCard from '../components/TiltCard';
import { getAbout } from '../services/api';
import './styles/About.css';

export default function About() {
  const { t, i18n } = useTranslation();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        const response = await getAbout();
        
        if (response.success && response.data) {
          setAboutData(response.data);
        } else {
          setError(response.error || 'Failed to load about data');
        }
      } catch (err) {
        setError('Failed to load about data');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const currentLanguage = i18n.language || 'en';

  return (
    <section id="About" className="about-section">
      <TiltCard className="about-tilt-wrapper">
        <motion.div
          className="about-card"
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {loading ? (
            <>
              <h2 className="about-title">{t('about.title')}</h2>
              <p className="about-text">Loading...</p>
            </>
          ) : error ? (
            <>
              <h2 className="about-title">{t('about.title')}</h2>
              <p className="about-text">{t('about.description')}</p>
            </>
          ) : aboutData ? (
            <>
              <h2 className="about-title">
                {aboutData.title?.[currentLanguage] || aboutData.title?.en || t('about.title')}
              </h2>
              <p className="about-text" style={{ whiteSpace: 'pre-line' }}>
                {aboutData.description?.[currentLanguage] || aboutData.description?.en || t('about.description')}
              </p>
            </>
          ) : (
            <>
              <h2 className="about-title">{t('about.title')}</h2>
              <p className="about-text">{t('about.description')}</p>
            </>
          )}
        </motion.div>
      </TiltCard>
    </section>
  );
}