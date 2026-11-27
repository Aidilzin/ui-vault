---
id: pixel-arcade
name: Pixel Arcade
tier: experimental
voice: Crisp stepped bitmap display headlines paired with readable monospace body copy
googleFontsUrl: https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Space+Mono:wght@400;700&display=swap
pairsWith: [eight-bit-arcade, ditherpunk, os-core, retro-web-96, checker-dither, crt-scanlines]
clashesWith: [warm-manuscript, archival-paper, liquid-glass, editorial-mono, monolith-dark]
---

# Pixel Arcade

Authentic stepped-bitmap display voice pairing `Silkscreen` pixel typography for headlines and badges with crisp `Space Mono` for readable body copy and scores.

## Font Pairing Rationale
- **Display (`Silkscreen`):** Purpose-built pixel font engineered to render sharply on clean pixel multiples with unmistakable arcade silhouette.
- **Body & Mono (`Space Mono`):** Preserves retro computer character while remaining legible for multi-line descriptions where bitmap fonts would cause eye strain.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(1.45rem, 1rem + 1.8vw, 2.35rem)` · weight `700` · tracking `0.01em` · leading `1.18`
- **H2 (`--text-h2`):** `clamp(1.1rem, 0.95rem + 0.65vw, 1.5rem)`
- **H3 (`--text-h3`):** `clamp(0.92rem, 0.88rem + 0.25vw, 1.08rem)`
- **Body (`--text-body`):** `clamp(0.84rem, 0.82rem + 0.12vw, 0.92rem)` · leading `1.6`
- **Label (`--text-label`):** `0.72rem` · uppercase · tracking `0.08em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.05em`

## OpenType & Numeric Rules
- Enforce `tabular-nums` on scores, lives, timers, and metric readouts.
- Keep `Silkscreen` at generous line-height (`1.18+`) and cap display sizes cleanly on `390px` viewports so wide bitmap glyphs never clip horizontally.

## Forbidden Anti-Patterns
- Never set multi-sentence body paragraphs in `Silkscreen` (severely degrades readability).
- Never apply blurred drop-shadows or glassmorphism behind stepped pixel glyphs.
- Never apply negative letter-spacing to `Silkscreen` (causes pixel stems to collide).
