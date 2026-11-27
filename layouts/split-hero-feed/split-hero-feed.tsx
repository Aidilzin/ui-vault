import type { CSSProperties, ReactNode } from "react";

export interface SplitHeroFeedProps {
  pinnedHero: ReactNode;
  feedItems: ReactNode[];
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * 50/50 asymmetric pinned hero panel paired with an independent vertical feed.
 * Import `@/styles/layouts/split-hero-feed.css` once in your app stylesheet.
 */
export function SplitHeroFeed({
  pinnedHero,
  feedItems,
  footer,
  className,
  style,
}: SplitHeroFeedProps) {
  return (
    <div
      className={`lay-split-hero-feed ${className ?? ""}`.trim()}
      style={style}
    >
      <div className="lay-shf-grid">
        <section className="lay-shf-pinned">{pinnedHero}</section>
        <div className="lay-shf-feed">
          {feedItems.map((item, idx) => (
            <article key={idx} className="lay-shf-card">
              {item}
            </article>
          ))}
        </div>
      </div>
      {footer && <footer className="lay-shf-footer">{footer}</footer>}
    </div>
  );
}
