/**
 * NebulaPortal - Componente principal del portal
 * Presentación: contiene la nebulosa y maneja el Canvas
 */

import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { createPortal } from 'react-dom';
import { portalStore } from '../../stores/portalStore';
import { performanceStore } from '../../stores/performanceStore';
import { createPortalLogic } from '../../modules/portalLogic';
import NebulaParticles from './NebulaParticles';
import NebulaCore from './NebulaCore';
import NebulaLayers from './NebulaLayers';
import TechScene3D from './TechScene3D';
import SceneOverlay from './SceneOverlay';
import ClickIndicator from './ClickIndicator';
import CameraController from './CameraController';
import PortalTunnel from './PortalTunnel';
import PerformanceMonitor from './PerformanceMonitor';
import { useTranslation } from 'react-i18next';

const portalLogic = createPortalLogic();

export default function NebulaPortal() {
  const [portalState, setPortalState] = useState(portalStore.getState());
  const [clickCount, setClickCount] = useState(0);
  const [perfConfig, setPerfConfig] = useState(performanceStore.getConfig());
  const { t } = useTranslation();
  useEffect(() => {
    // Inicializar detección de performance
    performanceStore.init();
    
    // Suscribirse al store de performance
    const unsubPerf = performanceStore.subscribe((state) => {
      setPerfConfig(state.config);
    });

    // Suscribirse al store del portal
    const unsubPortal = portalStore.subscribe((newState) => {
      setPortalState(newState);
    });

    return () => {
      unsubPerf();
      unsubPortal();
    };
  }, []);

  useEffect(() => {
    // Suscribirse a clicks
    const unsubscribe = portalLogic.subscribeToClicks((count) => {
      setClickCount(count);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Lock/unlock scroll según estado
    if (portalStore.isImmersive()) {
      portalLogic.lockScroll();
      // Notificar al starfield que el 3D está activo
      window.dispatchEvent(new CustomEvent('starfield3DActive', { detail: true }));
    } else {
      portalLogic.unlockScroll();
      // Notificar al starfield que el 3D está inactivo
      window.dispatchEvent(new CustomEvent('starfield3DActive', { detail: false }));
    }

    return () => {
      portalLogic.unlockScroll();
      window.dispatchEvent(new CustomEvent('starfield3DActive', { detail: false }));
    };
  }, [portalState]);

  const isImmersive = portalStore.isImmersive();
  const isExpanding = portalStore.isExpanding();
  const isExiting = portalStore.isExiting();
  const isActive = portalStore.isActive();

  const portalContent = (
    <div
      className={`nebula-portal ${isActive ? 'active' : ''} ${isExpanding ? 'expanding' : ''} ${isExiting ? 'exiting' : ''} ${isImmersive ? 'immersive' : ''}`}
      onClick={portalLogic.handleClick}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
        dpr={perfConfig.pixelRatio || 1}
        gl={{ 
          antialias: perfConfig.antialiasing !== false,
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true
        }}
        performance={{ min: 0.5 }}
      >
        <CameraController portalState={portalState} />
        <ambientLight intensity={0.15} />
        
        {/* Efecto de túnel durante transición */}
        <PortalTunnel isActive={isActive || isExpanding || isImmersive || isExiting} />
        
        {/* Nebulosa (siempre visible) */}
        <NebulaLayers isImmersive={isImmersive} />
        <NebulaParticles isImmersive={isImmersive} />
        <NebulaCore isImmersive={isImmersive} />

        {/* Escena 3D de techs (solo en inmersivo) */}
        {isImmersive && <TechScene3D />}
      </Canvas>

      {!isExpanding && !isImmersive && !isExiting && (
        <>
          <div className="portal-hint">
            {isActive ? t('nebulaPortal.confirm-click') : t('nebulaPortal.enter-click')}
          </div>
          <ClickIndicator clickCount={clickCount} isActive={isActive} />
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Renderizar directamente en body durante immersive o exiting */}
      {(isImmersive || isExiting) ? createPortal(portalContent, document.body) : portalContent}
      
      {/* Overlay para salir */}
      {isImmersive && <SceneOverlay onClose={portalLogic.handleClose} />}
      
      {/* Monitor de performance (solo con ?debug=true) */}
      <PerformanceMonitor />
    </>
  );
}
