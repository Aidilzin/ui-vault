← [README](../../README.md) · [Styles (43)](./styles.md) · [Animations (79)](./animations.md) · [Foundations (71)](./foundations.md) · [Hybrids (20)](./hybrids.md) · [Live Playground ↗](https://aidilzin.github.io/ui-vault/)

# Foundations Catalog (71)

Jump to: [Textures (21)](#textures) · [Typography (16)](#typography) · [Layouts (15)](#layouts) · [Telemetry (19)](#telemetry)

## Textures

21 zero-JS adaptive CSS surface layers parameterized by `--tx-color`, `--tx-opacity`, and `--tx-size`.

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
| **isometric-cube-grid** (`isometric-cube-grid`) | `experimental` | `ground` | `css` | `fui-tactical`, `blueprint-cyanotype`, `bento-grid`, `industrial-hardware` | `texture-isometric-cube-grid` |
| **pcb-circuit-traces** (`pcb-circuit-traces`) | `experimental` | `ground` | `css` | `phosphor-terminal`, `fui-tactical`, `telemetry-fault`, `blueprint-cyanotype` | `texture-pcb-circuit-traces` |
| **hex-honeycomb-mesh** (`hex-honeycomb-mesh`) | `viral` | `ground` | `css` | `velvet-chrome-prism`, `orbital-ceramic`, `command-dark`, `fui-tactical` | `texture-hex-honeycomb-mesh` |
| **micro-plus-stitch** (`micro-plus-stitch`) | `production` | `ground` | `css` | `archival-paper`, `tactile-studio-warm`, `motion-slate-minimal`, `neo-swiss` | `texture-micro-plus-stitch` |
| **concentric-radar-arcs** (`concentric-radar-arcs`) | `viral` | `ground` | `css` | `ambient-orbit`, `orbital-ceramic`, `velvet-chrome-prism`, `fui-tactical` | `texture-concentric-radar-arcs` |
| **pinstripe-ledger** (`pinstripe-ledger`) | `production` | `ground` | `css` | `neo-swiss`, `monochrome-stark`, `swiss-type-foundry`, `monolith-dark` | `texture-pinstripe-ledger` |
| **blueprint-margin-ruler** (`blueprint-margin-ruler`) | `production` | `ground` | `css` | `blueprint-cyanotype`, `industrial-hardware`, `fui-tactical`, `transit-precision` | `texture-blueprint-margin-ruler` |
| **mineral-terrazzo-speckle** (`mineral-terrazzo-speckle`) | `production` | `ground` | `css` | `gallery-curated-sand`, `risograph-print`, `warm-manuscript`, `tactile-studio-warm` | `texture-mineral-terrazzo-speckle` |
| **carbon-twill-weave** (`carbon-twill-weave`) | `viral` | `ground` | `css` | `industrial-hardware`, `command-dark`, `cinema-noir-motion`, `dark-gallery-index` | `texture-carbon-twill-weave` |

## Typography

16 scoped fluid typography systems with `clamp()` scales, `tabular-nums`, and on-demand Google Fonts.

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
| **editorial-didone** (`editorial-didone`) | `viral` | `Bodoni Moda` + `Plus Jakarta Sans` + `IBM Plex Mono` | High-contrast luxury fashion and exhibition serif with optical hairline contrast | `type-editorial-didone` |
| **technical-superfamily** (`technical-superfamily`) | `production` | `IBM Plex Sans` + `IBM Plex Serif` + `IBM Plex Mono` | Unified engineering tri-voice superfamily pairing matching x-height Sans, Serif, and Mono cuts | `type-technical-superfamily` |
| **wide-kinetic-display** (`wide-kinetic-display`) | `experimental` | `Clash Display` + `Satoshi` | Contemporary modernist display with sharp squared apertures and sleek geometric body voice | `type-wide-kinetic-display` |
| **geometric-friendly** (`geometric-friendly`) | `production` | `Plus Jakarta Sans` + `Nunito` + `DM Mono` | Approachable rounded-terminal geometric system tailored for consumer apps and soft tactile UIs | `type-geometric-friendly` |
| **cjk-bilingual-precision** (`cjk-bilingual-precision`) | `production` | `Noto Sans JP` + `Inter` + `JetBrains Mono` | Balanced Latin + CJK system enforcing relaxed display leading (>= 1.3) and strict tabular numerals | `type-cjk-bilingual-precision` |
| **architectural-slab** (`architectural-slab`) | `production` | `Zilla Slab` + `Inter` + `Space Mono` | Crisp journalistic slab-serif display voice with sturdy bracketed serifs and clean sans prose | `type-architectural-slab` |
| **neo-minimal-mono** (`neo-minimal-mono`) | `viral` | `Geist` + `Geist Mono` | Minimalist developer-craft neo-grotesk and companion monospace with razor-tight display tracking | `type-neo-minimal-mono` |

## Layouts

15 container-query (`@container`) page shells driven by `--lay-*` tokens with zero hardcoded palettes.

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
| **Docs Three Column** (`docs-three-column`) | `production` |  |  | `layout-docs-three-column` |
| **Split Hero Feed** (`split-hero-feed`) | `viral` |  |  | `layout-split-hero-feed` |
| **Kanban Swimlanes** (`kanban-swimlanes`) | `production` |  |  | `layout-kanban-swimlanes` |
| **Cinema Media Stage** (`cinema-media-stage`) | `viral` |  |  | `layout-cinema-media-stage` |
| **Trading Terminal Grid** (`trading-terminal-grid`) | `experimental` |  |  | `layout-trading-terminal-grid` |
| **Comparison Matrix Split** (`comparison-matrix-split`) | `production` |  |  | `layout-comparison-matrix-split` |
| **Editorial Index Preview** (`editorial-index-preview`) | `experimental` |  |  | `layout-editorial-index-preview` |

## Telemetry

19 zero-library SVG/React micro-charts driven by adaptive `--tel-*` tokens.

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
| **Bullet Target Bar** (`bullet-target-bar`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-bullet-target-bar` |
| **Latency Whisker Band** (`latency-whisker-band`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-latency-whisker-band` |
| **Horizon Band Sparkline** (`horizon-band-sparkline`) | `experimental` | `react`, `svg` | `low` | `static-svg` | `telemetry-horizon-band-sparkline` |
| **Waffle Percent Grid** (`waffle-percent-grid`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-waffle-percent-grid` |
| **Waterfall Delta Chart** (`waterfall-delta-chart`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-waterfall-delta-chart` |
| **Compact Radar Polygon** (`compact-radar-polygon`) | `viral` | `react`, `svg` | `low` | `static-svg` | `telemetry-compact-radar-polygon` |
| **Step Line Throughput** (`step-line-throughput`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-step-line-throughput` |
| **Funnel Conversion Strip** (`funnel-conversion-strip`) | `production` | `react`, `svg` | `low` | `static-svg` | `telemetry-funnel-conversion-strip` |
| **Live Equalizer Bars** (`live-equalizer-bars`) | `viral` | `react`, `svg` | `medium` | `static-snapshot` | `telemetry-live-equalizer-bars` |
