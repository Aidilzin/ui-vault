import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyStageProps {
  children: ReactNode;
  minHeight?: number;
}

export function LazyStage({ children, minHeight = 200 }: LazyStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "160px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="anim-stage" style={{ minHeight }}>
      {visible ? (
        children
      ) : (
        <span className="fui-mono-label" style={{ opacity: 0.55 }}>
          STAGE STANDBY // SCROLL INTO VIEW
        </span>
      )}
    </div>
  );
}
