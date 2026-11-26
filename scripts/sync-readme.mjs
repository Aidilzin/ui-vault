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

const badgeLine = `[![Registry Items](https://img.shields.io/badge/Registry-${styleNodes.length}%20styles%20%C2%B7%20${animNodes.length}%20animations-34d399?style=flat-square&labelColor=0f1115)](./relations.json)`;

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

const hybridLines = [
  `### Proven Hybrid Recipes (${hybrids.length})`,
  "",
  "| Recipe | Stack (`baseStyle` + `accents`) | Best For | Combined `shadcn` Install |",
  "| :--- | :--- | :--- | :--- |",
];
for (const hybrid of hybrids) {
  const ids = [hybrid.baseStyle, ...(hybrid.accents ?? [])];
  const regItems = ids
    .map((id) => nodeById.get(id)?.registryItem)
    .filter(Boolean)
    .map((item) => `Aidilzin/ui-vault/${item}`)
    .join(" ");
  const accentsStr = (hybrid.accents ?? []).map((a) => `\`${a}\``).join(", ");
  hybridLines.push(
    `| **${hybrid.name}** (\`${hybrid.id}\`) | \`${hybrid.baseStyle}\` + ${accentsStr} | ${hybrid.bestFor} | \`npx shadcn@latest add ${regItems}\` |`
  );
}

let readme = fs.readFileSync(readmePath, "utf8");
readme = replaceBlock(readme, "BADGE", badgeLine);
readme = replaceBlock(readme, "STYLES", stylesLines.join("\n"));
readme = replaceBlock(readme, "ANIMATIONS", animLines.join("\n"));
readme = replaceBlock(readme, "HYBRIDS", hybridLines.join("\n"));
fs.writeFileSync(readmePath, readme, "utf8");

console.log(
  `✔ Synced README.md (${styleNodes.length} styles, ${animNodes.length} animations, ${hybrids.length} hybrids).`
);
