---
id: split-ai-ide
name: Split AI IDE
tier: production
pattern: Agentic workspace with session rail, execution stream, pinned composer, and diff pane
slots: [header, sessionRail, stream, composer, artifactPane]
pairsWith: [monolith-dark, code-forge, command-dark, phosphor-terminal, precision-mono, segmented-quota-bar, node-topology-mini]
clashesWith: [pastel-playful, retro-web-96]
---

# Split AI IDE

Purpose-built agentic coding and copilot workspace pairing a session sidebar, a central execution stream with a bottom-pinned prompt composer, and an optional right diff/artifact inspector.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ header                                                 │
├──────────┬────────────────────────┬────────────────────┤
│ session  │ stream (execution log) │ artifactPane       │
│ Rail     │                        │ (diffs / preview)  │
│ (190px)  ├────────────────────────┤ (0.95fr)           │
│          │ composer (sticky bot)  │                    │
└──────────┴────────────────────────┴────────────────────┘
```

## Container Breakpoint Rules
- **`> 760px`:** 3-pane IDE split (`190px | 1.35fr | 0.95fr`), or 2-pane (`200px | 1fr`) when `artifactPane` is omitted.
- **`<= 760px`:** Session rail flattens to a compact horizontal strip at top; artifact pane stacks cleanly beneath the execution stream.

## Anti-Patterns
- Never use `position: fixed` for the prompt composer; keep it container-sticky (`position: sticky; bottom: 0;`).
- Never omit `min-width: 0` on the stream or artifact pane when rendering code diffs.
