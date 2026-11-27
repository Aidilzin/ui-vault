---
id: risograph-print
name: Risograph Print
kind: style
cluster: 03-kinetic-rebel
pairs_with: [halftone-screen, kinetic-brutal]
clashes_with: [liquid-glass, command-dark, monolith-dark]
---

# Risograph Print

Warm uncoated cream paper stock overprinted with soy-ink cobalt and vermilion misregistration offsets, tactile halftone grain, and bold editorial punch.

## Core Tokens & Surfaces
- **Paper Stock:** Uncoated warm cream (`#f6f1e7`) with slightly heavier card stock (`#fbf8f2`) and crisp soy-ink frames (`#1d4ed8`).
- **Two-Drum Ink Palette:** Primary Riso Cobalt (`#1d4ed8`) + Secondary Fluorescent Vermilion (`#ef4444`), paired with deep indigo-black ink (`#171b2e`) instead of digital `#000000`.
- **Registration Offset:** Deliberate `3px 3px 0` solid color-offset shadows evoking 2-pass stencil print registration.

## Motion Rules
- Use crisp stepped or brisk linear-out snaps (`140ms–200ms`) that feel like physical card stock shifting on a press bed.
- Keep `prefers-reduced-motion` static with clean ink-offset hover states.

## Forbidden Anti-Patterns
- Never use soft Gaussian drop shadows, translucent glass blur, or dark-mode neon gradients.
- Keep spot inks limited to 2 drums per view to preserve authentic risograph economy.
