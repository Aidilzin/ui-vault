import relationsJson from "@vault/relations.json";

import fuiTacticalStyleRaw from "@vault/styles/01-precision-systems/fui-tactical/STYLE.md?raw";
import neoSwissStyleRaw from "@vault/styles/01-precision-systems/neo-swiss/STYLE.md?raw";
import editorialMonoStyleRaw from "@vault/styles/01-precision-systems/editorial-mono/STYLE.md?raw";
import industrialHardwareStyleRaw from "@vault/styles/01-precision-systems/industrial-hardware/STYLE.md?raw";
import ditherpunkStyleRaw from "@vault/styles/02-retro-compute/ditherpunk/STYLE.md?raw";
import osCoreStyleRaw from "@vault/styles/02-retro-compute/os-core/STYLE.md?raw";
import neoBrutalismStyleRaw from "@vault/styles/03-kinetic-rebel/neo-brutalism/STYLE.md?raw";
import acidY2kStyleRaw from "@vault/styles/03-kinetic-rebel/acid-y2k/STYLE.md?raw";
import liquidGlassStyleRaw from "@vault/styles/04-spatial-physics/liquid-glass/STYLE.md?raw";
import ambientOrbitStyleRaw from "@vault/styles/04-spatial-physics/ambient-orbit/STYLE.md?raw";

import magneticButtonRaw from "@vault/animations/cursor-reactive/magnetic-button.tsx?raw";
import borderSpotlightRaw from "@vault/animations/cursor-reactive/border-spotlight.tsx?raw";
import siblingDimRaw from "@vault/animations/cursor-reactive/sibling-dim.css?raw";
import scrambleTextRaw from "@vault/animations/text-kinetic/scramble-text.tsx?raw";
import splitRevealRaw from "@vault/animations/text-kinetic/split-reveal.tsx?raw";
import variableProximityRaw from "@vault/animations/text-kinetic/variable-proximity.tsx?raw";
import marqueeHoverRowRaw from "@vault/animations/text-kinetic/marquee-hover-row.tsx?raw";
import flipCardRaw from "@vault/animations/layout-morph/flip-card.tsx?raw";
import velocitySkewRaw from "@vault/animations/layout-morph/velocity-skew.tsx?raw";
import bayerDitherRaw from "@vault/animations/shader-canvas/bayer-dither.tsx?raw";
import asciiFilterRaw from "@vault/animations/shader-canvas/ascii-filter.tsx?raw";
import orbitalCanvasRaw from "@vault/animations/shader-canvas/orbital-canvas.tsx?raw";
import liquidGlassFilterRaw from "@vault/animations/physics-optics/liquid-glass-filter.tsx?raw";
import springTiltCardRaw from "@vault/animations/physics-optics/spring-tilt-card.tsx?raw";
import glareHoverRaw from "@vault/animations/physics-optics/glare-hover.tsx?raw";

import bookmarksRaw from "@vault/references/bookmarks.md?raw";

export type ClusterId =
  | "01-precision-systems"
  | "02-retro-compute"
  | "03-kinetic-rebel"
  | "04-spatial-physics";

export type MechanicId =
  | "cursor-reactive"
  | "text-kinetic"
  | "layout-morph"
  | "shader-canvas"
  | "physics-optics";

export interface ClusterMeta {
  id: ClusterId;
  label: string;
  dna: string;
  styles: string[];
}

export interface StyleNode {
  id: string;
  kind: "style";
  cluster: ClusterId;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface AnimationNode {
  id: string;
  kind: "animation";
  mechanic: MechanicId;
  engine: string[];
  perfTier: "low" | "medium" | "high";
  reducedMotion: string;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export type VaultNode = StyleNode | AnimationNode;

export interface HybridRecipe {
  id: string;
  name: string;
  baseStyle: string;
  accents: string[];
  bestFor: string;
}

export interface VaultRelations {
  version: string;
  clusters: Record<ClusterId, Omit<ClusterMeta, "id">>;
  mechanics: MechanicId[];
  nodes: VaultNode[];
  hybrids: HybridRecipe[];
  externalRegistries: Record<string, string>;
}

export const vaultRelations = relationsJson as unknown as VaultRelations;

export const clusterList: ClusterMeta[] = (
  Object.entries(vaultRelations.clusters) as [ClusterId, Omit<ClusterMeta, "id">][]
).map(([id, meta]) => ({
  id,
  ...meta,
}));

export const styleNodes: StyleNode[] = vaultRelations.nodes.filter(
  (n): n is StyleNode => n.kind === "style"
);

export const animationNodes: AnimationNode[] = vaultRelations.nodes.filter(
  (n): n is AnimationNode => n.kind === "animation"
);

export const nodeById = new Map<string, VaultNode>(
  vaultRelations.nodes.map((node) => [node.id, node])
);

export const styleRawById: Record<string, string> = {
  "fui-tactical": fuiTacticalStyleRaw,
  "neo-swiss": neoSwissStyleRaw,
  "editorial-mono": editorialMonoStyleRaw,
  "industrial-hardware": industrialHardwareStyleRaw,
  ditherpunk: ditherpunkStyleRaw,
  "os-core": osCoreStyleRaw,
  "neo-brutalism": neoBrutalismStyleRaw,
  "acid-y2k": acidY2kStyleRaw,
  "liquid-glass": liquidGlassStyleRaw,
  "ambient-orbit": ambientOrbitStyleRaw,
};

export const animationRawById: Record<string, string> = {
  "magnetic-button": magneticButtonRaw,
  "border-spotlight": borderSpotlightRaw,
  "sibling-dim": siblingDimRaw,
  "scramble-text": scrambleTextRaw,
  "split-reveal": splitRevealRaw,
  "variable-proximity": variableProximityRaw,
  "marquee-hover-row": marqueeHoverRowRaw,
  "flip-card": flipCardRaw,
  "velocity-skew": velocitySkewRaw,
  "bayer-dither": bayerDitherRaw,
  "ascii-filter": asciiFilterRaw,
  "orbital-canvas": orbitalCanvasRaw,
  "liquid-glass-filter": liquidGlassFilterRaw,
  "spring-tilt-card": springTiltCardRaw,
  "glare-hover": glareHoverRaw,
};

export const bookmarksMarkdown = bookmarksRaw;

export function getShadcnAddCommand(registryItems: string | string[]): string {
  const items = Array.isArray(registryItems) ? registryItems : [registryItems];
  return `npx shadcn@latest add ${items
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ")}`;
}

export function getHybridBundleCommand(hybrid: HybridRecipe): string {
  const ids = [hybrid.baseStyle, ...hybrid.accents];
  const registryItems = ids
    .map((id) => nodeById.get(id)?.registryItem)
    .filter((item): item is string => Boolean(item));
  return getShadcnAddCommand(registryItems);
}

export type RelationStatus = "selected" | "pairs" | "clashes" | "neutral";

export function getRelationStatus(
  selectedId: string | null,
  candidateId: string
): RelationStatus {
  if (!selectedId) return "neutral";
  if (selectedId === candidateId) return "selected";

  const selected = nodeById.get(selectedId);
  const candidate = nodeById.get(candidateId);
  if (!selected || !candidate) return "neutral";

  if (
    selected.clashesWith.includes(candidateId) ||
    candidate.clashesWith.includes(selectedId)
  ) {
    return "clashes";
  }

  if (
    selected.pairsWith.includes(candidateId) ||
    candidate.pairsWith.includes(selectedId)
  ) {
    return "pairs";
  }

  return "neutral";
}

export function formatNodeLabel(id: string): string {
  return id
    .split("-")
    .map((part) => {
      if (part === "fui") return "FUI";
      if (part === "os") return "OS";
      if (part === "y2k") return "Y2K";
      if (part === "ascii") return "ASCII";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
