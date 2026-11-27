import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const errors = [];

function readJson(relPath) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${relPath}`);
    return null;
  }
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

const relations = readJson("relations.json");
const stylesReg = readJson("styles/registry.json");
const animsReg = readJson("animations/registry.json");
const texturesReg = readJson("textures/registry.json");
const typographyReg = readJson("typography/registry.json");

if (!relations || !stylesReg || !animsReg || !texturesReg || !typographyReg) {
  console.error("Vault check aborted due to missing JSON manifests.");
  process.exit(1);
}

const clusterIds = new Set(Object.keys(relations.clusters ?? {}));
const mechanicIds = new Set(relations.mechanics ?? []);
const validTiers = new Set(relations.tiers ?? ["production", "viral", "experimental"]);
const nodes = relations.nodes ?? [];

// 1. Duplicate ID / registryItem / tier check
const nodeById = new Map();
const seenRegistryItems = new Set();
for (const node of nodes) {
  if (!node.tier || !validTiers.has(node.tier)) {
    errors.push(`Node "${node.id}" has missing or invalid tier: "${node.tier}"`);
  }
  if (nodeById.has(node.id)) {
    errors.push(`Duplicate node id in relations.json: "${node.id}"`);
  }
  nodeById.set(node.id, node);

  if (seenRegistryItems.has(node.registryItem)) {
    errors.push(`Duplicate registryItem in relations.json: "${node.registryItem}"`);
  }
  seenRegistryItems.add(node.registryItem);
}

const styleNodes = nodes.filter((n) => n.kind === "style");
const animNodes = nodes.filter((n) => n.kind === "animation");
const textureNodes = nodes.filter((n) => n.kind === "texture");
const typographyNodes = nodes.filter((n) => n.kind === "typography");

// 2. Validate cluster -> style references & style node -> cluster references
const stylesInClusters = new Set();
for (const [clusterId, meta] of Object.entries(relations.clusters)) {
  for (const styleId of meta.styles ?? []) {
    if (stylesInClusters.has(styleId)) {
      errors.push(`Style "${styleId}" listed in multiple clusters`);
    }
    stylesInClusters.add(styleId);
    const node = nodeById.get(styleId);
    if (!node || node.kind !== "style") {
      errors.push(`Cluster "${clusterId}" references missing style node "${styleId}"`);
    } else if (node.cluster !== clusterId) {
      errors.push(
        `Cluster mismatch for "${styleId}": cluster lists "${clusterId}", node has "${node.cluster}"`
      );
    }
  }
}

for (const style of styleNodes) {
  if (!clusterIds.has(style.cluster)) {
    errors.push(`Style "${style.id}" references unknown cluster "${style.cluster}"`);
  }
  if (!stylesInClusters.has(style.id)) {
    errors.push(`Style "${style.id}" is missing from clusters["${style.cluster}"].styles`);
  }

  const styleMdPath = path.join(rootDir, style.path);
  const styleDir = path.dirname(styleMdPath);
  const tokensPath = path.join(styleDir, "tokens.css");

  if (!fs.existsSync(styleMdPath)) {
    errors.push(`Missing STYLE.md on disk for "${style.id}": ${style.path}`);
  } else {
    const raw = fs.readFileSync(styleMdPath, "utf8");
    const idMatch = raw.match(/^id:\s*(.+)$/m);
    if (!idMatch || idMatch[1].trim() !== style.id) {
      errors.push(`STYLE.md frontmatter id mismatch for "${style.id}"`);
    }
  }

  if (!fs.existsSync(tokensPath)) {
    errors.push(`Missing tokens.css for style "${style.id}": ${path.relative(rootDir, tokensPath)}`);
  }
}

// 3. Validate animation nodes & files on disk
const validPerfTiers = new Set(["low", "medium", "high"]);
for (const anim of animNodes) {
  if (!mechanicIds.has(anim.mechanic)) {
    errors.push(`Animation "${anim.id}" has unknown mechanic "${anim.mechanic}"`);
  }
  if (!validPerfTiers.has(anim.perfTier)) {
    errors.push(`Animation "${anim.id}" has invalid perfTier "${anim.perfTier}"`);
  }
  if (!anim.reducedMotion || typeof anim.reducedMotion !== "string") {
    errors.push(`Animation "${anim.id}" is missing reducedMotion fallback metadata`);
  }
  const fullPath = path.join(rootDir, anim.path);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing animation file on disk for "${anim.id}": ${anim.path}`);
  }
}

// 3b. Validate texture nodes & index parity
const texturesInIndex = new Set(relations.textures ?? []);
for (const texId of texturesInIndex) {
  const node = nodeById.get(texId);
  if (!node || node.kind !== "texture") {
    errors.push(`relations.textures references missing texture node "${texId}"`);
  }
}
for (const tex of textureNodes) {
  if (!texturesInIndex.has(tex.id)) {
    errors.push(`Texture "${tex.id}" is missing from relations.textures index`);
  }
  const fullPath = path.join(rootDir, tex.path);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing texture CSS on disk for "${tex.id}": ${tex.path}`);
  }
}

// 3c. Validate typography nodes, index parity & files on disk
const typographyInIndex = new Set(relations.typography ?? []);
for (const typeId of typographyInIndex) {
  const node = nodeById.get(typeId);
  if (!node || node.kind !== "typography") {
    errors.push(`relations.typography references missing typography node "${typeId}"`);
  }
}
for (const typo of typographyNodes) {
  if (!typographyInIndex.has(typo.id)) {
    errors.push(`Typography "${typo.id}" is missing from relations.typography index`);
  }
  const typeMdPath = path.join(rootDir, typo.path);
  const typeDir = path.dirname(typeMdPath);
  const typeCssPath = path.join(typeDir, "typography.css");

  if (!fs.existsSync(typeMdPath)) {
    errors.push(`Missing TYPOGRAPHY.md on disk for "${typo.id}": ${typo.path}`);
  } else {
    const raw = fs.readFileSync(typeMdPath, "utf8");
    const idMatch = raw.match(/^id:\s*(.+)$/m);
    if (!idMatch || idMatch[1].trim() !== typo.id) {
      errors.push(`TYPOGRAPHY.md frontmatter id mismatch for "${typo.id}"`);
    }
  }

  if (!fs.existsSync(typeCssPath)) {
    errors.push(
      `Missing typography.css for "${typo.id}": ${path.relative(rootDir, typeCssPath)}`
    );
  }
}

// 4. Validate pairsWith / clashesWith edges across all 4 kinds
for (const node of nodes) {
  const pairs = new Set(node.pairsWith ?? []);
  const clashes = new Set(node.clashesWith ?? []);
  for (const target of pairs) {
    if (!nodeById.has(target)) {
      errors.push(`Broken pairsWith edge: "${node.id}" -> "${target}"`);
    }
    if (clashes.has(target)) {
      errors.push(`Conflicting edge: "${node.id}" both pairsWith and clashesWith "${target}"`);
    }
  }
  for (const target of clashes) {
    if (!nodeById.has(target)) {
      errors.push(`Broken clashesWith edge: "${node.id}" -> "${target}"`);
    }
  }
}

// 5. Validate hybrids (including optional texture & typography slots)
for (const hybrid of relations.hybrids ?? []) {
  if (!nodeById.has(hybrid.baseStyle)) {
    errors.push(`Hybrid "${hybrid.id}" references unknown baseStyle "${hybrid.baseStyle}"`);
  }
  if (hybrid.texture && nodeById.get(hybrid.texture)?.kind !== "texture") {
    errors.push(`Hybrid "${hybrid.id}" references unknown texture "${hybrid.texture}"`);
  }
  if (hybrid.typography && nodeById.get(hybrid.typography)?.kind !== "typography") {
    errors.push(`Hybrid "${hybrid.id}" references unknown typography "${hybrid.typography}"`);
  }
  for (const acc of hybrid.accents ?? []) {
    if (!nodeById.has(acc)) {
      errors.push(`Hybrid "${hybrid.id}" references unknown accent "${acc}"`);
    }
  }
}

// 6. Parity between relations.json and styles/registry.json
const styleRegByName = new Map((stylesReg.items ?? []).map((i) => [i.name, i]));
for (const style of styleNodes) {
  const item = styleRegByName.get(style.registryItem);
  if (!item) {
    errors.push(`Style "${style.id}" (${style.registryItem}) missing from styles/registry.json`);
    continue;
  }
  const hasStyleMd = (item.files ?? []).some((f) => f.path.endsWith("/STYLE.md"));
  const hasTokens = (item.files ?? []).some((f) => f.path.endsWith("/tokens.css"));
  if (!hasStyleMd) errors.push(`styles/registry.json "${item.name}" missing STYLE.md entry`);
  if (!hasTokens) errors.push(`styles/registry.json "${item.name}" missing tokens.css entry`);
  for (const f of item.files ?? []) {
    const disk = path.join(rootDir, "styles", f.path);
    if (!fs.existsSync(disk)) {
      errors.push(`styles/registry.json "${item.name}" references missing file: styles/${f.path}`);
    }
  }
}
for (const item of stylesReg.items ?? []) {
  if (!styleNodes.some((s) => s.registryItem === item.name)) {
    errors.push(`Orphaned style in styles/registry.json not in relations.json: "${item.name}"`);
  }
}

// 7. Parity between relations.json and animations/registry.json
const animRegByName = new Map((animsReg.items ?? []).map((i) => [i.name, i]));
for (const anim of animNodes) {
  const item = animRegByName.get(anim.registryItem);
  if (!item) {
    errors.push(`Animation "${anim.id}" (${anim.registryItem}) missing from animations/registry.json`);
    continue;
  }
  for (const f of item.files ?? []) {
    const disk = path.join(rootDir, "animations", f.path);
    if (!fs.existsSync(disk)) {
      errors.push(
        `animations/registry.json "${item.name}" references missing file: animations/${f.path}`
      );
    }
  }
}
for (const item of animsReg.items ?? []) {
  if (!animNodes.some((a) => a.registryItem === item.name)) {
    errors.push(`Orphaned animation in animations/registry.json not in relations.json: "${item.name}"`);
  }
}

// 7b. Parity between relations.json and textures/registry.json
const texRegByName = new Map((texturesReg.items ?? []).map((i) => [i.name, i]));
for (const tex of textureNodes) {
  const item = texRegByName.get(tex.registryItem);
  if (!item) {
    errors.push(`Texture "${tex.id}" (${tex.registryItem}) missing from textures/registry.json`);
    continue;
  }
  for (const f of item.files ?? []) {
    const disk = path.join(rootDir, "textures", f.path);
    if (!fs.existsSync(disk)) {
      errors.push(`textures/registry.json "${item.name}" references missing file: textures/${f.path}`);
    }
  }
}
for (const item of texturesReg.items ?? []) {
  if (!textureNodes.some((t) => t.registryItem === item.name)) {
    errors.push(`Orphaned texture in textures/registry.json not in relations.json: "${item.name}"`);
  }
}

// 7c. Parity between relations.json and typography/registry.json
const typoRegByName = new Map((typographyReg.items ?? []).map((i) => [i.name, i]));
for (const typo of typographyNodes) {
  const item = typoRegByName.get(typo.registryItem);
  if (!item) {
    errors.push(`Typography "${typo.id}" (${typo.registryItem}) missing from typography/registry.json`);
    continue;
  }
  const hasTypeMd = (item.files ?? []).some((f) => f.path.endsWith("/TYPOGRAPHY.md"));
  const hasTypeCss = (item.files ?? []).some((f) => f.path.endsWith("/typography.css"));
  if (!hasTypeMd) errors.push(`typography/registry.json "${item.name}" missing TYPOGRAPHY.md entry`);
  if (!hasTypeCss) errors.push(`typography/registry.json "${item.name}" missing typography.css entry`);
  for (const f of item.files ?? []) {
    const disk = path.join(rootDir, "typography", f.path);
    if (!fs.existsSync(disk)) {
      errors.push(`typography/registry.json "${item.name}" references missing file: typography/${f.path}`);
    }
  }
}
for (const item of typographyReg.items ?? []) {
  if (!typographyNodes.some((t) => t.registryItem === item.name)) {
    errors.push(`Orphaned typography in typography/registry.json not in relations.json: "${item.name}"`);
  }
}

// 8. Check for orphaned directories/files on disk across all 4 categories
const stylesRoot = path.join(rootDir, "styles");
for (const clusterDir of fs.readdirSync(stylesRoot, { withFileTypes: true })) {
  if (!clusterDir.isDirectory()) continue;
  const clusterPath = path.join(stylesRoot, clusterDir.name);
  for (const styleDir of fs.readdirSync(clusterPath, { withFileTypes: true })) {
    if (!styleDir.isDirectory()) continue;
    if (!nodeById.has(styleDir.name)) {
      errors.push(`Orphaned style directory on disk: styles/${clusterDir.name}/${styleDir.name}`);
    }
  }
}

const animsRoot = path.join(rootDir, "animations");
const expectedAnimPaths = new Set(animNodes.map((a) => path.normalize(path.join(rootDir, a.path))));
for (const mechDir of fs.readdirSync(animsRoot, { withFileTypes: true })) {
  if (!mechDir.isDirectory()) continue;
  const mechPath = path.join(animsRoot, mechDir.name);
  for (const file of fs.readdirSync(mechPath, { withFileTypes: true })) {
    if (!file.isFile()) continue;
    const full = path.normalize(path.join(mechPath, file.name));
    if (!expectedAnimPaths.has(full)) {
      errors.push(`Orphaned animation file on disk: animations/${mechDir.name}/${file.name}`);
    }
  }
}

const texturesRoot = path.join(rootDir, "textures");
const expectedTexPaths = new Set(textureNodes.map((t) => path.normalize(path.join(rootDir, t.path))));
for (const file of fs.readdirSync(texturesRoot, { withFileTypes: true })) {
  if (!file.isFile() || !file.name.endsWith(".css")) continue;
  const full = path.normalize(path.join(texturesRoot, file.name));
  if (!expectedTexPaths.has(full)) {
    errors.push(`Orphaned texture CSS on disk: textures/${file.name}`);
  }
}

const typographyRoot = path.join(rootDir, "typography");
for (const dir of fs.readdirSync(typographyRoot, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  if (!nodeById.has(dir.name) || nodeById.get(dir.name)?.kind !== "typography") {
    errors.push(`Orphaned typography directory on disk: typography/${dir.name}`);
  }
}

if (errors.length > 0) {
  console.error(`\n✖ Vault parity check failed (${errors.length} error${errors.length === 1 ? "" : "s"}):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(
  `✔ Vault parity check passed: ${styleNodes.length} styles, ${animNodes.length} animations, ${textureNodes.length} textures, ${typographyNodes.length} typography, ${(relations.hybrids ?? []).length} hybrids, 0 orphans.`
);
