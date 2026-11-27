import type { CSSProperties, ReactNode } from "react";

export interface SplitAiIdeProps {
  header?: ReactNode;
  sessionRail?: ReactNode;
  stream: ReactNode;
  composer?: ReactNode;
  artifactPane?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Agentic IDE workspace shell with session rail, execution stream, pinned composer, and optional artifact pane.
 * Import `@/styles/layouts/split-ai-ide.css` once in your app stylesheet.
 */
export function SplitAiIde({
  header,
  sessionRail,
  stream,
  composer,
  artifactPane,
  className,
  style,
}: SplitAiIdeProps) {
  return (
    <div
      className={`lay-split-ai-ide ${className ?? ""}`.trim()}
      data-has-artifact={Boolean(artifactPane)}
      style={style}
    >
      {header && <header className="lay-ide-header">{header}</header>}

      <div className="lay-ide-body">
        {sessionRail && (
          <aside className="lay-ide-sessions" aria-label="Agent sessions">
            {sessionRail}
          </aside>
        )}

        <main className="lay-ide-stream-col">
          <div className="lay-ide-stream">{stream}</div>
          {composer && <div className="lay-ide-composer">{composer}</div>}
        </main>

        {artifactPane && (
          <aside className="lay-ide-artifact" aria-label="Diff and artifacts">
            {artifactPane}
          </aside>
        )}
      </div>
    </div>
  );
}
