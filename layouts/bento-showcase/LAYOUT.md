---
id: bento-showcase
name: Bento Showcase
tier: viral
pattern: Asymmetric 12-column modular Bento grid
slots: [header, hero, metricColumn, tiles, footer]
pairsWith: [bento-grid, monolith-dark, aurora-mesh, orbital-ceramic, neo-display-saas, dot-matrix, inline-sparkline, radial-step-gauge]
clashesWith: [retro-web-96, os-core, neo-swiss]
---

# Bento Showcase

Asymmetric 12-column modular Bento grid pairing a dominant 8-column hero feature tile with a tall 4-column metric rail and balanced lower capability tiles.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ header                                                 │
├───────────────────────────────────┬────────────────────┤
│ hero (8 cols)                     │ metricColumn (4)   │
├─────────────────┬─────────────────┼────────────────────┤
│ tile[0] (4)     │ tile[1] (4)     │ tile[2] (4)        │
└─────────────────┴─────────────────┴────────────────────┘
```

## Container Breakpoint Rules
- **`> 720px`:** 12-column asymmetric split (`8 + 4` upper row, `4 + 4 + 4` lower tiles).
- **`<= 720px`:** Hero and metric column stack full-width (`span 12`), lower tiles pair in `2×` (`span 6`).
- **`<= 480px`:** Single-column vertical stack (`span 12`) with tightened `10px` padding.

## Usage
Import `@/styles/layouts/bento-showcase.css` once and pass `header`, `hero`, `metricColumn`, `tiles`, and `footer` slots into `<BentoShowcase />`.

## Anti-Patterns
- Never hardcode hex palette colors inside layout CSS; drive surfaces via `--lay-surface`, `--lay-border`, and `--lay-radius`.
- Never place more than 6–7 tiles in the primary fold; preserve breathing room around the hero span.
