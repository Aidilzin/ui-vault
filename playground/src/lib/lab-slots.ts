export type SlotId =
  | "nav"
  | "hero-bg"
  | "hero-title"
  | "hero-cta"
  | "metrics"
  | "feature-cards"
  | "scroll-fx"
  | "marquee-band"
  | "interactive-stage"
  | "overlay";

export const SLOT_SHORT_LABEL: Record<SlotId, string> = {
  nav: "→ NAV",
  "hero-bg": "→ HERO BG",
  "hero-title": "→ HERO H1",
  "hero-cta": "→ HERO CTA",
  metrics: "→ METRICS",
  "feature-cards": "→ CARDS",
  "scroll-fx": "→ SCROLL",
  "marquee-band": "→ MARQUEE",
  "interactive-stage": "→ WORKSPACE",
  overlay: "→ OVERLAY",
};

export const SLOT_INSPECTOR_NAME: Record<SlotId, string> = {
  nav: "NAVBAR",
  "hero-bg": "HERO_BG",
  "hero-title": "HERO_TITLE",
  "hero-cta": "HERO_CTA",
  metrics: "METRICS",
  "feature-cards": "FEATURE_CARDS",
  "scroll-fx": "SCROLL_FX",
  "marquee-band": "MARQUEE_BAND",
  "interactive-stage": "WORKSPACE",
  overlay: "OVERLAY",
};

/**
 * Deterministic 100% mapping of all 69 vault animation IDs to their semantic
 * website slot on the dummy site preview.
 */
export const ANIMATION_SLOT_MAP: Record<string, SlotId> = {
  // nav (4)
  "spotlight-tabs": "nav",
  "gooey-pill-nav": "nav",
  "dock-magnify": "nav",
  "kinetic-status-pill": "nav",

  // hero-bg (11)
  "bayer-dither": "hero-bg",
  "aurora-mesh-bg": "hero-bg",
  "orbital-canvas": "hero-bg",
  "meteor-shower": "hero-bg",
  "svg-ripple-pulse": "hero-bg",
  "lamp-horizon-glow": "hero-bg",
  "eclipse-orb": "hero-bg",
  "ascii-filter": "hero-bg",
  "crt-grain-overlay": "hero-bg",
  "pixel-hover-grid": "hero-bg",
  "magnet-lines": "hero-bg",

  // hero-title (7)
  "scramble-text": "hero-title",
  "split-reveal": "hero-title",
  "variable-proximity": "hero-title",
  "shiny-text": "hero-title",
  "blur-text": "hero-title",
  "text-roll": "hero-title",
  "split-flap-clock": "hero-title",

  // hero-cta (6)
  "magnetic-button": "hero-cta",
  "tactile-push-button": "hero-cta",
  "magnetic-copy-spell": "hero-cta",
  "hold-to-confirm": "hero-cta",
  "tactile-press-badge": "hero-cta",
  "click-spark": "hero-cta",

  // metrics (3)
  "count-up": "metrics",
  "odometer-ticker": "metrics",
  "spring-number-flow": "metrics",

  // feature-cards (14)
  "border-spotlight": "feature-cards",
  "border-beam": "feature-cards",
  "star-border": "feature-cards",
  "spring-tilt-card": "feature-cards",
  "holographic-foil-card": "feature-cards",
  "liquid-glass-filter": "feature-cards",
  "glare-hover": "feature-cards",
  "sibling-dim": "feature-cards",
  "flip-card": "feature-cards",
  "blur-fade": "feature-cards",
  "pixel-card": "feature-cards",
  "crosshair-reticle": "feature-cards",
  "svg-turbulence-hover": "feature-cards",
  "make-way-grid": "feature-cards",

  // scroll-fx (6)
  "scroll-progress-bar": "scroll-fx",
  "velocity-skew": "scroll-fx",
  "tracing-scroll-beam": "scroll-fx",
  "scroll-sticky-scale": "scroll-fx",
  "progressive-blur-edge": "scroll-fx",
  "elastic-column-scroll": "scroll-fx",

  // marquee-band (2)
  "infinite-marquee": "marquee-band",
  "marquee-hover-row": "marquee-band",

  // interactive-stage (14)
  "streaming-token-text": "interactive-stage",
  "reasoning-trace": "interactive-stage",
  "tool-call-step": "interactive-stage",
  "agent-approval-card": "interactive-stage",
  "inline-code-diff": "interactive-stage",
  "slash-prompt-composer": "interactive-stage",
  "chain-of-thought-rail": "interactive-stage",
  "animated-connector-beam": "interactive-stage",
  "stacked-card-deck": "interactive-stage",
  "accordion-gallery": "interactive-stage",
  "perspective-book": "interactive-stage",
  "rotary-type-dial": "interactive-stage",
  "elastic-slider": "interactive-stage",
  "kinetic-card-trail": "interactive-stage",

  // overlay (2)
  "velocity-dismiss-drawer": "overlay",
  "stacked-toast-deck": "overlay",
};

export function getAnimationSlot(animationId: string): SlotId {
  return ANIMATION_SLOT_MAP[animationId] ?? "interactive-stage";
}

export function getSlotBadgeLabel(animationId: string): string {
  return SLOT_SHORT_LABEL[getAnimationSlot(animationId)];
}

export interface ResolvedLabSlots {
  nav: string[];
  heroBgPrimary: string | null;
  heroBgSecondary: string | null;
  heroTitlePrimary: string | null;
  heroTitleSecondary: string | null;
  heroCta: string[];
  metrics: string[];
  featureCards: string[];
  scrollFx: string[];
  marqueeBand: string[];
  interactiveStage: string[];
  overlay: string[];
}

export function resolveLabSlots(animationIds: string[]): ResolvedLabSlots {
  const result: ResolvedLabSlots = {
    nav: [],
    heroBgPrimary: null,
    heroBgSecondary: null,
    heroTitlePrimary: null,
    heroTitleSecondary: null,
    heroCta: [],
    metrics: [],
    featureCards: [],
    scrollFx: [],
    marqueeBand: [],
    interactiveStage: [],
    overlay: [],
  };

  for (const id of animationIds) {
    const slot = getAnimationSlot(id);
    switch (slot) {
      case "nav":
        result.nav.push(id);
        break;
      case "hero-bg":
        if (!result.heroBgPrimary) {
          result.heroBgPrimary = id;
        } else if (!result.heroBgSecondary) {
          result.heroBgSecondary = id;
        } else {
          result.interactiveStage.push(id);
        }
        break;
      case "hero-title":
        if (id === "split-flap-clock") {
          if (!result.heroTitleSecondary) {
            result.heroTitleSecondary = id;
          } else {
            result.interactiveStage.push(id);
          }
        } else if (!result.heroTitlePrimary) {
          result.heroTitlePrimary = id;
        } else if (!result.heroTitleSecondary) {
          result.heroTitleSecondary = id;
        } else {
          result.interactiveStage.push(id);
        }
        break;
      case "hero-cta":
        result.heroCta.push(id);
        break;
      case "metrics":
        result.metrics.push(id);
        break;
      case "feature-cards":
        result.featureCards.push(id);
        break;
      case "scroll-fx":
        result.scrollFx.push(id);
        break;
      case "marquee-band":
        result.marqueeBand.push(id);
        break;
      case "overlay":
        result.overlay.push(id);
        break;
      case "interactive-stage":
      default:
        result.interactiveStage.push(id);
        break;
    }
  }

  return result;
}
