import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import createStarfieldEngine from '../modules/starfieldEngine';

const Starfield = forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  useImperativeHandle(ref, () => ({
    triggerHyperspace: () => {
      engineRef.current?.triggerHyperspace();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = createStarfieldEngine(canvas);
    engineRef.current = engine;

    return () => {
      engine.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
});

export default Starfield;
