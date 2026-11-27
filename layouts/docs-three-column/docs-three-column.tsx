import type { CSSProperties, ReactNode } from "react";

export interface DocsThreeColumnProps {
  header?: ReactNode;
  navTree: ReactNode;
  prose: ReactNode;
  toc?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * 3-column technical documentation shell (collapsible nav tree + max-ch prose + sticky TOC).
 * Import `@/styles/layouts/docs-three-column.css` once in your app stylesheet.
 */
export function DocsThreeColumn({
  header,
  navTree,
  prose,
  toc,
  className,
  style,
}: DocsThreeColumnProps) {
  return (
    <div
      className={`lay-docs-three-col ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-docs-header">{header}</header>}
      <div className="lay-docs-body">
        <aside className="lay-docs-nav" aria-label="Documentation navigation">
          {navTree}
        </aside>
        <main className="lay-docs-prose">{prose}</main>
        {toc && (
          <aside className="lay-docs-toc" aria-label="On this page">
            {toc}
          </aside>
        )}
      </div>
    </div>
  );
}
