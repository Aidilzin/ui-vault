import React from "react";

export interface LineShadowHeadingProps {
  text?: string;
  shadowColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LineShadowHeading({
  text = "SPECIMEN",
  shadowColor = "#38bdf8",
  className = "",
  style,
}: LineShadowHeadingProps) {
  return (
    <span
      className={`ui-vault-line-shadow ${className}`}
      data-text={text}
      style={
        {
          position: "relative",
          display: "inline-block",
          zIndex: 1,
          "--lsh-shadow": shadowColor,
          ...style,
        } as React.CSSProperties
      }
    >
      <style>{`
        @keyframes uiVaultLineShadowDrift {
          0% { background-position: 0 0; }
          100% { background-position: 100% -100%; }
        }
        .ui-vault-line-shadow::after {
          content: attr(data-text);
          position: absolute;
          left: 0.055em;
          top: 0.055em;
          z-index: -1;
          color: transparent;
          background-image: linear-gradient(
            45deg,
            transparent 44%,
            var(--lsh-shadow, currentColor) 44%,
            var(--lsh-shadow, currentColor) 56%,
            transparent 56%
          );
          background-size: 0.09em 0.09em;
          -webkit-background-clip: text;
          background-clip: text;
          animation: uiVaultLineShadowDrift 14s linear infinite;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .ui-vault-line-shadow::after {
            animation: none;
          }
        }
      `}</style>
      {text}
    </span>
  );
}
