import { useState, type CSSProperties, type ReactNode } from "react";

export interface EditorialIndexItem {
  id: string;
  index: string;
  title: string;
  meta: string;
  preview: ReactNode;
}

export interface EditorialIndexPreviewProps {
  header?: ReactNode;
  items: EditorialIndexItem[];
  className?: string;
  style?: CSSProperties;
}

/**
 * Stark hairline typographic index rows paired with a live hover-preview specimen stage.
 * Import `@/styles/layouts/editorial-index-preview.css` once in your app stylesheet.
 */
export function EditorialIndexPreview({
  header,
  items,
  className,
  style,
}: EditorialIndexPreviewProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const activeItem = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div
      className={`lay-editorial-index ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-ei-header">{header}</header>}
      <div className="lay-ei-body">
        <div className="lay-ei-list" role="list">
          {items.map((item) => {
            const isActive = item.id === activeItem?.id;
            return (
              <button
                key={item.id}
                type="button"
                className="lay-ei-row"
                data-active={isActive}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
              >
                <span className="lay-ei-idx">{item.index}</span>
                <span className="lay-ei-title">{item.title}</span>
                <span className="lay-ei-meta">{item.meta}</span>
              </button>
            );
          })}
        </div>
        <aside className="lay-ei-stage">
          {activeItem?.preview ?? null}
        </aside>
      </div>
    </div>
  );
}
