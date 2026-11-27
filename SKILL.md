---
name: ui-vault
description: Curated visual design styles, container-query layout shells, adaptive surface textures, fluid typography systems, zero-library telemetry micro-charts, and experimental web animations. Use whenever the user asks to apply a specific UI aesthetic, compose a layout or telemetry dashboard, layer surface textures or typography scales, or add named micro-interactions.
---

# UI Vault Workflow

Follow the **6-Layer Composition Stack** (`Layout + Style + Typography + Texture + Telemetry + Animations`) whenever designing or building an interface from this vault:

1. **Read `relations.json` first.** Locate the requested base style, layout shell, typography system, surface texture, telemetry charts, or hybrid recipe before writing any CSS or JSX.
2. **Respect tier boundaries & compatibility.** Default to `production` foundations for mainstream SaaS/apps, layer at most 1–2 restrained `viral` accents, and reserve `experimental` aesthetics for portfolios, creative labs, or explicit user requests. Verify `pairsWith` across all 6 kinds and never mix entries listed in `clashesWith` unless explicitly asked.
3. **Compose the 6 layers cleanly:**
   - **Layer 1 — Layout Shell (`layouts/`):** Pick a container-query (`@container`) skeleton from `layouts/<id>/` driven by `--lay-*` tokens with zero hardcoded hex colors, zero `100vh` locks, and composable ReactNode slots.
   - **Layer 2 — Base Style (`styles/`):** Read `STYLE.md` and `tokens.css` as the source of truth for palette, surface elevation, border width/radius, and forbidden anti-patterns.
   - **Layer 3 — Typography System (`typography/`):** Optionally override with a scoped fluid typography package (`.type-<id>` in `typography.css`) using `clamp()` scales, `tabular-nums`, and `text-wrap: balance`.
   - **Layer 4 — Surface Texture (`textures/`):** Optionally layer a zero-JS adaptive texture (`.tx-<id>`) parameterized by `--tx-color`, `--tx-opacity`, and `--tx-size`. Mount structural ground textures behind cards (`z-index: 0`) and atmospheric overlays (`film-grain`, `crt-scanlines`, `radial-vignette`) as full-surface `pointer-events: none` layers.
   - **Layer 5 — Telemetry Micro-Charts (`telemetry/`):** Drop zero-dependency SVG/React micro-charts into KPI, observability, or AI workbench slots driven by adaptive `--tel-*` tokens (with WCAG-safe darkened semantic tokens on light grounds).
   - **Layer 6 — Animations (`animations/`):** Prefer components already in `animations/` (or install via `npx shadcn@latest add Aidilzin/ui-vault/<item>`). Check `externalRegistries` in `relations.json` before hand-rolling motion code.
4. **Enforce motion & responsive hygiene.** Every animated or telemetry primitive must:
   - Honor `prefers-reduced-motion: reduce` using the fallback specified in `relations.json`.
   - Use responsive `viewBox` + `width="100%"` (or `ResizeObserver` + `devicePixelRatio` for Canvas) with bounded hover readouts so zero horizontal overflow occurs at `390px`.

## Ingesting New Vault Items

### Adding a Style (`styles/`)
1. Extract tokens with Dembrandt MCP, assign a cluster & tier, author `STYLE.md` + `tokens.css`, register in `relations.json` and `styles/registry.json`, and add a swatch in `playground/src/swatches/`.

### Adding a Layout Shell (`layouts/`)
1. Create `layouts/<id>/<id>.tsx`, `layouts/<id>/<id>.css`, and `layouts/<id>/LAYOUT.md` (with YAML frontmatter `id`, `name`, `tier`, `pattern`, `slots`, `pairsWith`, `clashesWith`).
2. Enforce zero hardcoded palette colors (use `--lay-*` tokens), `container-type: inline-size` with `@container` breakpoints, `min-height: var(--lay-height, 100%)` (no `100vh` or `position: fixed`), and no relative `./<id>.css` import inside `.tsx`.
3. Register in `layouts/registry.json` (`type: "registry:item"`, CLI `layout-<id>`) and `relations.json`.

### Adding a Telemetry Micro-Chart (`telemetry/`)
1. Create a zero-dependency strict-TypeScript `telemetry/<id>.tsx` using `--tel-*` tokens, responsive `viewBox` + `width="100%"`, strict `tabular-nums`, bounded hover inspection, ARIA labels, and explicit `prefers-reduced-motion` fallback.
2. Register in `telemetry/registry.json` (`type: "registry:item"`, CLI `telemetry-<id>`, `dependencies: []`) and `relations.json`.

### Adding a Surface Texture (`textures/`) or Typography System (`typography/`)
1. Follow adaptive `--tx-color` / `mask-image` / `::before` scoping for textures (`textures/registry.json`) and scoped `.type-<id>` fluid `clamp()` tokens for typography (`typography/registry.json`).

### Adding an Animation (`animations/`)
1. Place under `animations/<mechanic>/<id>.tsx` (or `.css`), enforce MIT/Apache-2.0/clean-room license hygiene and `prefers-reduced-motion: reduce`, register in `animations/registry.json` and `relations.json`, and wire into `playground/src/demos/`.

### Verification Gate (Before Pushing to `main`)
```bash
npm run typecheck
npm run validate:registry
npm run check:vault
npm run sync:readme
npm run build:playground
```
