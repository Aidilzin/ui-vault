import { useMemo } from "react";
import { formatNodeLabel } from "../lib/vault-data";
import {
  getContrastInk,
  getMutedInk,
  resolveStyleTheme,
} from "../lib/style-theme";

export { getContrastInk, getMutedInk };

export function TokenSwatch({ styleId }: { styleId: string }) {
  const theme = useMemo(() => resolveStyleTheme(styleId), [styleId]);

  return (
    <div
      style={{
        height: "100%",
        background: theme.canvas,
        color: theme.ink,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: theme.fontBody,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: theme.inkMuted,
          }}
        >
          {styleId}
        </span>
        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
          {[theme.surface, theme.accent, theme.accentAlt].map((swatch, idx) => (
            <span
              key={idx}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: swatch,
                border: `1px solid ${theme.border}`,
                display: "inline-block",
              }}
            />
          ))}
        </span>
      </div>

      <div
        style={{
          background: theme.surface,
          color: theme.surfaceInk,
          border: `${theme.borderWidth} solid ${theme.border}`,
          borderRadius: theme.radius,
          boxShadow: theme.shadow,
          padding: "10px 12px",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            fontFamily: theme.fontHeading,
          }}
        >
          {formatNodeLabel(styleId)}
        </div>
        <div style={{ fontSize: 11, color: theme.surfaceMuted, marginTop: 4 }}>
          Contrast-verified token surface
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            background: theme.accent,
            color: theme.accentInk,
            padding: "3px 10px",
            borderRadius: theme.radius,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          PRIMARY
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            color: theme.inkMuted,
          }}
        >
          {theme.canvas} // {theme.accent}
        </span>
      </div>
    </div>
  );
}
