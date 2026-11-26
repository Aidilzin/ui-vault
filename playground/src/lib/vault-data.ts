import relationsJson from "@vault/relations.json";
import bookmarksRaw from "@vault/references/bookmarks.md?raw";

const styleMdGlobs = import.meta.glob("@vault/styles/*/*/STYLE.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const styleTokensGlobs = import.meta.glob("@vault/styles/*/*/tokens.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const animationRawGlobs = import.meta.glob("@vault/animations/*/*.{tsx,css}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type ClusterId =
  | "01-precision-systems"
  | "02-retro-compute"
  | "03-kinetic-rebel"
  | "04-spatial-physics"
  | "05-editorial-organic";

export type MechanicId =
  | "cursor-reactive"
  | "text-kinetic"
  | "layout-morph"
  | "shader-canvas"
  | "physics-optics"
  | "scroll-driven"
  | "micro-feedback";

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

function buildMapByDirName(globs: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [filePath, raw] of Object.entries(globs)) {
    const parts = filePath.replace(/\\/g, "/").split("/");
    const dirName = parts[parts.length - 2];
    if (dirName) out[dirName] = raw;
  }
  return out;
}

function buildMapByFileStem(globs: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [filePath, raw] of Object.entries(globs)) {
    const fileName = filePath.replace(/\\/g, "/").split("/").pop() ?? "";
    const stem = fileName.replace(/\.(tsx|ts|css)$/, "");
    if (stem) out[stem] = raw;
  }
  return out;
}

export const styleRawById: Record<string, string> = buildMapByDirName(styleMdGlobs);
export const styleTokensById: Record<string, string> = buildMapByDirName(styleTokensGlobs);
export const animationRawById: Record<string, string> = buildMapByFileStem(animationRawGlobs);
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
      if (part === "svg") return "SVG";
      if (part === "crt") return "CRT";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
