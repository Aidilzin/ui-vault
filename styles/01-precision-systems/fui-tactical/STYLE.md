---
id: fui-tactical
name: FUI Tactical / Industrial HUD
kind: style
cluster: 01-precision-systems
pairs_with: [scramble-text, border-spotlight, orbital-canvas]
clashes_with: [liquid-glass, neo-brutalism]
---

# FUI Tactical / Industrial HUD

High-density technical interface inspired by flight telemetry, developer instruments, and matte hardware panels.

## Core Tokens & Surfaces
- **Canvas:** Near-black matte (`#090a0c`), never pure `#000000` everywhere.
- **Surfaces:** Tight elevation steps (`#0f1115`, `#15181e`) separated by crisp `1px` hairline borders (`rgba(255, 255, 255, 0.08)`), never heavy drop shadows.
- **Ink:** Primary `#e8ecf2`, secondary `#8b94a3`, micro-telemetry `#586170`.
- **Accents:** Sparse functional signal only — cyan (`#38bdf8`) active, amber (`#f59e0b`) caution, crimson (`#f43f5e`) fault, emerald (`#34d399`) nominal.

## Typography & Layout
- Pair a tight neo-grotesk sans (`Inter` / `Geist`) for titles with crisp monospace (`JetBrains Mono` / `Geist Mono`) for IDs, timestamps, coordinates, and status labels.
- Use `tabular-nums` on every counter, metric, and table column.
- Optional micro-detail: subtle `+` corner registration marks on major panel intersections (`1px`, low contrast).

## Forbidden Anti-Patterns
- No decorative purple/neon gradients or glowing outer box-shadows.
- No rounded pill bloat (`border-radius` stays sharp: `2px–6px` max).
- No color-only status dots — always pair icon + concise monospace label.