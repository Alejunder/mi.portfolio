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
    link: "https://product-store-template.vercel.app/",
    accent: "#0eb508",
  },
  {
    key: "project3",
    link: "https://mood-beats-hub.vercel.app/",
    accent: "#9a031e",
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
