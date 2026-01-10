import React from "react";
import { motion } from "framer-motion";
import { useFadeOut } from "../context/FadeOutContext";
import "../sections/styles/Footer.css";

const Footer = () => {
  const { controls } = useFadeOut();
  
  return (
    <motion.footer 
      id="footer" 
      className="footer"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      <div className="footer-background" />
      <span className="footer-text">
        &copy; {new Date().getFullYear()} AleCam | Fullstack
      </span>
    </motion.footer>
  );
};

export default Footer;
