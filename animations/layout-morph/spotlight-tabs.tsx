/**
 * Clean-room micro-interaction distilled from 60fps.design / Ripplix segmented tab patterns.
 * Smooth sliding active pill indicator using compositor-only transform with prefers-reduced-motion fallback.
 */
import { useLayoutEffect, useRef, useState } from "react";

export interface SpotlightTabOption {
  id: string;
  label: string;
}

export interface SpotlightTabsProps {
  tabs: SpotlightTabOption[];
  defaultTabId?: string;
  accentBg?: string;
  onChange?: (id: string) => void;
}

export function SpotlightTabs({
  tabs,
  defaultTabId,
  accentBg = "rgba(56, 189, 248, 0.16)",
  onChange,
}: SpotlightTabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id ?? "");
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = btnRefs.current.get(activeId);
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeId, tabs]);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      role="tablist"
      style={{
        position: "relative",
        display: "inline-flex",
        padding: 3,
        gap: 2,
        background: "#0f1115",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 6,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 3,
          bottom: 3,
          left: 0,
          width: pill.width,
          transform: `translate3d(${pill.left}px, 0, 0)`,
          background: accentBg,
          border: "1px solid rgba(56, 189, 248, 0.45)",
          borderRadius: 4,
          transition: reduced
            ? "none"
            : "transform 180ms cubic-bezier(0.22, 1, 0.36, 1), width 180ms cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: "none",
        }}
      />
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) btnRefs.current.set(tab.id, el);
              else btnRefs.current.delete(tab.id);
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => {
              setActiveId(tab.id);
              onChange?.(tab.id);
            }}
            style={{
              position: "relative",
              zIndex: 1,
              padding: "6px 12px",
              background: "transparent",
              border: "none",
              color: active ? "#38bdf8" : "#8b94a3",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 11,
              cursor: "pointer",
              transition: "color 140ms ease",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
