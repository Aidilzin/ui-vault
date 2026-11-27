import {
  animationNodes,
  getRelationStatus,
  getShadcnAddCommand,
  nodeById,
  styleNodes,
  vaultRelations,
  type AnimationNode,
  type HybridRecipe,
  type StyleNode,
} from "./vault-data";
import type { ActiveTab } from "../components/TopCommandBar";

export const MAX_LAB_ANIMATIONS = 4;

export const AMBIENT_BACKDROP_IDS = new Set<string>([
  "bayer-dither",
  "ascii-filter",
  "orbital-canvas",
  "pixel-hover-grid",
  "crt-grain-overlay",
  "aurora-mesh-bg",
  "svg-ripple-pulse",
  "meteor-shower",
  "eclipse-orb",
  "lamp-horizon-glow",
]);

export type LabViewportMode = "desktop" | "card" | "mobile";

export interface LabState {
  styleId: string;
  animationIds: string[];
  backdropId: string | null;
  backdropOpacity: number;
  viewport: LabViewportMode;
}

export const DEFAULT_LAB_STATE: LabState = {
  styleId: "fui-tactical",
  animationIds: ["streaming-token-text", "border-spotlight"],
  backdropId: null,
  backdropOpacity: 0.45,
  viewport: "desktop",
};

export interface LabPairEdge {
  a: string;
  b: string;
}

export type LabCompatibilityStatus =
  | "HARMONIOUS"
  | "EXPERIMENTAL MIX"
  | "CLASH DETECTED";

export interface LabMixEvaluation {
  status: LabCompatibilityStatus;
  pairs: LabPairEdge[];
  clashes: LabPairEdge[];
  untested: LabPairEdge[];
}

export function evaluateLabMix(
  styleId: string,
  animationIds: string[]
): LabMixEvaluation {
  const pairs: LabPairEdge[] = [];
  const clashes: LabPairEdge[] = [];
  const untested: LabPairEdge[] = [];

  // Style <-> Animation edges
  for (const animId of animationIds) {
    const rel = getRelationStatus(styleId, animId);
    if (rel === "clashes") {
      clashes.push({ a: styleId, b: animId });
    } else if (rel === "pairs") {
      pairs.push({ a: styleId, b: animId });
    } else {
      untested.push({ a: styleId, b: animId });
    }
  }

  // Animation <-> Animation edges (check explicit pairs/clashes without marking neutral anim-anim as untested noise)
  for (let i = 0; i < animationIds.length; i++) {
    for (let j = i + 1; j < animationIds.length; j++) {
      const a = animationIds[i];
      const b = animationIds[j];
      const rel = getRelationStatus(a, b);
      if (rel === "clashes") {
        clashes.push({ a, b });
      } else if (rel === "pairs") {
        pairs.push({ a, b });
      }
    }
  }

  let status: LabCompatibilityStatus = "EXPERIMENTAL MIX";
  if (clashes.length > 0) {
    status = "CLASH DETECTED";
  } else if (animationIds.length > 0 && untested.length === 0) {
    status = "HARMONIOUS";
  }

  return { status, pairs, clashes, untested };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandomCompatibleMix(excludeStyleId?: string): {
  styleId: string;
  animationIds: string[];
} {
  const candidates = styleNodes
    .map((style) => {
      const pairedAnims = animationNodes.filter(
        (anim) => getRelationStatus(style.id, anim.id) === "pairs"
      );
      return { style, pairedAnims };
    })
    .filter((entry) => entry.pairedAnims.length >= 2);

  const pool =
    candidates.length > 1 && excludeStyleId
      ? candidates.filter((c) => c.style.id !== excludeStyleId)
      : candidates;

  const picked = pool[Math.floor(Math.random() * pool.length)];
  if (!picked) {
    return {
      styleId: styleNodes[0]?.id ?? "fui-tactical",
      animationIds: animationNodes.slice(0, 2).map((a) => a.id),
    };
  }

  const count = Math.min(picked.pairedAnims.length, Math.random() > 0.45 ? 3 : 2);
  const chosen: string[] = [];
  for (const anim of shuffle(picked.pairedAnims)) {
    const clashesChosen = chosen.some(
      (id) => getRelationStatus(id, anim.id) === "clashes"
    );
    if (!clashesChosen) {
      chosen.push(anim.id);
      if (chosen.length >= count) break;
    }
  }

  return { styleId: picked.style.id, animationIds: chosen };
}

export function pickChaosMix(excludeStyleId?: string): {
  styleId: string;
  animationIds: string[];
} {
  const candidates = styleNodes
    .map((style) => {
      const clashingAnims = animationNodes.filter(
        (anim) => getRelationStatus(style.id, anim.id) === "clashes"
      );
      return { style, clashingAnims };
    })
    .filter((entry) => entry.clashingAnims.length >= 1);

  const pool =
    candidates.length > 1 && excludeStyleId
      ? candidates.filter((c) => c.style.id !== excludeStyleId)
      : candidates;

  const picked = pool[Math.floor(Math.random() * pool.length)];
  if (!picked) {
    return {
      styleId: "fui-tactical",
      animationIds: ["click-spark"],
    };
  }

  const clashes = shuffle(picked.clashingAnims)
    .slice(0, Math.min(2, picked.clashingAnims.length))
    .map((a) => a.id);

  const wildcardPool = animationNodes.filter((a) => !clashes.includes(a.id));
  const wildcard =
    wildcardPool[Math.floor(Math.random() * wildcardPool.length)];

  return {
    styleId: picked.style.id,
    animationIds: wildcard ? [...clashes, wildcard.id] : clashes,
  };
}

export function resolveHybridToLabMix(hybrid: HybridRecipe): {
  styleId: string;
  animationIds: string[];
} {
  const styleExists = nodeById.get(hybrid.baseStyle)?.kind === "style";
  const styleId = styleExists ? hybrid.baseStyle : DEFAULT_LAB_STATE.styleId;
  const animationIds = hybrid.accents
    .filter((id) => nodeById.get(id)?.kind === "animation")
    .slice(0, MAX_LAB_ANIMATIONS);
  return { styleId, animationIds };
}

export function buildLabShadcnCommand(
  styleId: string,
  animationIds: string[]
): string {
  const items: string[] = [];
  const style = nodeById.get(styleId);
  if (style) items.push(style.registryItem);
  for (const id of animationIds) {
    const anim = nodeById.get(id);
    if (anim) items.push(anim.registryItem);
  }
  return getShadcnAddCommand(items);
}

export function buildLabAgentPrompt(
  styleId: string,
  animationIds: string[],
  evaluation: LabMixEvaluation
): string {
  const style = nodeById.get(styleId) as StyleNode | undefined;
  const clusterMeta = style ? vaultRelations.clusters[style.cluster] : null;
  const anims = animationIds
    .map((id) => nodeById.get(id))
    .filter((n): n is AnimationNode => Boolean(n && n.kind === "animation"));

  const cmd = buildLabShadcnCommand(styleId, animationIds);
  const animLines =
    anims.length > 0
      ? anims
          .map(
            (a) =>
              `- \`${a.id}\` (${a.mechanic}, ${a.path}, reducedMotion: ${a.reducedMotion})`
          )
          .join("\n")
      : "- (No animations selected yet — style foundation only)";

  const clashSection =
    evaluation.status === "CLASH DETECTED"
      ? `\nIntentional Aesthetic Clash Note:\nThe following pairings are flagged as clashes in \`relations.json\` (${evaluation.clashes
          .map((c) => `${c.a} × ${c.b}`)
          .join(", ")}). Treat this clash as an intentional creative override—keep typography legible, preserve WCAG contrast, and isolate motion energy cleanly.\n`
      : "";

  return [
    `Build a cohesive React + TypeScript interface using the UI Vault mix below.`,
    ``,
    `Base Visual Style:`,
    `- Style ID: \`${styleId}\`${style ? ` (${style.cluster} · tier: ${style.tier})` : ""}`,
    style ? `- Spec & Tokens: \`${style.path}/STYLE.md\` and \`${style.path}/tokens.css\`` : "",
    clusterMeta ? `- Cluster DNA: ${clusterMeta.dna}` : "",
    ``,
    `Animation Primitives (${anims.length}):`,
    animLines,
    clashSection,
    `Install via shadcn CLI:`,
    `\`\`\`bash`,
    cmd,
    `\`\`\``,
    ``,
    `Implementation Rules:`,
    `1. Import and apply the style's CSS custom properties from \`tokens.css\` strictly as the visual foundation (surface hierarchy, border width/radius, typography, and contrast).`,
    `2. Compose the selected zero-dependency animations without introducing extra runtime libraries.`,
    `3. Honor \`prefers-reduced-motion: reduce\` across every animated surface.`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export interface ParsedUrlState {
  tab: ActiveTab | null;
  lab: LabState;
}

const VALID_TABS = new Set<ActiveTab>([
  "animations",
  "styles",
  "relations",
  "labs",
  "references",
]);

export function readUrlState(): ParsedUrlState {
  if (typeof window === "undefined") {
    return { tab: null, lab: DEFAULT_LAB_STATE };
  }

  const params = new URLSearchParams(window.location.search);
  const rawTab = params.get("tab") as ActiveTab | null;
  const tab = rawTab && VALID_TABS.has(rawTab) ? rawTab : null;

  const rawStyle = params.get("style");
  const validStyle =
    rawStyle && nodeById.get(rawStyle)?.kind === "style"
      ? rawStyle
      : DEFAULT_LAB_STATE.styleId;

  const rawAnims = params.get("anims");
  let validAnims: string[];
  if (rawAnims !== null) {
    validAnims = Array.from(
      new Set(
        rawAnims
          .split(",")
          .map((s) => s.trim())
          .filter((id) => nodeById.get(id)?.kind === "animation")
      )
    ).slice(0, MAX_LAB_ANIMATIONS);
  } else {
    validAnims = DEFAULT_LAB_STATE.animationIds;
  }

  const rawBackdrop = params.get("backdrop");
  const validBackdrop =
    rawBackdrop &&
    validAnims.includes(rawBackdrop) &&
    AMBIENT_BACKDROP_IDS.has(rawBackdrop)
      ? rawBackdrop
      : null;

  const rawVp = params.get("vp");
  const viewport: LabViewportMode =
    rawVp === "desktop" || rawVp === "card" || rawVp === "mobile"
      ? rawVp
      : "desktop";

  return {
    tab,
    lab: {
      styleId: validStyle,
      animationIds: validAnims,
      backdropId: validBackdrop,
      backdropOpacity: DEFAULT_LAB_STATE.backdropOpacity,
      viewport,
    },
  };
}

export function buildLabShareUrl(lab: LabState): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("tab", "labs");
  url.searchParams.set("style", lab.styleId);
  url.searchParams.set("anims", lab.animationIds.join(","));
  if (lab.backdropId && lab.animationIds.includes(lab.backdropId)) {
    url.searchParams.set("backdrop", lab.backdropId);
  }
  if (lab.viewport !== "desktop") {
    url.searchParams.set("vp", lab.viewport);
  }
  return url.toString();
}

export function syncUrlState(tab: ActiveTab, lab: LabState): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (tab === "labs") {
    url.searchParams.set("tab", "labs");
    url.searchParams.set("style", lab.styleId);
    url.searchParams.set("anims", lab.animationIds.join(","));
    if (lab.backdropId && lab.animationIds.includes(lab.backdropId)) {
      url.searchParams.set("backdrop", lab.backdropId);
    } else {
      url.searchParams.delete("backdrop");
    }
    if (lab.viewport !== "desktop") {
      url.searchParams.set("vp", lab.viewport);
    } else {
      url.searchParams.delete("vp");
    }
  } else {
    url.searchParams.delete("style");
    url.searchParams.delete("anims");
    url.searchParams.delete("backdrop");
    url.searchParams.delete("vp");
    if (tab === "animations") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", tab);
    }
  }
  window.history.replaceState(null, "", url.toString());
}
