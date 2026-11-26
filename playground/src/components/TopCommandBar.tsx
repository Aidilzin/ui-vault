import { useEffect, useRef } from "react";
import {
  Activity,
  BookOpen,
  GitFork,
  Layers,
  PauseCircle,
  PlayCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { animationNodes, styleNodes, vaultRelations } from "../lib/vault-data";

export type ActiveTab = "animations" | "styles" | "relations" | "references";

interface TopCommandBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export function TopCommandBar({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  reducedMotion,
  onToggleReducedMotion,
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
            <span>Animations</span>
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
            data-active={activeTab === "relations"}
            onClick={() => onTabChange("relations")}
          >
            <GitFork size={13} />
            <span>Relations &amp; Hybrids</span>
          </button>

          <button
            type="button"
            className="cmd-tab"
            data-active={activeTab === "references"}
            onClick={() => onTabChange("references")}
          >
            <BookOpen size={13} />
            <span>References</span>
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
              placeholder="Filter name, cluster, engine..."
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
            <span>{reducedMotion ? "Reduced Motion: ON" : "Motion: Full"}</span>
          </button>

          <span className="badge badge-emerald" title="Synced directly with parent vault">
            <Activity size={11} />
            <span>LIVE</span>
          </span>
        </div>
      </div>
    </header>
  );
}
