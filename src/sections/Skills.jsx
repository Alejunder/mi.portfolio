import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext";
import "../styles/Skills.css";
import CircularSkill from "../components/CircularSkill";

const getSkills = (t) => {
  // Frontend and general skills
  const frontendSkills = [
    { title: "HTML, CSS", percent: 85, color: "#00f0ff" },
    { title: "React, Vite", percent: 70, color: "#8f00ff" },
    { title: "Git, GitHub", percent: 60, color: "#ff6a00" },
    { title: t('skills.iaTools'), percent: 50, color: "#00ff95" },
    { title: "Tailwind CSS", percent: 30, color: "#ff0055" },
  ];

  // Backend and certification skills with different color palette
  const backendSkills = [
    { title: "PostgreSQL", percent: 75, color: "#1ea6d6" },
    { title: "JavaScript", percent: 70, color: "#ff9c2b" },
    { title: "Node.JS", percent: 65, color: "#68a063" },
    { title: "API REST", percent: 65, color: "#e5473c" },
    { title: "Prompt Engineering", percent: 80, color: "#34c4ef" },
  ];

  return [...frontendSkills, ...backendSkills];
};

function Skills() {
  const { t } = useTranslation();
  const { controls } = useFadeOut();
  const ref = useRef(null);
  const skills = getSkills(t);

  // Event handlers for card tilt effect
  const handleMouseMove = (e) => {
    // Card tilt effect implementation
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    card.style.zIndex = "1";
  };
  
  const handleMouseLeave = (e) => {
    // Reset card rotation
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    e.currentTarget.style.zIndex = "0";
  };

  return (
    <motion.section 
      id="skills" 
      className="skills-section" 
      ref={ref}
      initial={{ opacity: 1 }}
      animate={controls}
    >
      <h2 className="skills-heading">{t('skills.title')}</h2>

      <div className="skills-container">
        <div className="skills-category">
          <h3 className="category-heading">{t('skills.frontend')}</h3>
          <div className="circle-skills-wrapper">
            {skills.slice(0, 5).map((skill, index) => (
              <div
                key={`frontend-${index}`}
                className="skill-card"
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <CircularSkill {...skill} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-category">
          <h3 className="category-heading">{t('skills.backend')}</h3>
          <div className="circle-skills-wrapper">
            {skills.slice(5).map((skill, index) => (
              <div
                key={`backend-${index}`}
                className="skill-card"
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                  background: "transparent",
                  outline: "none",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <CircularSkill {...skill} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Skills;