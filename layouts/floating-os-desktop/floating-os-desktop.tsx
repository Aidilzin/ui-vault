import type { CSSProperties, ReactNode } from "react";

export interface FloatingOsDesktopProps {
  menuBar?: ReactNode;
  primaryTitle?: string;
  primaryWindow: ReactNode;
  secondaryTitle?: string;
  secondaryWindow?: ReactNode;
  dock?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Spatial / retro desktop canvas with top menu bar, framed windows, and container-scoped dock.
 * Import `@/styles/layouts/floating-os-desktop.css` once in your app stylesheet.
 */
export function FloatingOsDesktop({
  menuBar,
  primaryTitle = "PRIMARY.APP",
  primaryWindow,
  secondaryTitle = "TELEMETRY.SYS",
  secondaryWindow,
  dock,
  className,
  style,
}: FloatingOsDesktopProps) {
  return (
    <div
      className={`lay-os-desktop ${className ?? ""}`.trim()}
      style={style}
    >
      {menuBar && <header className="lay-os-menubar">{menuBar}</header>}

      <div className="lay-os-workspace">
        <section className="lay-os-window lay-os-window-primary">
          <div className="lay-os-win-bar">
            <span className="lay-os-win-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="lay-os-win-title">{primaryTitle}</span>
          </div>
          <div className="lay-os-win-body">{primaryWindow}</div>
        </section>

        {secondaryWindow && (
          <aside className="lay-os-window lay-os-window-secondary">
            <div className="lay-os-win-bar">
              <span className="lay-os-win-dots" aria-hidden="true">
                <span />
                <span />
              </span>
              <span className="lay-os-win-title">{secondaryTitle}</span>
            </div>
            <div className="lay-os-win-body">{secondaryWindow}</div>
          </aside>
        )}
      </div>

      {dock && (
        <div className="lay-os-dock-wrap">
          <nav className="lay-os-dock" aria-label="Desktop dock">
            {dock}
          </nav>
        </div>
      )}
    </div>
  );
}
