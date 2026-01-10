/**
 * Portal Store - Singleton con Observer Pattern
 * Gestiona estados: idle → active → immersive
 */

const PORTAL_STATES = {
  IDLE: 'idle',
  ACTIVE: 'active',
  EXPANDING: 'expanding',
  IMMERSIVE: 'immersive',
  EXITING: 'exiting'
};

class PortalStore {
  constructor() {
    if (PortalStore.instance) {
      return PortalStore.instance;
    }

    this.state = PORTAL_STATES.IDLE;
    this.observers = new Set();
    
    PortalStore.instance = this;
  }

  // Observer pattern
  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  notify() {
    this.observers.forEach(callback => callback(this.state));
  }

  // State management
  getState() {
    return this.state;
  }

  setState(newState) {
    if (Object.values(PORTAL_STATES).includes(newState)) {
      this.state = newState;
      this.notify();
    }
  }

  // Transitions
  activate() {
    this.setState(PORTAL_STATES.ACTIVE);
  }

  enterExpanding() {
    this.setState(PORTAL_STATES.EXPANDING);
  }

  enterImmersive() {
    this.setState(PORTAL_STATES.IMMERSIVE);
  }

  enterExiting() {
    this.setState(PORTAL_STATES.EXITING);
  }

  reset() {
    this.setState(PORTAL_STATES.IDLE);
  }

  // Queries
  isIdle() {
    return this.state === PORTAL_STATES.IDLE;
  }

  isActive() {
    return this.state === PORTAL_STATES.ACTIVE;
  }

  isExpanding() {
    return this.state === PORTAL_STATES.EXPANDING;
  }

  isImmersive() {
    return this.state === PORTAL_STATES.IMMERSIVE;
  }

  isExiting() {
    return this.state === PORTAL_STATES.EXITING;
  }
}

// Export singleton instance
export const portalStore = new PortalStore();
export { PORTAL_STATES };
