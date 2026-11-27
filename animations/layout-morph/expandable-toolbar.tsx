import React, { useState } from "react";

export interface ExpandableToolbarItem {
  id: string;
  label: string;
  detail: string;
}

export interface ExpandableToolbarProps {
  items?: ExpandableToolbarItem[];
  accentColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_ITEMS: ExpandableToolbarItem[] = [
  { id: "inspect", label: "Inspect", detail: "Slot inspector active · 0 layout shifts detected." },
  { id: "tokens", label: "Tokens", detail: "12 scoped CSS custom properties bound to stage." },
  { id: "motion", label: "Motion", detail: "60fps compositor budget · reduced-motion ready." },
];

export function ExpandableToolbar({
  items = DEFAULT_ITEMS,
  accentColor = "#38bdf8",
  className = "",
  style,
}: ExpandableToolbarProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem = items.find((i) => i.id === activeId) ?? null;

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 8,
        border: "1px solid var(--fui-border-strong, rgba(255,255,255,0.16))",
        background: "var(--fui-surface, #14171e)",
        overflow: "hidden",
        maxWidth: "100%",
        ...style,
      }}
    >
      <div
        style={{
          maxHeight: activeItem ? 76 : 0,
          opacity: activeItem ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 220ms cubic-bezier(0.22,1,0.36,1), opacity 180ms ease",
          borderBottom: activeItem
            ? "1px solid var(--fui-border, rgba(255,255,255,0.1))"
            : "none",
        }}
      >
        {activeItem && (
          <div
            style={{
              padding: "8px 11px",
              fontSize: 11,
              lineHeight: 1.4,
              color: "var(--fui-ink-muted, #9aa4b2)",
            }}
          >
            <strong
              style={{
                color: accentColor,
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 10,
                marginRight: 6,
              }}
            >
              {activeItem.label.toUpperCase()}
            </strong>
            {activeItem.detail}
          </div>
        )}
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: 4 }}>
        {items.map((item) => {
          const isOpen = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              aria-expanded={isOpen}
              style={{
                appearance: "none",
                border: "none",
                borderRadius: 5,
                padding: "5px 10px",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 10.5,
                fontWeight: 600,
                cursor: "pointer",
                background: isOpen ? accentColor : "transparent",
                color: isOpen ? "#090a0c" : "var(--fui-ink, #e8ecf2)",
                transition: "background 160ms ease, color 160ms ease",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
