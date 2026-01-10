import { motion } from "framer-motion";
import { useFadeOut } from "../context/FadeOutContext";
import NavBar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Technologies from "../sections/Technologies";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import Certifications from "../sections/Certifications";
import Footer from "../sections/Footer";

const HomePage = () => {
  const { controls } = useFadeOut();

  return (
    <motion.main
      initial={{ opacity: 1 }}
      animate={controls}
    >
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Technologies />
      <Certifications />
      <Footer />
    </motion.main>
  );
};

export default HomePage;
