---
id: swiss-editorial-grid
name: Swiss Editorial Grid
tier: production
pattern: Exposed 1px hairline 12-column International Typographic grid
slots: [masthead, indexRail, hero, body, footer]
pairsWith: [neo-swiss, swiss-type-foundry, monochrome-stark, warm-manuscript, archival-paper, swiss-grotesk, editorial-serif, inline-sparkline]
clashesWith: [liquid-glass, pastel-playful, acid-y2k]
---

# Swiss Editorial Grid

Honest 12-column International Typographic Style layout featuring exposed 1px structural hairlines, an asymmetric 3-column sticky index rail, and a generous 9-column editorial stage.

## Grid Anatomy

```text
┌────────────────────────────────────────────────────────┐
│ masthead (12 cols)                                     │
├─────────────┬──────────────────────────────────────────┤
│ indexRail   │ hero (9 cols)                            │
│ (3 cols,    ├──────────────────────────────────────────┤
│  sticky)    │ body (9 cols)                            │
├─────────────┴──────────────────────────────────────────┤
│ footer (12 cols)                                       │
└────────────────────────────────────────────────────────┘
```

## Container Breakpoint Rules
- **`> 720px`:** 3-column sticky index rail separated by a hairline border from the 9-column editorial stack.
- **`<= 720px`:** Index rail unsticks and reflows into a horizontal strip above the main editorial column.
- **`<= 480px`:** Compact `12px` horizontal padding with preserved structural hairlines.

## Anti-Patterns
- Never apply `overflow: hidden` to ancestors of `.lay-swiss-index-sticky`.
- Never add rounded card drop-shadows on top of exposed Swiss hairlines.
