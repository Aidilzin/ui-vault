---
id: ambient-orbit
name: 2.5D Ambient Orbit & Spatial Radar
kind: style
cluster: 04-spatial-physics
pairs_with: [orbital-canvas, border-spotlight, scramble-text]
clashes_with: [neo-brutalism, os-core]
---

# 2.5D Ambient Orbit & Spatial Radar

Calm, depth-sorted dark-space visualization mapping clusters of entities onto tilted elliptical tracks with sparse semantic status highlights.

## Core Tokens & Surfaces
- **Canvas:** Deep cosmic matte (`#06070a`) with deterministic subtle starfield noise and faint `1px` elliptical hairlines (`rgba(255, 255, 255, 0.08)`).
- **Depth Encoding:** Foreground nodes scale slightly up (`1.08–1.12`) at full opacity; rear nodes recede (`0.78–0.85`) and dim (`0.40` opacity).
- **Signal Restraint:** Neutral cool gray (`#7a8494`) for idle/clean nodes; bright semantic dots reserved exclusively for actionable states.

## Motion Rules
- Slow ambient orbital drift (`~0.2x` base angular speed) paired with smooth hover-to-freeze damping (`0.07–0.12`) so moving targets halt cleanly under the cursor.
- Under `prefers-reduced-motion: reduce`, freeze orbital velocity (`omega = 0`) and disable background star scintillation.

## Forbidden Anti-Patterns
- Never replace primary keyboard-first tables with orbital maps—use as an ambient overview that links directly into detail drawers or filtered views.
- Avoid heavy WebGL bundles when 2.5D Canvas achieves crisp 60fps HiDPI rendering.