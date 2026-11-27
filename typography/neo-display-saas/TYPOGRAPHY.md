---
id: neo-display-saas
name: Neo Display SaaS
tier: viral
voice: Clean, punchy modern launch-page and product marketing voice with geometric poise
googleFontsUrl: https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap
pairsWith: [bento-grid, aurora-mesh, mesh-craft, command-dark, orbital-ceramic, dot-matrix, radial-vignette]
clashesWith: [retro-web-96, os-core, archival-paper]
---

# Neo Display SaaS

Modern high-craft launch-page typography pairing geometric `Space Grotesk` display headings with clean `Inter` product copy and `JetBrains Mono` pill eyebrows.

## Font Pairing Rationale
- **Display (`Space Grotesk`):** Proportional geometric proportions with subtle technical character give hero headlines immediate product-launch authority without feeling generic.
- **Body (`Inter`):** Effortless UI legibility for feature descriptions, pricing tiers, and interactive controls.
- **Mono (`JetBrains Mono`):** Crisp version tags, changelog badges, and live KPI readouts.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(2rem, 1.3rem + 2.8vw, 3.5rem)` · weight `700` · tracking `-0.03em` · leading `1.04`
- **H2 (`--text-h2`):** `clamp(1.35rem, 1.05rem + 1.15vw, 2rem)`
- **H3 (`--text-h3`):** `clamp(1.05rem, 0.95rem + 0.35vw, 1.25rem)`
- **Body (`--text-body`):** `clamp(0.9rem, 0.86rem + 0.16vw, 1rem)` · leading `1.58`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.08em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.05em`

## OpenType & Numeric Rules
- Enable `tabular-nums` on pricing figures, metric counters, and live uptime tickers.
- Use `text-wrap: balance` on hero headlines and centered feature section headers.

## Forbidden Anti-Patterns
- Never stretch `Space Grotesk` with positive tracking on large display headings.
- Never mix serif subheadings into a `neo-display-saas` marketing grid.
- Never exceed 3 distinct font weights on a single card.
