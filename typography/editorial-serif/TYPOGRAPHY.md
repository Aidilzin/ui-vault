---
id: editorial-serif
name: Editorial Serif
tier: production
voice: High-contrast editorial and AI research lab voice with generous classical display proportions
googleFontsUrl: https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap
pairsWith: [warm-manuscript, archival-paper, monochrome-gallery, tactile-studio-warm, monolith-dark, paper-fiber, film-grain]
clashesWith: [eight-bit-arcade, ditherpunk, acid-y2k, phosphor-terminal]
---

# Editorial Serif

High-contrast editorial authority combining condensed classical `Instrument Serif` display headlines with friendly geometric `Plus Jakarta Sans` body prose and `IBM Plex Mono` metadata.

## Font Pairing Rationale
- **Display (`Instrument Serif`):** Sculptural, condensed serif proportions deliver dramatic editorial presence at large sizes while keeping line counts compact.
- **Body (`Plus Jakarta Sans`):** Clean, open apertures balance the high-contrast display serif with effortless screen readability.
- **Mono (`IBM Plex Mono`):** Grounded technical eyebrows, issue indices, and footnotes.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(2.2rem, 1.35rem + 3.4vw, 4rem)` · weight `400` · tracking `-0.015em` · leading `1.02`
- **H2 (`--text-h2`):** `clamp(1.5rem, 1.15rem + 1.4vw, 2.25rem)`
- **H3 (`--text-h3`):** `clamp(1.125rem, 1rem + 0.5vw, 1.4rem)`
- **Body (`--text-body`):** `clamp(0.9375rem, 0.9rem + 0.2vw, 1.05rem)` · leading `1.65`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.1em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.07em`

## OpenType & Numeric Rules
- Keep `Instrument Serif` strictly at weight `400` (regular or italic) — never faux-bold.
- Apply `font-variant-numeric: tabular-nums` to figures, dates, and issue indices.
- Apply `text-wrap: balance` on display titles to preserve graceful editorial rag.

## Forbidden Anti-Patterns
- Never apply `font-weight: 700` to `Instrument Serif` (triggers synthetic browser bolding and destroys hairline serifs).
- Never use `Instrument Serif` for small UI labels or body text below `20px`.
- Never pair with neon gaming accents or bitmap textures.
