---
id: terminal-phosphor
name: Terminal Phosphor
tier: experimental
voice: Strict all-monospace grid rhythm with zero sans-serif drift for CLI and retro-compute surfaces
googleFontsUrl: https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap
pairsWith: [phosphor-terminal, ditherpunk, code-forge, telemetry-fault, crt-scanlines, crosshair-field]
clashesWith: [warm-manuscript, pastel-playful, liquid-glass, tactile-soft]
---

# Terminal Phosphor

Pure all-monospace typographic discipline pairing `JetBrains Mono` display headers with `IBM Plex Mono` body copy. Every glyph occupies a uniform horizontal cell, creating unmistakable command-line rhythm.

## Font Pairing Rationale
- **Display (`JetBrains Mono`):** Bold, tall x-height monospace retains clarity even in large uppercase terminal banners.
- **Body (`IBM Plex Mono`):** Slightly softer industrial stroke modulation reduces fatigue across dense logs, diffs, and documentation.
- **Mono (`JetBrains Mono`):** Identical cell width keeps inline flags, hashes, and prompts locked to the column grid.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(1.6rem, 1.15rem + 1.8vw, 2.5rem)` · weight `700` · tracking `-0.02em` · leading `1.12`
- **H2 (`--text-h2`):** `clamp(1.15rem, 1rem + 0.65vw, 1.5rem)`
- **H3 (`--text-h3`):** `clamp(0.95rem, 0.9rem + 0.25vw, 1.1rem)`
- **Body (`--text-body`):** `clamp(0.84rem, 0.82rem + 0.12vw, 0.92rem)` · leading `1.6`
- **Label (`--text-label`):** `0.72rem` · uppercase · tracking `0.09em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.06em`

## OpenType & Numeric Rules
- Strictly enforce `tabular-nums` and slashed zeros (`font-variant-numeric: tabular-nums slashed-zero`) across metrics and logs.
- Keep `text-wrap: balance` on display headers while preserving `white-space: pre` inside code blocks.

## Forbidden Anti-Patterns
- Never introduce proportional sans-serif or serif fonts into a `terminal-phosphor` layout (breaks the grid cell illusion).
- Never use italic script or decorative variable-width display fonts.
- Never exceed `72ch` line measure on body prose.
