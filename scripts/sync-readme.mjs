import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const relations = JSON.parse(fs.readFileSync(path.join(rootDir, "relations.json"), "utf8"));
const animsReg = JSON.parse(fs.readFileSync(path.join(rootDir, "animations/registry.json"), "utf8"));
const readmePath = path.join(rootDir, "README.md");

const animTitleByName = new Map((animsReg.items ?? []).map((i) => [i.name, i.title]));
const nodeById = new Map((relations.nodes ?? []).map((n) => [n.id, n]));

const styleNodes = (relations.nodes ?? []).filter((n) => n.kind === "style");
const animNodes = (relations.nodes ?? []).filter((n) => n.kind === "animation");
const textureNodes = (relations.nodes ?? []).filter((n) => n.kind === "texture");
const typographyNodes = (relations.nodes ?? []).filter((n) => n.kind === "typography");
const layoutNodes = (relations.nodes ?? []).filter((n) => n.kind === "layout");
const telemetryNodes = (relations.nodes ?? []).filter((n) => n.kind === "telemetry");
const hybrids = relations.hybrids ?? [];
const totalItems =
  styleNodes.length +
  animNodes.length +
  textureNodes.length +
  typographyNodes.length +
  layoutNodes.length +
  telemetryNodes.length;

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

const badgeLine = `[![Registry Items](https://img.shields.io/badge/Registry-${totalItems}%20items%20%C2%B7%20${styleNodes.length}%20styles%20%C2%B7%20${animNodes.length}%20anims%20%C2%B7%20${textureNodes.length}%20tex%20%C2%B7%20${typographyNodes.length}%20type%20%C2%B7%20${layoutNodes.length}%20layouts%20%C2%B7%20${telemetryNodes.length}%20telemetry-34d399?style=flat-square&labelColor=0f1115)](./relations.json)`;

const stylesLines = [
  `### Styles by Aesthetic Cluster (${styleNodes.length})`,
  "",
  "| Cluster | Tier | Style ID | Key Pairings | `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- |",
];
for (const [clusterId, meta] of Object.entries(relations.clusters)) {
  for (const styleId of meta.styles ?? []) {
    const node = nodeById.get(styleId);
    if (!node) continue;
    const pairings = (node.pairsWith ?? []).map((p) => `\`${p}\``).join(", ");
    stylesLines.push(
      `| \`${clusterId}\` | \`${node.tier}\` | \`${node.id}\` | ${pairings} | \`npx shadcn@latest add Aidilzin/ui-vault/${node.registryItem}\` |`
    );
  }
}

const animLines = [
  `### Animations by Mechanic (${animNodes.length})`,
  "",
  "| Animation | Mechanic | Tier | Engine | Perf Tier | Reduced Motion Fallback | Registry Item |",
  "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |",
];
for (const anim of animNodes) {
  const title = animTitleByName.get(anim.registryItem) ?? anim.id;
  const engines = (anim.engine ?? []).map((e) => `\`${e}\``).join(", ");
  animLines.push(
    `| ${title} | \`${anim.mechanic}\` | \`${anim.tier}\` | ${engines} | \`${anim.perfTier}\` | \`${anim.reducedMotion}\` | \`${anim.registryItem}\` |`
  );
}

const textureLines = [
  `### Surface Textures (${textureNodes.length})`,
  "",
  "| Texture | Tier | Layer | Mechanism | Key Pairings | `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- | :--- |",
];
for (const tex of textureNodes) {
  const pairings = (tex.pairsWith ?? []).slice(0, 4).map((p) => `\`${p}\``).join(", ");
  textureLines.push(
    `| **${tex.name ?? tex.id}** (\`${tex.id}\`) | \`${tex.tier}\` | \`${tex.layer ?? "ground"}\` | \`${tex.mechanism ?? "css"}\` | ${pairings} | \`npx shadcn@latest add Aidilzin/ui-vault/${tex.registryItem}\` |`
  );
}

const typographyLines = [
  `### Typography Systems (${typographyNodes.length})`,
  "",
  "| System | Tier | Font Stack | Voice | `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- |",
];
for (const typo of typographyNodes) {
  const fonts = (typo.fonts ?? []).map((f) => `\`${f}\``).join(" + ");
  typographyLines.push(
    `| **${typo.name ?? typo.id}** (\`${typo.id}\`) | \`${typo.tier}\` | ${fonts} | ${typo.voice ?? ""} | \`npx shadcn@latest add Aidilzin/ui-vault/${typo.registryItem}\` |`
  );
}

const layoutLines = [
  `### Layout Shells (${layoutNodes.length})`,
  "",
  "| Layout | Tier | Pattern | Slots | `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- |",
];
for (const lay of layoutNodes) {
  const slots = (lay.slots ?? []).map((s) => `\`${s}\``).join(", ");
  layoutLines.push(
    `| **${lay.name ?? lay.id}** (\`${lay.id}\`) | \`${lay.tier}\` | ${lay.pattern ?? ""} | ${slots} | \`npx shadcn@latest add Aidilzin/ui-vault/${lay.registryItem}\` |`
  );
}

const telemetryLines = [
  `### Telemetry Micro-Charts (${telemetryNodes.length})`,
  "",
  "| Telemetry | Tier | Engine | Perf Tier | Reduced Motion Fallback | `shadcn` Install |",
  "| :--- | :--- | :--- | :--- | :--- | :--- |",
];
for (const tel of telemetryNodes) {
  const engines = (tel.engine ?? []).map((e) => `\`${e}\``).join(", ");
  telemetryLines.push(
    `| **${tel.name ?? tel.id}** (\`${tel.id}\`) | \`${tel.tier}\` | ${engines} | \`${tel.perfTier}\` | \`${tel.reducedMotion}\` | \`npx shadcn@latest add Aidilzin/ui-vault/${tel.registryItem}\` |`
  );
}

const hybridLines = [
  `### Proven Hybrid Recipes (${hybrids.length})`,
  "",
  "| Recipe | Stack (`baseStyle` + `layers`) | Best For | Combined `shadcn` Install |",
  "| :--- | :--- | :--- | :--- |",
];
for (const hybrid of hybrids) {
  const ids = [
    hybrid.baseStyle,
    ...(hybrid.layout ? [hybrid.layout] : []),
    ...(hybrid.texture ? [hybrid.texture] : []),
    ...(hybrid.typography ? [hybrid.typography] : []),
    ...(hybrid.telemetry ?? []),
    ...(hybrid.accents ?? []),
  ];
  const regItems = ids
    .map((id) => nodeById.get(id)?.registryItem)
    .filter(Boolean)
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ");
  const extras = [
    ...(hybrid.layout ? [`lay:\`${hybrid.layout}\``] : []),
    ...(hybrid.texture ? [`tex:\`${hybrid.texture}\``] : []),
    ...(hybrid.typography ? [`type:\`${hybrid.typography}\``] : []),
    ...(hybrid.telemetry ?? []).map((t) => `tel:\`${t}\``),
    ...(hybrid.accents ?? []).map((a) => `\`${a}\``),
  ].join(", ");
  hybridLines.push(
    `| **${hybrid.name}** (\`${hybrid.id}\`) | \`${hybrid.baseStyle}\` + ${extras} | ${hybrid.bestFor} | \`npx shadcn@latest add ${regItems}\` |`
  );
}

let readme = fs.readFileSync(readmePath, "utf8");
readme = replaceBlock(readme, "BADGE", badgeLine);
readme = replaceBlock(readme, "STYLES", stylesLines.join("\n"));
readme = replaceBlock(readme, "ANIMATIONS", animLines.join("\n"));
readme = replaceBlock(readme, "TEXTURES", textureLines.join("\n"));
readme = replaceBlock(readme, "TYPOGRAPHY", typographyLines.join("\n"));
readme = replaceBlock(readme, "LAYOUTS", layoutLines.join("\n"));
readme = replaceBlock(readme, "TELEMETRY", telemetryLines.join("\n"));
readme = replaceBlock(readme, "HYBRIDS", hybridLines.join("\n"));
fs.writeFileSync(readmePath, readme, "utf8");

console.log(
  `✔ Synced README.md (${totalItems} items: ${styleNodes.length} styles, ${animNodes.length} animations, ${textureNodes.length} textures, ${typographyNodes.length} typography, ${layoutNodes.length} layouts, ${telemetryNodes.length} telemetry, ${hybrids.length} hybrids).`
);
