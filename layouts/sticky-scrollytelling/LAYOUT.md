---
id: sticky-scrollytelling
name: Sticky Scrollytelling
tier: viral
pattern: Sticky visual/artifact stage paired with scrolling narrative steps
slots: [header, steps, renderStage, footer]
pairsWith: [orbital-ceramic, warm-manuscript, aurora-mesh, editorial-serif, literary-humanist, topographic-mesh, inline-sparkline, node-topology-mini]
clashesWith: [os-core, retro-web-96]
---

# Sticky Scrollytelling

Editorial and product-launch narrative shell pairing a column of interactive story steps with a sticky visual stage that tracks the active step via `IntersectionObserver`.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ header                                                 │
├─────────────────────────┬──────────────────────────────┤
│ step[0] (active)        │                              │
├─────────────────────────┤  renderStage(activeIndex)    │
│ step[1]                 │  (position: sticky)          │
├─────────────────────────┤                              │
│ step[2]                 │                              │
└─────────────────────────┴──────────────────────────────┘
```

## Container Breakpoint Rules
- **`> 680px`:** Two-column split (`1fr | 1.15fr`) with the right visual stage pinned via `position: sticky`.
- **`<= 680px`:** Visual stage moves above the steps (`order: -1`) and becomes static for clean mobile reading.

## Standalone vs. Embedded Scroll
- Pass `scrollContainerRef` when embedded inside a scrollable preview frame; omit it for standalone pages so `IntersectionObserver` tracks native `window` scroll automatically.

## Anti-Patterns
- Never apply `overflow: hidden` to ancestors of `.lay-scrolly-stage-sticky`.
- Never rely on scroll event listeners when `IntersectionObserver` suffices.
