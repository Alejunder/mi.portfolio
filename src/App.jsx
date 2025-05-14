import './styles/globals.css';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SectionFadeIn from './components/SectionFadeIn.jsx';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Contact from './sections/Contact.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
        <SectionFadeIn id="About"><About /></SectionFadeIn>
        <SectionFadeIn id="Skills"><Skills /></SectionFadeIn>
        <SectionFadeIn id="Projects"><Projects /></SectionFadeIn>
        <SectionFadeIn id="Contact"><Contact /></SectionFadeIn>
      </main>
      <Footer />
    </>
  );
}

export default App;
