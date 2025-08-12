import { useTranslation } from 'react-i18next';
import ProjectCarousel from "../components/ProjectCarousel";
import "../styles/projects.css";
import "../styles/projectCarousel.css";

const projects = [
  {
    key: "project1",
    // link: "", // 
    accent: "#0ff",
  },
  {
    key: "project2",
    //link: "", //
    accent: "#f0f",
  },
  {
    key: "project3",
    link: "https://alejunder.github.io/BreakingBadproject/",
    accent: "#ff0",
  },
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section 
      id='projects' 
      className="projects-section"
    >
      <h2 className="projects-title">
        {t('projects.title')}
      </h2>

      <ProjectCarousel projects={projects} />
    </section>
  );
}
