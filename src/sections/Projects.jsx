import { useTranslation } from 'react-i18next';
import ProjectCarousel from "../components/ProjectCarousel";
import { projectsData } from "../modules/projectsData";
import "./styles/Projects.css";
import "../components/styles/projectCarousel.css";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section 
      id='Projects' 
      className="projects-section"
    >
      <h2 className="projects-title">
        {t('projects.title')}
      </h2>

      <ProjectCarousel projects={projectsData} />
    </section>
  );
}
