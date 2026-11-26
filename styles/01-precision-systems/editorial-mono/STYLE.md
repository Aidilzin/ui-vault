---
id: editorial-mono
name: Editorial Mono / Nocturnal Press
kind: style
cluster: 01-precision-systems
pairs_with: [split-reveal, variable-proximity, border-spotlight, sibling-dim]
clashes_with: [liquid-glass, neo-brutalism, acid-y2k]
---

# Editorial Mono / Nocturnal Press

Dark-first editorial architecture built on a pure achromatic gray ramp, compressed machined display typography, uppercase monospace eyebrows, and surgical coral-and-blue accent punctuation.

## Core Tokens & Surfaces
- **Achromatic Dark Ramp:** Near-black primary canvas (`#0b0b0b`), elevated containers (`#212121`), and crisp `1px` structural borders (`#353535`), with pure neutral ink (`#ffffff` primary, `#b9b9b9` secondary, `#797979` metadata) — zero warm or cool tint in neutrals.
- **Accents:** Warm coral-red (`#f36458`) reserved strictly for primary pill CTAs; electric blue (`#0052ef`) as the universal interactive hover and focus-ring signal; vivid green (`#19d600`) for nominal/success callouts.
- **Geometry:** Structural cards and inputs stay sharp (`3px–6px` radius), contrasting sharply against full-pill (`9999px`) primary action buttons.

## Typography & Layout
- Pair a tight-tracked geometric neo-grotesk (`Inter`) for massive display headlines (`-0.04em` tracking, `1.00–1.18` line-height, weights `400–600`) with `IBM Plex Mono` / `JetBrains Mono` uppercase `11px–13px` eyebrows and technical metadata.
- Full-bleed dark bands with disciplined `8px` spacing multiples and `1px` border-based containment instead of elevation shadows.

## Forbidden Anti-Patterns
- No traditional offset drop shadows — rely exclusively on `1px` hairline borders and `0 0 0 2px` focus rings.
- No mid-range border radii between `13px` and `9998px` (jump directly from `6px–12px` panels to `9999px` pills).
- No heavy `700+` display font weights or loose `1.5+` display line-heights.
- Never combine coral CTA fill (`#f36458`) and electric blue (`#0052ef`) statically inside the same element.
