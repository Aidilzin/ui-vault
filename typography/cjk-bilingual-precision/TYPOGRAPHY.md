---
id: cjk-bilingual-precision
name: CJK Bilingual Precision
tier: production
voice: Balanced Latin + CJK system enforcing relaxed display leading (>= 1.3) and strict tabular numerals
googleFontsUrl: https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
pairsWith: [monochrome-stark, motion-slate-minimal, transit-precision]
clashesWith: [acid-y2k, pixel-arcade]
---

# CJK Bilingual Precision

Internationalized Latin + CJK typography stack (`Inter` + `Noto Sans JP` + `JetBrains Mono`) enforcing relaxed ideographic leading (`>= 1.32` display, `1.78` body) so dense kanji/kana glyphs never collide vertically.

## Font Pairing Rationale
- **Latin First + CJK Fallback (`Inter`, `Noto Sans JP`):** Crisp proportional Latin numerals and headings seamlessly paired with optical-weight CJK glyphs.
- **Mono (`JetBrains Mono`):** High-legibility technical labels and timetables.

## OpenType & Numeric Rules
- Never compress display `line-height` below `1.3` on CJK strings.
- Avoid negative letter-spacing on CJK headings (`--tracking-display: 0em`).
- Enforce `tabular-nums` for transit schedules, version tags, and bilingual tables.
