/**
 * PerformanceMonitor - Componente para monitorear FPS
 * Presentación: badge de FPS visible solo en modo desarrollo
 */

import { useState, useEffect } from 'react';
import { performanceStore } from '../../stores/performanceStore';

export default function PerformanceMonitor() {
  const [fps, setFPS] = useState(60);
  const [level, setLevel] = useState('high');
  
  // Mostrar solo si está en URL ?debug=true
  const params = new URLSearchParams(window.location.search);
  const isVisible = params.get('debug') === 'true';

  useEffect(() => {
    // Suscribirse al store
    const unsubscribe = performanceStore.subscribe((state) => {
      setFPS(state.fps);
      setLevel(state.level);
    });

    return unsubscribe;
  }, []);

  if (!isVisible) return null;

  const fpsColor = fps >= 50 ? '#00ff00' : fps >= 30 ? '#ffaa00' : '#ff0000';

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: fpsColor,
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        zIndex: 10000,
        border: `1px solid ${fpsColor}`,
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    >
      FPS: {fps} | {level.toUpperCase()}
    </div>
  );
}
