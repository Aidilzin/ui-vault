---
id: condensed-hardware
name: Condensed Hardware
tier: viral
voice: Uppercase industrial signage, rail-timetable clarity, and anodized hardware faceplate typography
googleFontsUrl: https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap
pairsWith: [industrial-hardware, transit-precision, fui-tactical, brushed-anodized, diagonal-hatch, architect-grid]
clashesWith: [warm-manuscript, pastel-playful, liquid-glass]
---

# Condensed Hardware

Industrial signage and hardware faceplate system pairing narrow, authoritative `Barlow Condensed` uppercase display headers with neutral `Inter` UI copy and `IBM Plex Mono` serial readouts.

## Font Pairing Rationale
- **Display (`Barlow Condensed`):** Inspired by California highway and transit signage, its tight horizontal rhythm packs high-impact labels cleanly onto dense hardware decks and dashboards.
- **Body (`Inter`):** Neutral, legible body text keeps specs and controls calm underneath condensed uppercase headers.
- **Mono (`IBM Plex Mono`):** Crisp encoder values, dB/Hz telemetry, and timetable departures.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(2.15rem, 1.35rem + 3.2vw, 3.85rem)` · weight `700` · tracking `0.02em` · leading `0.95`
- **H2 (`--text-h2`):** `clamp(1.45rem, 1.1rem + 1.3vw, 2.2rem)`
- **H3 (`--text-h3`):** `clamp(1.1rem, 1rem + 0.45vw, 1.35rem)`
- **Body (`--text-body`):** `clamp(0.875rem, 0.85rem + 0.14vw, 0.96rem)` · leading `1.52`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.1em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.07em`

## OpenType & Numeric Rules
- Strictly enforce `tabular-nums` on departure times, frequency readouts, and hardware meters.
- Apply `text-transform: uppercase` with slight positive tracking (`0.02em`) on `Barlow Condensed` display titles for authentic faceplate legibility.

## Forbidden Anti-Patterns
- Never use `Barlow Condensed` for long body paragraphs (narrow width slows reading speed).
- Never pair with whimsical rounded pill blobs or glossy pastel gradients.
- Never apply negative tracking to uppercase `Barlow Condensed` (glyphs visually fuse).
