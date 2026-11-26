---
id: industrial-hardware
name: Industrial Hardware / Tactile Chassis
kind: style
cluster: 01-precision-systems
pairs_with: [flip-card, magnetic-button, sibling-dim, scramble-text]
clashes_with: [liquid-glass, acid-y2k]
---

# Industrial Hardware / Tactile Chassis

Minimalist physical-instrument aesthetic modeled after anodized aluminum synthesizers, field recorders, and precision industrial control panels.

## Core Tokens & Surfaces
- **Chassis Ground:** Matte light aluminum (`#f1f2f2` / `#f5f5f5`) with recessed control bays (`#e5e5e5`) and pure white input fields (`#ffffff`), paired against high-contrast carbon ink (`#000000`, `#272727`, `#4d4d4d`) and technical mid-grays (`#767676`, `#b2b2b2`).
- **Functional Hardware Accents:** Color-coded physical controls only — signal red (`#b81d13`) for record/primary action, instrument blue (`#0071bb`) for mode/parameter selection, and field green (`#006837`) for active/nominal indicators.
- **Elevation & Radii:** Zero drop shadows (`box-shadow: none`) and zero background gradients. Depth is communicated purely through flat surface steps, `3px` structural corners, `8px–9px` tactile keycaps, and full `1000px` / `50%` circular encoders, sliders, and status badges.

## Typography & Layout
- Pair a geometric neo-grotesk (`Inter` / `Space Grotesk`) contrasting ultra-clean `300` light technical headings (`line-height: 1.11`) with crisp `700` bold display callouts (`-0.02em` tracking) and compact monospace spec labels.
- Tight micro-spacing (`3px`, `8px`, `15px`, `20px`) inside control modules paired with generous structural section breathing room (`44px–88px`).

## Motion Rules
- **Interactive Controls:** Brisk `200ms ease-in` (`0.2s ease-in`) on `transform` for links, keys, and tactile switches.
- **State Reveals:** Smooth `500ms ease-out` (`0.5s ease-out`) for secondary panels and media transitions.
- **Restraint:** Zero ambient idle animations; all motion responds directly to user input and snaps cleanly under `prefers-reduced-motion: reduce`.

## Forbidden Anti-Patterns
- No soft blurred box-shadows, neon glows, glassmorphism, or multi-stop decorative gradients.
- No ornate serif headings or playful cartoon bounce springs — controls must feel machined and deterministic.
- Never use red/blue/green hardware accents for long body copy; reserve them strictly for physical-style switches, encoders, and status legends.
