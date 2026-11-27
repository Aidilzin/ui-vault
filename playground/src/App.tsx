import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TopCommandBar, type ActiveTab } from "./components/TopCommandBar";
import { AnimationsLab } from "./components/AnimationsLab";
import { StylesGallery } from "./components/StylesGallery";
import {
  FoundationsView,
  type FoundationsSubView,
} from "./components/FoundationsView";
import { RelationsExplorer } from "./components/RelationsExplorer";
import { MixLabsStudio } from "./components/MixLabsStudio";
import { ReferencesView } from "./components/ReferencesView";
import { CodeDrawer } from "./components/CodeDrawer";
import {
  getSystemReducedMotion,
  initReducedMotionSimulator,
  setSimulatedReducedMotion,
} from "./lib/reduced-motion";
import {
  animationNodes,
  getRelationStatus,
  nodeById,
  styleNodes,
  type AnimationNode,
  type HybridRecipe,
} from "./lib/vault-data";
import {
  readUrlState,
  resolveHybridToLabMix,
  syncUrlState,
  type LabState,
} from "./lib/lab-helpers";

interface ToastState {
  label: string;
  preview: string;
}

export function App() {
  const initialUrl = useRef(readUrlState());

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    () => initialUrl.current.tab ?? "animations"
  );
  const [foundationsSubView, setFoundationsSubView] =
    useState<FoundationsSubView>("textures");
  const [labState, setLabState] = useState<LabState>(
    () => initialUrl.current.lab
  );
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

  useEffect(() => {
    syncUrlState(activeTab, labState);
  }, [activeTab, labState]);

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
    } else if (node.kind === "animation") {
      setActiveStyleId(null);
      setActiveTab("animations");
      setFocusedAnimationId(node.id);
    } else if (node.kind === "texture") {
      setActiveStyleId(null);
      setFoundationsSubView("textures");
      setActiveTab("foundations");
    } else if (node.kind === "typography") {
      setActiveStyleId(null);
      setFoundationsSubView("typography");
      setActiveTab("foundations");
    } else if (node.kind === "layout") {
      setActiveStyleId(null);
      setFoundationsSubView("layouts");
      setActiveTab("foundations");
    } else if (node.kind === "telemetry") {
      setActiveStyleId(null);
      setFoundationsSubView("telemetry");
      setActiveTab("foundations");
    }
  }, []);

  const handleOpenNodeInLab = useCallback((nodeId: string) => {
    const node = nodeById.get(nodeId);
    if (!node) return;

    if (node.kind === "style") {
      const pairedAnims = animationNodes
        .filter((a) => getRelationStatus(node.id, a.id) === "pairs")
        .slice(0, 3)
        .map((a) => a.id);

      setLabState((prev) => ({
        ...prev,
        styleId: node.id,
        animationIds: pairedAnims.length > 0 ? pairedAnims : prev.animationIds,
        template:
          node.cluster === "06-editorial-warm" ? "editorial" : prev.template,
      }));
    } else if (node.kind === "animation") {
      const pairedStyle = styleNodes.find(
        (s) => getRelationStatus(node.id, s.id) === "pairs"
      );
      setLabState((prev) => ({
        ...prev,
        styleId: pairedStyle ? pairedStyle.id : prev.styleId,
        animationIds: [node.id],
        template:
          node.mechanic === "ai-agentic" ? "workbench" : prev.template,
      }));
    } else if (node.kind === "texture") {
      const firstPairedStyle = node.pairsWith.find(
        (id) => nodeById.get(id)?.kind === "style"
      );
      const pairedStyleNode = firstPairedStyle
        ? styleNodes.find((s) => s.id === firstPairedStyle)
        : styleNodes.find((s) => getRelationStatus(node.id, s.id) === "pairs");

      setLabState((prev) => ({
        ...prev,
        styleId: pairedStyleNode ? pairedStyleNode.id : prev.styleId,
        textureId: node.id,
        textureOpacity: node.defaultOpacity,
        template:
          pairedStyleNode?.cluster === "06-editorial-warm"
            ? "editorial"
            : prev.template,
      }));
    } else if (node.kind === "typography") {
      const firstPairedStyle = node.pairsWith.find(
        (id) => nodeById.get(id)?.kind === "style"
      );
      const pairedStyleNode = firstPairedStyle
        ? styleNodes.find((s) => s.id === firstPairedStyle)
        : styleNodes.find((s) => getRelationStatus(node.id, s.id) === "pairs");

      setLabState((prev) => ({
        ...prev,
        styleId: pairedStyleNode ? pairedStyleNode.id : prev.styleId,
        typographyId: node.id,
        template:
          pairedStyleNode?.cluster === "06-editorial-warm"
            ? "editorial"
            : prev.template,
      }));
    } else if (node.kind === "layout") {
      const firstPairedStyle = node.pairsWith.find(
        (id) => nodeById.get(id)?.kind === "style"
      );
      const pairedStyleNode = firstPairedStyle
        ? styleNodes.find((s) => s.id === firstPairedStyle)
        : styleNodes.find((s) => getRelationStatus(node.id, s.id) === "pairs");

      setLabState((prev) => ({
        ...prev,
        styleId: pairedStyleNode ? pairedStyleNode.id : prev.styleId,
        layoutId: node.id,
        template:
          node.id === "split-ai-ide"
            ? "workbench"
            : pairedStyleNode?.cluster === "06-editorial-warm"
              ? "editorial"
              : prev.template,
      }));
    } else if (node.kind === "telemetry") {
      const firstPairedStyle = node.pairsWith.find(
        (id) => nodeById.get(id)?.kind === "style"
      );
      const pairedStyleNode = firstPairedStyle
        ? styleNodes.find((s) => s.id === firstPairedStyle)
        : styleNodes.find((s) => getRelationStatus(node.id, s.id) === "pairs");

      setLabState((prev) => ({
        ...prev,
        styleId: pairedStyleNode ? pairedStyleNode.id : prev.styleId,
        telemetryIds: prev.telemetryIds.includes(node.id)
          ? prev.telemetryIds
          : [...prev.telemetryIds, node.id].slice(-3),
      }));
    }

    setActiveTab("labs");
  }, []);

  const handleOpenHybridInLab = useCallback((hybrid: HybridRecipe) => {
    const mix = resolveHybridToLabMix(hybrid);
    setLabState((prev) => ({
      ...prev,
      styleId: mix.styleId,
      layoutId: mix.layoutId,
      animationIds: mix.animationIds,
      textureId: mix.textureId,
      textureOpacity: mix.textureOpacity ?? prev.textureOpacity,
      typographyId: mix.typographyId,
      telemetryIds: mix.telemetryIds,
      template: mix.suggestedTemplate ?? prev.template,
    }));
    setActiveTab("labs");
  }, []);

  const isViewportLocked = activeTab === "relations" || activeTab === "labs";

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
        labAnimCount={labState.animationIds.length}
      />

      <main className="vault-main" data-locked={isViewportLocked}>
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

        {activeTab === "foundations" && (
          <FoundationsView
            subView={foundationsSubView}
            onSubViewChange={setFoundationsSubView}
            searchQuery={searchQuery}
            reducedMotion={reducedMotion}
            onCopy={handleCopy}
            onJumpToNode={handleJumpToNode}
            onOpenNodeInLab={handleOpenNodeInLab}
          />
        )}

        {activeTab === "relations" && (
          <RelationsExplorer
            searchQuery={searchQuery}
            onClearGlobalSearch={() => setSearchQuery("")}
            onCopy={handleCopy}
            onJumpToNode={handleJumpToNode}
            onOpenNodeInLab={handleOpenNodeInLab}
            onOpenHybridInLab={handleOpenHybridInLab}
          />
        )}

        {activeTab === "labs" && (
          <MixLabsStudio
            labState={labState}
            onUpdateLabState={setLabState}
            motionEpoch={motionEpoch}
            reducedMotion={reducedMotion}
            onCopy={handleCopy}
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
