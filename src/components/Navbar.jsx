import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Navbar.css';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useFadeOut } from '../context/FadeOutContext';


function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { controls } = useFadeOut();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeo constante de secciones (NO usar traducciones aquí)
  // Use useMemo to prevent recreating this array on each render
  const sections = useCallback(() => [
    { id: 'hero', navKey: 'home' },
    { id: 'About', navKey: 'about' },
    { id: 'Skills', navKey: 'skills' },
    { id: 'Projects', navKey: 'projects' },
    { id: 'Contact', navKey: 'contact' },
    { id: 'certifications', navKey: 'certifications' }
  ], []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShow(false);
      setIsMenuOpen(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const handleSectionDetection = useCallback(() => {
    // If we're on the certifications page, set the active section accordingly
    if (location.pathname === '/certificaciones') {
      setActiveSection('certifications');
      return;
    }
    
    // Otherwise, detect the section based on scrolling (only on home page)
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    let current = 'home';
    
    // Use the sections function to get the sections array
    const sectionsList = sections();
    
    sectionsList.forEach(({ id, navKey }) => {
      const element = document.getElementById(id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        const sectionBottom = offsetTop + offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition <= sectionBottom) {
          current = navKey;
        }
      }
    });

    setActiveSection(current);
  }, [location.pathname, sections]);

  useEffect(() => {
    // Initial section detection when component mounts or route changes
    handleSectionDetection();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionDetection);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionDetection);
    };
  }, [handleScroll, handleSectionDetection, location.pathname]);

  return (
    <>
      <motion.nav 
        className={`navbar ${show ? 'show' : 'hide'}`}
        initial={{ opacity: 1 }}
        animate={controls}
      >
        <div className="navbar-container">
         <div className="logo-container">
           <img src="/alecam-logo.svg" alt="logo alecam" className="navbar-logo" />
         </div>  
  
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''} ${i18next.language === 'es' ? 'is-es' : ''}`}>
            {sections().map(({ id, navKey }) => (
              <li key={navKey}>
                <a
                  href={`#${id}`}
                  className={activeSection === navKey ? 'active' : ''}
                  onClick={e => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    
                    // Special handling for certifications section when on a different page
                    if (navKey === 'certifications' && location.pathname !== '/') {
                      // Navigate back to home and then to certifications section
                      window.location.href = '/#certifications';
                      return;
                    }
                    
                    const section = document.getElementById(id);
                    if (section) {
                      const rect = section.getBoundingClientRect();
                      const sectionHeight = rect.height;
                      const viewportHeight = window.innerHeight;
                      
                      // Special handling for Certifications section to ensure it scrolls to the end
                      let scrollY;
                      if (id === 'certifications') {
                        // Scroll to the bottom of the section
                        scrollY = window.scrollY + rect.top;
                        // Add a small timeout to ensure the page has fully rendered
                        setTimeout(() => {
                          window.scrollTo({
                            top: scrollY,
                            behavior: 'smooth',
                          });
                        }, 100);
                      } else {
                        // Normal centering for other sections
                        scrollY = window.scrollY + rect.top - (viewportHeight / 2) + (sectionHeight / 2);
                        window.scrollTo({
                          top: scrollY,
                          behavior: 'smooth',
                        });
                      }
                    }
                  }}
                >
                  {navKey === 'home' ?  t(`nav.${navKey}`) : t(`nav.${navKey}`)}
                </a>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </motion.nav>

      {!show && (
        <motion.button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('backToTop')}
          initial={{ opacity: 1 }}
          animate={controls}
        >
          ↑
        </motion.button>
      )}
    </>
  );
}

export default Navbar;