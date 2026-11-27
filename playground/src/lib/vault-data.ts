import relationsJson from "@vault/relations.json";
import bookmarksRaw from "@vault/references/bookmarks.md?raw";

// Bundle all scoped texture (.tx-*), typography (.type-*), and layout (.lay-*) stylesheets natively
import.meta.glob("@vault/textures/*.css", { eager: true });
import.meta.glob("@vault/typography/*/typography.css", { eager: true });
import.meta.glob("@vault/layouts/*/*.css", { eager: true });

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

const textureRawGlobs = import.meta.glob("@vault/textures/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const typographyMdGlobs = import.meta.glob("@vault/typography/*/TYPOGRAPHY.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const typographyCssGlobs = import.meta.glob("@vault/typography/*/typography.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const layoutMdGlobs = import.meta.glob("@vault/layouts/*/LAYOUT.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const layoutTsxGlobs = import.meta.glob("@vault/layouts/*/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const layoutCssGlobs = import.meta.glob("@vault/layouts/*/*.css", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const telemetryRawGlobs = import.meta.glob("@vault/telemetry/*.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type ClusterId =
  | "01-precision-systems"
  | "02-retro-compute"
  | "03-kinetic-rebel"
  | "04-spatial-physics"
  | "05-modern-craft"
  | "06-editorial-warm";

export type TierId = "production" | "viral" | "experimental";

export const TIER_LIST: TierId[] = ["production", "viral", "experimental"];

export type MechanicId =
  | "cursor-reactive"
  | "text-kinetic"
  | "layout-morph"
  | "shader-canvas"
  | "physics-optics"
  | "scroll-driven"
  | "micro-feedback"
  | "ai-agentic";

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
  tier: TierId;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface AnimationNode {
  id: string;
  kind: "animation";
  mechanic: MechanicId;
  tier: TierId;
  engine: string[];
  perfTier: "low" | "medium" | "high";
  reducedMotion: string;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface TextureNode {
  id: string;
  name: string;
  kind: "texture";
  tier: TierId;
  layer: "ground" | "overlay";
  mechanism: "css-gradient" | "svg-mask" | "svg-turbulence";
  defaultOpacity: number;
  defaultSize: string;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface TypographyNode {
  id: string;
  name: string;
  kind: "typography";
  tier: TierId;
  voice: string;
  fonts: string[];
  googleFontsUrl: string;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface LayoutNode {
  id: string;
  name: string;
  kind: "layout";
  tier: TierId;
  pattern: string;
  slots: string[];
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export interface TelemetryNode {
  id: string;
  name: string;
  kind: "telemetry";
  tier: TierId;
  engine: string[];
  perfTier: "low" | "medium" | "high";
  reducedMotion: string;
  path: string;
  registryItem: string;
  pairsWith: string[];
  clashesWith: string[];
}

export type VaultNode =
  | StyleNode
  | AnimationNode
  | TextureNode
  | TypographyNode
  | LayoutNode
  | TelemetryNode;

export interface HybridRecipe {
  id: string;
  name: string;
  baseStyle: string;
  layout?: string;
  texture?: string;
  typography?: string;
  telemetry?: string[];
  accents: string[];
  bestFor: string;
}

export interface VaultRelations {
  version: string;
  clusters: Record<ClusterId, Omit<ClusterMeta, "id">>;
  mechanics: MechanicId[];
  textures: string[];
  typography: string[];
  layouts: string[];
  telemetry: string[];
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

export const textureNodes: TextureNode[] = vaultRelations.nodes.filter(
  (n): n is TextureNode => n.kind === "texture"
);

export const typographyNodes: TypographyNode[] = vaultRelations.nodes.filter(
  (n): n is TypographyNode => n.kind === "typography"
);

export const layoutNodes: LayoutNode[] = vaultRelations.nodes.filter(
  (n): n is LayoutNode => n.kind === "layout"
);

export const telemetryNodes: TelemetryNode[] = vaultRelations.nodes.filter(
  (n): n is TelemetryNode => n.kind === "telemetry"
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
export const textureRawById: Record<string, string> = buildMapByFileStem(textureRawGlobs);
export const typographyRawById: Record<string, string> = buildMapByDirName(typographyMdGlobs);
export const typographyCssById: Record<string, string> = buildMapByDirName(typographyCssGlobs);
export const layoutMdById: Record<string, string> = buildMapByDirName(layoutMdGlobs);
export const layoutTsxById: Record<string, string> = buildMapByDirName(layoutTsxGlobs);
export const layoutCssById: Record<string, string> = buildMapByDirName(layoutCssGlobs);
export const telemetryRawById: Record<string, string> = buildMapByFileStem(telemetryRawGlobs);
export const bookmarksMarkdown = bookmarksRaw;

export function getShadcnAddCommand(registryItems: string | string[]): string {
  const items = Array.isArray(registryItems) ? registryItems : [registryItems];
  return `npx shadcn@latest add ${items
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ")}`;
}

export function getHybridBundleCommand(hybrid: HybridRecipe): string {
  const ids = [
    hybrid.baseStyle,
    ...(hybrid.layout ? [hybrid.layout] : []),
    ...(hybrid.texture ? [hybrid.texture] : []),
    ...(hybrid.typography ? [hybrid.typography] : []),
    ...(hybrid.telemetry ?? []),
    ...hybrid.accents,
  ];
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
      if (part === "saas") return "SaaS";
      if (part === "ai") return "AI";
      if (part === "ide") return "IDE";
      if (part === "hud") return "HUD";
      if (part === "led") return "LED";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
