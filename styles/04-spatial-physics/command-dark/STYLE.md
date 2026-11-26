---
id: command-dark
name: Command Dark / Spatial Launcher
kind: style
cluster: 04-spatial-physics
pairs_with: [border-spotlight, glare-hover, magnetic-button, liquid-glass-filter]
clashes_with: [retro-web-96, neo-brutalism]
---

# Command Dark / Spatial Launcher

Keyboard-first floating launcher aesthetic with near-obsidian translucent panels, razor-thin specular top rims, crisp keycap badges, and warm crimson-orange command accents.

## Core Tokens & Surfaces
- **Canvas & Surfaces:** Deep void canvas (`#07080a`), floating launcher panes (`#101111`), elevated selection rows (`#242728`), and `1px` perimeter hairlines (`#434345`).
- **Ink:** Crisp white (`#ffffff`), silver secondary (`#cdcdcd`), and subdued keycap legends (`#9c9c9d`, `#6a6b6c`).
- **Accents:** Warm launcher crimson (`#ff6363`) for primary triggers paired with crisp specular white highlights (`rgba(255, 255, 255, 0.16)`).

## Typography & Layout
- Clean sans command lists paired with `tabular-nums` monospace keyboard shortcut chips (`⌘K`, `↵`) inside `10px–12px` rounded floating windows.
- Subtle `backdrop-filter: blur(14px)` on command overlays with instant keyboard focus feedback (`100–140ms`).

## Forbidden Anti-Patterns
- No multi-column marketing bloat inside launcher panes — preserve single-column scannable command rows.
- Never omit explicit keyboard shortcut affordances or high-contrast active row states.
