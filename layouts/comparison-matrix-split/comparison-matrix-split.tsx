import type { CSSProperties, ReactNode } from "react";

export interface ComparisonRow {
  feature: string;
  values: ReactNode[];
}

export interface ComparisonMatrixSplitProps {
  header?: ReactNode;
  tierCards: ReactNode[];
  rows: ComparisonRow[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Structured tier cards above a feature comparison matrix with mobile collapse.
 * Import `@/styles/layouts/comparison-matrix-split.css` once in your app stylesheet.
 */
export function ComparisonMatrixSplit({
  header,
  tierCards,
  rows,
  className,
  style,
}: ComparisonMatrixSplitProps) {
  return (
    <div
      className={`lay-comparison-matrix ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-cmp-header">{header}</header>}
      <div className="lay-cmp-tiers">
        {tierCards.map((card, idx) => (
          <div key={idx} className="lay-cmp-tier">
            {card}
          </div>
        ))}
      </div>
      <div className="lay-cmp-matrix">
        {rows.map((row) => (
          <div key={row.feature} className="lay-cmp-row">
            <div className="lay-cmp-feature">{row.feature}</div>
            <div className="lay-cmp-vals">
              {row.values.map((val, idx) => (
                <div key={idx} className="lay-cmp-cell">
                  {val}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
