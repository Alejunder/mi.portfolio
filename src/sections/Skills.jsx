import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { useFadeOut } from "../context/FadeOutContext";
import "../styles/Skills.css";
import "../styles/simpleSkill.css";
import SimpleSkill from "../components/SimpleSkill";
import { Icon } from '@iconify/react';

const getSkills = (t) => {
  // Frontend and general skills
  const frontendSkills = [
    { title: "HTML, CSS", icon: "vscode-icons:file-type-html", color: "#00f0ff" },
    { title: "React, Vite", icon: "vscode-icons:file-type-reactjs", color: "#8f00ff" },
    { title: "Git, GitHub", icon: "mdi:git", color: "#ff6a00" },
    { title: t('skills.iaTools'), icon: "hugeicons:artificial-intelligence-04", color: "#00ff95" },
    { title: "Tailwind CSS", icon: "vscode-icons:file-type-tailwind", color: "#ff0055" },
  ];

  // Backend and certification skills with different color palette
  const backendSkills = [
    { title: "PostgreSQL", icon: "vscode-icons:file-type-pgsql", color: "#1ea6d6" },
    { title: "JavaScript", icon: "vscode-icons:file-type-js", color: "#ff9c2b" },
    { title: "Node.JS", icon: "vscode-icons:file-type-node", color: "#68a063" },
    { title: "API REST", icon: "mdi:api", color: "#e5473c" },
    { title: "Prompt Engineering", icon: "ph:robot-bold", color: "#34c4ef" },
  ];

  return [...frontendSkills, ...backendSkills];
};

function Skills() {
  const { t } = useTranslation();
  const { controls } = useFadeOut();
  const ref = useRef(null);
  const skills = getSkills(t);

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
          <div className="skills-wrapper">
            {skills.slice(0, 5).map((skill, index) => (
              <div
                key={`frontend-${index}`}
                className="skill-card"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <SimpleSkill {...skill} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-category">
          <h3 className="category-heading">{t('skills.backend')}</h3>
          <div className="skills-wrapper">
            {skills.slice(5).map((skill, index) => (
              <div
                key={`backend-${index}`}
                className="skill-card"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <SimpleSkill {...skill} />
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