const originalMatchMedia =
  typeof window !== "undefined" ? window.matchMedia.bind(window) : null;

let simulatedReducedMotion = false;
let initialized = false;

export function getSystemReducedMotion(): boolean {
  if (!originalMatchMedia) return false;
  return originalMatchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function initReducedMotionSimulator(): void {
  if (initialized || typeof window === "undefined" || !originalMatchMedia) {
    return;
  }
  initialized = true;

  window.matchMedia = (query: string): MediaQueryList => {
    const real = originalMatchMedia(query);
    if (query.replace(/\s+/g, " ").trim() === "(prefers-reduced-motion: reduce)") {
      if (simulatedReducedMotion) {
        return {
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        } as MediaQueryList;
      }
    }
    return real;
  };
}

export function setSimulatedReducedMotion(enabled: boolean): void {
  initReducedMotionSimulator();
  simulatedReducedMotion = enabled;
  if (typeof document !== "undefined") {
    if (enabled) {
      document.documentElement.setAttribute("data-reduced-motion", "true");
    } else {
      document.documentElement.removeAttribute("data-reduced-motion");
    }
  }
}
