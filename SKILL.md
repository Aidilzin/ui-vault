---
name: ui-vault
description: Curated visual design styles, adaptive surface textures, fluid typography systems, and experimental web animations grouped by aesthetic cluster and motion mechanic. Use whenever the user asks to apply a specific UI aesthetic, layer surface textures or typography scales, blend experimental styles, or add named micro-interactions.
---

# UI Vault Workflow

Follow the **4-Layer Composition Workflow** (`Style + Typography + Texture + Animations`) whenever styling an interface or adding motion from this vault:

1. **Read `relations.json` first.** Locate the requested base style, typography system, surface texture, cluster, tier (`production` | `viral` | `experimental`), or hybrid recipe before writing any CSS or JSX.
2. **Respect tier boundaries & compatibility.** Default to `production` base styles, textures, and typography for mainstream SaaS/apps, layer at most 1–2 restrained `viral` accents, and reserve `experimental` aesthetics for portfolios, creative labs, or explicit user requests. Verify `pairsWith` across all 4 kinds and never mix entries listed in `clashesWith` unless explicitly asked.
3. **Layer the 4 foundations cleanly:**
   - **Layer 1 — Base Style (`styles/`):** Read `STYLE.md` and `tokens.css` as the source of truth for palette, surface elevation, border width/radius, and forbidden anti-patterns.
   - **Layer 2 — Typography System (`typography/`):** Optionally pair or override with a fluid typography package (`TYPOGRAPHY.md` + scoped `.type-<id>` in `typography.css`) using `clamp()` scales, `tabular-nums`, and `text-wrap: balance`. Never mutate global `html`/`body` font sizes outside a scoped container.
   - **Layer 3 — Surface Texture (`textures/`):** Optionally layer a zero-JS adaptive texture (`.tx-<id>`) parameterized by `--tx-color`, `--tx-opacity`, and `--tx-size`. Mount ground textures (`dot-matrix`, `architect-grid`, `paper-fiber`, etc.) behind cards at `z-index: 0` and atmospheric overlays (`film-grain`, `crt-scanlines`, `radial-vignette`) as full-surface `pointer-events: none` overlays.
   - **Layer 4 — Animations (`animations/`):** Prefer components already in `animations/` (or install via `npx shadcn@latest add Aidilzin/ui-vault/<item>`). Check `externalRegistries` in `relations.json` before hand-rolling motion code.
4. **Enforce motion hygiene.** Every animation must:
   - Honor `prefers-reduced-motion: reduce` using the fallback specified in `relations.json`.
   - Animate compositor-only properties (`transform`, `opacity`) where possible.
   - Keep productivity/dashboard transitions brisk (`100–220ms`); reserve longer timelines for dedicated showcase/hero scenes.

## Ingesting New Vault Items

Use these repeatable pipelines whenever expanding the vault:

### Adding a Style (Live URL -> Vault)
1. **Extract tokens with Dembrandt MCP.** Run the configured `dembrandt` MCP server against a reference URL to capture palette, surface hierarchy, typography, borders, radii, and shadow rules.
2. **Assign a cluster & tier.** Place the style under one of the 6 clusters in `relations.json` and assign a required `tier` (`production`, `viral`, or `experimental`).
3. **Author the spec.** Create `styles/<cluster>/<style-id>/STYLE.md` (YAML frontmatter + `Core Tokens & Surfaces`, `Typography & Layout`, and `Forbidden Anti-Patterns`) and `tokens.css`.
4. **Register metadata.** Add the style node to `relations.json` (with `pairsWith` / `clashesWith`), `styles/registry.json`, and root `registry.json`.
5. **Wire into Playground.** Add an authentic mini-UI swatch in `playground/src/swatches/`.

### Adding a Surface Texture (`textures/`)
1. **Follow the Adaptive CSS Rule.** Create `textures/<id>.css` using pure CSS gradients referencing `var(--tx-color, currentColor)` or inline SVG `mask-image` / `-webkit-mask-image` over `background-color: var(--tx-color, currentColor)` (or balanced monochrome `feTurbulence` noise for organic grain). Never hardcode fixed black/white strokes inside an SVG `background-image`.
2. **Scope cleanly.** Define `:where(.tx-<id>) { position: relative; isolation: isolate; }` and paint the surface on `.tx-<id>::before` (`position: absolute; inset: 0; pointer-events: none;`) parameterized by `--tx-color`, `--tx-opacity`, and `--tx-size`.
3. **Register metadata.** Add the item (`type: "registry:item"`, CLI name `texture-<id>`, file `type: "registry:file"`, target `~/src/styles/textures/<id>.css`) to `textures/registry.json` and add the node + index ID to `relations.json`.

### Adding a Typography System (`typography/`)
1. **Author spec & scoped CSS.** Create `typography/<id>/TYPOGRAPHY.md` (YAML frontmatter with `id`, `name`, `tier`, `voice`, `googleFontsUrl`, `pairsWith`, `clashesWith`, plus rationale, fluid scale, OpenType rules, and anti-patterns) and `typography/<id>/typography.css` scoped strictly to `.type-<id>` with fluid `clamp()` tokens, `tabular-nums`, and `text-wrap: balance`.
2. **Register metadata.** Add the item (`type: "registry:item"`, CLI name `type-<id>`, installing `~/TYPOGRAPHY.md` and `~/src/styles/typography-<id>.css`) to `typography/registry.json` and add the node + index ID to `relations.json`.

### Adding an Animation (`animations/`)
1. **Assign a mechanic.** Place the primitive under `animations/<mechanic>/<animation-id>.tsx` (or `.css`) using one of the 8 mechanics.
2. **Enforce constraints & license hygiene.** Only adapt verified open-source (`MIT`, `Apache-2.0`, `ISC`) registries or author `clean-room` implementations; keep dependencies minimal and implement an explicit `prefers-reduced-motion: reduce` fallback.
3. **Register metadata.** Add the animation node to `relations.json` and `animations/registry.json`, then wire its live demo into `playground/src/demos/`.

### Verification Gate (Before Pushing to `main`)
Run all checks locally; pushing to `main` automatically runs these gates in GitHub Actions and deploys `playground/dist` to GitHub Pages:

```bash
npm run typecheck
npm run validate:registry
npm run check:vault
npm run sync:readme
npm run build:playground
```
