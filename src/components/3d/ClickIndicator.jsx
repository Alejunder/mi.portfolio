/**
 * ClickIndicator - Indicador visual de progreso de clicks
 * Presentación: muestra 1/2 clicks para guiar al usuario
 */

export default function ClickIndicator({ clickCount, isActive }) {
  if (clickCount === 0) return null;

  return (
    <div className="click-indicator">
      <div className="click-dots">
        <span className={`dot ${clickCount >= 1 ? 'active' : ''}`} />
        <span className={`dot ${clickCount >= 2 ? 'active' : ''}`} />
      </div>
      <span className="click-text">
        {clickCount === 1 ? '1 más para entrar' : 'Entrando...'}
      </span>
    </div>
  );
}
