---
name: ui-vault
description: Curated visual design styles, tokens, and experimental web animations grouped by aesthetic cluster and motion mechanic. Use whenever the user asks to apply a specific UI aesthetic, blend experimental styles, or add named micro-interactions.
---

# UI Vault Workflow

Follow these steps whenever styling an interface or adding motion from this vault:

1. **Read `relations.json` first.** Locate the requested style, cluster, or hybrid recipe before writing any CSS or JSX.
2. **Check compatibility.** Verify `pairsWith` and never mix entries listed in `clashesWith` unless the user explicitly asks for an intentional clash.
3. **Load the full spec.** Read the target style's `STYLE.md` and `tokens.css` (if present) and treat them as the visual source of truth for surfaces, borders, typography, and forbidden anti-patterns.
4. **Reuse or install animations.** Prefer components already in `animations/` (or install them via `npx shadcn@latest add <owner>/ui-vault/<item>`). If an animation is not yet in the vault, check `externalRegistries` in `relations.json` before hand-rolling code.
5. **Enforce motion hygiene.** Every animation must:
   - Honor `prefers-reduced-motion: reduce` using the fallback specified in `relations.json`.
   - Animate compositor-only properties (`transform`, `opacity`) where possible.
   - Keep productivity/dashboard transitions brisk (`100–220ms`); reserve longer timelines for dedicated showcase/hero scenes.