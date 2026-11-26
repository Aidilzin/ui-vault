/**
 * Clean-room React/TypeScript implementation inspired by Codrops ImageTrailEffects
 * (`https://github.com/codrops/ImageTrailEffects`).
 * Velocity-gated floating card trail spawning along pointer path with prefers-reduced-motion fallback.
 */
import { useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

export interface TrailSwatch {
  label: string;
  bg: string;
  ink?: string;
}

export interface KineticCardTrailProps {
  swatches?: TrailSwatch[];
  thresholdPx?: number;
  maxVisible?: number;
  style?: CSSProperties;
}

interface SpawnedCard {
  id: number;
  x: number;
  y: number;
  rot: number;
  swatch: TrailSwatch;
}

const DEFAULT_SWATCHES: TrailSwatch[] = [
  { label: "01 // FUI", bg: "#38bdf8", ink: "#090a0c" },
  { label: "02 // ZINE", bg: "#3cffd0", ink: "#090a0c" },
  { label: "03 // CORAL", bg: "#f36458", ink: "#ffffff" },
  { label: "04 // AMBER", bg: "#f59e0b", ink: "#090a0c" },
  { label: "05 // INDIGO", bg: "#5e6ad2", ink: "#ffffff" },
];

export function KineticCardTrail({
  swatches = DEFAULT_SWATCHES,
  thresholdPx = 44,
  maxVisible = 6,
  style,
}: KineticCardTrailProps) {
  const [cards, setCards] = useState<SpawnedCard[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const counterRef = useRef(0);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const prev = lastPosRef.current;
    if (prev && Math.hypot(x - prev.x, y - prev.y) < thresholdPx) return;
    lastPosRef.current = { x, y };

    const id = ++counterRef.current;
    const swatch = swatches[id % swatches.length];
    const rot = ((id % 5) - 2) * 4.5;

    setCards((curr) => [...curr.slice(-(maxVisible - 1)), { id, x, y, rot, swatch }]);

    window.setTimeout(() => {
      setCards((curr) => curr.filter((c) => c.id !== id));
    }, 650);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 160,
        background: "#0b0d12",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 4,
        display: "grid",
        placeItems: "center",
        userSelect: "none",
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "#586170",
        }}
      >
        SWEEP POINTER TO SPAWN TRAIL
      </span>

      {cards.map((card, idx) => (
        <div
          key={card.id}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: card.x,
            top: card.y,
            transform: `translate(-50%, -50%) rotate(${card.rot}deg)`,
            padding: "8px 12px",
            background: card.swatch.bg,
            color: card.swatch.ink ?? "#090a0c",
            borderRadius: 3,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 10,
            fontWeight: 700,
            pointerEvents: "none",
            opacity: Math.max(0.35, (idx + 1) / Math.max(1, cards.length)),
            transition: "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {card.swatch.label}
        </div>
      ))}
    </div>
  );
}
