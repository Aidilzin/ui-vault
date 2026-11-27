import type { CSSProperties, ReactNode } from "react";

export interface SwissEditorialGridProps {
  masthead?: ReactNode;
  indexRail?: ReactNode;
  hero: ReactNode;
  body: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Exposed 1px hairline 12-column International Typographic Style grid.
 * Import `@/styles/layouts/swiss-editorial-grid.css` once in your app stylesheet.
 */
export function SwissEditorialGrid({
  masthead,
  indexRail,
  hero,
  body,
  footer,
  className,
  style,
}: SwissEditorialGridProps) {
  return (
    <div
      className={`lay-swiss-editorial ${className ?? ""}`.trim()}
      style={style}
    >
      {masthead && <header className="lay-swiss-masthead">{masthead}</header>}

      <div className="lay-swiss-grid">
        {indexRail && (
          <aside className="lay-swiss-index" aria-label="Issue index">
            <div className="lay-swiss-index-sticky">{indexRail}</div>
          </aside>
        )}

        <div className="lay-swiss-main">
          <section className="lay-swiss-hero">{hero}</section>
          <section className="lay-swiss-body">{body}</section>
        </div>
      </div>

      {footer && <footer className="lay-swiss-footer">{footer}</footer>}
    </div>
  );
}
