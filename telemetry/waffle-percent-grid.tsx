import { useState, type CSSProperties } from "react";

export interface WaffleCategory {
  id: string;
  label: string;
  percent: number;
  tone: "accent" | "ok" | "warn" | "muted";
}

export interface WafflePercentGridProps {
  categories: WaffleCategory[];
  title?: string;
  className?: string;
  style?: CSSProperties;
}

const TONE_COLOR: Record<WaffleCategory["tone"], string> = {
  accent: "var(--tel-accent, #38bdf8)",
  ok: "var(--tel-ok, #34d399)",
  warn: "var(--tel-warn, #f59e0b)",
  muted: "var(--tel-border, rgba(255,255,255,0.22))",
};

/**
 * Crisp 10x10 micro-cell percentage proportion grid with interactive category highlight.
 */
export function WafflePercentGrid({
  categories,
  title = "CACHE MIX",
  className,
  style,
}: WafflePercentGridProps) {
  const [hoverCat, setHoverCat] = useState<string | null>(null);

  const cells: WaffleCategory[] = [];
  for (const cat of categories) {
    const count = Math.max(0, Math.round(cat.percent));
    for (let i = 0; i < count && cells.length < 100; i++) {
      cells.push(cat);
    }
  }
  while (cells.length < 100) {
    cells.push({ id: "rest", label: "Free", percent: 0, tone: "muted" });
  }

  const active = categories.find((c) => c.id === hoverCat) ?? categories[0];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 7,
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>{title}</span>
        {active && (
          <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-ink, #e8ecf2)" }}>
            {active.label}: {active.percent}%
          </span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <svg viewBox="0 0 110 110" width="84" height="84" role="img" aria-label={title} onMouseLeave={() => setHoverCat(null)}>
          {cells.map((cell, idx) => {
            const col = idx % 10;
            const row = Math.floor(idx / 10);
            const dimmed = hoverCat !== null && hoverCat !== cell.id;
            return (
              <rect
                key={idx}
                x={col * 11 + 1}
                y={row * 11 + 1}
                width="8.5"
                height="8.5"
                rx="1.5"
                fill={TONE_COLOR[cell.tone]}
                opacity={dimmed ? 0.24 : 0.92}
                onMouseEnter={() => setHoverCat(cell.id)}
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 10 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onMouseEnter={() => setHoverCat(cat.id)}
              onMouseLeave={() => setHoverCat(null)}
              style={{
                appearance: "none",
                background: "transparent",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: hoverCat === cat.id ? "var(--tel-ink, #e8ecf2)" : "var(--tel-muted, #8b94a3)",
                fontFamily: "inherit",
                fontSize: 10,
                cursor: "pointer",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 1.5, background: TONE_COLOR[cat.tone], display: "inline-block" }} />
              <span>{cat.label}</span>
              <span>{cat.percent}%</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
