import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const relations = JSON.parse(fs.readFileSync(path.join(rootDir, "relations.json"), "utf8"));
const animsReg = JSON.parse(fs.readFileSync(path.join(rootDir, "animations/registry.json"), "utf8"));
const readmePath = path.join(rootDir, "README.md");
const catalogDir = path.join(rootDir, "docs", "catalog");

const PLAYGROUND_BASE = "https://aidilzin.github.io/ui-vault/";
const MAX_LAB_ANIMATIONS = 6;
const MAX_LAB_TELEMETRY = 3;

const FEATURED_HYBRID_IDS = [
  "tactical-space",
  "ai-agent-workbench",
  "bento-product-launch",
  "observability-console",
  "warm-research-reader",
  "type-specimen-press",
];

const animTitleByName = new Map((animsReg.items ?? []).map((i) => [i.name, i.title]));
const nodeById = new Map((relations.nodes ?? []).map((n) => [n.id, n]));

const styleNodes = (relations.nodes ?? []).filter((n) => n.kind === "style");
const animNodes = (relations.nodes ?? []).filter((n) => n.kind === "animation");
const textureNodes = (relations.nodes ?? []).filter((n) => n.kind === "texture");
const typographyNodes = (relations.nodes ?? []).filter((n) => n.kind === "typography");
const layoutNodes = (relations.nodes ?? []).filter((n) => n.kind === "layout");
const telemetryNodes = (relations.nodes ?? []).filter((n) => n.kind === "telemetry");
const hybrids = relations.hybrids ?? [];

const foundationsCount =
  textureNodes.length + typographyNodes.length + layoutNodes.length + telemetryNodes.length;
const totalItems = styleNodes.length + animNodes.length + foundationsCount;

function replaceBlock(content, marker, replacement) {
  const start = `<!-- VAULT:${marker}:START -->`;
  const end = `<!-- VAULT:${marker}:END -->`;
  const startIdx = content.indexOf(start);
  const endIdx = content.indexOf(end);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Missing README marker pair for ${marker}`);
  }
  return (
    content.slice(0, startIdx + start.length) +
    "\n" +
    replacement +
    "\n" +
    content.slice(endIdx)
  );
}

/**
 * Mirrors playground/src/lib/lab-helpers.ts (`resolveHybridToLabMix` + `buildLabShareUrl`)
 * so every "Launch in Labs" link hydrates cleanly with 0 errors.
 */
function buildLaunchInLabsUrl(hybrid) {
  const styleNode = nodeById.get(hybrid.baseStyle);
  const styleId = styleNode?.kind === "style" ? hybrid.baseStyle : "fui-tactical";

  const animIds = (hybrid.accents ?? [])
    .filter((id) => nodeById.get(id)?.kind === "animation")
    .slice(0, MAX_LAB_ANIMATIONS);

  const hasAgentic = animIds.some((id) => nodeById.get(id)?.mechanic === "ai-agentic");
  const tpl = hasAgentic
    ? "workbench"
    : styleNode?.cluster === "06-editorial-warm"
      ? "editorial"
      : "landing";

  const parts = [`tab=labs`, `style=${encodeURIComponent(styleId)}`];

  if (hybrid.layout && nodeById.get(hybrid.layout)?.kind === "layout") {
    parts.push(`lay=${encodeURIComponent(hybrid.layout)}`);
  }

  parts.push(`anims=${animIds.map(encodeURIComponent).join(",")}`);
  parts.push(`tpl=${tpl}`);

  if (hybrid.texture && nodeById.get(hybrid.texture)?.kind === "texture") {
    const texNode = nodeById.get(hybrid.texture);
    parts.push(`tex=${encodeURIComponent(hybrid.texture)}`);
    if (typeof texNode.defaultOpacity === "number") {
      parts.push(`texOp=${texNode.defaultOpacity.toFixed(2)}`);
    }
  }

  if (hybrid.typography && nodeById.get(hybrid.typography)?.kind === "typography") {
    parts.push(`type=${encodeURIComponent(hybrid.typography)}`);
  }

  const telIds = (hybrid.telemetry ?? [])
    .filter((id) => nodeById.get(id)?.kind === "telemetry")
    .slice(0, MAX_LAB_TELEMETRY);
  if (telIds.length > 0) {
    parts.push(`tel=${telIds.map(encodeURIComponent).join(",")}`);
  }

  return `${PLAYGROUND_BASE}?${parts.join("&")}`;
}

function getHybridRegistryItems(hybrid) {
  const ids = [
    hybrid.baseStyle,
    ...(hybrid.layout ? [hybrid.layout] : []),
    ...(hybrid.texture ? [hybrid.texture] : []),
    ...(hybrid.typography ? [hybrid.typography] : []),
    ...(hybrid.telemetry ?? []),
    ...(hybrid.accents ?? []),
  ];
  return ids
    .map((id) => nodeById.get(id)?.registryItem)
    .filter(Boolean);
}

function formatHybridStack(hybrid) {
  const parts = [`\`${hybrid.baseStyle}\``];
  if (hybrid.layout) parts.push(`lay:\`${hybrid.layout}\``);
  if (hybrid.texture) parts.push(`tex:\`${hybrid.texture}\``);
  if (hybrid.typography) parts.push(`type:\`${hybrid.typography}\``);
  for (const t of hybrid.telemetry ?? []) parts.push(`tel:\`${t}\``);
  for (const a of hybrid.accents ?? []) parts.push(`\`${a}\``);
  return parts.join(" + ");
}

const navHeader = `← [README](../../README.md) · [Styles (${styleNodes.length})](./styles.md) · [Animations (${animNodes.length})](./animations.md) · [Foundations (${foundationsCount})](./foundations.md) · [Hybrids (${hybrids.length})](./hybrids.md) · [Live Playground ↗](${PLAYGROUND_BASE})`;

// ============================================================================
// 1. Auto-Generated docs/catalog/*.md
// ============================================================================
fs.mkdirSync(catalogDir, { recursive: true });

// 1a. docs/catalog/styles.md
const stylesDoc = [
  navHeader,
  "",
  `# Styles Catalog (${styleNodes.length})`,
  "",
  `All ${styleNodes.length} aesthetic systems grouped across ${Object.keys(relations.clusters).length} clusters. Install any style with \`npx shadcn@latest add Aidilzin/ui-vault/<item>\`.`,
  "",
];
for (const [clusterId, meta] of Object.entries(relations.clusters)) {
  const clusterStyles = (meta.styles ?? [])
    .map((id) => nodeById.get(id))
    .filter(Boolean);
  stylesDoc.push(`## \`${clusterId}\` — ${meta.label} (${clusterStyles.length})`);
  stylesDoc.push("");
  stylesDoc.push(`> **DNA:** ${meta.dna}`);
  stylesDoc.push("");
  stylesDoc.push("| Style ID | Tier | Key Pairings | `shadcn` Item |");
  stylesDoc.push("| :--- | :--- | :--- | :--- |");
  for (const node of clusterStyles) {
    const pairings = (node.pairsWith ?? []).map((p) => `\`${p}\``).join(", ");
    stylesDoc.push(
      `| \`${node.id}\` | \`${node.tier}\` | ${pairings} | \`${node.registryItem}\` |`
    );
  }
  stylesDoc.push("");
}
fs.writeFileSync(path.join(catalogDir, "styles.md"), stylesDoc.join("\n"), "utf8");

// 1b. docs/catalog/animations.md
const animsDoc = [
  navHeader,
  "",
  `# Animations Catalog (${animNodes.length})`,
  "",
  `All ${animNodes.length} zero-bloat motion primitives grouped across ${(relations.mechanics ?? []).length} mechanics. Every component includes an explicit \`prefers-reduced-motion\` fallback. Install with \`npx shadcn@latest add Aidilzin/ui-vault/<item>\`.`,
  "",
];
for (const mechanic of relations.mechanics ?? []) {
  const mechAnims = animNodes.filter((a) => a.mechanic === mechanic);
  animsDoc.push(`## \`${mechanic}\` (${mechAnims.length})`);
  animsDoc.push("");
  animsDoc.push("| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |");
  animsDoc.push("| :--- | :--- | :--- | :--- | :--- | :--- |");
  for (const anim of mechAnims) {
    const title = animTitleByName.get(anim.registryItem) ?? anim.id;
    const engines = (anim.engine ?? []).map((e) => `\`${e}\``).join(", ");
    animsDoc.push(
      `| ${title} | \`${anim.tier}\` | ${engines} | \`${anim.perfTier}\` | \`${anim.reducedMotion}\` | \`${anim.registryItem}\` |`
    );
  }
  animsDoc.push("");
}
fs.writeFileSync(path.join(catalogDir, "animations.md"), animsDoc.join("\n"), "utf8");

// 1c. docs/catalog/foundations.md
const foundationsDoc = [
  navHeader,
  "",
  `# Foundations Catalog (${foundationsCount})`,
  "",
  `Jump to: [Textures (${textureNodes.length})](#textures) · [Typography (${typographyNodes.length})](#typography) · [Layouts (${layoutNodes.length})](#layouts) · [Telemetry (${telemetryNodes.length})](#telemetry)`,
  "",
  "## Textures",
  "",
  `${textureNodes.length} zero-JS adaptive CSS surface layers parameterized by \`--tx-color\`, \`--tx-opacity\`, and \`--tx-size\`.`,
  "",
  "| Texture | Tier | Layer | Mechanism | Key Pairings | `shadcn` Item |",
  "| :--- | :--- | :--- | :--- | :--- | :--- |",
];
for (const tex of textureNodes) {
  const pairings = (tex.pairsWith ?? []).slice(0, 4).map((p) => `\`${p}\``).join(", ");
  foundationsDoc.push(
    `| **${tex.name ?? tex.id}** (\`${tex.id}\`) | \`${tex.tier}\` | \`${tex.layer ?? "ground"}\` | \`${tex.mechanism ?? "css"}\` | ${pairings} | \`${tex.registryItem}\` |`
  );
}
foundationsDoc.push(
  "",
  "## Typography",
  "",
  `${typographyNodes.length} scoped fluid typography systems with \`clamp()\` scales, \`tabular-nums\`, and on-demand Google Fonts.`,
  "",
  "| System | Tier | Font Stack | Voice | `shadcn` Item |",
  "| :--- | :--- | :--- | :--- | :--- |"
);
for (const typo of typographyNodes) {
  const fonts = (typo.fonts ?? []).map((f) => `\`${f}\``).join(" + ");
  foundationsDoc.push(
    `| **${typo.name ?? typo.id}** (\`${typo.id}\`) | \`${typo.tier}\` | ${fonts} | ${typo.voice ?? ""} | \`${typo.registryItem}\` |`
  );
}
foundationsDoc.push(
  "",
  "## Layouts",
  "",
  `${layoutNodes.length} container-query (\`@container\`) page shells driven by \`--lay-*\` tokens with zero hardcoded palettes.`,
  "",
  "| Layout | Tier | Pattern | Slots | `shadcn` Item |",
  "| :--- | :--- | :--- | :--- | :--- |"
);
for (const lay of layoutNodes) {
  const slots = (lay.slots ?? []).map((s) => `\`${s}\``).join(", ");
  foundationsDoc.push(
    `| **${lay.name ?? lay.id}** (\`${lay.id}\`) | \`${lay.tier}\` | ${lay.pattern ?? ""} | ${slots} | \`${lay.registryItem}\` |`
  );
}
foundationsDoc.push(
  "",
  "## Telemetry",
  "",
  `${telemetryNodes.length} zero-library SVG/React micro-charts driven by adaptive \`--tel-*\` tokens.`,
  "",
  "| Telemetry | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |",
  "| :--- | :--- | :--- | :--- | :--- | :--- |"
);
for (const tel of telemetryNodes) {
  const engines = (tel.engine ?? []).map((e) => `\`${e}\``).join(", ");
  foundationsDoc.push(
    `| **${tel.name ?? tel.id}** (\`${tel.id}\`) | \`${tel.tier}\` | ${engines} | \`${tel.perfTier}\` | \`${tel.reducedMotion}\` | \`${tel.registryItem}\` |`
  );
}
foundationsDoc.push("");
fs.writeFileSync(path.join(catalogDir, "foundations.md"), foundationsDoc.join("\n"), "utf8");

// 1d. docs/catalog/hybrids.md
const hybridsDoc = [
  navHeader,
  "",
  `# Proven Hybrid Recipes (${hybrids.length})`,
  "",
  `Curated multi-layer stacks validated against \`relations.json\`. Click **Launch in Labs ↗** on any recipe to open it live in the dummy website studio.`,
  "",
  "| Recipe | Stack | Best For | Live Preview | Combined `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- |",
];
for (const hybrid of hybrids) {
  const regItems = getHybridRegistryItems(hybrid)
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ");
  const launchUrl = buildLaunchInLabsUrl(hybrid);
  hybridsDoc.push(
    `| **${hybrid.name}** (\`${hybrid.id}\`) | ${formatHybridStack(hybrid)} | ${hybrid.bestFor} | [Launch in Labs ↗](${launchUrl}) | \`npx shadcn@latest add ${regItems}\` |`
  );
}
hybridsDoc.push("");
fs.writeFileSync(path.join(catalogDir, "hybrids.md"), hybridsDoc.join("\n"), "utf8");

// ============================================================================
// 2. Lean Marker Blocks Inside README.md
// ============================================================================
const badgesBlock = [
  `[![Live Playground](https://img.shields.io/badge/Playground-Live-38bdf8?style=flat-square&labelColor=0f1115)](${PLAYGROUND_BASE})`,
  `[![Deploy Playground](https://img.shields.io/github/actions/workflow/status/Aidilzin/ui-vault/deploy-playground.yml?branch=main&style=flat-square&label=Pages&labelColor=0f1115)](https://github.com/Aidilzin/ui-vault/actions/workflows/deploy-playground.yml)`,
  `[![Registry Items](https://img.shields.io/badge/Registry-${totalItems}%20items%20%C2%B7%206%20layers-34d399?style=flat-square&labelColor=0f1115)](./relations.json)`,
  `[![License: MIT](https://img.shields.io/badge/License-MIT-8b94a3?style=flat-square&labelColor=0f1115)](./LICENSE)`,
].join("\n");

const overviewBlock = [
  "| Layer | Items | CLI Prefix | What It Controls | Explore |",
  "| :--- | ---: | :--- | :--- | :--- |",
  `| **Styles** | ${styleNodes.length} | \`style-*\` | Palette, surface elevation, borders, radii & anti-patterns (\`STYLE.md\` + \`tokens.css\`) | [Catalog](docs/catalog/styles.md) · [Playground ↗](${PLAYGROUND_BASE}?tab=styles) |`,
  `| **Animations** | ${animNodes.length} | \`<name>\` | Strict-TS React/CSS/Canvas motion primitives with \`prefers-reduced-motion\` | [Catalog](docs/catalog/animations.md) · [Playground ↗](${PLAYGROUND_BASE}) |`,
  `| **Textures** | ${textureNodes.length} | \`texture-*\` | Zero-JS adaptive surface & overlay CSS layers (\`--tx-color\`, \`--tx-opacity\`) | [Catalog](docs/catalog/foundations.md#textures) · [Playground ↗](${PLAYGROUND_BASE}?tab=foundations) |`,
  `| **Typography** | ${typographyNodes.length} | \`type-*\` | Scoped fluid \`clamp()\` pairings, \`tabular-nums\` & OpenType rules | [Catalog](docs/catalog/foundations.md#typography) · [Playground ↗](${PLAYGROUND_BASE}?tab=foundations) |`,
  `| **Layouts** | ${layoutNodes.length} | \`layout-*\` | Container-query (\`@container\`) page shells driven by \`--lay-*\` tokens | [Catalog](docs/catalog/foundations.md#layouts) · [Playground ↗](${PLAYGROUND_BASE}?tab=foundations) |`,
  `| **Telemetry** | ${telemetryNodes.length} | \`telemetry-*\` | Zero-library SVG/React micro-charts with WCAG-safe \`--tel-*\` tokens | [Catalog](docs/catalog/foundations.md#telemetry) · [Playground ↗](${PLAYGROUND_BASE}?tab=foundations) |`,
].join("\n");

const featuredHybrids = FEATURED_HYBRID_IDS
  .map((id) => hybrids.find((h) => h.id === id))
  .filter(Boolean);

const featuredBlock = [
  "| Recipe | Multi-Layer Stack | Install Bundle | Live Studio |",
  "| :--- | :--- | :--- | :--- |",
];
for (const hybrid of featuredHybrids) {
  const items = getHybridRegistryItems(hybrid);
  const compactAdd = `npx shadcn@latest add ${items.map((i) => `Aidilzin/ui-vault/${i}`).join(" ")}`;
  const launchUrl = buildLaunchInLabsUrl(hybrid);
  featuredBlock.push(
    `| **${hybrid.name}** | ${formatHybridStack(hybrid)} | \`${compactAdd}\` | [Launch in Labs ↗](${launchUrl}) |`
  );
}
featuredBlock.push("");
featuredBlock.push(
  `View all ${hybrids.length} hybrid recipes → [docs/catalog/hybrids.md](docs/catalog/hybrids.md)`
);

let readme = fs.readFileSync(readmePath, "utf8");
readme = replaceBlock(readme, "BADGES", badgesBlock);
readme = replaceBlock(readme, "OVERVIEW", overviewBlock);
readme = replaceBlock(readme, "FEATURED_HYBRIDS", featuredBlock.join("\n"));
fs.writeFileSync(readmePath, readme, "utf8");

console.log(
  `✔ Synced README.md & docs/catalog/* (${totalItems} items: ${styleNodes.length} styles, ${animNodes.length} animations, ${textureNodes.length} textures, ${typographyNodes.length} typography, ${layoutNodes.length} layouts, ${telemetryNodes.length} telemetry, ${hybrids.length} hybrids).`
);
