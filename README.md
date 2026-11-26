# ui-vault

**Experimental UI Style Vault · `shadcn` GitHub Registry · AI Agent Skill**

[![Live Playground](https://img.shields.io/badge/Playground-Live-38bdf8?style=flat-square&labelColor=0f1115)](https://aidilzin.github.io/ui-vault/)
[![Deploy Playground](https://img.shields.io/github/actions/workflow/status/Aidilzin/ui-vault/deploy-playground.yml?branch=main&style=flat-square&label=Pages&labelColor=0f1115)](https://github.com/Aidilzin/ui-vault/actions/workflows/deploy-playground.yml)
<!-- VAULT:BADGE:START -->
[![Registry Items](https://img.shields.io/badge/Registry-25%20styles%20%C2%B7%2039%20animations-34d399?style=flat-square&labelColor=0f1115)](./relations.json)
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
### Styles by Aesthetic Cluster (25)

| Cluster | Cluster DNA | Style ID | Key Pairings | `shadcn` Install |
| :--- | :--- | :--- | :--- | :--- |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `fui-tactical` | `scramble-text`, `border-spotlight`, `orbital-canvas` | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `neo-swiss` | `split-reveal`, `variable-proximity`, `velocity-skew`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-swiss` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `editorial-mono` | `split-reveal`, `variable-proximity`, `border-spotlight`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-editorial-mono` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `industrial-hardware` | `flip-card`, `magnetic-button`, `sibling-dim`, `scramble-text` | `npx shadcn@latest add Aidilzin/ui-vault/style-industrial-hardware` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `monolith-dark` | `border-spotlight`, `scramble-text`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `telemetry-fault` | `scramble-text`, `border-spotlight`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-telemetry-fault` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `monochrome-stark` | `split-reveal`, `sibling-dim`, `variable-proximity`, `marquee-hover-row` | `npx shadcn@latest add Aidilzin/ui-vault/style-monochrome-stark` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `dark-gallery-index` | `border-spotlight`, `spotlight-tabs`, `glare-hover`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-dark-gallery-index` |
| `01-precision-systems` | 1px hairlines, monospace micro-labels, corner crosshairs, tight structural grids | `swiss-type-foundry` | `variable-proximity`, `split-reveal`, `text-roll`, `marquee-hover-row` | `npx shadcn@latest add Aidilzin/ui-vault/style-swiss-type-foundry` |
| `02-retro-compute` | 1-bit dithering, ASCII/glyph grids, vintage window chrome, CRT grain | `ditherpunk` | `bayer-dither`, `scramble-text`, `ascii-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-ditherpunk` |
| `02-retro-compute` | 1-bit dithering, ASCII/glyph grids, vintage window chrome, CRT grain | `os-core` | `scramble-text`, `flip-card`, `bayer-dither` | `npx shadcn@latest add Aidilzin/ui-vault/style-os-core` |
| `02-retro-compute` | 1-bit dithering, ASCII/glyph grids, vintage window chrome, CRT grain | `retro-web-96` | `bayer-dither`, `scramble-text`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-retro-web-96` |
| `02-retro-compute` | 1-bit dithering, ASCII/glyph grids, vintage window chrome, CRT grain | `phosphor-terminal` | `scramble-text`, `ascii-filter`, `crt-grain-overlay`, `kinetic-status-pill` | `npx shadcn@latest add Aidilzin/ui-vault/style-phosphor-terminal` |
| `03-kinetic-rebel` | Oversized expressive display type, hard zero-blur shadows, raw grids, chrome accents | `neo-brutalism` | `velocity-skew`, `variable-proximity`, `bayer-dither`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-brutalism` |
| `03-kinetic-rebel` | Oversized expressive display type, hard zero-blur shadows, raw grids, chrome accents | `acid-y2k` | `variable-proximity`, `velocity-skew`, `ascii-filter`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-acid-y2k` |
| `03-kinetic-rebel` | Oversized expressive display type, hard zero-blur shadows, raw grids, chrome accents | `console-2001` | `spring-tilt-card`, `glare-hover`, `velocity-skew` | `npx shadcn@latest add Aidilzin/ui-vault/style-console-2001` |
| `03-kinetic-rebel` | Oversized expressive display type, hard zero-blur shadows, raw grids, chrome accents | `zine-wire` | `marquee-hover-row`, `velocity-skew`, `variable-proximity`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-zine-wire` |
| `03-kinetic-rebel` | Oversized expressive display type, hard zero-blur shadows, raw grids, chrome accents | `avant-poster` | `marquee-hover-row`, `kinetic-card-trail`, `velocity-skew`, `variable-proximity` | `npx shadcn@latest add Aidilzin/ui-vault/style-avant-poster` |
| `04-spatial-physics` | Optical refraction, depth sorting, mass/inertia springs, specular lighting | `liquid-glass` | `liquid-glass-filter`, `magnetic-button`, `spring-tilt-card`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-liquid-glass` |
| `04-spatial-physics` | Optical refraction, depth sorting, mass/inertia springs, specular lighting | `ambient-orbit` | `orbital-canvas`, `border-spotlight`, `scramble-text` | `npx shadcn@latest add Aidilzin/ui-vault/style-ambient-orbit` |
| `04-spatial-physics` | Optical refraction, depth sorting, mass/inertia springs, specular lighting | `command-dark` | `border-spotlight`, `glare-hover`, `magnetic-button`, `liquid-glass-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-command-dark` |
| `04-spatial-physics` | Optical refraction, depth sorting, mass/inertia springs, specular lighting | `mesh-craft` | `spring-tilt-card`, `glare-hover`, `magnetic-button`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-mesh-craft` |
| `05-editorial-organic` | Warm paper substrates, literary serif/sans pairings, organic tactile ink, calm publication grids | `warm-manuscript` | `split-reveal`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript` |
| `05-editorial-organic` | Warm paper substrates, literary serif/sans pairings, organic tactile ink, calm publication grids | `archival-paper` | `sibling-dim`, `spotlight-tabs`, `scroll-progress-bar`, `make-way-grid` | `npx shadcn@latest add Aidilzin/ui-vault/style-archival-paper` |
| `05-editorial-organic` | Warm paper substrates, literary serif/sans pairings, organic tactile ink, calm publication grids | `tactile-studio-warm` | `blur-text`, `sibling-dim`, `progressive-blur-edge`, `spotlight-tabs` | `npx shadcn@latest add Aidilzin/ui-vault/style-tactile-studio-warm` |
<!-- VAULT:STYLES:END -->

<!-- VAULT:ANIMATIONS:START -->
### Animations by Mechanic (39)

| Animation | Mechanic | Engine | Perf Tier | Reduced Motion Fallback | Registry Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Magnetic Button | `cursor-reactive` | `react`, `css` | `low` | `disabled-pull` | `magnetic-button` |
| Mouse-Tracking Border Spotlight | `cursor-reactive` | `react`, `css` | `low` | `static-border` | `border-spotlight` |
| Sibling Dim Grid | `cursor-reactive` | `css` | `low` | `instant-opacity` | `sibling-dim` |
| Scramble / Decrypt Text | `text-kinetic` | `react` | `low` | `instant-text-swap` | `scramble-text` |
| Masked Split-Text Reveal | `text-kinetic` | `react`, `css` | `low` | `instant-visible` | `split-reveal` |
| Variable Font Proximity | `text-kinetic` | `react`, `css` | `low` | `static-weight` | `variable-proximity` |
| FLIP Layout Morph Card | `layout-morph` | `react`, `waapi` | `low` | `instant-layout` | `flip-card` |
| Scroll Velocity Skew | `layout-morph` | `react` | `low` | `disabled-skew` | `velocity-skew` |
| Bayer Dither Canvas | `shader-canvas` | `canvas` | `medium` | `static-dither-frame` | `bayer-dither` |
| ASCII Wave Filter | `shader-canvas` | `react` | `low` | `static-ascii-frame` | `ascii-filter` |
| 2.5D Orbital Constellation Canvas | `shader-canvas` | `canvas` | `medium` | `static-constellation` | `orbital-canvas` |
| Liquid Glass Surface | `physics-optics` | `svg`, `css` | `medium` | `opaque-fallback` | `liquid-glass-filter` |
| Spring 3D Tilt Card | `physics-optics` | `react`, `css` | `low` | `flat-card` | `spring-tilt-card` |
| Specular Glare Hover | `physics-optics` | `react`, `css` | `low` | `static-surface` | `glare-hover` |
| Kinetic Marquee Hover Row | `text-kinetic` | `react`, `css` | `low` | `static-highlight` | `marquee-hover-row` |
| Star Border Glow | `cursor-reactive` | `react`, `css` | `low` | `static-border` | `star-border` |
| Magnetic Vector Lines | `cursor-reactive` | `react`, `css` | `low` | `static-angles` | `magnet-lines` |
| Crosshair Coordinate Reticle | `cursor-reactive` | `react`, `css` | `low` | `hidden-reticle` | `crosshair-reticle` |
| Conic Border Beam | `cursor-reactive` | `react`, `css` | `low` | `static-border` | `border-beam` |
| Metallic Shiny Text | `text-kinetic` | `react`, `css` | `low` | `static-text` | `shiny-text` |
| Optical Blur Text Reveal | `text-kinetic` | `react`, `css` | `low` | `instant-visible` | `blur-text` |
| Split-Flap Text Roll | `text-kinetic` | `react`, `css` | `low` | `static-text` | `text-roll` |
| Pixel Shimmer Card | `shader-canvas` | `canvas` | `medium` | `static-pixel-frame` | `pixel-card` |
| Elastic Overshoot Slider | `physics-optics` | `react`, `css` | `low` | `linear-slider` | `elastic-slider` |
| Proximity Dock Magnification | `physics-optics` | `react`, `css` | `low` | `static-dock` | `dock-magnify` |
| Compositor Scroll Progress Bar | `scroll-driven` | `react`, `css` | `low` | `instant-progress` | `scroll-progress-bar` |
| Radial Click Spark | `micro-feedback` | `canvas` | `low` | `disabled-sparks` | `click-spark` |
| Eased Tabular Count-Up | `micro-feedback` | `react` | `low` | `instant-value` | `count-up` |
| Hold-to-Confirm Action Button | `micro-feedback` | `react`, `css` | `low` | `single-click-confirm` | `hold-to-confirm` |
| Kinetic Card Trail | `cursor-reactive` | `react`, `css` | `low` | `disabled-trail` | `kinetic-card-trail` |
| Make-Way FLIP Grid | `layout-morph` | `react`, `waapi` | `low` | `instant-layout` | `make-way-grid` |
| Pixel Hover Dissolve Grid | `shader-canvas` | `canvas` | `medium` | `instant-cells` | `pixel-hover-grid` |
| CRT Film Grain Overlay | `shader-canvas` | `canvas`, `css` | `low` | `static-grain-frame` | `crt-grain-overlay` |
| SVG Turbulence Hover Filter | `physics-optics` | `svg`, `react` | `medium` | `static-surface` | `svg-turbulence-hover` |
| Elastic Staggered Column Scroll | `scroll-driven` | `react`, `css` | `low` | `disabled-lag` | `elastic-column-scroll` |
| Spotlight Segmented Tabs | `layout-morph` | `react`, `css` | `low` | `instant-tab-switch` | `spotlight-tabs` |
| Progressive Blur Scroll Edge | `scroll-driven` | `css`, `react` | `low` | `opaque-gradient-edge` | `progressive-blur-edge` |
| Tactile Detent Press Badge | `micro-feedback` | `react`, `css` | `low` | `static-press` | `tactile-press-badge` |
| Kinetic Morphing Status Pill | `micro-feedback` | `react`, `css` | `low` | `instant-state-swap` | `kinetic-status-pill` |
<!-- VAULT:ANIMATIONS:END -->

<!-- VAULT:HYBRIDS:START -->
### Proven Hybrid Recipes (11)

| Recipe | Stack (`baseStyle` + `accents`) | Best For | Combined `shadcn` Install |
| :--- | :--- | :--- | :--- |
| **Tactical Space Dashboard** (`tactical-space`) | `fui-tactical` + `ambient-orbit`, `scramble-text`, `border-spotlight`, `orbital-canvas` | Developer dashboards, telemetry maps, CLI/workspace visualizers | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/style-ambient-orbit Aidilzin/ui-vault/scramble-text Aidilzin/ui-vault/border-spotlight Aidilzin/ui-vault/orbital-canvas` |
| **Editorial Dither Brutalism** (`editorial-dither`) | `neo-brutalism` + `ditherpunk`, `bayer-dither`, `velocity-skew` | Portfolios, interactive essays, experimental landing pages | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-brutalism Aidilzin/ui-vault/style-ditherpunk Aidilzin/ui-vault/bayer-dither Aidilzin/ui-vault/velocity-skew` |
| **Precision Optical HUD** (`precision-glass`) | `fui-tactical` + `liquid-glass`, `liquid-glass-filter`, `magnetic-button` | Floating command palettes, spatial toolbars, audio/hardware web apps | `npx shadcn@latest add Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/style-liquid-glass Aidilzin/ui-vault/liquid-glass-filter Aidilzin/ui-vault/magnetic-button` |
| **Issue Command Center** (`issue-command-center`) | `monolith-dark` + `command-dark`, `spotlight-tabs`, `border-beam`, `kinetic-status-pill` | Issue trackers, keyboard-first SaaS workspaces, linear-style productivity apps | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark Aidilzin/ui-vault/style-command-dark Aidilzin/ui-vault/spotlight-tabs Aidilzin/ui-vault/border-beam Aidilzin/ui-vault/kinetic-status-pill` |
| **Observability Fault Console** (`observability-console`) | `telemetry-fault` + `fui-tactical`, `scramble-text`, `count-up`, `hold-to-confirm` | APM dashboards, incident response consoles, CI/CD trace viewers | `npx shadcn@latest add Aidilzin/ui-vault/style-telemetry-fault Aidilzin/ui-vault/style-fui-tactical Aidilzin/ui-vault/scramble-text Aidilzin/ui-vault/count-up Aidilzin/ui-vault/hold-to-confirm` |
| **Type Specimen Press** (`type-specimen-press`) | `swiss-type-foundry` + `neo-swiss`, `variable-proximity`, `text-roll`, `marquee-hover-row` | Type foundries, design studios, editorial campaign launches | `npx shadcn@latest add Aidilzin/ui-vault/style-swiss-type-foundry Aidilzin/ui-vault/style-neo-swiss Aidilzin/ui-vault/variable-proximity Aidilzin/ui-vault/text-roll Aidilzin/ui-vault/marquee-hover-row` |
| **Warm Research Reader** (`warm-research-reader`) | `warm-manuscript` + `archival-paper`, `blur-text`, `scroll-progress-bar`, `make-way-grid` | Long-form AI notebooks, research libraries, quiet reading apps | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript Aidilzin/ui-vault/style-archival-paper Aidilzin/ui-vault/blur-text Aidilzin/ui-vault/scroll-progress-bar Aidilzin/ui-vault/make-way-grid` |
| **Cyber Zine Magazine** (`cyber-zine-magazine`) | `zine-wire` + `avant-poster`, `kinetic-card-trail`, `velocity-skew`, `click-spark` | Culture publications, music festivals, interactive media feeds | `npx shadcn@latest add Aidilzin/ui-vault/style-zine-wire Aidilzin/ui-vault/style-avant-poster Aidilzin/ui-vault/kinetic-card-trail Aidilzin/ui-vault/velocity-skew Aidilzin/ui-vault/click-spark` |
| **Phosphor CLI Workbench** (`phosphor-cli-workbench`) | `phosphor-terminal` + `ditherpunk`, `crt-grain-overlay`, `ascii-filter`, `kinetic-status-pill` | Developer terminals, retro-futuristic docs, hacker/CTF portals | `npx shadcn@latest add Aidilzin/ui-vault/style-phosphor-terminal Aidilzin/ui-vault/style-ditherpunk Aidilzin/ui-vault/crt-grain-overlay Aidilzin/ui-vault/ascii-filter Aidilzin/ui-vault/kinetic-status-pill` |
| **Tactile Hardware Deck** (`tactile-hardware-deck`) | `industrial-hardware` + `monochrome-stark`, `elastic-slider`, `tactile-press-badge`, `crosshair-reticle` | Web audio synthesizers, hardware companions, industrial IoT controls | `npx shadcn@latest add Aidilzin/ui-vault/style-industrial-hardware Aidilzin/ui-vault/style-monochrome-stark Aidilzin/ui-vault/elastic-slider Aidilzin/ui-vault/tactile-press-badge Aidilzin/ui-vault/crosshair-reticle` |
| **Spatial Curated Gallery** (`spatial-curated-gallery`) | `dark-gallery-index` + `liquid-glass`, `glare-hover`, `dock-magnify`, `progressive-blur-edge` | Design directories, creative portfolios, media browsers | `npx shadcn@latest add Aidilzin/ui-vault/style-dark-gallery-index Aidilzin/ui-vault/style-liquid-glass Aidilzin/ui-vault/glare-hover Aidilzin/ui-vault/dock-magnify Aidilzin/ui-vault/progressive-blur-edge` |
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
