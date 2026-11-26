/**
 * Adapted from Aceternity UI Free Core (`https://ui.aceternity.com/registry/card-stack.json`).
 * License: MIT.
 * Zero-dependency Z-depth stacked card deck cycling front card to back with prefers-reduced-motion fallback.
 */
import { useState } from "react";

export interface DeckCardItem {
  id: string;
  tag: string;
  title: string;
  body: string;
}

const DEFAULT_CARDS: DeckCardItem[] = [
  { id: "c1", tag: "01 // SYSTEM", title: "Depth-Sorted Deck", body: "Click front card to cycle to back of stack." },
  { id: "c2", tag: "02 // MOTION", title: "Stepped Scale & Offset", body: "Compositor transform transitions with zero jank." },
  { id: "c3", tag: "03 // A11Y", title: "Reduced Motion Ready", body: "Snaps cleanly when prefers-reduced-motion is active." },
];

export function StackedCardDeck({ items = DEFAULT_CARDS }: { items?: DeckCardItem[] }) {
  const [cards, setCards] = useState(items);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cycle = () => {
    setCards((prev) => [...prev.slice(1), prev[0]]);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 300, height: 126 }}>
      {cards.map((card, idx) => (
        <button
          key={card.id}
          type="button"
          onClick={cycle}
          style={{
            position: "absolute",
            inset: 0,
            textAlign: "left",
            padding: "14px 16px",
            borderRadius: 6,
            background: idx === 0 ? "#15181e" : "#0f1115",
            border: `1px solid ${idx === 0 ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.1)"}`,
            color: "#e8ecf2",
            cursor: "pointer",
            zIndex: cards.length - idx,
            transformOrigin: "top center",
            transform: `translate3d(0, ${idx * -9}px, 0) scale(${(1 - idx * 0.05).toFixed(3)})`,
            opacity: Math.max(0.4, 1 - idx * 0.25),
            transition: reduced
              ? "none"
              : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease",
          }}
        >
          <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, color: "#38bdf8" }}>{card.tag}</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{card.title}</div>
          <div style={{ fontSize: 11, color: "#8b94a3", marginTop: 3 }}>{card.body}</div>
        </button>
      ))}
    </div>
  );
}
