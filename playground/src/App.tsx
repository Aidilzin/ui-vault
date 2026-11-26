import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TopCommandBar, type ActiveTab } from "./components/TopCommandBar";
import { AnimationsLab } from "./components/AnimationsLab";
import { StylesGallery } from "./components/StylesGallery";
import { RelationsExplorer } from "./components/RelationsExplorer";
import { ReferencesView } from "./components/ReferencesView";
import { CodeDrawer } from "./components/CodeDrawer";
import {
  getSystemReducedMotion,
  initReducedMotionSimulator,
  setSimulatedReducedMotion,
} from "./lib/reduced-motion";
import { nodeById, type AnimationNode } from "./lib/vault-data";

interface ToastState {
  label: string;
  preview: string;
}

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("animations");
  const [searchQuery, setSearchQuery] = useState("");
  const [reducedMotion, setReducedMotion] = useState<boolean>(() =>
    getSystemReducedMotion()
  );
  const [motionEpoch, setMotionEpoch] = useState(0);

  const [codeDrawerAnim, setCodeDrawerAnim] = useState<AnimationNode | null>(null);
  const [activeStyleId, setActiveStyleId] = useState<string | null>(null);
  const [focusedAnimationId, setFocusedAnimationId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    initReducedMotionSimulator();
  }, []);

  const handleToggleReducedMotion = useCallback(() => {
    setReducedMotion((prev) => {
      const next = !prev;
      setSimulatedReducedMotion(next);
      setMotionEpoch((e) => e + 1);
      return next;
    });
  }, []);

  const handleCopy = useCallback((text: string, label: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    const singleLine = text.replace(/\s+/g, " ").trim();
    setToast({ label, preview: singleLine });
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2800);
  }, []);

  const handleJumpToNode = useCallback((nodeId: string) => {
    const node = nodeById.get(nodeId);
    if (!node) return;
    setSearchQuery("");
    if (node.kind === "style") {
      setActiveTab("styles");
      setActiveStyleId(node.id);
    } else {
      setActiveStyleId(null);
      setActiveTab("animations");
      setFocusedAnimationId(node.id);
    }
  }, []);

  return (
    <>
      <TopCommandBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== "animations") setFocusedAnimationId(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      <main className="vault-main">
        {activeTab === "animations" && (
          <AnimationsLab
            searchQuery={searchQuery}
            motionEpoch={motionEpoch}
            reducedMotion={reducedMotion}
            focusedAnimationId={focusedAnimationId}
            onClearFocus={() => setFocusedAnimationId(null)}
            onCopy={handleCopy}
            onInspectCode={setCodeDrawerAnim}
            onJumpToNode={handleJumpToNode}
          />
        )}

        {activeTab === "styles" && (
          <StylesGallery
            searchQuery={searchQuery}
            activeStyleId={activeStyleId}
            onSelectStyle={setActiveStyleId}
            onCopy={handleCopy}
            onJumpToNode={handleJumpToNode}
          />
        )}

        {activeTab === "relations" && (
          <RelationsExplorer
            searchQuery={searchQuery}
            onCopy={handleCopy}
            onJumpToNode={handleJumpToNode}
          />
        )}

        {activeTab === "references" && (
          <ReferencesView searchQuery={searchQuery} onCopy={handleCopy} />
        )}
      </main>

      <CodeDrawer
        animation={codeDrawerAnim}
        onClose={() => setCodeDrawerAnim(null)}
        onCopy={handleCopy}
      />

      {toast && (
        <div className="toast-container" role="status" aria-live="polite">
          <CheckCircle2 size={15} color="#34d399" style={{ flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--fui-signal-ok)",
              }}
            >
              {toast.label}
            </div>
            <div className="toast-cmd">{toast.preview}</div>
          </div>
        </div>
      )}
    </>
  );
}
