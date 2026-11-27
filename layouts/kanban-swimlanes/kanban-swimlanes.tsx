import type { CSSProperties, ReactNode } from "react";

export interface KanbanLane {
  id: string;
  title: string;
  count?: number;
  cards: ReactNode[];
}

export interface KanbanSwimlanesProps {
  header?: ReactNode;
  lanes: KanbanLane[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Multi-column workflow swimlane board with @container vertical collapse.
 * Import `@/styles/layouts/kanban-swimlanes.css` once in your app stylesheet.
 */
export function KanbanSwimlanes({
  header,
  lanes,
  className,
  style,
}: KanbanSwimlanesProps) {
  return (
    <div
      className={`lay-kanban-swimlanes ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-kanban-header">{header}</header>}
      <div className="lay-kanban-board">
        {lanes.map((lane) => (
          <section key={lane.id} className="lay-kanban-lane">
            <div className="lay-kanban-lane-head">
              <span>{lane.title}</span>
              <span className="lay-kanban-count">
                {lane.count ?? lane.cards.length}
              </span>
            </div>
            <div className="lay-kanban-cards">
              {lane.cards.map((card, idx) => (
                <div key={idx} className="lay-kanban-card">
                  {card}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
