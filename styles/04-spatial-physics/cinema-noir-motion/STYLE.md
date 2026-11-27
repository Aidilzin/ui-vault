---
id: cinema-noir-motion
name: Cinema Noir Motion
kind: style
cluster: 04-spatial-physics
pairs_with: [lamp-horizon-glow, split-reveal, radial-vignette]
clashes_with: [pastel-playful, retro-web-96, eight-bit-arcade]
---

# Cinema Noir Motion

Ultra-deep obsidian cinema ground paired with tungsten spotlight amber accents, theatrical letterbox framing, and weighted easing curves.

## Core Tokens & Surfaces
- **Canvas:** Deep cinema obsidian (`#060708`) with elevated matte shutter panels (`#0e1013` / `#16191f`).
- **Lighting Accent:** Warm tungsten key-light amber (`#f59e0b`) and secondary silver-halide highlight (`#e2e8f0`) with crisp `1px` perimeter hairlines (`rgba(255, 255, 255, 0.11)`).
- **Framing:** Tight architectural radii (`4px`), generous negative space, and subtle top-edge specular rims.

## Motion Rules
- Favor slow-out cinematic decelerations (`cubic-bezier(0.22, 1, 0.36, 1)`) and shuttered clip-path reveals.
- Keep idle surfaces quiet; direct user attention with a single tungsten focal glow per viewport.
- Respect `prefers-reduced-motion: reduce` by replacing shutter sweeps with crisp opacity fades.

## Forbidden Anti-Patterns
- Never mix candy pastels, comic drop shadows, or bubbly pill clutter onto the obsidian stage.
- Avoid washed-out mid-gray cards that flatten the noir luminance hierarchy.
