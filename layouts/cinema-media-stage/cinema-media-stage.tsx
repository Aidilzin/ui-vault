import type { CSSProperties, ReactNode } from "react";

export interface CinemaMediaStageProps {
  topBar?: ReactNode;
  stage: ReactNode;
  captionRail?: ReactNode;
  utilityDock?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Widescreen visual showcase stage with floating bottom utility bar and caption rail.
 * Import `@/styles/layouts/cinema-media-stage.css` once in your app stylesheet.
 */
export function CinemaMediaStage({
  topBar,
  stage,
  captionRail,
  utilityDock,
  className,
  style,
}: CinemaMediaStageProps) {
  return (
    <div
      className={`lay-cinema-stage ${className ?? ""}`.trim()}
      style={style}
    >
      {topBar && <header className="lay-cinema-top">{topBar}</header>}
      <div className="lay-cinema-viewport">
        <div className="lay-cinema-canvas">{stage}</div>
        {utilityDock && <div className="lay-cinema-dock">{utilityDock}</div>}
      </div>
      {captionRail && <footer className="lay-cinema-caption">{captionRail}</footer>}
    </div>
  );
}
