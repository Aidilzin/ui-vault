import type { CSSProperties, ReactNode } from "react";

export interface BentoShowcaseProps {
  header?: ReactNode;
  hero: ReactNode;
  metricColumn?: ReactNode;
  tiles?: ReactNode[];
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Asymmetric 12-column modular Bento showcase shell.
 * Import `@/styles/layouts/bento-showcase.css` once in your app stylesheet.
 */
export function BentoShowcase({
  header,
  hero,
  metricColumn,
  tiles = [],
  footer,
  className,
  style,
}: BentoShowcaseProps) {
  return (
    <div
      className={`lay-bento-showcase ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-bento-header">{header}</header>}

      <div className="lay-bento-grid">
        <section className="lay-bento-tile lay-bento-hero">{hero}</section>
        {metricColumn && (
          <aside className="lay-bento-tile lay-bento-metric">
            {metricColumn}
          </aside>
        )}
        {tiles.map((tile, idx) => (
          <div
            key={idx}
            className={`lay-bento-tile lay-bento-sub ${
              idx === 0 && tiles.length === 3 ? "lay-bento-wide" : ""
            }`.trim()}
          >
            {tile}
          </div>
        ))}
      </div>

      {footer && <footer className="lay-bento-footer">{footer}</footer>}
    </div>
  );
}
