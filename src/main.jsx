import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/orbitron/index.css';
import App from './App.jsx';
import './styles/globals.css';
import './i18n';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
