---
id: swiss-grotesk
name: Swiss Grotesk
tier: production
voice: Heavy tight-tracked International Typographic Style hierarchy with disciplined negative space
googleFontsUrl: https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap
pairsWith: [neo-swiss, swiss-type-foundry, monochrome-stark, wordmark-press, architect-grid, diagonal-hatch]
clashesWith: [pastel-playful, liquid-glass, ambient-orbit]
---

# Swiss Grotesk

Bold International Typographic Style hierarchy combining tightly-tracked `Archivo` grotesque display headlines with neutral `Inter` body text and `IBM Plex Mono` grid coordinates.

## Font Pairing Rationale
- **Display (`Archivo`):** Sturdy grotesque construction built for high-impact headlines at `-0.04em` tracking and near-solid `0.96` leading.
- **Body (`Inter`):** Neutral neo-grotesk body maintains grid calm without competing against the display voice.
- **Mono (`IBM Plex Mono`):** Crisp column indices, folio numbers, and tabular metadata.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(2rem, 1.25rem + 3vw, 3.6rem)` · weight `800` · tracking `-0.04em` · leading `0.96`
- **H2 (`--text-h2`):** `clamp(1.35rem, 1.05rem + 1.2vw, 2rem)`
- **H3 (`--text-h3`):** `clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem)`
- **Body (`--text-body`):** `clamp(0.875rem, 0.85rem + 0.15vw, 0.975rem)` · leading `1.55`
- **Label (`--text-label`):** `0.72rem` · uppercase · tracking `0.09em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.06em`

## OpenType & Numeric Rules
- Use `tabular-nums` on grid indices, dates, and price/metric tables.
- Maintain left-aligned ragged-right typography with `text-wrap: balance` on display headings.

## Forbidden Anti-Patterns
- Never center-align long paragraphs inside a Swiss grid.
- Never soften `Archivo` headings with heavy drop shadows or translucent gradients.
- Never loosen hero tracking above `-0.015em`.
