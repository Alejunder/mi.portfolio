import { useTranslation } from 'react-i18next';
import NebulaPortal from '../components/3d/NebulaPortal';
import './styles/Tecnologies.css';

export default function Technologies() {
  const { t } = useTranslation();

  return (
    <section id="Technologies" className="technologies-section">
      <div className="technologies-container">
        <h2 className="technologies-title">{t('technologies.title')}</h2>
        <div className="nebula-wrapper">
          <NebulaPortal />
        </div>
      </div>
    </section>
  );
}
