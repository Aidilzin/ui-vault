import type { CSSProperties, ReactNode } from "react";

export interface MasonryArchiveProps {
  header?: ReactNode;
  filterBar?: ReactNode;
  items: ReactNode[];
  detailRail?: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Curated gallery/catalog layout with sticky filter bar, multi-column waterfall grid, and optional detail rail.
 * Import `@/styles/layouts/masonry-archive.css` once in your app stylesheet.
 */
export function MasonryArchive({
  header,
  filterBar,
  items,
  detailRail,
  footer,
  className,
  style,
}: MasonryArchiveProps) {
  return (
    <div
      className={`lay-masonry-archive ${className ?? ""}`.trim()}
      data-has-detail={Boolean(detailRail)}
      style={style}
    >
      {header && <header className="lay-masonry-header">{header}</header>}
      {filterBar && <div className="lay-masonry-filter">{filterBar}</div>}

      <div className="lay-masonry-body">
        <div className="lay-masonry-grid">
          {items.map((item, idx) => (
            <div key={idx} className="lay-masonry-item">
              {item}
            </div>
          ))}
        </div>

        {detailRail && (
          <aside className="lay-masonry-detail" aria-label="Selected item details">
            {detailRail}
          </aside>
        )}
      </div>

      {footer && <footer className="lay-masonry-footer">{footer}</footer>}
    </div>
  );
}
