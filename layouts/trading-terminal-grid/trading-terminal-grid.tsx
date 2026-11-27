import type { CSSProperties, ReactNode } from "react";

export interface TradingTerminalGridProps {
  tickerTape?: ReactNode;
  orderBook: ReactNode;
  primaryChart: ReactNode;
  executionTicket: ReactNode;
  positionsTable: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Dense 5-region asymmetric financial/telemetry execution desk.
 * Import `@/styles/layouts/trading-terminal-grid.css` once in your app stylesheet.
 */
export function TradingTerminalGrid({
  tickerTape,
  orderBook,
  primaryChart,
  executionTicket,
  positionsTable,
  className,
  style,
}: TradingTerminalGridProps) {
  return (
    <div
      className={`lay-trading-terminal ${className ?? ""}`.trim()}
      style={style}
    >
      {tickerTape && <header className="lay-tt-tape">{tickerTape}</header>}
      <div className="lay-tt-grid">
        <aside className="lay-tt-pane lay-tt-book">{orderBook}</aside>
        <section className="lay-tt-pane lay-tt-chart">{primaryChart}</section>
        <aside className="lay-tt-pane lay-tt-ticket">{executionTicket}</aside>
        <section className="lay-tt-pane lay-tt-positions">{positionsTable}</section>
      </div>
    </div>
  );
}
