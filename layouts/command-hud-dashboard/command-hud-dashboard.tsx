import type { CSSProperties, ReactNode } from "react";

export interface HudQuadrant {
  id: string;
  label: string;
  content: ReactNode;
}

export interface CommandHudDashboardProps {
  ticker?: ReactNode;
  quadrants: HudQuadrant[];
  eventRail?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Dense FUI mission-control dashboard with top ticker, 4-quadrant hairline panels, and bottom event rail.
 * Import `@/styles/layouts/command-hud-dashboard.css` once in your app stylesheet.
 */
export function CommandHudDashboard({
  ticker,
  quadrants,
  eventRail,
  className,
  style,
}: CommandHudDashboardProps) {
  return (
    <div
      className={`lay-command-hud ${className ?? ""}`.trim()}
      style={style}
    >
      {ticker && <header className="lay-hud-ticker">{ticker}</header>}

      <div className="lay-hud-grid">
        {quadrants.map((q, idx) => (
          <section key={q.id} className="lay-hud-panel">
            <div className="lay-hud-panel-head">
              <span className="lay-hud-panel-code">
                Q0{idx + 1} // {q.label}
              </span>
              <span className="lay-hud-crosshair" aria-hidden="true">
                +
              </span>
            </div>
            <div className="lay-hud-panel-body">{q.content}</div>
          </section>
        ))}
      </div>

      {eventRail && <footer className="lay-hud-events">{eventRail}</footer>}
    </div>
  );
}
