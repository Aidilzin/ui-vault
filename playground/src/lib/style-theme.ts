import type { CSSProperties } from "react";
import { nodeById, styleTokensById, type StyleNode } from "./vault-data";

export type SurfaceProfile =
  | "precision"
  | "swiss"
  | "retro-os"
  | "retro-pixel"
  | "brutalist"
  | "acid"
  | "spatial-glass"
  | "modern-bento"
  | "editorial-warm";

export interface ResolvedStyleTheme {
  styleId: string;
  profile: SurfaceProfile;
  rawVars: Record<string, string>;
  canvas: string;
  surface: string;
  elevated: string;
  border: string;
  borderStrong: string;
  borderWidth: string;
  ink: string;
  inkMuted: string;
  surfaceInk: string;
  surfaceMuted: string;
  accent: string;
  accentAlt: string;
  accentInk: string;
  radius: string;
  shadow: string;
  blur: string | null;
  chrome: string | null;
  isLight: boolean;
  paletteDots: [string, string, string];
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  canvasPattern?: string;
  canvasPatternSize?: string;
  heroScrim: string;
  pairInk: string;
  pairBg: string;
  pairBorder: string;
  clashInk: string;
  clashBg: string;
  clashBorder: string;
  untestedInk: string;
  untestedBg: string;
  untestedBorder: string;
}

export function parseCssCustomProps(raw: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const regex = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    vars[match[1].toLowerCase()] = match[2].trim();
  }
  return vars;
}

function pickToken(
  vars: Record<string, string>,
  patterns: string[],
  fallback: string
): string {
  for (const pat of patterns) {
    for (const [key, val] of Object.entries(vars)) {
      if (key.includes(pat) && val) return val;
    }
  }
  return fallback;
}

export function getRelativeLuminance(color: string): number | null {
  const trimmed = color.trim();
  const hex = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  const rgb = trimmed.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i
  );
  if (rgb) {
    const alpha = rgb[4] !== undefined ? parseFloat(rgb[4]) : 1;
    if (alpha < 0.35) return null;
    const r = Math.min(255, parseInt(rgb[1], 10)) / 255;
    const g = Math.min(255, parseInt(rgb[2], 10)) / 255;
    const b = Math.min(255, parseInt(rgb[3], 10)) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  return null;
}

export function getContrastInk(bg: string, fallback = "#ffffff"): string {
  const lum = getRelativeLuminance(bg);
  if (lum === null) return fallback;
  return lum > 0.48 ? "#111318" : "#ffffff";
}

export function getMutedInk(bg: string, fallback = "#8b94a3"): string {
  const lum = getRelativeLuminance(bg);
  if (lum === null) return fallback;
  return lum > 0.48 ? "#4b5563" : "rgba(255, 255, 255, 0.72)";
}

function hexToRgba(color: string, alpha: number, fallback: string): string {
  const trimmed = color.trim();
  const hex = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!hex) return fallback;
  let h = hex[1];
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function resolveSurfaceProfile(styleId: string): SurfaceProfile {
  if (
    styleId === "neo-swiss" ||
    styleId === "wordmark-press" ||
    styleId === "swiss-type-foundry"
  ) {
    return "swiss";
  }
  if (styleId === "os-core" || styleId === "retro-web-96") {
    return "retro-os";
  }
  if (
    styleId === "ditherpunk" ||
    styleId === "eight-bit-arcade" ||
    styleId === "phosphor-terminal"
  ) {
    return "retro-pixel";
  }
  if (styleId === "neo-brutalism" || styleId === "avant-poster") {
    return "brutalist";
  }
  if (
    styleId === "acid-y2k" ||
    styleId === "zine-wire" ||
    styleId === "console-2001"
  ) {
    return "acid";
  }

  const node = nodeById.get(styleId) as StyleNode | undefined;
  switch (node?.cluster) {
    case "04-spatial-physics":
      return "spatial-glass";
    case "05-modern-craft":
      return "modern-bento";
    case "06-editorial-warm":
      return "editorial-warm";
    case "02-retro-compute":
      return "retro-pixel";
    case "03-kinetic-rebel":
      return "brutalist";
    default:
      return "precision";
  }
}

const SERIF_STYLES = new Set([
  "warm-manuscript",
  "wordmark-press",
  "archival-paper",
]);

const DISPLAY_STYLES = new Set([
  "neo-brutalism",
  "acid-y2k",
  "avant-poster",
  "console-2001",
  "swiss-type-foundry",
  "neo-swiss",
  "zine-wire",
]);

const MONO_STYLES = new Set([
  "phosphor-terminal",
  "ditherpunk",
  "eight-bit-arcade",
  "os-core",
  "retro-web-96",
]);

const THICK_BORDER_STYLES = new Set([
  "neo-brutalism",
  "eight-bit-arcade",
  "retro-web-96",
  "os-core",
]);

const MEDIUM_BORDER_STYLES = new Set([
  "avant-poster",
  "pastel-playful",
  "console-2001",
]);

const themeCache = new Map<string, ResolvedStyleTheme>();

export function resolveStyleTheme(styleId: string): ResolvedStyleTheme {
  const cached = themeCache.get(styleId);
  if (cached) return cached;

  const raw = styleTokensById[styleId] ?? "";
  const rawVars = parseCssCustomProps(raw);
  const profile = resolveSurfaceProfile(styleId);

  const canvas = pickToken(rawVars, ["canvas", "bg", "ground"], "#0f1115");
  const surface = pickToken(
    rawVars,
    ["surface-light", "surface", "card", "panel", "bay", "elevated"],
    "#15181e"
  );
  const elevated = pickToken(
    rawVars,
    ["elevated", "surface-hover", "surface-alt", "chrome", "surface"],
    surface
  );
  const border = pickToken(
    rawVars,
    ["border", "rule", "line"],
    "rgba(255,255,255,0.14)"
  );
  const borderStrong = pickToken(
    rawVars,
    ["border-strong", "border"],
    border
  );
  const rawInk = pickToken(rawVars, ["-ink", "text", "fg"], "#e8ecf2");
  const rawInkMuted = pickToken(
    rawVars,
    ["ink-muted", "muted", "secondary", "subtle"],
    "#8b94a3"
  );
  const accent = pickToken(
    rawVars,
    ["accent", "cta", "primary", "signal-active", "signal-red"],
    "#38bdf8"
  );
  const accentAlt = pickToken(
    rawVars,
    [
      "accent-alt",
      "interactive",
      "signal-ok",
      "signal-blue",
      "accent-ok",
      "accent-magenta",
      "accent-coral",
      "accent-add",
    ],
    accent
  );
  const radius =
    profile === "swiss"
      ? "0px"
      : pickToken(rawVars, ["radius-md", "radius-chassis", "radius"], "4px");

  let shadow = pickToken(rawVars, ["shadow"], "none");
  if (styleId === "neo-brutalism") {
    shadow = "5px 5px 0 #000000";
  } else if (styleId === "avant-poster") {
    shadow = "4px 4px 0 #000000";
  } else if (styleId === "os-core") {
    shadow = "inset -2px -2px 0 #404040, inset 2px 2px 0 #ffffff";
  } else if (styleId === "eight-bit-arcade") {
    shadow = "3px 3px 0 #000000";
  } else if (styleId === "bento-grid" && shadow === "none") {
    shadow = "0 4px 18px rgba(0, 0, 0, 0.06)";
  } else if (styleId === "tactile-soft" && shadow === "none") {
    shadow = "0 6px 20px rgba(0, 0, 0, 0.08)";
  } else if (profile === "spatial-glass" && shadow === "none") {
    shadow = "inset 0 1px 0 rgba(255,255,255,0.22), 0 12px 32px rgba(0,0,0,0.34)";
  } else if (profile === "swiss") {
    shadow = "none";
  }

  const blur =
    pickToken(rawVars, ["blur"], "") ||
    (profile === "spatial-glass" ? "14px" : null);
  const chrome = pickToken(rawVars, ["chrome"], "") || null;

  const canvasLum = getRelativeLuminance(canvas);
  const isLight = canvasLum !== null ? canvasLum > 0.48 : false;

  const ink = canvasLum !== null ? getContrastInk(canvas, rawInk) : rawInk;
  const inkMuted =
    canvasLum !== null ? getMutedInk(canvas, rawInkMuted) : rawInkMuted;

  const surfaceLum = getRelativeLuminance(surface);
  const surfaceInk =
    surfaceLum !== null ? getContrastInk(surface, ink) : ink;
  const surfaceMuted =
    surfaceLum !== null ? getMutedInk(surface, inkMuted) : inkMuted;
  const accentInk = getContrastInk(accent, isLight ? "#ffffff" : "#111318");

  const borderWidth = THICK_BORDER_STYLES.has(styleId)
    ? "2px"
    : MEDIUM_BORDER_STYLES.has(styleId)
      ? "1.5px"
      : "1px";

  const fontHeading = SERIF_STYLES.has(styleId)
    ? 'Georgia, "Times New Roman", serif'
    : DISPLAY_STYLES.has(styleId)
      ? "var(--font-display)"
      : MONO_STYLES.has(styleId)
        ? "var(--font-mono)"
        : "var(--font-sans)";

  const fontBody = SERIF_STYLES.has(styleId)
    ? 'Georgia, "Times New Roman", serif'
    : MONO_STYLES.has(styleId)
      ? "var(--font-mono)"
      : "var(--font-sans)";

  const fontMono = "var(--font-mono)";

  let canvasPattern: string | undefined;
  let canvasPatternSize: string | undefined;
  if (styleId === "acid-y2k") {
    canvasPattern =
      "linear-gradient(rgba(204,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.06) 1px, transparent 1px)";
    canvasPatternSize = "24px 24px";
  } else if (styleId === "ditherpunk") {
    canvasPattern =
      "radial-gradient(rgba(11,12,10,0.12) 1px, transparent 1px)";
    canvasPatternSize = "8px 8px";
  } else if (profile === "spatial-glass") {
    canvasPattern =
      "radial-gradient(circle at 16% 14%, rgba(56,189,248,0.16), transparent 44%), radial-gradient(circle at 84% 72%, rgba(139,92,246,0.14), transparent 46%)";
  }

  // Theme-matched radial scrim behind hero text so headings stay razor-crisp over any hero-bg
  const heroScrim = hexToRgba(
    canvas,
    isLight ? 0.84 : 0.78,
    isLight ? "rgba(255, 255, 255, 0.84)" : "rgba(9, 10, 12, 0.78)"
  );

  // Contrast-safe status tokens
  const pairInk = isLight ? "#047857" : "#34d399";
  const pairBg = isLight
    ? "rgba(4, 120, 87, 0.1)"
    : "rgba(52, 211, 153, 0.12)";
  const pairBorder = isLight
    ? "rgba(4, 120, 87, 0.35)"
    : "rgba(52, 211, 153, 0.36)";

  const clashInk = isLight ? "#be123c" : "#fb7185";
  const clashBg = isLight
    ? "rgba(190, 18, 60, 0.1)"
    : "rgba(244, 63, 94, 0.14)";
  const clashBorder = isLight
    ? "rgba(190, 18, 60, 0.38)"
    : "rgba(244, 63, 94, 0.4)";

  const untestedInk = isLight ? "#475569" : "#94a3b8";
  const untestedBg = isLight
    ? "rgba(15, 23, 42, 0.06)"
    : "rgba(255, 255, 255, 0.06)";
  const untestedBorder = isLight
    ? "rgba(15, 23, 42, 0.2)"
    : "rgba(255, 255, 255, 0.16)";

  const resolved: ResolvedStyleTheme = {
    styleId,
    profile,
    rawVars,
    canvas,
    surface,
    elevated,
    border,
    borderStrong,
    borderWidth,
    ink,
    inkMuted,
    surfaceInk,
    surfaceMuted,
    accent,
    accentAlt,
    accentInk,
    radius,
    shadow,
    blur,
    chrome,
    isLight,
    paletteDots: [canvas, accent, accentAlt],
    fontHeading,
    fontBody,
    fontMono,
    canvasPattern,
    canvasPatternSize,
    heroScrim,
    pairInk,
    pairBg,
    pairBorder,
    clashInk,
    clashBg,
    clashBorder,
    untestedInk,
    untestedBg,
    untestedBorder,
  };

  themeCache.set(styleId, resolved);
  return resolved;
}

/**
 * Returns a derived theme whose font families delegate to the active scoped
 * `.type-<id>` CSS custom properties on `.dummy-site-root`.
 */
export function applyTypographyOverride(
  theme: ResolvedStyleTheme,
  typographyId: string | null
): ResolvedStyleTheme {
  if (!typographyId) return theme;
  return {
    ...theme,
    fontHeading: "var(--type-display)",
    fontBody: "var(--type-body)",
    fontMono: "var(--type-mono)",
  };
}

/**
 * Returns inline CSS custom properties scoped strictly to `.dummy-site-root`.
 * Never mutates global `:root` so the outer `fui-tactical` shell stays untouched.
 */
export function getScopedStageStyle(theme: ResolvedStyleTheme): CSSProperties {
  const vars: Record<string, string> = {
    ...theme.rawVars,
    "--lab-canvas": theme.canvas,
    "--lab-surface": theme.surface,
    "--lab-elevated": theme.elevated,
    "--lab-border": theme.border,
    "--lab-border-strong": theme.borderStrong,
    "--lab-border-width": theme.borderWidth,
    "--lab-ink": theme.ink,
    "--lab-ink-muted": theme.inkMuted,
    "--lab-surface-ink": theme.surfaceInk,
    "--lab-surface-muted": theme.surfaceMuted,
    "--lab-accent": theme.accent,
    "--lab-accent-alt": theme.accentAlt,
    "--lab-accent-ink": theme.accentInk,
    "--lab-radius": theme.radius,
    "--lab-shadow": theme.shadow,
    "--lab-font-heading": theme.fontHeading,
    "--lab-font-body": theme.fontBody,
    "--lab-hero-scrim": theme.heroScrim,
    "--lab-pair-ink": theme.pairInk,
    "--lab-pair-bg": theme.pairBg,
    "--lab-pair-border": theme.pairBorder,
    "--lab-clash-ink": theme.clashInk,
    "--lab-clash-bg": theme.clashBg,
    "--lab-clash-border": theme.clashBorder,
    "--lab-untested-ink": theme.untestedInk,
    "--lab-untested-bg": theme.untestedBg,
    "--lab-untested-border": theme.untestedBorder,
    // Locally scope --fui-* tokens inside the dummy site subtree so imported components adapt
    "--fui-canvas": theme.canvas,
    "--fui-surface": theme.surface,
    "--fui-elevated": theme.elevated,
    "--fui-border": theme.border,
    "--fui-border-strong": theme.borderStrong,
    "--fui-ink": theme.surfaceInk,
    "--fui-ink-muted": theme.surfaceMuted,
    "--fui-ink-faint": theme.surfaceMuted,
    "--fui-signal-active": theme.accent,
    "--fui-signal-ok": theme.pairInk,
    "--fui-signal-fault": theme.clashInk,
  };

  return {
    ...(vars as unknown as CSSProperties),
    colorScheme: theme.isLight ? "light" : "dark",
    backgroundColor: theme.canvas,
    backgroundImage: theme.canvasPattern,
    backgroundSize: theme.canvasPatternSize,
    color: theme.ink,
    fontFamily: theme.fontBody,
  };
}
