/**
 * Adapted from Vercel AI Elements (`https://registry.ai-sdk.dev/prompt-input.json`).
 * License: Apache-2.0.
 * Zero-dependency AI prompt composer with removable context chips and live / slash-command menu.
 */
import { useState } from "react";

const SLASH_COMMANDS = ["/plan", "/review", "/tokens", "/diff"];

export function SlashPromptComposer() {
  const [value, setValue] = useState("");
  const [chips, setChips] = useState<string[]>(["relations.json", "STYLE.md"]);
  const showMenu = value.startsWith("/");

  const pickCommand = (cmd: string) => {
    setValue(`${cmd} `);
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 330 }}>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: "calc(100% + 6px)",
            background: "#15181e",
            border: "1px solid rgba(56,189,248,0.4)",
            borderRadius: 4,
            padding: 4,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            zIndex: 5,
          }}
        >
          {SLASH_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => pickCommand(cmd)}
              style={{
                padding: "3px 8px",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0f1115",
                color: "#38bdf8",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 10,
                cursor: "pointer",
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      )}

      <div style={{ background: "#0f1115", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 6, padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setChips((prev) => prev.filter((c) => c !== chip))}
              style={{
                padding: "1px 6px",
                borderRadius: 3,
                border: "1px solid rgba(56,189,248,0.3)",
                background: "rgba(56,189,248,0.1)",
                color: "#38bdf8",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 9,
                cursor: "pointer",
              }}
            >
              @{chip} ×
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type / for commands..."
            aria-label="Prompt composer"
            style={{
              flex: 1,
              background: "#090a0c",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 4,
              padding: "5px 8px",
              color: "#e8ecf2",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setValue("")}
            style={{
              padding: "5px 10px",
              borderRadius: 4,
              border: "1px solid rgba(56,189,248,0.45)",
              background: "rgba(56,189,248,0.16)",
              color: "#38bdf8",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 10,
              cursor: "pointer",
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
