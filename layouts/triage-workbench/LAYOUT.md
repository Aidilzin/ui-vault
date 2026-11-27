---
id: triage-workbench
name: Triage Workbench
tier: production
pattern: 3-pane Linear / Superhuman desktop triage shell
slots: [header, navRail, queuePane, inspectorPane, footer]
pairsWith: [monolith-dark, command-dark, code-forge, perceptual-scale, precision-mono, activity-heatmap, diff-delta-pill]
clashesWith: [avant-poster, zine-wire]
---

# Triage Workbench

Keyboard-first 3-pane workspace separating compact navigation, a high-density queue/list column, and a rich detail inspector.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ header                                                 │
├──────────┬─────────────────────┬───────────────────────┤
│ navRail  │ queuePane           │ inspectorPane         │
│ (185px)  │ (0.95fr)            │ (1.35fr)              │
├──────────┴─────────────────────┴───────────────────────┤
│ footer                                                 │
└────────────────────────────────────────────────────────┘
```

## Container Breakpoint Rules
- **`> 720px`:** Full 3-pane split (`185px | 0.95fr | 1.35fr`).
- **`<= 720px`:** `navRail` collapses into a horizontal bar across the top; `queuePane` and `inspectorPane` remain side-by-side.
- **`<= 480px`:** Clean single-column vertical stack with hairline dividers.

## Usage
Import `@/styles/layouts/triage-workbench.css` once and mount `<TriageWorkbench />` with `navRail`, `queuePane`, and `inspectorPane`.

## Anti-Patterns
- Never lock panes to `100vh` inside embedded containers (causes double scrollbars).
- Never drop `min-width: 0` on grid columns (causes long monospace strings to push panes sideways).
