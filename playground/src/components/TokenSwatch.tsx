import { useMemo } from "react";
import { formatNodeLabel, styleTokensById } from "../lib/vault-data";

interface ParsedTokens {
  canvas: string;
  surface: string;
  border: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentAlt: string;
  radius: string;
  shadow: string;
}

function parseCssCustomProps(raw: string): Record<string, string> {
  const vars: Record<string, string> = {};
  const regex = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    vars[match[1].toLowerCase()] = match[2].trim();
  }
  return vars;
}

function pickToken(vars: Record<string, string>, patterns: string[], fallback: string): string {
  for (const pat of patterns) {
    for (const [key, val] of Object.entries(vars)) {
      if (key.includes(pat) && val) return val;
    }
  }
  return fallback;
}

export function TokenSwatch({ styleId }: { styleId: string }) {
  const tokens = useMemo<ParsedTokens>(() => {
    const raw = styleTokensById[styleId] ?? "";
    const vars = parseCssCustomProps(raw);
    return {
      canvas: pickToken(vars, ["canvas", "bg", "ground"], "#0f1115"),
      surface: pickToken(vars, ["surface", "card", "panel", "bay", "elevated"], "#15181e"),
      border: pickToken(vars, ["border", "rule", "line"], "rgba(255,255,255,0.14)"),
      ink: pickToken(vars, ["-ink", "text", "fg"], "#e8ecf2"),
      inkMuted: pickToken(vars, ["muted", "secondary", "subtle"], "#8b94a3"),
      accent: pickToken(vars, ["accent", "cta", "primary", "signal-active", "signal-red"], "#38bdf8"),
      accentAlt: pickToken(vars, ["interactive", "alt", "signal-ok", "signal-blue", "signal-green"], "#34d399"),
      radius: pickToken(vars, ["radius-md", "radius-chassis", "radius"], "4px"),
      shadow: pickToken(vars, ["shadow"], "none"),
    };
  }, [styleId]);

  return (
    <div
      style={{
        height: "100%",
        background: tokens.canvas,
        color: tokens.ink,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: tokens.inkMuted,
          }}
        >
          {styleId}
        </span>
        <span
          style={{
            display: "inline-flex",
            gap: 4,
            alignItems: "center",
          }}
        >
          {[tokens.surface, tokens.accent, tokens.accentAlt].map((swatch, idx) => (
            <span
              key={idx}
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: swatch,
                border: `1px solid ${tokens.border}`,
                display: "inline-block",
              }}
            />
          ))}
        </span>
      </div>

      <div
        style={{
          background: tokens.surface,
          border: `1px solid ${tokens.border}`,
          borderRadius: tokens.radius,
          boxShadow: tokens.shadow,
          padding: "10px 12px",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {formatNodeLabel(styleId)}
        </div>
        <div style={{ fontSize: 11, color: tokens.inkMuted, marginTop: 4 }}>
          Live token-driven preview surface
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            background: tokens.accent,
            color: tokens.canvas,
            padding: "3px 10px",
            borderRadius: tokens.radius,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          PRIMARY
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: tokens.inkMuted }}>
          {tokens.canvas} // {tokens.accent}
        </span>
      </div>
    </div>
  );
}
