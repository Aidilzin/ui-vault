---
id: ditherpunk
name: Ditherpunk / 1-Bit Compute
kind: style
cluster: 02-retro-compute
pairs_with: [bayer-dither, scramble-text]
clashes_with: [liquid-glass]
---

# Ditherpunk / 1-Bit Compute

Stark, high-contrast digital print aesthetic built around ordered Bayer dithering, halftone textures, and zero-antialias clarity.

## Core Tokens & Surfaces
- **Palette:** Strict 2-tone base (`#0b0c0a` ink on `#f2f0e6` warm paper, or inverted `#0a0b09` ground with `#e6e4dc` ink) plus at most **one** high-voltage spot accent (`#ff4d00` or `#ccff00`).
- **Shading:** Never use soft CSS blur shadows or smooth multi-stop gradients; represent depth with ordered dot patterns, hatched dividers, or 1-bit dithered imagery.
- **Borders:** Crisp `1px` or `2px` solid dividers with `0px` border radius.

## Typography & Layout
- Combine rigid pixel/bitmap or stark monospace display headers with clean, legible grotesk body text so dense content remains readable.
- Exposed structural grids (`1px` full-bleed column and row rules).

## Forbidden Anti-Patterns
- No `backdrop-filter: blur()`, glassmorphism, or soft radial glows.
- No >3 colors in the same viewport.