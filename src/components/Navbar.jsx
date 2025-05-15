import { useEffect, useState, useCallback } from 'react';
import '../styles/Navbar.css';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mapeo constante de secciones (NO usar traducciones aquí)
  const sections = [
    { id: 'Hero', navKey: 'home' },
    { id: 'About', navKey: 'about' },
    { id: 'Skills', navKey: 'skills' },
    { id: 'Projects', navKey: 'projects' },
    { id: 'Contact', navKey: 'contact' }
  ];

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
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    let current = 'home';
    
    sections.forEach(({ id, navKey }) => {
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
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionDetection);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionDetection);
    };
  }, [handleScroll, handleSectionDetection]);

  return (
    <>
      <nav className={`navbar ${show ? 'show' : 'hide'}`}>
        <div className="navbar-container">
          <h1 className="logo">MySpace</h1>

          <LanguageSwitcher />

          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
            {sections.map(({ id, navKey }) => (
              <li key={navKey}>
                <a
                  href={`#${id}`}  // Usar el ID real del componente
                  className={activeSection === navKey ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navKey === 'home' ?  t(`nav.${navKey}`) : t(`nav.${navKey}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {!show && (
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t('backToTop')}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default Navbar;