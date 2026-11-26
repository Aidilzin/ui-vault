# ui-vault

**Experimental UI Style Vault · `shadcn` GitHub Registry · AI Agent Skill**

[![Live Playground](https://img.shields.io/badge/Playground-Live-38bdf8?style=flat-square&labelColor=0f1115)](https://aidilzin.github.io/ui-vault/)
[![Deploy Playground](https://img.shields.io/github/actions/workflow/status/Aidilzin/ui-vault/deploy-playground.yml?branch=main&style=flat-square&label=Pages&labelColor=0f1115)](https://github.com/Aidilzin/ui-vault/actions/workflows/deploy-playground.yml)
<!-- VAULT:BADGE:START -->
[![Registry Items](https://img.shields.io/badge/Registry-30%20styles%20%C2%B7%2053%20animations-34d399?style=flat-square&labelColor=0f1115)](./relations.json)
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
### Styles by Aesthetic Cluster (30)

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
| `02-retro-compute` | `experimental` | `ditherpunk` | `bayer-dither`, `scramble-text`, `ascii-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-ditherpunk` |
| `02-retro-compute` | `experimental` | `os-core` | `scramble-text`, `flip-card`, `bayer-dither` | `npx shadcn@latest add Aidilzin/ui-vault/style-os-core` |
| `02-retro-compute` | `experimental` | `retro-web-96` | `bayer-dither`, `scramble-text`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-retro-web-96` |
| `02-retro-compute` | `experimental` | `phosphor-terminal` | `scramble-text`, `ascii-filter`, `crt-grain-overlay`, `kinetic-status-pill` | `npx shadcn@latest add Aidilzin/ui-vault/style-phosphor-terminal` |
| `03-kinetic-rebel` | `experimental` | `neo-brutalism` | `velocity-skew`, `variable-proximity`, `bayer-dither`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-neo-brutalism` |
| `03-kinetic-rebel` | `experimental` | `acid-y2k` | `variable-proximity`, `velocity-skew`, `ascii-filter`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-acid-y2k` |
| `03-kinetic-rebel` | `experimental` | `console-2001` | `spring-tilt-card`, `glare-hover`, `velocity-skew` | `npx shadcn@latest add Aidilzin/ui-vault/style-console-2001` |
| `03-kinetic-rebel` | `experimental` | `zine-wire` | `marquee-hover-row`, `velocity-skew`, `variable-proximity`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-zine-wire` |
| `03-kinetic-rebel` | `experimental` | `avant-poster` | `marquee-hover-row`, `kinetic-card-trail`, `velocity-skew`, `variable-proximity` | `npx shadcn@latest add Aidilzin/ui-vault/style-avant-poster` |
| `04-spatial-physics` | `viral` | `liquid-glass` | `liquid-glass-filter`, `magnetic-button`, `spring-tilt-card`, `border-spotlight` | `npx shadcn@latest add Aidilzin/ui-vault/style-liquid-glass` |
| `04-spatial-physics` | `experimental` | `ambient-orbit` | `orbital-canvas`, `border-spotlight`, `scramble-text` | `npx shadcn@latest add Aidilzin/ui-vault/style-ambient-orbit` |
| `04-spatial-physics` | `viral` | `command-dark` | `border-spotlight`, `glare-hover`, `magnetic-button`, `liquid-glass-filter` | `npx shadcn@latest add Aidilzin/ui-vault/style-command-dark` |
| `05-modern-craft` | `production` | `monolith-dark` | `border-spotlight`, `scramble-text`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark` |
| `05-modern-craft` | `production` | `mesh-craft` | `spring-tilt-card`, `glare-hover`, `magnetic-button`, `split-reveal` | `npx shadcn@latest add Aidilzin/ui-vault/style-mesh-craft` |
| `05-modern-craft` | `production` | `bento-grid` | `border-spotlight`, `count-up`, `split-reveal`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-bento-grid` |
| `05-modern-craft` | `viral` | `aurora-mesh` | `border-beam`, `shiny-text`, `glare-hover`, `spotlight-tabs` | `npx shadcn@latest add Aidilzin/ui-vault/style-aurora-mesh` |
| `05-modern-craft` | `production` | `tactile-soft` | `spotlight-tabs`, `tactile-press-badge`, `blur-text`, `sibling-dim` | `npx shadcn@latest add Aidilzin/ui-vault/style-tactile-soft` |
| `06-editorial-warm` | `production` | `warm-manuscript` | `split-reveal`, `sibling-dim`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript` |
| `06-editorial-warm` | `production` | `archival-paper` | `sibling-dim`, `spotlight-tabs`, `scroll-progress-bar`, `make-way-grid` | `npx shadcn@latest add Aidilzin/ui-vault/style-archival-paper` |
| `06-editorial-warm` | `production` | `tactile-studio-warm` | `blur-text`, `sibling-dim`, `progressive-blur-edge`, `spotlight-tabs` | `npx shadcn@latest add Aidilzin/ui-vault/style-tactile-studio-warm` |
| `06-editorial-warm` | `production` | `monochrome-gallery` | `sibling-dim`, `scroll-progress-bar`, `spotlight-tabs`, `make-way-grid` | `npx shadcn@latest add Aidilzin/ui-vault/style-monochrome-gallery` |
| `06-editorial-warm` | `viral` | `pastel-playful` | `dock-magnify`, `click-spark`, `tactile-press-badge`, `flip-card` | `npx shadcn@latest add Aidilzin/ui-vault/style-pastel-playful` |
<!-- VAULT:STYLES:END -->

<!-- VAULT:ANIMATIONS:START -->
### Animations by Mechanic (53)

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
<!-- VAULT:ANIMATIONS:END -->

<!-- VAULT:HYBRIDS:START -->
### Proven Hybrid Recipes (16)

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
| **SaaS Obsidian Craft** (`saas-obsidian-craft`) | `monolith-dark` + `border-beam`, `spotlight-tabs`, `animated-connector-beam` | Production B2B SaaS dashboards with restrained viral focus accents | `npx shadcn@latest add Aidilzin/ui-vault/style-monolith-dark Aidilzin/ui-vault/border-beam Aidilzin/ui-vault/spotlight-tabs Aidilzin/ui-vault/animated-connector-beam` |
| **Warm Editorial Press** (`warm-editorial-press`) | `warm-manuscript` + `split-reveal`, `tactile-push-button`, `blur-fade` | AI writing workspaces, calm essays, and human-centered docs | `npx shadcn@latest add Aidilzin/ui-vault/style-warm-manuscript Aidilzin/ui-vault/split-reveal Aidilzin/ui-vault/tactile-push-button Aidilzin/ui-vault/blur-fade` |
| **Bento Product Launch** (`bento-product-launch`) | `bento-grid` + `border-spotlight`, `odometer-ticker`, `scroll-sticky-scale` | Hardware/product launch pages and modular feature showcases | `npx shadcn@latest add Aidilzin/ui-vault/style-bento-grid Aidilzin/ui-vault/border-spotlight Aidilzin/ui-vault/odometer-ticker Aidilzin/ui-vault/scroll-sticky-scale` |
| **Aurora AI Landing** (`aurora-ai-landing`) | `aurora-mesh` + `aurora-mesh-bg`, `infinite-marquee`, `shiny-text` | Dark developer marketing pages and viral AI product launches | `npx shadcn@latest add Aidilzin/ui-vault/style-aurora-mesh Aidilzin/ui-vault/aurora-mesh-bg Aidilzin/ui-vault/infinite-marquee Aidilzin/ui-vault/shiny-text` |
| **Playful Canvas Studio** (`playful-canvas-studio`) | `pastel-playful` + `dock-magnify`, `tactile-push-button`, `click-spark` | Collaborative creative tools, whiteboards, and design playgrounds | `npx shadcn@latest add Aidilzin/ui-vault/style-pastel-playful Aidilzin/ui-vault/dock-magnify Aidilzin/ui-vault/tactile-push-button Aidilzin/ui-vault/click-spark` |
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
