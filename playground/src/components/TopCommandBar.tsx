import { useEffect, useRef } from "react";
import {
  Activity,
  BookOpen,
  FlaskConical,
  GitFork,
  Grid2x2,
  Layers,
  PauseCircle,
  PlayCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  animationNodes,
  layoutNodes,
  styleNodes,
  telemetryNodes,
  textureNodes,
  typographyNodes,
  vaultRelations,
} from "../lib/vault-data";
import { MAX_LAB_ANIMATIONS } from "../lib/lab-helpers";

export type ActiveTab =
  | "animations"
  | "styles"
  | "foundations"
  | "relations"
  | "labs"
  | "references";

interface TopCommandBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  labAnimCount: number;
}

export function TopCommandBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  reducedMotion,
  onToggleReducedMotion,
  labAnimCount,
}: TopCommandBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === inputRef.current) {
        if (searchQuery) {
          onSearchChange("");
        } else {
          inputRef.current?.blur();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchQuery, onSearchChange]);

  const isLocalFilterTab = activeTab === "labs" || activeTab === "relations";
  const foundationsCount =
    textureNodes.length +
    typographyNodes.length +
    layoutNodes.length +
    telemetryNodes.length;

  return (
    <header className="cmd-header">
      <div className="cmd-header-inner">
        <div className="cmd-brand">
          <div className="cmd-brand-mark" aria-hidden="true">
            UV
          </div>
          <span className="cmd-brand-title">UI Vault</span>
          <span className="cmd-brand-version">v{vaultRelations.version}</span>
        </div>

        <nav className="cmd-tabs" aria-label="Vault sections">
          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "animations"}
            onClick={() => onTabChange("animations")}
          >
            <Sparkles size={13} />
            <span className="cmd-tab-label-full">Animations</span>
            <span className="cmd-tab-label-short">Anims</span>
            <span className="cmd-tab-count">{animationNodes.length}</span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "styles"}
            onClick={() => onTabChange("styles")}
          >
            <Layers size={13} />
            <span>Styles</span>
            <span className="cmd-tab-count">{styleNodes.length}</span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "foundations"}
            onClick={() => onTabChange("foundations")}
          >
            <Grid2x2 size={13} />
            <span className="cmd-tab-label-full">Foundations</span>
            <span className="cmd-tab-label-short">Found.</span>
            <span className="cmd-tab-count">{foundationsCount}</span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "relations"}
            onClick={() => onTabChange("relations")}
          >
            <GitFork size={13} />
            <span className="cmd-tab-label-full">Relations &amp; Hybrids</span>
            <span className="cmd-tab-label-short">Relations</span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "labs"}
            onClick={() => onTabChange("labs")}
          >
            <FlaskConical size={13} />
            <span>Labs</span>
            <span className="cmd-tab-count">
              {labAnimCount}/{MAX_LAB_ANIMATIONS}
            </span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "references"}
            onClick={() => onTabChange("references")}
          >
            <BookOpen size={13} />
            <span className="cmd-tab-label-full">References</span>
            <span className="cmd-tab-label-short">Refs</span>
          </button>
        </nav>

        <div className="cmd-controls">
          <div className="cmd-search-wrap">
            <Search size={13} className="cmd-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="cmd-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                isLocalFilterTab
                  ? "Use local filters in view..."
                  : "Filter name, cluster, engine..."
              }
              aria-label="Filter vault items"
            />
            {searchQuery ? (
              <button
                type="button"
                className="cmd-search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <X size={12} />
              </button>
            ) : (
              <span className="cmd-search-kbd" aria-hidden="true">
                /
              </span>
            )}
          </div>

          <button
            type="button"
            className="cmd-motion-btn"
            data-active={reducedMotion}
            onClick={onToggleReducedMotion}
            title="Simulate prefers-reduced-motion: reduce"
          >
            {reducedMotion ? <PauseCircle size={13} /> : <PlayCircle size={13} />}
            <span className="cmd-motion-label-full">
              {reducedMotion ? "Reduced Motion: ON" : "Motion: Full"}
            </span>
            <span className="cmd-motion-label-short">
              {reducedMotion ? "RM: ON" : "Motion"}
            </span>
          </button>

          <span className="badge badge-emerald cmd-live-badge" title="Synced directly with parent vault">
            <Activity size={11} />
            <span>LIVE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
