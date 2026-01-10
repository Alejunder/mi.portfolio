import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/Navbar.css';
import LanguageSwitcher from './LanguageSwitcher';
import { createNavbarLogic } from '../modules/navbarLogic';

const navbarLogic = createNavbarLogic();

function Navbar() {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (navbarLogic.shouldHideNavbar(currentScrollY, lastScrollY)) {
      setShow(false);
      setIsMenuOpen(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  const handleSectionDetection = useCallback(() => {
    const pathname = window.location.pathname;
    const current = navbarLogic.detectActiveSection(pathname);
    setActiveSection(current);
  }, []);

  useEffect(() => {
    // Detectar sección inicial después del montaje
    const detectInitial = () => {
      const pathname = window.location.pathname;
      const current = navbarLogic.detectActiveSection(pathname);
      setActiveSection(current);
    };
    
    detectInitial();
    
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
          <ul className={`nav-links ${isMenuOpen ? 'mobile-active' : ''}`}>
            {navbarLogic.sections.map(({ id, navKey }) => (
              <li key={navKey}>
                <a
                  href={`#${id}`}
                  className={activeSection === navKey ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    navbarLogic.scrollToSection(id, window.location.pathname);
                  }}
                >
                  {t(`nav.${navKey}`)}
                </a>
              </li>
            ))}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </nav>

      {!show && (
        <button 
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default Navbar;