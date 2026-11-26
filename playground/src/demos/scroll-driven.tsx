import { useRef } from "react";
import { ScrollProgressBar } from "@vault/animations/scroll-driven/scroll-progress-bar";
import type { DemoMap } from "./types";

function ScrollProgressBarDemo() {
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 8 }}>
      <ScrollProgressBar containerRef={scrollBoxRef} color="#38bdf8" height={3} />
      <div
        ref={scrollBoxRef}
        style={{
          height: 112,
          overflowY: "auto",
          padding: 10,
          background: "#0f1115",
          border: "1px solid var(--fui-border)",
          borderRadius: 3,
          fontSize: 11,
          color: "var(--fui-ink-muted)",
        }}
      >
        {Array.from({ length: 8 }, (_, idx) => (
          <div key={idx} style={{ padding: "5px 0", borderBottom: "1px solid var(--fui-border)" }}>
            FRAME TELEMETRY RECORD 0{idx + 1} — SCROLL TO ADVANCE RIBBON
          </div>
        ))}
      </div>
    </div>
  );
}

export const scrollDrivenDemos: DemoMap = {
  "scroll-progress-bar": ScrollProgressBarDemo,
};
