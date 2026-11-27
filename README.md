# ui-vault

**Experimental UI Style Vault · `shadcn` GitHub Registry · AI Agent Skill**

[![Live Playground](https://img.shields.io/badge/Playground-Live-38bdf8?style=flat-square&labelColor=0f1115)](https://aidilzin.github.io/ui-vault/)
[![Deploy Playground](https://img.shields.io/github/actions/workflow/status/Aidilzin/ui-vault/deploy-playground.yml?branch=main&style=flat-square&label=Pages&labelColor=0f1115)](https://github.com/Aidilzin/ui-vault/actions/workflows/deploy-playground.yml)
<!-- VAULT:BADGE:START -->
[![Registry Items](https://img.shields.io/badge/Registry-144%20items%20%C2%B7%2036%20styles%20%C2%B7%2069%20anims%20%C2%B7%2012%20tex%20%C2%B7%209%20type%20%C2%B7%208%20layouts%20%C2%B7%2010%20telemetry-34d399?style=flat-square&labelColor=0f1115)](./relations.json)
<!-- VAULT:BADGE:END -->
[![License: MIT](https://img.shields.io/badge/License-MIT-8b94a3?style=flat-square&labelColor=0f1115)](./LICENSE)

A curated, zero-bloat collection of experimental UI style specifications, CSS token files, strict-TypeScript React animations, and a machine-readable compatibility graph (`relations.json`). Every animation ships with an explicit `prefers-reduced-motion` fallback and installs directly from GitHub with zero build server required.

<a href="https://aidilzin.github.io/ui-vault/">
  <img src="docs/assets/playground-animations.png" alt="UI Vault Interactive Playground — Animations Lab" width="100%" />
</a>

---

## Three Ways to Use `ui-vault`

### 1. Install Directly via `shadcn` CLI

Pull any style spec (`STYLE.md` + `tokens.css`) or animation component directly from GitHub — no custom server or npm package needed:

```bash
# List every item in the registry
npx shadcn@latest list Aidilzin/ui-vault

# Search by aesthetic cluster or motion mechanic
npx shadcn@latest search Aidilzin/ui-vault -q "optics"

# Install a style spec + token sheet or an animation primitive
npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical
npx shadcn@latest add Aidilzin/ui-vault/orbital-canvas
```

### 2. Attach as an AI Coding Agent Skill

Link this repository into your local skills directory so your coding agent automatically reads [`SKILL.md`](./SKILL.md) and [`relations.json`](./relations.json) before writing UI code:

**Windows (PowerShell)**

```powershell
# Antigravity CLI
New-Item -ItemType Junction -Path "$HOME\.gemini\skills\ui-vault" -Target "C:\projects\ui-vault"

# Claude Code
New-Item -ItemType Junction -Path "$HOME\.claude\skills\ui-vault" -Target "C:\projects\ui-vault"
```

**macOS / Linux**

```bash
# Antigravity CLI
ln -s /path/to/ui-vault ~/.gemini/skills/ui-vault

# Claude Code
ln -s /path/to/ui-vault ~/.claude/skills/ui-vault
```

**Example Agent Prompt:**
> `Using ui-vault, style this dashboard with fui-tactical and pair it only with compatible animations from relations.json.`

### 3. Run the Local Interactive Playground

Inspect all 10 styles, 15 live animations, compatibility pairings, reduced-motion fallbacks, and curated references locally:

```bash
npm install
npm --prefix playground install
npm run dev:playground
```

---

## Live Catalog

<!-- VAULT:STYLES:START -->
### Styles by Aesthetic Cluster (36)

| Cluster | Tier | Style ID | Key Pairings | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- |
| `01-precision-systems` | `viral` | `fui-tactical` | `scramble-text`, `border-spotlight`, `orbital-canvas` | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical` |
| `01-precision-systems` | `production` | `neo-swiss` | `split-reveal`, `variable-proximity`, `velocity-skew`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-swiss` |
| `01-precision-systems` | `production` | `editorial-mono` | `split-reveal`, `variable-proximity`, `border-spotlight`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-editorial-mono` |
| `01-precision-systems` | `viral` | `industrial-hardware` | `flip-card`, `magnetic-button`, `sibling-dim`, `scramble-text` | `npx shadcn@latest add Aidilzin/ui-vault/style-industrial-hardware` |
| `01-precision-systems` | `production` | `telemetry-fault` | `scramble-text`, `border-spotlight`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-telemetry-fault` |
| `01-precision-systems` | `production` | `monochrome-stark` | `split-reveal`, `sibling-dim`, `variable-proximity`, `marquee-hover-row` | `npx shadcn@latest add Aidilzin/ui-vault/style-monochrome-stark` |
| `01-precision-systems` | `viral` | `dark-gallery-index` | `border-spotlight`, `spotlight-tabs`, `glare-hover`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-dark-gallery-index` |
| `01-precision-systems` | `production` | `swiss-type-foundry` | `variable-proximity`, `split-reveal`, `text-roll`, `marquee-hover-row` | `npx shadcn@latest add Aidilzin/ui-vault/style-swiss-type-foundry` |
| `01-precision-systems` | `production` | `code-forge` | `inline-code-diff`, `tool-call-step`, `spotlight-tabs`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-code-forge` |
| `01-precision-systems` | `production` | `transit-precision` | `split-flap-clock`, `count-up`, `scroll-progress-bar`, `tactile-press-badge` | `npx shadcn@latest add Aidilzin/ui-vault/style-transit-precision` |
| `02-retro-compute` | `experimental` | `ditherpunk` | `bayer-dither`, `scramble-text`, `ascii-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-ditherpunk` |
| `02-retro-compute` | `experimental` | `os-core` | `scramble-text`, `flip-card`, `bayer-dither` | `npx shadcn@latest add Aidilzin/ui-vault/style-os-core` |
| `02-retro-compute` | `experimental` | `retro-web-96` | `bayer-dither`, `scramble-text`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-retro-web-96` |
| `02-retro-compute` | `experimental` | `phosphor-terminal` | `scramble-text`, `ascii-filter`, `crt-grain-overlay`, `kinetic-status-pill` | `npx shadcn@latest add Aidilzin/ui-vault/style-phosphor-terminal` |
| `02-retro-compute` | `experimental` | `eight-bit-arcade` | `bayer-dither`, `pixel-card`, `pixel-hover-grid`, `click-spark` | `npx shadcn@latest add Aidilzin/ui-vault/style-eight-bit-arcade` |
| `03-kinetic-rebel` | `experimental` | `neo-brutalism` | `velocity-skew`, `variable-proximity`, `bayer-dither`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-brutalism` |
| `03-kinetic-rebel` | `experimental` | `acid-y2k` | `variable-proximity`, `velocity-skew`, `ascii-filter`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-acid-y2k` |
| `03-kinetic-rebel` | `experimental` | `console-2001` | `spring-tilt-card`, `glare-hover`, `velocity-skew` | `npx shadcn@latest add Aidilzin/ui-vault/style-console-2001` |
| `03-kinetic-rebel` | `experimental` | `zine-wire` | `marquee-hover-row`, `velocity-skew`, `variable-proximity`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-zine-wire` |
| `03-kinetic-rebel` | `experimental` | `avant-poster` | `marquee-hover-row`, `kinetic-card-trail`, `velocity-skew`, `variable-proximity` | `npx shadcn@latest add Aidilzin/ui-vault/style-avant-poster` |
| `04-spatial-physics` | `viral` | `liquid-glass` | `liquid-glass-filter`, `magnetic-button`, `spring-tilt-card`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-liquid-glass` |
| `04-spatial-physics` | `experimental` | `ambient-orbit` | `orbital-canvas`, `border-spotlight`, `scramble-text` | `npx shadcn@latest add Aidilzin/ui-vault/style-ambient-orbit` |
| `04-spatial-physics` | `viral` | `command-dark` | `border-spotlight`, `glare-hover`, `magnetic-button`, `liquid-glass-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-command-dark` |
| `04-spatial-physics` | `viral` | `orbital-ceramic` | `eclipse-orb`, `border-spotlight`, `progressive-blur-edge`, `blur-fade` | `npx shadcn@latest add Aidilzin/ui-vault/style-orbital-ceramic` |
| `05-modern-craft` | `production` | `monolith-dark` | `border-spotlight`, `scramble-text`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark` |
| `05-modern-craft` | `production` | `mesh-craft` | `spring-tilt-card`, `glare-hover`, `magnetic-button`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-mesh-craft` |
| `05-modern-craft` | `production` | `bento-grid` | `border-spotlight`, `count-up`, `split-reveal`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-bento-grid` |
| `05-modern-craft` | `viral` | `aurora-mesh` | `border-beam`, `shiny-text`, `glare-hover`, `spotlight-tabs` | `npx shadcn@latest add Aidilzin/ui-vault/style-aurora-mesh` |
| `05-modern-craft` | `production` | `tactile-soft` | `spotlight-tabs`, `tactile-press-badge`, `blur-text`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-tactile-soft` |
| `05-modern-craft` | `production` | `perceptual-scale` | `spotlight-tabs`, `blur-fade`, `velocity-dismiss-drawer`, `stacked-toast-deck` | `npx shadcn@latest add Aidilzin/ui-vault/style-perceptual-scale` |
| `06-editorial-warm` | `production` | `warm-manuscript` | `split-reveal`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript` |
| `06-editorial-warm` | `production` | `archival-paper` | `sibling-dim`, `spotlight-tabs`, `scroll-progress-bar`, `make-way-grid` | `npx shadcn@latest add Aidilzin/ui-vault/style-archival-paper` |
| `06-editorial-warm` | `production` | `tactile-studio-warm` | `blur-text`, `sibling-dim`, `progressive-blur-edge`, `spotlight-tabs` | `npx shadcn@latest add Aidilzin/ui-vault/style-tactile-studio-warm` |
| `06-editorial-warm` | `production` | `monochrome-gallery` | `sibling-dim`, `scroll-progress-bar`, `spotlight-tabs`, `make-way-grid` | `npx shadcn@latest add Aidilzin/ui-vault/style-monochrome-gallery` |
| `06-editorial-warm` | `viral` | `pastel-playful` | `dock-magnify`, `click-spark`, `tactile-press-badge`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-pastel-playful` |
| `06-editorial-warm` | `experimental` | `wordmark-press` | `rotary-type-dial`, `split-reveal`, `variable-proximity`, `text-roll` | `npx shadcn@latest add Aidilzin/ui-vault/style-wordmark-press` |
<!-- VAULT:STYLES:END -->

<!-- VAULT:ANIMATIONS:START -->
### Animations by Mechanic (69)

| Animation | Mechanic | Tier | Engine | Perf Tier | Reduced Motion Fallback | Registry Item |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Magnetic Button | `cursor-reactive` | `viral` | `react`, `css` | `low` | `disabled-pull` | `magnetic-button` |
| Mouse-Tracking Border Spotlight | `cursor-reactive` | `viral` | `react`, `css` | `low` | `static-border` | `border-spotlight` |
| Sibling Dim Grid | `cursor-reactive` | `production` | `css` | `low` | `instant-opacity` | `sibling-dim` |
| Scramble / Decrypt Text | `text-kinetic` | `viral` | `react` | `low` | `instant-text-swap` | `scramble-text` |
| Masked Split-Text Reveal | `text-kinetic` | `production` | `react`, `css` | `low` | `instant-visible` | `split-reveal` |
| Variable Font Proximity | `text-kinetic` | `experimental` | `react`, `css` | `low` | `static-weight` | `variable-proximity` |
| FLIP Layout Morph Card | `layout-morph` | `production` | `react`, `waapi` | `low` | `instant-layout` | `flip-card` |
| Scroll Velocity Skew | `layout-morph` | `experimental` | `react` | `low` | `disabled-skew` | `velocity-skew` |
| Bayer Dither Canvas | `shader-canvas` | `experimental` | `canvas` | `medium` | `static-dither-frame` | `bayer-dither` |
| ASCII Wave Filter | `shader-canvas` | `experimental` | `react` | `low` | `static-ascii-frame` | `ascii-filter` |
| 2.5D Orbital Constellation Canvas | `shader-canvas` | `experimental` | `canvas` | `medium` | `static-constellation` | `orbital-canvas` |
| Liquid Glass Surface | `physics-optics` | `experimental` | `svg`, `css` | `medium` | `opaque-fallback` | `liquid-glass-filter` |
| Spring 3D Tilt Card | `physics-optics` | `viral` | `react`, `css` | `low` | `flat-card` | `spring-tilt-card` |
| Specular Glare Hover | `physics-optics` | `viral` | `react`, `css` | `low` | `static-surface` | `glare-hover` |
| Kinetic Marquee Hover Row | `text-kinetic` | `viral` | `react`, `css` | `low` | `static-highlight` | `marquee-hover-row` |
| Star Border Glow | `cursor-reactive` | `viral` | `react`, `css` | `low` | `static-border` | `star-border` |
| Magnetic Vector Lines | `cursor-reactive` | `experimental` | `react`, `css` | `low` | `static-angles` | `magnet-lines` |
| Crosshair Coordinate Reticle | `cursor-reactive` | `viral` | `react`, `css` | `low` | `hidden-reticle` | `crosshair-reticle` |
| Conic Border Beam | `cursor-reactive` | `viral` | `react`, `css` | `low` | `static-border` | `border-beam` |
| Metallic Shiny Text | `text-kinetic` | `viral` | `react`, `css` | `low` | `static-text` | `shiny-text` |
| Optical Blur Text Reveal | `text-kinetic` | `production` | `react`, `css` | `low` | `instant-visible` | `blur-text` |
| Split-Flap Text Roll | `text-kinetic` | `production` | `react`, `css` | `low` | `static-text` | `text-roll` |
| Pixel Shimmer Card | `shader-canvas` | `experimental` | `canvas` | `medium` | `static-pixel-frame` | `pixel-card` |
| Elastic Overshoot Slider | `physics-optics` | `viral` | `react`, `css` | `low` | `linear-slider` | `elastic-slider` |
| Proximity Dock Magnification | `physics-optics` | `viral` | `react`, `css` | `low` | `static-dock` | `dock-magnify` |
| Compositor Scroll Progress Bar | `scroll-driven` | `production` | `react`, `css` | `low` | `instant-progress` | `scroll-progress-bar` |
| Radial Click Spark | `micro-feedback` | `viral` | `canvas` | `low` | `disabled-sparks` | `click-spark` |
| Eased Tabular Count-Up | `micro-feedback` | `production` | `react` | `low` | `instant-value` | `count-up` |
| Hold-to-Confirm Action Button | `micro-feedback` | `production` | `react`, `css` | `low` | `single-click-confirm` | `hold-to-confirm` |
| Kinetic Card Trail | `cursor-reactive` | `experimental` | `react`, `css` | `low` | `disabled-trail` | `kinetic-card-trail` |
| Make-Way FLIP Grid | `layout-morph` | `production` | `react`, `waapi` | `low` | `instant-layout` | `make-way-grid` |
| Pixel Hover Dissolve Grid | `shader-canvas` | `experimental` | `canvas` | `medium` | `instant-cells` | `pixel-hover-grid` |
| CRT Film Grain Overlay | `shader-canvas` | `experimental` | `canvas`, `css` | `low` | `static-grain-frame` | `crt-grain-overlay` |
| SVG Turbulence Hover Filter | `physics-optics` | `experimental` | `svg`, `react` | `medium` | `static-surface` | `svg-turbulence-hover` |
| Elastic Staggered Column Scroll | `scroll-driven` | `experimental` | `react`, `css` | `low` | `disabled-lag` | `elastic-column-scroll` |
| Spotlight Segmented Tabs | `layout-morph` | `production` | `react`, `css` | `low` | `instant-tab-switch` | `spotlight-tabs` |
| Progressive Blur Scroll Edge | `scroll-driven` | `production` | `css`, `react` | `low` | `opaque-gradient-edge` | `progressive-blur-edge` |
| Tactile Detent Press Badge | `micro-feedback` | `production` | `react`, `css` | `low` | `static-press` | `tactile-press-badge` |
| Kinetic Morphing Status Pill | `micro-feedback` | `production` | `react`, `css` | `low` | `instant-state-swap` | `kinetic-status-pill` |
| Animated Connector Beam | `physics-optics` | `viral` | `svg`, `css` | `low` | `static-connector` | `animated-connector-beam` |
| Optical Blur-Fade Container | `layout-morph` | `production` | `react`, `css` | `low` | `instant-visible` | `blur-fade` |
| Infinite Edge-Fade Marquee | `scroll-driven` | `viral` | `react`, `css` | `low` | `static-strip` | `infinite-marquee` |
| Tactile 3D Push Button | `micro-feedback` | `production` | `react`, `css` | `low` | `static-press` | `tactile-push-button` |
| Ambient Aurora Mesh Backdrop | `shader-canvas` | `viral` | `css` | `low` | `static-aurora-frame` | `aurora-mesh-bg` |
| Scroll Sticky Scale Card | `scroll-driven` | `viral` | `react`, `css` | `low` | `static-scale` | `scroll-sticky-scale` |
| Odometer Digit-Wheel Ticker | `micro-feedback` | `production` | `react`, `css` | `low` | `instant-value` | `odometer-ticker` |
| Streaming Token Text & Citations | `ai-agentic` | `production` | `react` | `low` | `instant-text` | `streaming-token-text` |
| Reasoning Trace Accordion | `ai-agentic` | `production` | `react`, `css` | `low` | `static-header` | `reasoning-trace` |
| Agent Tool-Call Step Row | `ai-agentic` | `production` | `react`, `css` | `low` | `instant-state` | `tool-call-step` |
| Agent Approval Permission Gate | `ai-agentic` | `production` | `react`, `css` | `low` | `instant-state` | `agent-approval-card` |
| Inline Agent Code Diff | `ai-agentic` | `production` | `react`, `css` | `low` | `instant-state` | `inline-code-diff` |
| Slash Prompt Composer | `ai-agentic` | `production` | `react`, `css` | `low` | `instant-menu` | `slash-prompt-composer` |
| Chain-of-Thought Execution Rail | `ai-agentic` | `viral` | `react`, `css` | `low` | `static-rail` | `chain-of-thought-rail` |
| Holographic Foil Card | `physics-optics` | `viral` | `react`, `css` | `low` | `static-foil` | `holographic-foil-card` |
| SVG Radar Ripple Pulse | `shader-canvas` | `viral` | `svg`, `css` | `low` | `static-rings` | `svg-ripple-pulse` |
| Nocturnal Meteor Shower | `shader-canvas` | `viral` | `css` | `low` | `static-streaks` | `meteor-shower` |
| Lamp Horizon Spotlight | `physics-optics` | `viral` | `react`, `css` | `low` | `static-glow` | `lamp-horizon-glow` |
| Z-Depth Stacked Card Deck | `layout-morph` | `viral` | `react`, `css` | `low` | `instant-cycle` | `stacked-card-deck` |
| Vertical Tracing Scroll Beam | `scroll-driven` | `viral` | `react`, `css` | `low` | `full-beam` | `tracing-scroll-beam` |
| Gooey Metaball Pill Nav | `physics-optics` | `experimental` | `svg`, `react`, `css` | `medium` | `instant-pill` | `gooey-pill-nav` |
| Eclipse Corona Orb | `shader-canvas` | `viral` | `css` | `low` | `static-orb` | `eclipse-orb` |
| Rotary Typographic Dial | `cursor-reactive` | `experimental` | `react`, `css` | `low` | `stepped-dial` | `rotary-type-dial` |
| Flex Accordion Gallery | `layout-morph` | `viral` | `react`, `css` | `low` | `instant-flex` | `accordion-gallery` |
| 3D Split-Flap Display | `text-kinetic` | `viral` | `react`, `css` | `low` | `instant-digit` | `split-flap-clock` |
| 3D Perspective Hardcover Book | `physics-optics` | `viral` | `react`, `css` | `low` | `static-book` | `perspective-book` |
| Bidirectional Spring Number Flow | `micro-feedback` | `production` | `react`, `css` | `low` | `instant-value` | `spring-number-flow` |
| Velocity Drag-to-Dismiss Drawer | `layout-morph` | `production` | `react`, `css` | `low` | `instant-drawer` | `velocity-dismiss-drawer` |
| Stacked Hover-Expand Toast Deck | `micro-feedback` | `production` | `react`, `css` | `low` | `instant-stack` | `stacked-toast-deck` |
| Magnetic Copy Checkmark Spell | `micro-feedback` | `viral` | `svg`, `react`, `css` | `low` | `instant-check` | `magnetic-copy-spell` |
<!-- VAULT:ANIMATIONS:END -->

<!-- VAULT:TEXTURES:START -->
### Surface Textures (12)

| Texture | Tier | Layer | Mechanism | Key Pairings | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Film Grain** (`film-grain`) | `production` | `overlay` | `svg-turbulence` | `warm-manuscript`, `archival-paper`, `swiss-type-foundry`, `monolith-dark` | `npx shadcn@latest add Aidilzin/ui-vault/texture-film-grain` |
| **Paper Fiber** (`paper-fiber`) | `production` | `ground` | `css-gradient` | `warm-manuscript`, `archival-paper`, `tactile-studio-warm`, `monochrome-gallery` | `npx shadcn@latest add Aidilzin/ui-vault/texture-paper-fiber` |
| **Dot Matrix** (`dot-matrix`) | `production` | `ground` | `css-gradient` | `bento-grid`, `monolith-dark`, `fui-tactical`, `perceptual-scale` | `npx shadcn@latest add Aidilzin/ui-vault/texture-dot-matrix` |
| **Architect Grid** (`architect-grid`) | `production` | `ground` | `css-gradient` | `fui-tactical`, `neo-swiss`, `industrial-hardware`, `telemetry-fault` | `npx shadcn@latest add Aidilzin/ui-vault/texture-architect-grid` |
| **Crosshair Field** (`crosshair-field`) | `experimental` | `ground` | `svg-mask` | `fui-tactical`, `telemetry-fault`, `ambient-orbit`, `crosshair-reticle` | `npx shadcn@latest add Aidilzin/ui-vault/texture-crosshair-field` |
| **CRT Scanlines** (`crt-scanlines`) | `experimental` | `overlay` | `css-gradient` | `phosphor-terminal`, `ditherpunk`, `eight-bit-arcade`, `console-2001` | `npx shadcn@latest add Aidilzin/ui-vault/texture-crt-scanlines` |
| **Diagonal Hatch** (`diagonal-hatch`) | `production` | `ground` | `css-gradient` | `neo-swiss`, `monochrome-stark`, `industrial-hardware`, `neo-brutalism` | `npx shadcn@latest add Aidilzin/ui-vault/texture-diagonal-hatch` |
| **Halftone Screen** (`halftone-screen`) | `experimental` | `ground` | `css-gradient` | `neo-brutalism`, `avant-poster`, `zine-wire`, `ditherpunk` | `npx shadcn@latest add Aidilzin/ui-vault/texture-halftone-screen` |
| **Brushed Anodized** (`brushed-anodized`) | `viral` | `ground` | `css-gradient` | `industrial-hardware`, `orbital-ceramic`, `command-dark`, `dark-gallery-index` | `npx shadcn@latest add Aidilzin/ui-vault/texture-brushed-anodized` |
| **Topographic Mesh** (`topographic-mesh`) | `viral` | `ground` | `svg-mask` | `ambient-orbit`, `orbital-ceramic`, `aurora-mesh`, `fui-tactical` | `npx shadcn@latest add Aidilzin/ui-vault/texture-topographic-mesh` |
| **Radial Vignette** (`radial-vignette`) | `production` | `overlay` | `css-gradient` | `monolith-dark`, `aurora-mesh`, `command-dark`, `dark-gallery-index` | `npx shadcn@latest add Aidilzin/ui-vault/texture-radial-vignette` |
| **Checker Dither** (`checker-dither`) | `experimental` | `ground` | `css-gradient` | `ditherpunk`, `os-core`, `retro-web-96`, `eight-bit-arcade` | `npx shadcn@latest add Aidilzin/ui-vault/texture-checker-dither` |
<!-- VAULT:TEXTURES:END -->

<!-- VAULT:TYPOGRAPHY:START -->
### Typography Systems (9)

| System | Tier | Font Stack | Voice | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- |
| **Precision Mono** (`precision-mono`) | `production` | `Inter` + `JetBrains Mono` | Technical telemetry, tight neo-grotesk headings, uppercase mono micro-labels, strict tabular numerals | `npx shadcn@latest add Aidilzin/ui-vault/type-precision-mono` |
| **Editorial Serif** (`editorial-serif`) | `production` | `Instrument Serif` + `Plus Jakarta Sans` + `IBM Plex Mono` | High-contrast editorial and AI research lab voice with generous classical display proportions | `npx shadcn@latest add Aidilzin/ui-vault/type-editorial-serif` |
| **Swiss Grotesk** (`swiss-grotesk`) | `production` | `Archivo` + `Inter` + `IBM Plex Mono` | Heavy tight-tracked International Typographic Style hierarchy with disciplined negative space | `npx shadcn@latest add Aidilzin/ui-vault/type-swiss-grotesk` |
| **Literary Humanist** (`literary-humanist`) | `production` | `Fraunces` + `Newsreader` + `IBM Plex Mono` | Warm tactile manuscript and long-form journal proportions using optical variable serifs | `npx shadcn@latest add Aidilzin/ui-vault/type-literary-humanist` |
| **Kinetic Brutal** (`kinetic-brutal`) | `experimental` | `Syne` + `Space Grotesk` + `Space Mono` | Wide assertive avant-garde poster geometry with raw brutalist energy | `npx shadcn@latest add Aidilzin/ui-vault/type-kinetic-brutal` |
| **Terminal Phosphor** (`terminal-phosphor`) | `experimental` | `JetBrains Mono` + `IBM Plex Mono` | Strict all-monospace grid rhythm with zero sans-serif drift for CLI and retro-compute surfaces | `npx shadcn@latest add Aidilzin/ui-vault/type-terminal-phosphor` |
| **Pixel Arcade** (`pixel-arcade`) | `experimental` | `Silkscreen` + `Space Mono` | Crisp stepped bitmap display headlines paired with readable monospace body copy | `npx shadcn@latest add Aidilzin/ui-vault/type-pixel-arcade` |
| **Neo Display SaaS** (`neo-display-saas`) | `viral` | `Space Grotesk` + `Inter` + `JetBrains Mono` | Clean, punchy modern launch-page and product marketing voice with geometric poise | `npx shadcn@latest add Aidilzin/ui-vault/type-neo-display-saas` |
| **Condensed Hardware** (`condensed-hardware`) | `viral` | `Barlow Condensed` + `Inter` + `IBM Plex Mono` | Uppercase industrial signage, rail-timetable clarity, and anodized hardware faceplate typography | `npx shadcn@latest add Aidilzin/ui-vault/type-condensed-hardware` |
<!-- VAULT:TYPOGRAPHY:END -->

<!-- VAULT:LAYOUTS:START -->
### Layout Shells (8)

| Layout | Tier | Pattern | Slots | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- |
| **Bento Showcase** (`bento-showcase`) | `viral` | Asymmetric 12-column modular Bento grid | `header`, `hero`, `metricColumn`, `tiles`, `footer` | `npx shadcn@latest add Aidilzin/ui-vault/layout-bento-showcase` |
| **Triage Workbench** (`triage-workbench`) | `production` | 3-pane Linear / Superhuman desktop triage shell | `header`, `navRail`, `queuePane`, `inspectorPane`, `footer` | `npx shadcn@latest add Aidilzin/ui-vault/layout-triage-workbench` |
| **Swiss Editorial Grid** (`swiss-editorial-grid`) | `production` | Exposed 1px hairline 12-column International Typographic grid | `masthead`, `indexRail`, `hero`, `body`, `footer` | `npx shadcn@latest add Aidilzin/ui-vault/layout-swiss-editorial-grid` |
| **Split AI IDE** (`split-ai-ide`) | `production` | Agentic workspace with session rail, execution stream, pinned composer, and diff pane | `header`, `sessionRail`, `stream`, `composer`, `artifactPane` | `npx shadcn@latest add Aidilzin/ui-vault/layout-split-ai-ide` |
| **Sticky Scrollytelling** (`sticky-scrollytelling`) | `viral` | Sticky visual/artifact stage paired with scrolling narrative steps | `header`, `steps`, `renderStage`, `footer` | `npx shadcn@latest add Aidilzin/ui-vault/layout-sticky-scrollytelling` |
| **Floating OS Desktop** (`floating-os-desktop`) | `experimental` | Spatial / retro desktop canvas with menu bar, framed windows, and scoped bottom dock | `menuBar`, `primaryWindow`, `secondaryWindow`, `dock` | `npx shadcn@latest add Aidilzin/ui-vault/layout-floating-os-desktop` |
| **Command HUD Dashboard** (`command-hud-dashboard`) | `experimental` | Dense 4-quadrant FUI mission-control instrumentation grid | `ticker`, `quadrants`, `eventRail` | `npx shadcn@latest add Aidilzin/ui-vault/layout-command-hud-dashboard` |
| **Masonry Archive** (`masonry-archive`) | `production` | Curated catalog with sticky filter bar, multi-column waterfall grid, and detail rail | `header`, `filterBar`, `items`, `detailRail`, `footer` | `npx shadcn@latest add Aidilzin/ui-vault/layout-masonry-archive` |
<!-- VAULT:LAYOUTS:END -->

<!-- VAULT:TELEMETRY:START -->
### Telemetry Micro-Charts (10)

| Telemetry | Tier | Engine | Perf Tier | Reduced Motion Fallback | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Inline Sparkline** (`inline-sparkline`) | `production` | `svg`, `react` | `low` | `static-scrubber` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-inline-sparkline` |
| **Uptime Strip** (`uptime-strip`) | `production` | `react`, `css` | `low` | `instant-tooltip` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-uptime-strip` |
| **Activity Heatmap** (`activity-heatmap`) | `production` | `svg`, `react` | `low` | `instant-cell-focus` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-activity-heatmap` |
| **Latency Histogram** (`latency-histogram`) | `production` | `svg`, `react` | `low` | `static-bars` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-latency-histogram` |
| **Radial Step Gauge** (`radial-step-gauge`) | `viral` | `svg`, `react` | `low` | `instant-value` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-radial-step-gauge` |
| **LED Status Matrix** (`led-status-matrix`) | `experimental` | `react`, `css` | `low` | `static-leds` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-led-status-matrix` |
| **Live Oscilloscope** (`live-oscilloscope`) | `experimental` | `canvas`, `react` | `medium` | `static-waveform` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-live-oscilloscope` |
| **Segmented Quota Bar** (`segmented-quota-bar`) | `production` | `react`, `css` | `low` | `instant-highlight` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-segmented-quota-bar` |
| **Diff Delta Pill** (`diff-delta-pill`) | `production` | `svg`, `react` | `low` | `static-badge` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-diff-delta-pill` |
| **Node Topology Mini** (`node-topology-mini`) | `viral` | `svg`, `react` | `low` | `static-topology` | `npx shadcn@latest add Aidilzin/ui-vault/telemetry-node-topology-mini` |
<!-- VAULT:TELEMETRY:END -->

<!-- VAULT:HYBRIDS:START -->
### Proven Hybrid Recipes (20)

| Recipe | Stack (`baseStyle` + `layers`) | Best For | Combined `shadcn` Install |
| :--- | :--- | :--- | :--- |
| **Tactical Space Dashboard** (`tactical-space`) | `fui-tactical` + lay:`command-hud-dashboard`, tex:`architect-grid`, type:`precision-mono`, tel:`live-oscilloscope`, tel:`node-topology-mini`, `ambient-orbit`, `scramble-text`, `border-spotlight`, `orbital-canvas` | Developer dashboards, telemetry maps, CLI/workspace visualizers | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/layout-command-hud-dashboard Aidilzin/ui-vault/texture-architect-grid Aidilzin/ui-vault/type-precision-mono Aidilzin/ui-vault/telemetry-live-oscilloscope Aidilzin/ui-vault/telemetry-node-topology-mini Aidilzin/ui-vault/style-ambient-orbit Aidilzin/ui-vault/scramble-text Aidilzin/ui-vault/border-spotlight Aidilzin/ui-vault/orbital-canvas` |
| **Editorial Dither Brutalism** (`editorial-dither`) | `neo-brutalism` + `ditherpunk`, `bayer-dither`, `velocity-skew` | Portfolios, interactive essays, experimental landing pages | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-brutalism Aidilzin/ui-vault/style-ditherpunk Aidilzin/ui-vault/bayer-dither Aidilzin/ui-vault/velocity-skew` |
| **Precision Optical HUD** (`precision-glass`) | `fui-tactical` + `liquid-glass`, `liquid-glass-filter`, `magnetic-button` | Floating command palettes, spatial toolbars, audio/hardware web apps | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/style-liquid-glass Aidilzin/ui-vault/liquid-glass-filter Aidilzin/ui-vault/magnetic-button` |
| **Issue Command Center** (`issue-command-center`) | `monolith-dark` + lay:`triage-workbench`, tel:`activity-heatmap`, tel:`diff-delta-pill`, `command-dark`, `spotlight-tabs`, `border-beam`, `kinetic-status-pill` | Issue trackers, keyboard-first SaaS workspaces, linear-style productivity apps | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark Aidilzin/ui-vault/layout-triage-workbench Aidilzin/ui-vault/telemetry-activity-heatmap Aidilzin/ui-vault/telemetry-diff-delta-pill Aidilzin/ui-vault/style-command-dark Aidilzin/ui-vault/spotlight-tabs Aidilzin/ui-vault/border-beam Aidilzin/ui-vault/kinetic-status-pill` |
| **Observability Fault Console** (`observability-console`) | `telemetry-fault` + lay:`command-hud-dashboard`, tel:`uptime-strip`, tel:`latency-histogram`, tel:`diff-delta-pill`, `fui-tactical`, `scramble-text`, `count-up`, `hold-to-confirm` | APM dashboards, incident response consoles, CI/CD trace viewers | `npx shadcn@latest add Aidilzin/ui-vault/style-telemetry-fault Aidilzin/ui-vault/layout-command-hud-dashboard Aidilzin/ui-vault/telemetry-uptime-strip Aidilzin/ui-vault/telemetry-latency-histogram Aidilzin/ui-vault/telemetry-diff-delta-pill Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/scramble-text Aidilzin/ui-vault/count-up Aidilzin/ui-vault/hold-to-confirm` |
| **Type Specimen Press** (`type-specimen-press`) | `swiss-type-foundry` + lay:`swiss-editorial-grid`, tex:`film-grain`, type:`swiss-grotesk`, tel:`inline-sparkline`, `neo-swiss`, `variable-proximity`, `text-roll`, `marquee-hover-row` | Type foundries, design studios, editorial campaign launches | `npx shadcn@latest add Aidilzin/ui-vault/style-swiss-type-foundry Aidilzin/ui-vault/layout-swiss-editorial-grid Aidilzin/ui-vault/texture-film-grain Aidilzin/ui-vault/type-swiss-grotesk Aidilzin/ui-vault/telemetry-inline-sparkline Aidilzin/ui-vault/style-neo-swiss Aidilzin/ui-vault/variable-proximity Aidilzin/ui-vault/text-roll Aidilzin/ui-vault/marquee-hover-row` |
| **Warm Research Reader** (`warm-research-reader`) | `warm-manuscript` + tex:`paper-fiber`, type:`literary-humanist`, `archival-paper`, `blur-text`, `scroll-progress-bar`, `make-way-grid` | Long-form AI notebooks, research libraries, quiet reading apps | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript Aidilzin/ui-vault/texture-paper-fiber Aidilzin/ui-vault/type-literary-humanist Aidilzin/ui-vault/style-archival-paper Aidilzin/ui-vault/blur-text Aidilzin/ui-vault/scroll-progress-bar Aidilzin/ui-vault/make-way-grid` |
| **Cyber Zine Magazine** (`cyber-zine-magazine`) | `zine-wire` + `avant-poster`, `kinetic-card-trail`, `velocity-skew`, `click-spark` | Culture publications, music festivals, interactive media feeds | `npx shadcn@latest add Aidilzin/ui-vault/style-zine-wire Aidilzin/ui-vault/style-avant-poster Aidilzin/ui-vault/kinetic-card-trail Aidilzin/ui-vault/velocity-skew Aidilzin/ui-vault/click-spark` |
| **Phosphor CLI Workbench** (`phosphor-cli-workbench`) | `phosphor-terminal` + tex:`crt-scanlines`, type:`terminal-phosphor`, `ditherpunk`, `crt-grain-overlay`, `ascii-filter`, `kinetic-status-pill` | Developer terminals, retro-futuristic docs, hacker/CTF portals | `npx shadcn@latest add Aidilzin/ui-vault/style-phosphor-terminal Aidilzin/ui-vault/texture-crt-scanlines Aidilzin/ui-vault/type-terminal-phosphor Aidilzin/ui-vault/style-ditherpunk Aidilzin/ui-vault/crt-grain-overlay Aidilzin/ui-vault/ascii-filter Aidilzin/ui-vault/kinetic-status-pill` |
| **Tactile Hardware Deck** (`tactile-hardware-deck`) | `industrial-hardware` + tex:`brushed-anodized`, type:`condensed-hardware`, `monochrome-stark`, `elastic-slider`, `tactile-press-badge`, `crosshair-reticle` | Web audio synthesizers, hardware companions, industrial IoT controls | `npx shadcn@latest add Aidilzin/ui-vault/style-industrial-hardware Aidilzin/ui-vault/texture-brushed-anodized Aidilzin/ui-vault/type-condensed-hardware Aidilzin/ui-vault/style-monochrome-stark Aidilzin/ui-vault/elastic-slider Aidilzin/ui-vault/tactile-press-badge Aidilzin/ui-vault/crosshair-reticle` |
| **Spatial Curated Gallery** (`spatial-curated-gallery`) | `dark-gallery-index` + `liquid-glass`, `glare-hover`, `dock-magnify`, `progressive-blur-edge` | Design directories, creative portfolios, media browsers | `npx shadcn@latest add Aidilzin/ui-vault/style-dark-gallery-index Aidilzin/ui-vault/style-liquid-glass Aidilzin/ui-vault/glare-hover Aidilzin/ui-vault/dock-magnify Aidilzin/ui-vault/progressive-blur-edge` |
| **SaaS Obsidian Craft** (`saas-obsidian-craft`) | `monolith-dark` + `border-beam`, `spotlight-tabs`, `animated-connector-beam` | Production B2B SaaS dashboards with restrained viral focus accents | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark Aidilzin/ui-vault/border-beam Aidilzin/ui-vault/spotlight-tabs Aidilzin/ui-vault/animated-connector-beam` |
| **Warm Editorial Press** (`warm-editorial-press`) | `warm-manuscript` + `split-reveal`, `tactile-push-button`, `blur-fade` | AI writing workspaces, calm essays, and human-centered docs | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript Aidilzin/ui-vault/split-reveal Aidilzin/ui-vault/tactile-push-button Aidilzin/ui-vault/blur-fade` |
| **Bento Product Launch** (`bento-product-launch`) | `bento-grid` + lay:`bento-showcase`, tel:`inline-sparkline`, tel:`radial-step-gauge`, tel:`diff-delta-pill`, `border-spotlight`, `odometer-ticker`, `scroll-sticky-scale` | Hardware/product launch pages and modular feature showcases | `npx shadcn@latest add Aidilzin/ui-vault/style-bento-grid Aidilzin/ui-vault/layout-bento-showcase Aidilzin/ui-vault/telemetry-inline-sparkline Aidilzin/ui-vault/telemetry-radial-step-gauge Aidilzin/ui-vault/telemetry-diff-delta-pill Aidilzin/ui-vault/border-spotlight Aidilzin/ui-vault/odometer-ticker Aidilzin/ui-vault/scroll-sticky-scale` |
| **Aurora AI Landing** (`aurora-ai-landing`) | `aurora-mesh` + `aurora-mesh-bg`, `infinite-marquee`, `shiny-text` | Dark developer marketing pages and viral AI product launches | `npx shadcn@latest add Aidilzin/ui-vault/style-aurora-mesh Aidilzin/ui-vault/aurora-mesh-bg Aidilzin/ui-vault/infinite-marquee Aidilzin/ui-vault/shiny-text` |
| **Playful Canvas Studio** (`playful-canvas-studio`) | `pastel-playful` + `dock-magnify`, `tactile-push-button`, `click-spark` | Collaborative creative tools, whiteboards, and design playgrounds | `npx shadcn@latest add Aidilzin/ui-vault/style-pastel-playful Aidilzin/ui-vault/dock-magnify Aidilzin/ui-vault/tactile-push-button Aidilzin/ui-vault/click-spark` |
| **AI Agent Workbench** (`ai-agent-workbench`) | `monolith-dark` + lay:`split-ai-ide`, tel:`segmented-quota-bar`, tel:`node-topology-mini`, `reasoning-trace`, `tool-call-step`, `agent-approval-card`, `slash-prompt-composer` | Autonomous coding agents, LLM copilot workspaces, human-in-the-loop chat apps | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark Aidilzin/ui-vault/layout-split-ai-ide Aidilzin/ui-vault/telemetry-segmented-quota-bar Aidilzin/ui-vault/telemetry-node-topology-mini Aidilzin/ui-vault/reasoning-trace Aidilzin/ui-vault/tool-call-step Aidilzin/ui-vault/agent-approval-card Aidilzin/ui-vault/slash-prompt-composer` |
| **Code Review Forge** (`code-review-forge`) | `code-forge` + `inline-code-diff`, `magnetic-copy-spell`, `stacked-toast-deck`, `chain-of-thought-rail` | PR review tools, diff inspectors, developer CI dashboards | `npx shadcn@latest add Aidilzin/ui-vault/style-code-forge Aidilzin/ui-vault/inline-code-diff Aidilzin/ui-vault/magnetic-copy-spell Aidilzin/ui-vault/stacked-toast-deck Aidilzin/ui-vault/chain-of-thought-rail` |
| **Ceramic Orbital Showcase** (`ceramic-orbital-showcase`) | `orbital-ceramic` + `eclipse-orb`, `holographic-foil-card`, `lamp-horizon-glow`, `tracing-scroll-beam` | Product launches, hardware-inspired marketing pages, design engineering portfolios | `npx shadcn@latest add Aidilzin/ui-vault/style-orbital-ceramic Aidilzin/ui-vault/eclipse-orb Aidilzin/ui-vault/holographic-foil-card Aidilzin/ui-vault/lamp-horizon-glow Aidilzin/ui-vault/tracing-scroll-beam` |
| **Perceptual SaaS Suite** (`perceptual-saas-suite`) | `perceptual-scale` + `spring-number-flow`, `velocity-dismiss-drawer`, `stacked-toast-deck`, `spotlight-tabs` | Accessible enterprise SaaS apps, billing dashboards, mobile-responsive web tools | `npx shadcn@latest add Aidilzin/ui-vault/style-perceptual-scale Aidilzin/ui-vault/spring-number-flow Aidilzin/ui-vault/velocity-dismiss-drawer Aidilzin/ui-vault/stacked-toast-deck Aidilzin/ui-vault/spotlight-tabs` |
<!-- VAULT:HYBRIDS:END -->

---

## Visual Gallery

<table>
  <tr>
    <td width="50%">
      <img src="docs/assets/playground-styles.png" alt="UI Vault Styles Gallery across 4 aesthetic clusters" width="100%" />
      <br />
      <sub><strong>Styles Gallery</strong> — 10 aesthetic systems rendered on their own authentic theme ground with slide-over <code>STYLE.md</code> specs.</sub>
    </td>
    <td width="50%">
      <img src="docs/assets/playground-relations.png" alt="UI Vault Relations and Hybrids Compatibility Explorer" width="100%" />
      <br />
      <sub><strong>Relations &amp; Hybrids</strong> — Interactive compatibility graph highlighting valid pairings (emerald) and aesthetic clashes (crimson).</sub>
    </td>
  </tr>
</table>

---

## Repository Map & Validation

```text
ui-vault/
├── animations/                 # 15 strict-TypeScript React/CSS/Canvas primitives + registry.json
├── styles/                     # 10 STYLE.md specs & tokens.css across 4 clusters + registry.json
├── playground/                 # Live Vite + React + TypeScript browser app (auto-deployed to Pages)
├── docs/assets/                # README preview captures
├── references/bookmarks.md     # Curated experimental design galleries & motion archives
├── relations.json              # Machine-readable clusters, pairings, clashes, hybrids & registries
├── registry.json               # Root shadcn registry manifest
├── SKILL.md                    # Agent workflow & repeatable style/animation ingestion pipeline
└── .agents/mcp_config.json     # Dembrandt MCP config for live-URL design token extraction
```

Run all three verification gates locally before pushing to `main` (GitHub Actions runs the same checks before deploying `playground/dist` to GitHub Pages):

```bash
npm run typecheck
npm run validate:registry
npm run build:playground
```

See [`SKILL.md`](./SKILL.md) for the repeatable ingestion workflow covering Open Registries, `DESIGN.md` repositories, Creative Coding Labs, and live-URL token extraction via Dembrandt MCP.
