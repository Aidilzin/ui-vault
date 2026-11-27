---
id: literary-humanist
name: Literary Humanist
tier: production
voice: Warm tactile manuscript and long-form journal proportions using optical variable serifs
googleFontsUrl: https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500&display=swap
pairsWith: [warm-manuscript, archival-paper, tactile-studio-warm, paper-fiber, film-grain]
clashesWith: [fui-tactical, acid-y2k, telemetry-fault, eight-bit-arcade]
---

# Literary Humanist

Warm, tactile manuscript typography pairing the soft optical variable serif `Fraunces` with `Newsreader` for sustained long-form reading and `IBM Plex Mono` for quiet colophon notes.

## Font Pairing Rationale
- **Display (`Fraunces`):** Optical-size variable serif with expressive soft terminals that feel warm and inked on cream or archival paper surfaces.
- **Body (`Newsreader`):** Designed specifically for extended screen reading with generous counters and gentle serif brackets.
- **Mono (`IBM Plex Mono`):** Unobtrusive metadata, reading time, and archival catalog codes.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(1.95rem, 1.3rem + 2.6vw, 3.25rem)` · weight `600` · tracking `-0.02em` · leading `1.08`
- **H2 (`--text-h2`):** `clamp(1.4rem, 1.1rem + 1.1vw, 2rem)`
- **H3 (`--text-h3`):** `clamp(1.1rem, 1rem + 0.4vw, 1.35rem)`
- **Body (`--text-body`):** `clamp(0.95rem, 0.9rem + 0.2vw, 1.08rem)` · leading `1.7`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.08em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.06em`

## OpenType & Numeric Rules
- Enable `font-optical-sizing: auto` so `Fraunces` and `Newsreader` automatically sharpen at large sizes and open up at body sizes.
- Apply `font-variant-numeric: tabular-nums` inside figures, citations, and index tables.
- Keep body measure between `52ch` and `66ch` with `text-wrap: balance` on headings.

## Forbidden Anti-Patterns
- Never force `text-transform: uppercase` on `Fraunces` headings (breaks its humanist lowercase rhythm).
- Never compress body line-height below `1.6` for `Newsreader` paragraphs.
- Never pair with harsh CRT scanlines or pure `#000000` neon accents.
