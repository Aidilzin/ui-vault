---
id: masonry-archive
name: Masonry Archive
tier: production
pattern: Curated catalog with sticky filter bar, multi-column waterfall grid, and detail rail
slots: [header, filterBar, items, detailRail, footer]
pairsWith: [dark-gallery-index, monochrome-gallery, archival-paper, tactile-studio-warm, film-grain, editorial-serif, activity-heatmap]
clashesWith: [phosphor-terminal]
---

# Masonry Archive

Curated visual archive and directory shell pairing a sticky filter bar with a pure-CSS multi-column waterfall grid and an optional side detail inspector rail.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ header                                                 │
├────────────────────────────────────────────────────────┤
│ filterBar (position: sticky)                           │
├─────────────────────────────────────┬──────────────────┤
│ ┌───────┐ ┌───────┐ ┌───────┐       │ detailRail       │
│ │ item  │ │ item  │ │ item  │       │ (260px)          │
│ └───────┘ │       │ └───────┘       │                  │
│ ┌───────┐ └───────┘ ┌───────┐       │                  │
│ │ item  │ ┌───────┐ │ item  │       │                  │
└─┴───────┴─┴───────┴─┴───────┴───────┴──────────────────┘
```

## Container Breakpoint Rules
- **`> 760px`:** 3-column waterfall grid alongside the `260px` detail rail.
- **`<= 760px`:** 2-column waterfall grid with the detail rail stacked cleanly below.
- **`<= 480px`:** Single-column mobile card stream.

## Anti-Patterns
- Never omit `break-inside: avoid` on `.lay-masonry-item` (causes cards to split mid-column).
- Never add `overflow: hidden` on ancestors of `.lay-masonry-filter`.
