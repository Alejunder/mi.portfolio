import React, { lazy, Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "../styles/Skills.css";

const CircularSkill = lazy(() => import("../components/CircularSkill"));

const skills = [
  { title: "HTML, CSS", percent: 85, color: "#00f0ff" },
  { title: "React, Vite", percent: 70, color: "#8f00ff" },
  { title: "Git, GitHub", percent: 60, color: "#ff6a00" },
  { title: "ChatGPT", percent: 50, color: "#00ff95" },
  { title: "Tailwind CSS", percent: 30, color: "#ff0055" },
];

function Skills() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Resto del código sin cambios...
  const handleMouseMove = (e, index) => { /* ... */ };
  const handleMouseLeave = (e) => { /* ... */ };

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <h2 className="skills-heading">{t('skills.title')}</h2>

      {isInView && (
        <div className="circle-skills-wrapper">
          <Suspense fallback={<div>{t('skills.loading')}</div>}>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                }}
              >
                <CircularSkill {...skill} />
              </div>
            ))}
          </Suspense>
        </div>
      )}
    </section>
  );
}

export default Skills;