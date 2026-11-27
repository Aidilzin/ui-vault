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
const layoutsReg = readJson("layouts/registry.json");
const telemetryReg = readJson("telemetry/registry.json");

if (
  !relations ||
  !stylesReg ||
  !animsReg ||
  !texturesReg ||
  !typographyReg ||
  !layoutsReg ||
  !telemetryReg
) {
  console.error("Vault check aborted due to missing JSON manifests.");
  process.exit(1);
}

const clusterIds = new Set(Object.keys(relations.clusters ?? {}));
const mechanicIds = new Set(relations.mechanics ?? []);
const validTiers = new Set(relations.tiers ?? ["production", "viral", "experimental"]);
const validPerfTiers = new Set(["low", "medium", "high"]);
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
const layoutNodes = nodes.filter((n) => n.kind === "layout");
const telemetryNodes = nodes.filter((n) => n.kind === "telemetry");

// 2. Validate cluster -> style references & style files
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
  if (!fs.existsSync(path.join(rootDir, tex.path))) {
    errors.push(`Missing texture CSS on disk for "${tex.id}": ${tex.path}`);
  }
}

// 3c. Validate typography nodes & files on disk
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
  const typeCssPath = path.join(path.dirname(typeMdPath), "typography.css");
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
    errors.push(`Missing typography.css for "${typo.id}": ${path.relative(rootDir, typeCssPath)}`);
  }
}

// 3d. Validate layout nodes & files on disk
const layoutsInIndex = new Set(relations.layouts ?? []);
for (const layId of layoutsInIndex) {
  const node = nodeById.get(layId);
  if (!node || node.kind !== "layout") {
    errors.push(`relations.layouts references missing layout node "${layId}"`);
  }
}
for (const lay of layoutNodes) {
  if (!layoutsInIndex.has(lay.id)) {
    errors.push(`Layout "${lay.id}" is missing from relations.layouts index`);
  }
  const layMdPath = path.join(rootDir, lay.path);
  const layDir = path.dirname(layMdPath);
  const layTsxPath = path.join(layDir, `${lay.id}.tsx`);
  const layCssPath = path.join(layDir, `${lay.id}.css`);
  if (!fs.existsSync(layMdPath)) {
    errors.push(`Missing LAYOUT.md on disk for "${lay.id}": ${lay.path}`);
  } else {
    const raw = fs.readFileSync(layMdPath, "utf8");
    const idMatch = raw.match(/^id:\s*(.+)$/m);
    if (!idMatch || idMatch[1].trim() !== lay.id) {
      errors.push(`LAYOUT.md frontmatter id mismatch for "${lay.id}"`);
    }
  }
  if (!fs.existsSync(layTsxPath)) {
    errors.push(`Missing layout TSX for "${lay.id}": ${path.relative(rootDir, layTsxPath)}`);
  }
  if (!fs.existsSync(layCssPath)) {
    errors.push(`Missing layout CSS for "${lay.id}": ${path.relative(rootDir, layCssPath)}`);
  }
}

// 3e. Validate telemetry nodes & files on disk
const telemetryInIndex = new Set(relations.telemetry ?? []);
for (const telId of telemetryInIndex) {
  const node = nodeById.get(telId);
  if (!node || node.kind !== "telemetry") {
    errors.push(`relations.telemetry references missing telemetry node "${telId}"`);
  }
}
for (const tel of telemetryNodes) {
  if (!telemetryInIndex.has(tel.id)) {
    errors.push(`Telemetry "${tel.id}" is missing from relations.telemetry index`);
  }
  if (!validPerfTiers.has(tel.perfTier)) {
    errors.push(`Telemetry "${tel.id}" has invalid perfTier "${tel.perfTier}"`);
  }
  if (!tel.reducedMotion || typeof tel.reducedMotion !== "string") {
    errors.push(`Telemetry "${tel.id}" is missing reducedMotion fallback metadata`);
  }
  if (!fs.existsSync(path.join(rootDir, tel.path))) {
    errors.push(`Missing telemetry file on disk for "${tel.id}": ${tel.path}`);
  }
}

// 4. Validate pairsWith / clashesWith edges across all 6 kinds
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

// 5. Validate hybrids (including optional layout, texture, typography & telemetry slots)
for (const hybrid of relations.hybrids ?? []) {
  if (!nodeById.has(hybrid.baseStyle)) {
    errors.push(`Hybrid "${hybrid.id}" references unknown baseStyle "${hybrid.baseStyle}"`);
  }
  if (hybrid.layout && nodeById.get(hybrid.layout)?.kind !== "layout") {
    errors.push(`Hybrid "${hybrid.id}" references unknown layout "${hybrid.layout}"`);
  }
  if (hybrid.texture && nodeById.get(hybrid.texture)?.kind !== "texture") {
    errors.push(`Hybrid "${hybrid.id}" references unknown texture "${hybrid.texture}"`);
  }
  if (hybrid.typography && nodeById.get(hybrid.typography)?.kind !== "typography") {
    errors.push(`Hybrid "${hybrid.id}" references unknown typography "${hybrid.typography}"`);
  }
  for (const telId of hybrid.telemetry ?? []) {
    if (nodeById.get(telId)?.kind !== "telemetry") {
      errors.push(`Hybrid "${hybrid.id}" references unknown telemetry "${telId}"`);
    }
  }
  for (const acc of hybrid.accents ?? []) {
    if (!nodeById.has(acc)) {
      errors.push(`Hybrid "${hybrid.id}" references unknown accent "${acc}"`);
    }
  }
}

function checkRegistryParity(label, dirName, reg, kindNodes, requiredSuffixes = []) {
  const regByName = new Map((reg.items ?? []).map((i) => [i.name, i]));
  for (const node of kindNodes) {
    const item = regByName.get(node.registryItem);
    if (!item) {
      errors.push(`${label} "${node.id}" (${node.registryItem}) missing from ${dirName}/registry.json`);
      continue;
    }
    for (const suffix of requiredSuffixes) {
      const hasSuffix = (item.files ?? []).some((f) => f.path.endsWith(suffix));
      if (!hasSuffix) {
        errors.push(`${dirName}/registry.json "${item.name}" missing ${suffix} entry`);
      }
    }
    for (const f of item.files ?? []) {
      const disk = path.join(rootDir, dirName, f.path);
      if (!fs.existsSync(disk)) {
        errors.push(`${dirName}/registry.json "${item.name}" references missing file: ${dirName}/${f.path}`);
      }
    }
  }
  for (const item of reg.items ?? []) {
    if (!kindNodes.some((n) => n.registryItem === item.name)) {
      errors.push(`Orphaned ${label.toLowerCase()} in ${dirName}/registry.json not in relations.json: "${item.name}"`);
    }
  }
}

// 6. Parity between relations.json and all 6 sub-registries
checkRegistryParity("Style", "styles", stylesReg, styleNodes, ["/STYLE.md", "/tokens.css"]);
checkRegistryParity("Animation", "animations", animsReg, animNodes);
checkRegistryParity("Texture", "textures", texturesReg, textureNodes);
checkRegistryParity("Typography", "typography", typographyReg, typographyNodes, [
  "/TYPOGRAPHY.md",
  "/typography.css",
]);
checkRegistryParity("Layout", "layouts", layoutsReg, layoutNodes, ["/LAYOUT.md", ".tsx", ".css"]);
checkRegistryParity("Telemetry", "telemetry", telemetryReg, telemetryNodes, [".tsx"]);

// 7. Check for orphaned directories/files on disk across all 6 categories
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
  if (nodeById.get(dir.name)?.kind !== "typography") {
    errors.push(`Orphaned typography directory on disk: typography/${dir.name}`);
  }
}

const layoutsRoot = path.join(rootDir, "layouts");
for (const dir of fs.readdirSync(layoutsRoot, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  if (nodeById.get(dir.name)?.kind !== "layout") {
    errors.push(`Orphaned layout directory on disk: layouts/${dir.name}`);
  }
}

const telemetryRoot = path.join(rootDir, "telemetry");
const expectedTelPaths = new Set(telemetryNodes.map((t) => path.normalize(path.join(rootDir, t.path))));
for (const file of fs.readdirSync(telemetryRoot, { withFileTypes: true })) {
  if (!file.isFile() || !file.name.endsWith(".tsx")) continue;
  const full = path.normalize(path.join(telemetryRoot, file.name));
  if (!expectedTelPaths.has(full)) {
    errors.push(`Orphaned telemetry file on disk: telemetry/${file.name}`);
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
  `✔ Vault parity check passed: ${styleNodes.length} styles, ${animNodes.length} animations, ${textureNodes.length} textures, ${typographyNodes.length} typography, ${layoutNodes.length} layouts, ${telemetryNodes.length} telemetry, ${(relations.hybrids ?? []).length} hybrids, 0 orphans.`
);
