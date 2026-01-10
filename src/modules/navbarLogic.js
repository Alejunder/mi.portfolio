// Module pattern: lógica de navegación
export const createNavbarLogic = () => {
  const sections = [
    { id: 'hero', navKey: 'home' },
    { id: 'About', navKey: 'about' },
    { id: 'Projects', navKey: 'projects' },
    { id: 'Contact', navKey: 'contact' },
    { id: 'Technologies', navKey: 'technologies' },
    { id: 'certifications', navKey: 'certifications' }
  ];

  const detectActiveSection = (pathname) => {
    if (pathname === '/certificaciones') {
      return 'certifications';
    }
    
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

    return current;
  };

  const scrollToSection = (id, pathname) => {
    if (id === 'certifications' && pathname !== '/') {
      window.location.href = '/#certifications';
      return;
    }
    
    const section = document.getElementById(id);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewportHeight = window.innerHeight;
    
    let scrollY;
    if (id === 'certifications') {
      scrollY = window.scrollY + rect.top;
      setTimeout(() => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }, 100);
    } else {
      scrollY = window.scrollY + rect.top - (viewportHeight / 2) + (sectionHeight / 2);
      window.scrollTo({ top: scrollY, behavior: 'smooth' });
    }
  };

  const shouldHideNavbar = (currentScrollY, lastScrollY) => {
    return currentScrollY > lastScrollY && currentScrollY > 100;
  };

  return {
    sections,
    detectActiveSection,
    scrollToSection,
    shouldHideNavbar,
  };
};
