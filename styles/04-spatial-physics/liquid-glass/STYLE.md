---
id: liquid-glass
name: Liquid Glass / Tactile Optics
kind: style
cluster: 04-spatial-physics
pairs_with: [magnetic-button, border-spotlight]
clashes_with: [ditherpunk, neo-brutalism]
---

# Liquid Glass / Tactile Optics

Translucent, layered optical surfaces with sharp specular top-edge highlights and physical spring responsiveness.

## Core Tokens & Surfaces
- **Backdrop:** Rich dark or deep-toned ambient canvas so refractive layers have contrast to bend.
- **Glass Layer:** Translucent surface (`rgba(255, 255, 255, 0.06)`), `backdrop-filter: blur(18px) saturate(160%)`, crisp specular top highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.24)`), and delicate `1px` perimeter rim (`rgba(255, 255, 255, 0.12)`).
- **Depth:** Use subtle elevation blur shifts rather than opaque card stacking.

## Motion Rules
- Use critically damped springs (snappy, minimal overshoot) for hover press, magnetic pull, and layout morphs.
- Always provide an opaque high-contrast fallback when `prefers-reduced-transparency: reduce` is active.

## Forbidden Anti-Patterns
- Never place raw body copy or dense data tables directly over busy moving backgrounds without a tinted scrim.
- Avoid stacking more than 2 blurred glass layers (kills GPU frame rate and washes out contrast).