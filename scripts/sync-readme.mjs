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
const hybrids = relations.hybrids ?? [];

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

const badgeLine = `[![Registry Items](https://img.shields.io/badge/Registry-${styleNodes.length}%20styles%20%C2%B7%20${animNodes.length}%20animations%20%C2%B7%20${textureNodes.length}%20textures%20%C2%B7%20${typographyNodes.length}%20typography-34d399?style=flat-square&labelColor=0f1115)](./relations.json)`;

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

const hybridLines = [
  `### Proven Hybrid Recipes (${hybrids.length})`,
  "",
  "| Recipe | Stack (`baseStyle` + `accents`) | Best For | Combined `shadcn` Install |",
  "| :--- | :--- | :--- | :--- |",
];
for (const hybrid of hybrids) {
  const ids = [
    hybrid.baseStyle,
    ...(hybrid.texture ? [hybrid.texture] : []),
    ...(hybrid.typography ? [hybrid.typography] : []),
    ...(hybrid.accents ?? []),
  ];
  const regItems = ids
    .map((id) => nodeById.get(id)?.registryItem)
    .filter(Boolean)
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ");
  const extras = [
    ...(hybrid.texture ? [`tex:\`${hybrid.texture}\``] : []),
    ...(hybrid.typography ? [`type:\`${hybrid.typography}\``] : []),
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
readme = replaceBlock(readme, "HYBRIDS", hybridLines.join("\n"));
fs.writeFileSync(readmePath, readme, "utf8");

console.log(
  `✔ Synced README.md (${styleNodes.length} styles, ${animNodes.length} animations, ${textureNodes.length} textures, ${typographyNodes.length} typography, ${hybrids.length} hybrids).`
);
