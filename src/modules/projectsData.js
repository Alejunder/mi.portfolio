/**
 * Projects Data Module
 * Contiene la configuración y datos de los proyectos del portfolio
 */

export const projectsData = [
  {
    key: "project1",
    // link: "", // No disponible aún
    accent: "#0ff",
  },
  {
    key: "project2",
    link: "https://copilot4yt.vercel.app/",
    accent: "#9a031e",
  },
  {
    key: "project3",
    link: "https://mood-beats-hub.vercel.app/",
    accent: "#0b5f97",
  },
];

/**
 * Valida que un proyecto tenga todos los campos requeridos
 */
export const validateProject = (project) => {
  return project.key && project.accent;
};

/**
 * Obtiene los proyectos válidos
 */
export const getValidProjects = () => {
  return projectsData.filter(validateProject);
};
