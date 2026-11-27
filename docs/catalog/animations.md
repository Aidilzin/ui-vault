← [README](../../README.md) · [Styles (43)](./styles.md) · [Animations (79)](./animations.md) · [Foundations (71)](./foundations.md) · [Hybrids (20)](./hybrids.md) · [Live Playground ↗](https://aidilzin.github.io/ui-vault/)

# Animations Catalog (79)

All 79 zero-bloat motion primitives grouped across 8 mechanics. Every component includes an explicit `prefers-reduced-motion` fallback. Install with `npx shadcn@latest add Aidilzin/ui-vault/<item>`.

## `cursor-reactive` (10)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Magnetic Button | `viral` | `react`, `css` | `low` | `disabled-pull` | `magnetic-button` |
| Mouse-Tracking Border Spotlight | `viral` | `react`, `css` | `low` | `static-border` | `border-spotlight` |
| Sibling Dim Grid | `production` | `css` | `low` | `instant-opacity` | `sibling-dim` |
| Star Border Glow | `viral` | `react`, `css` | `low` | `static-border` | `star-border` |
| Magnetic Vector Lines | `experimental` | `react`, `css` | `low` | `static-angles` | `magnet-lines` |
| Crosshair Coordinate Reticle | `viral` | `react`, `css` | `low` | `hidden-reticle` | `crosshair-reticle` |
| Conic Border Beam | `viral` | `react`, `css` | `low` | `static-border` | `border-beam` |
| Kinetic Card Trail | `experimental` | `react`, `css` | `low` | `disabled-trail` | `kinetic-card-trail` |
| Rotary Typographic Dial | `experimental` | `react`, `css` | `low` | `stepped-dial` | `rotary-type-dial` |
| Target Bracket Cursor | `viral` | `react`, `css` | `low` | `instant-snap` | `target-bracket-cursor` |

## `text-kinetic` (11)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Scramble / Decrypt Text | `viral` | `react` | `low` | `instant-text-swap` | `scramble-text` |
| Masked Split-Text Reveal | `production` | `react`, `css` | `low` | `instant-visible` | `split-reveal` |
| Variable Font Proximity | `experimental` | `react`, `css` | `low` | `static-weight` | `variable-proximity` |
| Kinetic Marquee Hover Row | `viral` | `react`, `css` | `low` | `static-highlight` | `marquee-hover-row` |
| Metallic Shiny Text | `viral` | `react`, `css` | `low` | `static-text` | `shiny-text` |
| Optical Blur Text Reveal | `production` | `react`, `css` | `low` | `instant-visible` | `blur-text` |
| Split-Flap Text Roll | `production` | `react`, `css` | `low` | `static-text` | `text-roll` |
| 3D Split-Flap Display | `viral` | `react`, `css` | `low` | `instant-digit` | `split-flap-clock` |
| True Focus Frame | `viral` | `react`, `css` | `low` | `static-clear-text` | `true-focus-frame` |
| Text Morph Swap | `production` | `react`, `css` | `low` | `instant-swap` | `text-morph-swap` |
| Line Shadow Heading | `experimental` | `css` | `low` | `static-hatch-shadow` | `line-shadow-heading` |

## `layout-morph` (11)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FLIP Layout Morph Card | `production` | `react`, `waapi` | `low` | `instant-layout` | `flip-card` |
| Scroll Velocity Skew | `experimental` | `react` | `low` | `disabled-skew` | `velocity-skew` |
| Make-Way FLIP Grid | `production` | `react`, `waapi` | `low` | `instant-layout` | `make-way-grid` |
| Spotlight Segmented Tabs | `production` | `react`, `css` | `low` | `instant-tab-switch` | `spotlight-tabs` |
| Optical Blur-Fade Container | `production` | `react`, `css` | `low` | `instant-visible` | `blur-fade` |
| Z-Depth Stacked Card Deck | `viral` | `react`, `css` | `low` | `instant-cycle` | `stacked-card-deck` |
| Flex Accordion Gallery | `viral` | `react`, `css` | `low` | `instant-flex` | `accordion-gallery` |
| Velocity Drag-to-Dismiss Drawer | `production` | `react`, `css` | `low` | `instant-drawer` | `velocity-dismiss-drawer` |
| Before After Curtain | `production` | `react`, `pointer` | `low` | `direct-scrub` | `before-after-curtain` |
| Expandable Toolbar | `production` | `react`, `css` | `low` | `instant-expand` | `expandable-toolbar` |
| Folder Paper Fan | `viral` | `react`, `css` | `low` | `instant-fan` | `folder-paper-fan` |

## `shader-canvas` (11)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Bayer Dither Canvas | `experimental` | `canvas` | `medium` | `static-dither-frame` | `bayer-dither` |
| ASCII Wave Filter | `experimental` | `react` | `low` | `static-ascii-frame` | `ascii-filter` |
| 2.5D Orbital Constellation Canvas | `experimental` | `canvas` | `medium` | `static-constellation` | `orbital-canvas` |
| Pixel Shimmer Card | `experimental` | `canvas` | `medium` | `static-pixel-frame` | `pixel-card` |
| Pixel Hover Dissolve Grid | `experimental` | `canvas` | `medium` | `instant-cells` | `pixel-hover-grid` |
| CRT Film Grain Overlay | `experimental` | `canvas`, `css` | `low` | `static-grain-frame` | `crt-grain-overlay` |
| Ambient Aurora Mesh Backdrop | `viral` | `css` | `low` | `static-aurora-frame` | `aurora-mesh-bg` |
| SVG Radar Ripple Pulse | `viral` | `svg`, `css` | `low` | `static-rings` | `svg-ripple-pulse` |
| Nocturnal Meteor Shower | `viral` | `css` | `low` | `static-streaks` | `meteor-shower` |
| Eclipse Corona Orb | `viral` | `css` | `low` | `static-orb` | `eclipse-orb` |
| Flickering Telemetry Grid | `viral` | `canvas-2d` | `medium` | `static-grid-snapshot` | `flickering-telemetry-grid` |

## `physics-optics` (12)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Liquid Glass Surface | `experimental` | `svg`, `css` | `medium` | `opaque-fallback` | `liquid-glass-filter` |
| Spring 3D Tilt Card | `viral` | `react`, `css` | `low` | `flat-card` | `spring-tilt-card` |
| Specular Glare Hover | `viral` | `react`, `css` | `low` | `static-surface` | `glare-hover` |
| Elastic Overshoot Slider | `viral` | `react`, `css` | `low` | `linear-slider` | `elastic-slider` |
| Proximity Dock Magnification | `viral` | `react`, `css` | `low` | `static-dock` | `dock-magnify` |
| SVG Turbulence Hover Filter | `experimental` | `svg`, `react` | `medium` | `static-surface` | `svg-turbulence-hover` |
| Animated Connector Beam | `viral` | `svg`, `css` | `low` | `static-connector` | `animated-connector-beam` |
| Holographic Foil Card | `viral` | `react`, `css` | `low` | `static-foil` | `holographic-foil-card` |
| Lamp Horizon Spotlight | `viral` | `react`, `css` | `low` | `static-glow` | `lamp-horizon-glow` |
| Gooey Metaball Pill Nav | `experimental` | `svg`, `react`, `css` | `medium` | `instant-pill` | `gooey-pill-nav` |
| 3D Perspective Hardcover Book | `viral` | `react`, `css` | `low` | `static-book` | `perspective-book` |
| Optical Zoom Lens | `viral` | `react`, `pointer` | `medium` | `direct-track` | `optical-zoom-lens` |

## `scroll-driven` (6)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Compositor Scroll Progress Bar | `production` | `react`, `css` | `low` | `instant-progress` | `scroll-progress-bar` |
| Elastic Staggered Column Scroll | `experimental` | `react`, `css` | `low` | `disabled-lag` | `elastic-column-scroll` |
| Progressive Blur Scroll Edge | `production` | `css`, `react` | `low` | `opaque-gradient-edge` | `progressive-blur-edge` |
| Infinite Edge-Fade Marquee | `viral` | `react`, `css` | `low` | `static-strip` | `infinite-marquee` |
| Scroll Sticky Scale Card | `viral` | `react`, `css` | `low` | `static-scale` | `scroll-sticky-scale` |
| Vertical Tracing Scroll Beam | `viral` | `react`, `css` | `low` | `full-beam` | `tracing-scroll-beam` |

## `micro-feedback` (11)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Radial Click Spark | `viral` | `canvas` | `low` | `disabled-sparks` | `click-spark` |
| Eased Tabular Count-Up | `production` | `react` | `low` | `instant-value` | `count-up` |
| Hold-to-Confirm Action Button | `production` | `react`, `css` | `low` | `single-click-confirm` | `hold-to-confirm` |
| Tactile Detent Press Badge | `production` | `react`, `css` | `low` | `static-press` | `tactile-press-badge` |
| Kinetic Morphing Status Pill | `production` | `react`, `css` | `low` | `instant-state-swap` | `kinetic-status-pill` |
| Tactile 3D Push Button | `production` | `react`, `css` | `low` | `static-press` | `tactile-push-button` |
| Odometer Digit-Wheel Ticker | `production` | `react`, `css` | `low` | `instant-value` | `odometer-ticker` |
| Bidirectional Spring Number Flow | `production` | `react`, `css` | `low` | `instant-value` | `spring-number-flow` |
| Stacked Hover-Expand Toast Deck | `production` | `react`, `css` | `low` | `instant-stack` | `stacked-toast-deck` |
| Magnetic Copy Checkmark Spell | `viral` | `svg`, `react`, `css` | `low` | `instant-check` | `magnetic-copy-spell` |
| Slide To Commit | `production` | `react`, `pointer` | `low` | `keyboard-click-toggle` | `slide-to-commit` |

## `ai-agentic` (7)

| Animation | Tier | Engine | Perf Tier | Reduced Motion | `shadcn` Item |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Streaming Token Text & Citations | `production` | `react` | `low` | `instant-text` | `streaming-token-text` |
| Reasoning Trace Accordion | `production` | `react`, `css` | `low` | `static-header` | `reasoning-trace` |
| Agent Tool-Call Step Row | `production` | `react`, `css` | `low` | `instant-state` | `tool-call-step` |
| Agent Approval Permission Gate | `production` | `react`, `css` | `low` | `instant-state` | `agent-approval-card` |
| Inline Agent Code Diff | `production` | `react`, `css` | `low` | `instant-state` | `inline-code-diff` |
| Slash Prompt Composer | `production` | `react`, `css` | `low` | `instant-menu` | `slash-prompt-composer` |
| Chain-of-Thought Execution Rail | `viral` | `react`, `css` | `low` | `static-rail` | `chain-of-thought-rail` |
