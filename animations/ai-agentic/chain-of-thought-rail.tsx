/**
 * Adapted from Vercel AI Elements (`https://registry.ai-sdk.dev/chain-of-thought.json`).
 * License: Apache-2.0.
 * Zero-dependency vertical connected multi-step agent execution rail with active pulse beacon.
 */
import { useState } from "react";

const STEPS = [
  "Audit relations.json baseline",
  "Verify MIT / Apache-2.0 licenses",
  "Generate strict-TS primitives",
  "Run parity & build gates",
];

export function ChainOfThoughtRail() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <div style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ position: "relative", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 5, top: 6, bottom: 6, width: 1, background: "rgba(255,255,255,0.14)" }} />
        {STEPS.map((label, idx) => {
          const done = idx < activeStep;
          const active = idx === activeStep;
          const color = done ? "#34d399" : active ? "#38bdf8" : "#586170";
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveStep(idx)}
              style={{
                position: "relative",
                textAlign: "left",
                background: "transparent",
                border: "none",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 11,
                color: active ? "#ffffff" : done ? "#cbd5e1" : "#586170",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -17,
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: done || active ? color : "#090a0c",
                  border: `1.5px solid ${color}`,
                  boxShadow: active ? `0 0 0 3px ${color}33` : "none",
                  transition: "all 180ms ease",
                }}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
