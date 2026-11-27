import { useEffect, useState, type CSSProperties } from "react";

export interface LiveEqualizerBarsProps {
  channels?: number;
  label?: string;
  reducedMotion?: boolean;
  seed?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Multi-channel segmented compute/audio level bars with falling peak-hold caps
 * and static snapshot when prefers-reduced-motion is active.
 */
export function LiveEqualizerBars({
  channels = 8,
  label = "WORKER SPECTRUM",
  reducedMotion = false,
  seed = 0,
  className,
  style,
}: LiveEqualizerBarsProps) {
  const [levels, setLevels] = useState<number[]>(() =>
    Array.from({ length: channels }, (_, i) => 3 + ((i * 3 + seed) % 6))
  );
  const [peaks, setPeaks] = useState<number[]>(() =>
    Array.from({ length: channels }, (_, i) => 5 + ((i * 3 + seed) % 5))
  );

  useEffect(() => {
    const prefersReduced =
      reducedMotion ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (prefersReduced) {
      const staticLv = Array.from({ length: channels }, (_, i) => 3 + ((i * 2 + seed) % 6));
      setLevels(staticLv);
      setPeaks(staticLv.map((v) => Math.min(10, v + 1)));
      return;
    }

    let step = seed;
    const id = window.setInterval(() => {
      step += 1;
      const next = Array.from({ length: channels }, (_, i) => {
        const wave = Math.sin(step * 0.55 + i * 0.9) * 0.5 + 0.5;
        return Math.max(1, Math.min(10, Math.round(2 + wave * 7)));
      });
      setLevels(next);
      setPeaks((prev) =>
        next.map((v, i) => Math.max(v, (prev[i] ?? v) - 0.35))
      );
    }, 180);

    return () => window.clearInterval(id);
  }, [channels, reducedMotion, seed]);

  const segs = 10;
  const avgPct = Math.round((levels.reduce((a, b) => a + b, 0) / (channels * segs)) * 100);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "var(--font-mono, monospace)",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
        <span style={{ color: "var(--tel-muted, #8b94a3)", letterSpacing: "0.06em" }}>{label}</span>
        <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--tel-accent, #38bdf8)", fontWeight: 600 }}>
          {avgPct}% LOAD
        </span>
      </div>

      <svg viewBox={`0 0 ${channels * 22} 66`} width="100%" height="60" role="img" aria-label={label}>
        {levels.map((lv, ch) => {
          const x = ch * 22 + 3;
          const peakRow = Math.min(segs - 1, Math.floor(peaks[ch] ?? lv));
          return (
            <g key={ch}>
              {Array.from({ length: segs }, (_, s) => {
                const y = (segs - 1 - s) * 6 + 3;
                const lit = s < lv;
                const isPeak = s === peakRow;
                const fill =
                  s >= 8
                    ? "var(--tel-danger, #f43f5e)"
                    : s >= 6
                      ? "var(--tel-warn, #f59e0b)"
                      : "var(--tel-accent, #38bdf8)";
                return (
                  <rect
                    key={s}
                    x={x}
                    y={y}
                    width="16"
                    height="4"
                    rx="1"
                    fill={lit || isPeak ? fill : "var(--tel-border, rgba(255,255,255,0.14))"}
                    opacity={isPeak ? 1 : lit ? 0.88 : 0.28}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
