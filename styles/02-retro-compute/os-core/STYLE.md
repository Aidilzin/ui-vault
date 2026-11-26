---
id: os-core
name: OS-Core & Retro-Skeuomorphism
kind: style
cluster: 02-retro-compute
pairs_with: [scramble-text, flip-card, bayer-dither]
clashes_with: [liquid-glass, neo-swiss]
---

# OS-Core & Retro-Skeuomorphism

Interfaces modeled directly after classic desktop operating systems (System 7, Windows 95, NeXTSTEP) or tactile vintage hardware displays.

## Core Tokens & Surfaces
- **Chrome:** Neutral warm gray (`#d4d0c8` / `#c0c0c0`) or dark NeXT slate (`#2b2e33`) paired with 2-step beveled 3D borders (`#ffffff` top/left highlight, `#404040` bottom/right shadow).
- **Title Bars:** Distinct active state (solid deep navy `#000080` or striped Macintosh rule) vs. inactive flat gray.
- **Desktop Ground:** Muted teal (`#008080`), classic 1-bit stipple pattern, or dark phosphor grid.

## Typography & Layout
- Crisp bitmap/pixel display fonts for window chrome paired with sharp monospace for file trees, status bars, and terminal panes.
- Every view lives inside framed panels with explicit title bars, close/collapse controls, and a persistent bottom taskbar or top menu bar.

## Forbidden Anti-Patterns
- No blurry modern SaaS shadows or smooth spring rubber-banding—interactions should snap crisply on pixel boundaries.
- Never sacrifice keyboard accessibility or scrollability for nostalgic novelty.