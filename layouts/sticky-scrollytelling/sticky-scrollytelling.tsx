import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

export interface ScrollyStep {
  id: string;
  content: ReactNode;
}

export interface StickyScrollytellingProps {
  header?: ReactNode;
  steps: ScrollyStep[];
  renderStage: (activeIndex: number) => ReactNode;
  footer?: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  onStepChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Sticky visual/artifact stage paired with scrolling narrative steps.
 * Binds to `scrollContainerRef.current` when provided, falling back to viewport scroll standalone.
 * Import `@/styles/layouts/sticky-scrollytelling.css` once in your app stylesheet.
 */
export function StickyScrollytelling({
  header,
  steps,
  renderStage,
  footer,
  scrollContainerRef,
  onStepChange,
  className,
  style,
}: StickyScrollytellingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || steps.length === 0) return;
    const rootEl = scrollContainerRef?.current ?? null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.stepIndex);
            if (Number.isFinite(idx)) {
              setActiveIndex(idx);
              onStepChange?.(idx);
            }
          }
        }
      },
      {
        root: rootEl,
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [steps.length, scrollContainerRef, onStepChange]);

  const safeIndex = Math.min(activeIndex, Math.max(0, steps.length - 1));

  return (
    <div
      className={`lay-sticky-scrolly ${className ?? ""}`.trim()}
      style={style}
    >
      {header && <header className="lay-scrolly-header">{header}</header>}

      <div className="lay-scrolly-grid">
        <div className="lay-scrolly-steps">
          {steps.map((step, idx) => (
            <article
              key={step.id}
              ref={(el) => {
                stepRefs.current[idx] = el;
              }}
              data-step-index={idx}
              data-active={idx === safeIndex}
              className="lay-scrolly-step"
              onClick={() => {
                setActiveIndex(idx);
                onStepChange?.(idx);
              }}
            >
              {step.content}
            </article>
          ))}
        </div>

        <aside className="lay-scrolly-stage-col" aria-label="Interactive visual stage">
          <div className="lay-scrolly-stage-sticky">
            {renderStage(safeIndex)}
          </div>
        </aside>
      </div>

      {footer && <footer className="lay-scrolly-footer">{footer}</footer>}
    </div>
  );
}
