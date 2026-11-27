---
id: command-hud-dashboard
name: Command HUD Dashboard
tier: experimental
pattern: Dense 4-quadrant FUI mission-control instrumentation grid
slots: [ticker, quadrants, eventRail]
pairsWith: [fui-tactical, telemetry-fault, industrial-hardware, architect-grid, crosshair-field, precision-mono, live-oscilloscope, uptime-strip, latency-histogram, node-topology-mini]
clashesWith: [warm-manuscript, pastel-playful, liquid-glass]
---

# Command HUD Dashboard

High-density flight-deck and observability shell featuring a top telemetry ticker, a 2×2 hairline-divided quadrant grid, and a pinned bottom event rail.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ ticker (global status / latency / run ID)              │
├───────────────────────────┬────────────────────────────┤
│ Q01 // quadrant[0]        │ Q02 // quadrant[1]         │
├───────────────────────────┼────────────────────────────┤
│ Q03 // quadrant[2]        │ Q04 // quadrant[3]         │
├───────────────────────────┴────────────────────────────┤
│ eventRail (pinned stream / colophon)                   │
└────────────────────────────────────────────────────────┘
```

## Container Breakpoint Rules
- **`> 660px`:** Tight `2×2` hairline-separated instrumentation grid.
- **`<= 660px`:** Single-column vertical stack preserving every quadrant header and hairline divider.

## Anti-Patterns
- Never use wide outer gaps or soft drop-shadows between HUD quadrants; use crisp `1px` border channels.
- Never allow inner charts or tables to exceed quadrant `minmax(0, 1fr)` width.
