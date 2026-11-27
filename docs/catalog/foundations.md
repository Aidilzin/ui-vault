← [README](../../README.md) · [Styles (36)](./styles.md) · [Animations (69)](./animations.md) · [Foundations (39)](./foundations.md) · [Hybrids (20)](./hybrids.md) · [Live Playground ↗](https://aidilzin.github.io/ui-vault/)

# Foundations Catalog (39)

Jump to: [Textures (12)](#textures) · [Typography (9)](#typography) · [Layouts (8)](#layouts) · [Telemetry (10)](#telemetry)

## Textures

12 zero-JS adaptive CSS surface layers parameterized by `--tx-color`, `--tx-opacity`, and `--tx-size`.

| Texture | Tier | Layer | Mechanism | Key Pairings | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Film Grain** (`film-grain`) | `production` | `overlay` | `svg-turbulence` | `warm-manuscript`, `archival-paper`, `swiss-type-foundry`, `monolith-dark` | `texture-film-grain` |
| **Paper Fiber** (`paper-fiber`) | `production` | `ground` | `css-gradient` | `warm-manuscript`, `archival-paper`, `tactile-studio-warm`, `monochrome-gallery` | `texture-paper-fiber` |
| **Dot Matrix** (`dot-matrix`) | `production` | `ground` | `css-gradient` | `bento-grid`, `monolith-dark`, `fui-tactical`, `perceptual-scale` | `texture-dot-matrix` |
| **Architect Grid** (`architect-grid`) | `production` | `ground` | `css-gradient` | `fui-tactical`, `neo-swiss`, `industrial-hardware`, `telemetry-fault` | `texture-architect-grid` |
| **Crosshair Field** (`crosshair-field`) | `experimental` | `ground` | `svg-mask` | `fui-tactical`, `telemetry-fault`, `ambient-orbit`, `crosshair-reticle` | `texture-crosshair-field` |
| **CRT Scanlines** (`crt-scanlines`) | `experimental` | `overlay` | `css-gradient` | `phosphor-terminal`, `ditherpunk`, `eight-bit-arcade`, `console-2001` | `texture-crt-scanlines` |
| **Diagonal Hatch** (`diagonal-hatch`) | `production` | `ground` | `css-gradient` | `neo-swiss`, `monochrome-stark`, `industrial-hardware`, `neo-brutalism` | `texture-diagonal-hatch` |
| **Halftone Screen** (`halftone-screen`) | `experimental` | `ground` | `css-gradient` | `neo-brutalism`, `avant-poster`, `zine-wire`, `ditherpunk` | `texture-halftone-screen` |
| **Brushed Anodized** (`brushed-anodized`) | `viral` | `ground` | `css-gradient` | `industrial-hardware`, `orbital-ceramic`, `command-dark`, `dark-gallery-index` | `texture-brushed-anodized` |
| **Topographic Mesh** (`topographic-mesh`) | `viral` | `ground` | `svg-mask` | `ambient-orbit`, `orbital-ceramic`, `aurora-mesh`, `fui-tactical` | `texture-topographic-mesh` |
| **Radial Vignette** (`radial-vignette`) | `production` | `overlay` | `css-gradient` | `monolith-dark`, `aurora-mesh`, `command-dark`, `dark-gallery-index` | `texture-radial-vignette` |
| **Checker Dither** (`checker-dither`) | `experimental` | `ground` | `css-gradient` | `ditherpunk`, `os-core`, `retro-web-96`, `eight-bit-arcade` | `texture-checker-dither` |

## Typography

9 scoped fluid typography systems with `clamp()` scales, `tabular-nums`, and on-demand Google Fonts.

| System | Tier | Font Stack | Voice | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- |
| **Precision Mono** (`precision-mono`) | `production` | `Inter` + `JetBrains Mono` | Technical telemetry, tight neo-grotesk headings, uppercase mono micro-labels, strict tabular numerals | `type-precision-mono` |
| **Editorial Serif** (`editorial-serif`) | `production` | `Instrument Serif` + `Plus Jakarta Sans` + `IBM Plex Mono` | High-contrast editorial and AI research lab voice with generous classical display proportions | `type-editorial-serif` |
| **Swiss Grotesk** (`swiss-grotesk`) | `production` | `Archivo` + `Inter` + `IBM Plex Mono` | Heavy tight-tracked International Typographic Style hierarchy with disciplined negative space | `type-swiss-grotesk` |
| **Literary Humanist** (`literary-humanist`) | `production` | `Fraunces` + `Newsreader` + `IBM Plex Mono` | Warm tactile manuscript and long-form journal proportions using optical variable serifs | `type-literary-humanist` |
| **Kinetic Brutal** (`kinetic-brutal`) | `experimental` | `Syne` + `Space Grotesk` + `Space Mono` | Wide assertive avant-garde poster geometry with raw brutalist energy | `type-kinetic-brutal` |
| **Terminal Phosphor** (`terminal-phosphor`) | `experimental` | `JetBrains Mono` + `IBM Plex Mono` | Strict all-monospace grid rhythm with zero sans-serif drift for CLI and retro-compute surfaces | `type-terminal-phosphor` |
| **Pixel Arcade** (`pixel-arcade`) | `experimental` | `Silkscreen` + `Space Mono` | Crisp stepped bitmap display headlines paired with readable monospace body copy | `type-pixel-arcade` |
| **Neo Display SaaS** (`neo-display-saas`) | `viral` | `Space Grotesk` + `Inter` + `JetBrains Mono` | Clean, punchy modern launch-page and product marketing voice with geometric poise | `type-neo-display-saas` |
| **Condensed Hardware** (`condensed-hardware`) | `viral` | `Barlow Condensed` + `Inter` + `IBM Plex Mono` | Uppercase industrial signage, rail-timetable clarity, and anodized hardware faceplate typography | `type-condensed-hardware` |

## Layouts

8 container-query (`@container`) page shells driven by `--lay-*` tokens with zero hardcoded palettes.

| Layout | Tier | Pattern | Slots | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- |
| **Bento Showcase** (`bento-showcase`) | `viral` | Asymmetric 12-column modular Bento grid | `header`, `hero`, `metricColumn`, `tiles`, `footer` | `layout-bento-showcase` |
| **Triage Workbench** (`triage-workbench`) | `production` | 3-pane Linear / Superhuman desktop triage shell | `header`, `navRail`, `queuePane`, `inspectorPane`, `footer` | `layout-triage-workbench` |
| **Swiss Editorial Grid** (`swiss-editorial-grid`) | `production` | Exposed 1px hairline 12-column International Typographic grid | `masthead`, `indexRail`, `hero`, `body`, `footer` | `layout-swiss-editorial-grid` |
| **Split AI IDE** (`split-ai-ide`) | `production` | Agentic workspace with session rail, execution stream, pinned composer, and diff pane | `header`, `sessionRail`, `stream`, `composer`, `artifactPane` | `layout-split-ai-ide` |
| **Sticky Scrollytelling** (`sticky-scrollytelling`) | `viral` | Sticky visual/artifact stage paired with scrolling narrative steps | `header`, `steps`, `renderStage`, `footer` | `layout-sticky-scrollytelling` |
| **Floating OS Desktop** (`floating-os-desktop`) | `experimental` | Spatial / retro desktop canvas with menu bar, framed windows, and scoped bottom dock | `menuBar`, `primaryWindow`, `secondaryWindow`, `dock` | `layout-floating-os-desktop` |
| **Command HUD Dashboard** (`command-hud-dashboard`) | `experimental` | Dense 4-quadrant FUI mission-control instrumentation grid | `ticker`, `quadrants`, `eventRail` | `layout-command-hud-dashboard` |
| **Masonry Archive** (`masonry-archive`) | `production` | Curated catalog with sticky filter bar, multi-column waterfall grid, and detail rail | `header`, `filterBar`, `items`, `detailRail`, `footer` | `layout-masonry-archive` |

## Telemetry

10 zero-library SVG/React micro-charts driven by adaptive `--tel-*` tokens.

| Telemetry | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Inline Sparkline** (`inline-sparkline`) | `production` | `svg`, `react` | `low` | `static-scrubber` | `telemetry-inline-sparkline` |
| **Uptime Strip** (`uptime-strip`) | `production` | `react`, `css` | `low` | `instant-tooltip` | `telemetry-uptime-strip` |
| **Activity Heatmap** (`activity-heatmap`) | `production` | `svg`, `react` | `low` | `instant-cell-focus` | `telemetry-activity-heatmap` |
| **Latency Histogram** (`latency-histogram`) | `production` | `svg`, `react` | `low` | `static-bars` | `telemetry-latency-histogram` |
| **Radial Step Gauge** (`radial-step-gauge`) | `viral` | `svg`, `react` | `low` | `instant-value` | `telemetry-radial-step-gauge` |
| **LED Status Matrix** (`led-status-matrix`) | `experimental` | `react`, `css` | `low` | `static-leds` | `telemetry-led-status-matrix` |
| **Live Oscilloscope** (`live-oscilloscope`) | `experimental` | `canvas`, `react` | `medium` | `static-waveform` | `telemetry-live-oscilloscope` |
| **Segmented Quota Bar** (`segmented-quota-bar`) | `production` | `react`, `css` | `low` | `instant-highlight` | `telemetry-segmented-quota-bar` |
| **Diff Delta Pill** (`diff-delta-pill`) | `production` | `svg`, `react` | `low` | `static-badge` | `telemetry-diff-delta-pill` |
| **Node Topology Mini** (`node-topology-mini`) | `viral` | `svg`, `react` | `low` | `static-topology` | `telemetry-node-topology-mini` |
