---
id: floating-os-desktop
name: Floating OS Desktop
tier: experimental
pattern: Spatial / retro desktop canvas with menu bar, framed windows, and scoped bottom dock
slots: [menuBar, primaryWindow, secondaryWindow, dock]
pairsWith: [os-core, retro-web-96, liquid-glass, pastel-playful, checker-dither, pixel-arcade, led-status-matrix]
clashesWith: [neo-swiss, warm-manuscript]
---

# Floating OS Desktop

Spatial or retro desktop shell with a slim top menu bar, framed primary and secondary application windows, and a container-scoped bottom dock.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ menuBar                                                │
├──────────────────────────────┬─────────────────────────┤
│ [● ● ●] primaryWindow        │ [● ●] secondaryWindow   │
│         (1.45fr)             │       (0.95fr)          │
├──────────────────────────────┴─────────────────────────┤
│                    [  dock  ]                          │
└────────────────────────────────────────────────────────┘
```

## Container Breakpoint Rules
- **`> 720px`:** Side-by-side framed primary and secondary windows over the desktop ground.
- **`<= 720px`:** Windows stack vertically with container-sticky bottom dock.

## Anti-Patterns
- Never use `position: fixed` for the bottom dock (breaks when embedded in preview frames); use container-scoped `position: sticky; bottom: 10px;`.
