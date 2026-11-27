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
  type TextureNode,
  type TypographyNode,
} from "./vault-data";
import type { ActiveTab } from "../components/TopCommandBar";
import { getSlotBadgeLabel } from "./lab-slots";

export const MAX_LAB_ANIMATIONS = 6;

export type LabTemplateId = "landing" | "workbench" | "editorial";

export type LabViewportMode = "desktop" | "tablet" | "mobile";

export interface LabState {
  styleId: string;
  animationIds: string[];
  textureId: string | null;
  textureOpacity: number;
  typographyId: string | null;
  template: LabTemplateId;
  backdropOpacity: number;
  viewport: LabViewportMode;
}

export const DEFAULT_LAB_STATE: LabState = {
  styleId: "fui-tactical",
  animationIds: ["orbital-canvas", "scramble-text", "border-spotlight", "count-up"],
  textureId: null,
  textureOpacity: 0.16,
  typographyId: null,
  template: "landing",
  backdropOpacity: 0.38,
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
  animationIds: string[],
  textureId: string | null = null,
  typographyId: string | null = null
): LabMixEvaluation {
  const pairs: LabPairEdge[] = [];
  const clashes: LabPairEdge[] = [];
  const untested: LabPairEdge[] = [];

  const checkEdge = (a: string, b: string, trackUntested: boolean) => {
    const rel = getRelationStatus(a, b);
    if (rel === "clashes") {
      clashes.push({ a, b });
    } else if (rel === "pairs") {
      pairs.push({ a, b });
    } else if (trackUntested) {
      untested.push({ a, b });
    }
  };

  for (const animId of animationIds) {
    checkEdge(styleId, animId, true);
  }

  for (let i = 0; i < animationIds.length; i++) {
    for (let j = i + 1; j < animationIds.length; j++) {
      checkEdge(animationIds[i], animationIds[j], false);
    }
  }

  if (textureId) {
    checkEdge(styleId, textureId, true);
    for (const animId of animationIds) {
      checkEdge(textureId, animId, false);
    }
  }

  if (typographyId) {
    checkEdge(styleId, typographyId, true);
    for (const animId of animationIds) {
      checkEdge(typographyId, animId, false);
    }
  }

  if (textureId && typographyId) {
    checkEdge(textureId, typographyId, false);
  }

  const hasExtras =
    animationIds.length > 0 || Boolean(textureId) || Boolean(typographyId);

  let status: LabCompatibilityStatus = "EXPERIMENTAL MIX";
  if (clashes.length > 0) {
    status = "CLASH DETECTED";
  } else if (hasExtras && untested.length === 0) {
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
      animationIds: animationNodes.slice(0, 3).map((a) => a.id),
    };
  }

  const count = Math.min(picked.pairedAnims.length, Math.random() > 0.45 ? 4 : 3);
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
  textureId: string | null;
  textureOpacity?: number;
  typographyId: string | null;
  suggestedTemplate?: LabTemplateId;
} {
  const styleExists = nodeById.get(hybrid.baseStyle)?.kind === "style";
  const styleId = styleExists ? hybrid.baseStyle : DEFAULT_LAB_STATE.styleId;
  const animationIds = hybrid.accents
    .filter((id) => nodeById.get(id)?.kind === "animation")
    .slice(0, MAX_LAB_ANIMATIONS);

  const texNode = hybrid.texture
    ? (nodeById.get(hybrid.texture) as TextureNode | undefined)
    : undefined;
  const textureId = texNode?.kind === "texture" ? texNode.id : null;
  const textureOpacity = texNode?.kind === "texture" ? texNode.defaultOpacity : undefined;

  const typoNode = hybrid.typography
    ? (nodeById.get(hybrid.typography) as TypographyNode | undefined)
    : undefined;
  const typographyId = typoNode?.kind === "typography" ? typoNode.id : null;

  const hasAgentic = animationIds.some(
    (id) => (nodeById.get(id) as AnimationNode | undefined)?.mechanic === "ai-agentic"
  );
  const styleNode = nodeById.get(styleId) as StyleNode | undefined;
  const suggestedTemplate: LabTemplateId | undefined = hasAgentic
    ? "workbench"
    : styleNode?.cluster === "06-editorial-warm"
      ? "editorial"
      : undefined;

  return { styleId, animationIds, textureId, textureOpacity, typographyId, suggestedTemplate };
}

export function buildLabShadcnCommand(
  styleId: string,
  animationIds: string[],
  textureId: string | null = null,
  typographyId: string | null = null
): string {
  const items: string[] = [];
  const style = nodeById.get(styleId);
  if (style) items.push(style.registryItem);
  if (textureId) {
    const tex = nodeById.get(textureId);
    if (tex) items.push(tex.registryItem);
  }
  if (typographyId) {
    const typo = nodeById.get(typographyId);
    if (typo) items.push(typo.registryItem);
  }
  for (const id of animationIds) {
    const anim = nodeById.get(id);
    if (anim) items.push(anim.registryItem);
  }
  return getShadcnAddCommand(items);
}

export function buildLabAgentPrompt(
  styleId: string,
  animationIds: string[],
  evaluation: LabMixEvaluation,
  template: LabTemplateId = "landing",
  textureId: string | null = null,
  textureOpacity = DEFAULT_LAB_STATE.textureOpacity,
  typographyId: string | null = null
): string {
  const style = nodeById.get(styleId) as StyleNode | undefined;
  const texture = textureId
    ? (nodeById.get(textureId) as TextureNode | undefined)
    : undefined;
  const typography = typographyId
    ? (nodeById.get(typographyId) as TypographyNode | undefined)
    : undefined;
  const clusterMeta = style ? vaultRelations.clusters[style.cluster] : null;
  const anims = animationIds
    .map((id) => nodeById.get(id))
    .filter((n): n is AnimationNode => Boolean(n && n.kind === "animation"));

  const cmd = buildLabShadcnCommand(styleId, animationIds, textureId, typographyId);
  const animLines =
    anims.length > 0
      ? anims
          .map(
            (a) =>
              `- \`${a.id}\` [${getSlotBadgeLabel(a.id)}] (${a.mechanic}, ${a.path}, reducedMotion: ${a.reducedMotion})`
          )
          .join("\n")
      : "- (No animations selected yet — style foundation only)";

  const clashSection =
    evaluation.status === "CLASH DETECTED"
      ? `\nIntentional Aesthetic Clash Note:\nThe following pairings are flagged as clashes in \`relations.json\` (${evaluation.clashes
          .map((c) => `${c.a} × ${c.b}`)
          .join(", ")}). Treat this clash as an intentional creative override—keep typography legible, preserve WCAG contrast, and isolate motion energy cleanly.\n`
      : "";

  const templateLabel =
    template === "workbench"
      ? "AI Workbench / Agent Control Surface"
      : template === "editorial"
        ? "Editorial Design & Systems Journal"
        : "SaaS Developer Platform Landing Page";

  const lines: string[] = [
    `Build a cohesive React + TypeScript ${templateLabel} using the UI Vault 4-layer stack below.`,
    ``,
    `1. Base Visual Style:`,
    `- Style ID: \`${styleId}\`${style ? ` (${style.cluster} · tier: ${style.tier})` : ""}`,
  ];
  if (style) {
    lines.push(`- Spec & Tokens: \`${style.path}\` and sibling \`tokens.css\``);
  }
  if (clusterMeta) {
    lines.push(`- Cluster DNA: ${clusterMeta.dna}`);
  }

  if (typography) {
    lines.push(
      ``,
      `2. Typography System Override:`,
      `- Typography ID: \`${typography.id}\` (${typography.fonts.join(" + ")}, tier: ${typography.tier})`,
      `- Spec & Scoped CSS: \`${typography.path}\` and sibling \`typography.css\` (\`.type-${typography.id}\`)`,
      `- Google Fonts: ${typography.googleFontsUrl}`
    );
  }

  if (texture) {
    lines.push(
      ``,
      `3. Surface Texture Layer:`,
      `- Texture ID: \`${texture.id}\` (\`.tx-${texture.id}\`, layer: ${texture.layer}, opacity: ${textureOpacity.toFixed(2)})`,
      `- Stylesheet: \`${texture.path}\``
    );
  }

  lines.push(
    ``,
    `Animation Primitives & Page Slots (${anims.length}):`,
    animLines
  );

  if (clashSection) lines.push(clashSection);

  lines.push(
    ``,
    `Install via shadcn CLI:`,
    `\`\`\`bash`,
    cmd,
    `\`\`\``,
    ``,
    `Implementation Rules:`,
    `1. Import and apply the style's CSS custom properties from \`tokens.css\` strictly as the visual foundation (surface hierarchy, border width/radius, contrast).`,
    `2. Scope typography (\`.type-*\`) and surface textures (\`.tx-*\`) cleanly to the page root without mutating global \`:root\` or \`html/body\` defaults.`,
    `3. Compose the selected zero-dependency animations directly onto the real semantic page elements indicated above without introducing extra runtime libraries.`,
    `4. Honor \`prefers-reduced-motion: reduce\` across every animated surface.`
  );

  return lines.join("\n");
}

export interface ParsedUrlState {
  tab: ActiveTab | null;
  lab: LabState;
}

const VALID_TABS = new Set<ActiveTab>([
  "animations",
  "styles",
  "foundations",
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

  const rawTex = params.get("tex");
  const validTexNode =
    rawTex && nodeById.get(rawTex)?.kind === "texture"
      ? (nodeById.get(rawTex) as TextureNode)
      : null;
  const textureId = validTexNode ? validTexNode.id : null;

  const rawTexOp = params.get("texOp");
  const parsedTexOp = rawTexOp !== null ? Number(rawTexOp) : NaN;
  const textureOpacity =
    Number.isFinite(parsedTexOp) && parsedTexOp >= 0.04 && parsedTexOp <= 0.45
      ? Number(parsedTexOp.toFixed(2))
      : validTexNode
        ? validTexNode.defaultOpacity
        : DEFAULT_LAB_STATE.textureOpacity;

  const rawType = params.get("type");
  const typographyId =
    rawType && nodeById.get(rawType)?.kind === "typography" ? rawType : null;

  const rawTpl = params.get("tpl");
  const template: LabTemplateId =
    rawTpl === "landing" || rawTpl === "workbench" || rawTpl === "editorial"
      ? rawTpl
      : DEFAULT_LAB_STATE.template;

  const rawVp = params.get("vp");
  const viewport: LabViewportMode =
    rawVp === "desktop" || rawVp === "tablet" || rawVp === "mobile"
      ? rawVp
      : rawVp === "card"
        ? "tablet"
        : "desktop";

  return {
    tab,
    lab: {
      styleId: validStyle,
      animationIds: validAnims,
      textureId,
      textureOpacity,
      typographyId,
      template,
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
  url.searchParams.set("tpl", lab.template);
  if (lab.textureId) {
    url.searchParams.set("tex", lab.textureId);
    url.searchParams.set("texOp", lab.textureOpacity.toFixed(2));
  }
  if (lab.typographyId) {
    url.searchParams.set("type", lab.typographyId);
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
    url.searchParams.set("tpl", lab.template);
    url.searchParams.delete("backdrop");
    if (lab.textureId) {
      url.searchParams.set("tex", lab.textureId);
      url.searchParams.set("texOp", lab.textureOpacity.toFixed(2));
    } else {
      url.searchParams.delete("tex");
      url.searchParams.delete("texOp");
    }
    if (lab.typographyId) {
      url.searchParams.set("type", lab.typographyId);
    } else {
      url.searchParams.delete("type");
    }
    if (lab.viewport !== "desktop") {
      url.searchParams.set("vp", lab.viewport);
    } else {
      url.searchParams.delete("vp");
    }
  } else {
    url.searchParams.delete("style");
    url.searchParams.delete("anims");
    url.searchParams.delete("tpl");
    url.searchParams.delete("backdrop");
    url.searchParams.delete("vp");
    url.searchParams.delete("tex");
    url.searchParams.delete("texOp");
    url.searchParams.delete("type");
    if (tab === "animations") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", tab);
    }
  }
  window.history.replaceState(null, "", url.toString());
}
