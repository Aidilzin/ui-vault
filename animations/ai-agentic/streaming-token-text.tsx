/**
 * Clean-room AI workflow primitive inspired by Vercel AI Elements inline-citation patterns.
 * Token-by-token LLM streaming reveal with hoverable inline citation pills [1][2] and reduced-motion fallback.
 */
import { useEffect, useState } from "react";

export interface CitationSource {
  id: number;
  title: string;
  url: string;
}

export interface StreamingTokenTextProps {
  tokens?: string[];
  citations?: CitationSource[];
  intervalMs?: number;
}

const DEFAULT_TOKENS = [
  "Vault", "parity", "checks", "verify", "1:1", "registry", "integrity",
  "across", "styles,", "animations,", "and", "compatibility", "edges",
  "with", "zero", "orphaned", "files."
];

const DEFAULT_CITATIONS: CitationSource[] = [
  { id: 1, title: "relations.json schema", url: "https://github.com/Aidilzin/ui-vault" },
  { id: 2, title: "check-vault.mjs validator", url: "https://github.com/Aidilzin/ui-vault" },
];

export function StreamingTokenText({
  tokens = DEFAULT_TOKENS,
  citations = DEFAULT_CITATIONS,
  intervalMs = 55,
}: StreamingTokenTextProps) {
  const [count, setCount] = useState(0);
  const [activeCite, setActiveCite] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(tokens.length);
      return;
    }
    setCount(0);
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= tokens.length) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [tokens, intervalMs]);

  const done = count >= tokens.length;
  const activeSource = citations.find((c) => c.id === activeCite);

  return (
    <div style={{ width: "100%", maxWidth: 330, fontSize: 12, lineHeight: 1.55, color: "#e8ecf2" }}>
      <div style={{ padding: "10px 12px", background: "#0f1115", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4 }}>
        <span>{tokens.slice(0, count).join(" ")}</span>
        {!done && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 6,
              height: 12,
              marginLeft: 4,
              background: "#38bdf8",
              verticalAlign: "middle",
            }}
          />
        )}
        {done && (
          <span style={{ display: "inline-flex", gap: 4, marginLeft: 6, verticalAlign: "middle" }}>
            {citations.map((cite) => (
              <button
                key={cite.id}
                type="button"
                onMouseEnter={() => setActiveCite(cite.id)}
                onMouseLeave={() => setActiveCite(null)}
                onFocus={() => setActiveCite(cite.id)}
                onBlur={() => setActiveCite(null)}
                style={{
                  padding: "0 5px",
                  borderRadius: 3,
                  border: "1px solid rgba(56,189,248,0.4)",
                  background: activeCite === cite.id ? "rgba(56,189,248,0.25)" : "rgba(56,189,248,0.1)",
                  color: "#38bdf8",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 10,
                  cursor: "pointer",
                }}
              >
                [{cite.id}]
              </button>
            ))}
          </span>
        )}
      </div>
      <div
        style={{
          marginTop: 6,
          minHeight: 18,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 10,
          color: activeSource ? "#38bdf8" : "#586170",
        }}
      >
        {activeSource ? `SOURCE [${activeSource.id}]: ${activeSource.title}` : "Hover citation pills [1] [2] after stream"}
      </div>
    </div>
  );
}
