import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import "../styles/projects.css";

const projects = [
  {
    key: "project1",
    // link: "", // 
    accent: "#0ff",
  },
  {
    key: "project2",
    link: "#",
    accent: "#f0f",
  },
  {
    key: "project3",
    link: "https://alejunder.github.io/BreakingBadproject/",
    accent: "#ff0",
  },
];

function Hover3DCard({ project, delay }) {
  const { t } = useTranslation();
  const cardRef = useRef(null);
  const [btnText, setBtnText] = useState(t('projects.button'));

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / 20).toFixed(2);
    const rotateY = (x / 20).toFixed(2);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTransform = () => {
    const card = cardRef.current;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    setBtnText(t('projects.button'));
  };

  const handleBtnHover = () => {
    setBtnText(t('projects.buttonHover'));
  };

  const isHiddenButton = project.key === "project1";

  return (
    <motion.div
      className="project-card-alt"
      ref={cardRef}
      style={{ borderLeft: `4px solid ${project.accent}` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="project-content">
        <h3 style={{ color: project.accent }}>{t(`projects.${project.key}.title`)}</h3>
        <p>{t(`projects.${project.key}.description`)}</p>
        <motion.a
          href={project.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="project-btn-futuristic"
          onMouseEnter={handleBtnHover}
          onMouseLeave={() => setBtnText(t('projects.button'))}
          initial={{ opacity: isHiddenButton ? 0 : 1 }}
          animate={{ opacity: isHiddenButton ? 0 : 1 }}
          style={{
            pointerEvents: isHiddenButton ? 'none' : 'auto',
            cursor: isHiddenButton ? 'default' : 'pointer',
          }}
        >
          <span>{btnText}</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id='projects' className="projects-section">
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {t('projects.title')}
      </motion.h2>

      <div className="projects-container">
        {projects.map((proj, i) => (
          <Hover3DCard key={i} project={proj} delay={i * 0.2} />
        ))}
      </div>
    </section>
  );
}
