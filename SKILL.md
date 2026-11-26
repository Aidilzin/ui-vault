---
name: ui-vault
description: Curated visual design styles, tokens, and experimental web animations grouped by aesthetic cluster and motion mechanic. Use whenever the user asks to apply a specific UI aesthetic, blend experimental styles, or add named micro-interactions.
---

# UI Vault Workflow

Follow these steps whenever styling an interface or adding motion from this vault:

1. **Read `relations.json` first.** Locate the requested style, cluster, or hybrid recipe before writing any CSS or JSX.
2. **Check compatibility.** Verify `pairsWith` and never mix entries listed in `clashesWith` unless the user explicitly asks for an intentional clash.
3. **Load the full spec.** Read the target style's `STYLE.md` and `tokens.css` (if present) and treat them as the visual source of truth for surfaces, borders, typography, and forbidden anti-patterns.
4. **Reuse or install animations.** Prefer components already in `animations/` (or install them via `npx shadcn@latest add <owner>/ui-vault/<item>`). If an animation is not yet in the vault, check `externalRegistries` in `relations.json` before hand-rolling code.
5. **Enforce motion hygiene.** Every animation must:
   - Honor `prefers-reduced-motion: reduce` using the fallback specified in `relations.json`.
   - Animate compositor-only properties (`transform`, `opacity`) where possible.
   - Keep productivity/dashboard transitions brisk (`100–220ms`); reserve longer timelines for dedicated showcase/hero scenes.

## Ingesting New Styles & Animations

Use this repeatable pipeline whenever adding a new aesthetic or motion primitive to the vault:

### Adding a Style (Live URL -> Vault)
1. **Extract tokens with Dembrandt MCP.** Run the configured `dembrandt` MCP server against a reference URL to capture palette, surface hierarchy, typography, borders, radii, and shadow rules.
2. **Assign a cluster.** Place the style under one of the 4 clusters in `relations.json` (`01-precision-systems`, `02-retro-compute`, `03-kinetic-rebel`, `04-spatial-physics`).
3. **Author the spec.** Create `styles/<cluster>/<style-id>/STYLE.md` (YAML frontmatter + `Core Tokens & Surfaces`, `Typography & Layout`, and `Forbidden Anti-Patterns`) and optional `tokens.css`.
4. **Register metadata.** Add the style node to `relations.json` (with `pairsWith` / `clashesWith`), `styles/registry.json`, and root `registry.json`.
5. **Wire into Playground.** Import `STYLE.md?raw` in `playground/src/lib/vault-data.ts` and add an authentic mini-UI swatch in `playground/src/components/StyleSwatches.tsx`.

### Adding an Animation
1. **Assign a mechanic.** Place the primitive under `animations/<mechanic>/<animation-id>.tsx` (or `.css`) using one of the 5 mechanics (`cursor-reactive`, `text-kinetic`, `layout-morph`, `shader-canvas`, `physics-optics`).
2. **Enforce constraints.** Keep dependencies minimal, avoid breaking existing public APIs, and implement an explicit `prefers-reduced-motion: reduce` fallback.
3. **Register metadata.** Add the animation node to `relations.json` (`engine`, `perfTier`, `reducedMotion`, `pairsWith`, `clashesWith`), `animations/registry.json`, and root `registry.json`.
4. **Wire into Playground.** Import the live component and `?raw` source in `playground/src/lib/vault-data.ts` and `playground/src/components/AnimationsLab.tsx`.

### Verification Gate (Before Pushing to `main`)
Run all three checks locally; pushing to `main` automatically runs these gates in GitHub Actions and deploys `playground/dist` to GitHub Pages:

```bash
npm run typecheck
npm run validate:registry
npm run build:playground
```
