---
id: precision-mono
name: Precision Mono
tier: production
voice: Technical telemetry, tight neo-grotesk headings, uppercase mono micro-labels, strict tabular numerals
googleFontsUrl: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap
pairsWith: [fui-tactical, monolith-dark, telemetry-fault, code-forge, editorial-mono, architect-grid]
clashesWith: [warm-manuscript, pastel-playful, avant-poster]
---

# Precision Mono

A disciplined technical typography system pairing crisp `Inter` display and body copy with `JetBrains Mono` for identifiers, telemetry readouts, and uppercase micro-labels.

## Font Pairing Rationale
- **Display & Body (`Inter`):** High x-height, razor-clean stroke terminals, and optical legibility at dense dashboard scales. Tight `-0.025em` display tracking keeps hero statements engineered rather than decorative.
- **Mono (`JetBrains Mono`):** Increased character height and clear zero/one differentiation make metrics, timestamps, and status codes effortless to scan.

## Fluid Modular Scale
- **Hero (`--text-hero`):** `clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)` · weight `600` · tracking `-0.025em` · leading `1.08`
- **H2 (`--text-h2`):** `clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)`
- **H3 (`--text-h3`):** `clamp(1rem, 0.95rem + 0.35vw, 1.2rem)`
- **Body (`--text-body`):** `clamp(0.875rem, 0.85rem + 0.15vw, 0.95rem)` · leading `1.55`
- **Label (`--text-label`):** `0.75rem` · uppercase · tracking `0.08em`
- **Micro (`--text-micro`):** `0.6875rem` · monospace · tracking `0.06em`

## OpenType & Numeric Rules
- Enforce `font-variant-numeric: tabular-nums` on every counter, table column, latency metric, and timestamp.
- Enable `font-feature-settings: "cv02", "cv03", "cv04", "cv11"` on `Inter` for unambiguous technical numerals and glyphs.
- Apply `text-wrap: balance` on display headings to prevent single-word orphans.

## Forbidden Anti-Patterns
- Never mix serif display headings into a `precision-mono` telemetry layout.
- Never use positive tracking on `Inter` hero headlines or drop below `1.45` line-height on multi-line technical body copy.
- Never omit `tabular-nums` on live-updating counters (causes horizontal jitter).
