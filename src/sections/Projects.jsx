import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCarousel from "../components/ProjectCarousel";
import { getProjects } from "../services/api";
import "./styles/Projects.css";
import "../components/styles/projectCarousel.css";

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects({ featured: true });
        
        if (response.success && response.data) {
          setProjects(response.data);
        } else {
          setError(response.error || 'Failed to load projects');
        }
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section 
      id='Projects' 
      className="projects-section"
    >
      <h2 className="projects-title">
        {t('projects.title')}
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
          Loading projects...
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ff6b6b' }}>
          {error}
        </div>
      ) : projects.length > 0 ? (
        <ProjectCarousel projects={projects} />
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#fff' }}>
          No projects available
        </div>
      )}
    </section>
  );
}
