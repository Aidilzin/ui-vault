import type { CSSProperties, ReactNode } from "react";

export interface TriageWorkbenchProps {
  header?: ReactNode;
  navRail?: ReactNode;
  queuePane: ReactNode;
  inspectorPane: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Linear/Superhuman-style 3-pane triage workbench shell.
 * Import `@/styles/layouts/triage-workbench.css` once in your app stylesheet.
 */
export function TriageWorkbench({
  header,
  navRail,
  queuePane,
  inspectorPane,
  footer,
  className,
  style,
}: TriageWorkbenchProps) {
  return (
    <div
      className={`lay-triage-workbench ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-triage-header">{header}</header>}

      <div className="lay-triage-body">
        {navRail && (
          <nav className="lay-triage-nav" aria-label="Workspace navigation">
            {navRail}
          </nav>
        )}
        <section className="lay-triage-queue" aria-label="Queue">
          {queuePane}
        </section>
        <aside className="lay-triage-inspector" aria-label="Detail inspector">
          {inspectorPane}
        </aside>
      </div>

      {footer && <footer className="lay-triage-footer">{footer}</footer>}
    </div>
  );
}
