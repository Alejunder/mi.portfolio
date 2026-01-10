import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Starfield from './components/Starfield';
import HomePage from './pages/HomePage';
import CertificacionesPage from './pages/CertificacionesPage';
import { FadeOutProvider } from './context/FadeOutContext';
import { initializeI18n } from './modules/i18nConfig';
import './globals.css';

// Inicializar i18n
initializeI18n();

function App() {
  return (
    <FadeOutProvider>
      <Starfield />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/certificaciones" element={<CertificacionesPage />} />
      </Routes>
    </FadeOutProvider>
  );
}

export default App;
