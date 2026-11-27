---
id: kinetic-brutal
name: Kinetic Brutal
tier: experimental
voice: Wide assertive avant-garde poster geometry with raw brutalist energy
googleFontsUrl: https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap
pairsWith: [neo-brutalism, avant-poster, acid-y2k, zine-wire, halftone-screen, diagonal-hatch]
clashesWith: [warm-manuscript, tactile-soft, liquid-glass, perceptual-scale]
---

# Kinetic Brutal

Unapologetic avant-garde poster geometry pairing extra-wide `Syne` display headlines with `Space Grotesk` body copy and punchy `Space Mono` stamps.

## Font Pairing Rationale
- **Display (`Syne`):** Radical horizontal proportions and eccentric geometric curves turn every headline into a kinetic poster graphic.
- **Body (`Space Grotesk`):** Quirky geometric ink traps echo `Syne` while staying crisp and scannable in paragraphs and cards.
- **Mono (`Space Mono`):** Industrial slab-like monospace for sticker tags, barcodes, and numbered indices.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(1.9rem, 1.15rem + 3vw, 3.4rem)` · weight `800` · tracking `-0.03em` · leading `0.98`
- **H2 (`--text-h2`):** `clamp(1.35rem, 1.05rem + 1.1vw, 1.95rem)`
- **H3 (`--text-h3`):** `clamp(1.05rem, 0.95rem + 0.4vw, 1.3rem)`
- **Body (`--text-body`):** `clamp(0.9rem, 0.86rem + 0.16vw, 1rem)` · leading `1.5`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.08em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.06em`

## OpenType & Numeric Rules
- Keep `Syne` at `700` or `800` weight — lighter weights lose its wide architectural punch.
- Use `tabular-nums` on counters and index badges.
- Always pair `text-wrap: balance` with `overflow-wrap: break-word` on mobile containers due to `Syne`'s wide glyphs.

## Forbidden Anti-Patterns
- Never use `Syne` for body paragraphs longer than one sentence.
- Never pair with soft pastel blur cards or delicate manuscript serifs.
- Never let wide `Syne` headings overflow `390px` viewports without responsive caps.
