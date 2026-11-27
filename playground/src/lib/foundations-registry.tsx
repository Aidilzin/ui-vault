import type { CSSProperties, ReactNode } from "react";
import { BentoShowcase } from "@vault/layouts/bento-showcase/bento-showcase";
import { TriageWorkbench } from "@vault/layouts/triage-workbench/triage-workbench";
import { SwissEditorialGrid } from "@vault/layouts/swiss-editorial-grid/swiss-editorial-grid";
import { SplitAiIde } from "@vault/layouts/split-ai-ide/split-ai-ide";
import { StickyScrollytelling } from "@vault/layouts/sticky-scrollytelling/sticky-scrollytelling";
import { FloatingOsDesktop } from "@vault/layouts/floating-os-desktop/floating-os-desktop";
import { CommandHudDashboard } from "@vault/layouts/command-hud-dashboard/command-hud-dashboard";
import { MasonryArchive } from "@vault/layouts/masonry-archive/masonry-archive";

import { InlineSparkline } from "@vault/telemetry/inline-sparkline";
import { UptimeStrip, type UptimeSegment, type UptimeStatus } from "@vault/telemetry/uptime-strip";
import { ActivityHeatmap } from "@vault/telemetry/activity-heatmap";
import { LatencyHistogram, type LatencyBucket } from "@vault/telemetry/latency-histogram";
import { RadialStepGauge } from "@vault/telemetry/radial-step-gauge";
import { LedStatusMatrix, type LedCell, type LedState } from "@vault/telemetry/led-status-matrix";
import { LiveOscilloscope } from "@vault/telemetry/live-oscilloscope";
import { SegmentedQuotaBar, type QuotaSegment } from "@vault/telemetry/segmented-quota-bar";
import { DiffDeltaPill } from "@vault/telemetry/diff-delta-pill";
import { NodeTopologyMini, type TopologyHop } from "@vault/telemetry/node-topology-mini";

const WIRE_BLOCK: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9.5,
  color: "var(--fui-ink-muted)",
  letterSpacing: "0.05em",
};

function WirePill({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 6px",
        borderRadius: 2,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        border: `1px solid ${accent ? "rgba(56,189,248,0.45)" : "var(--fui-border)"}`,
        background: accent ? "rgba(56,189,248,0.12)" : "var(--fui-canvas)",
        color: accent ? "var(--fui-signal-active)" : "var(--fui-ink-muted)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Renders the actual `@vault/layouts/<id>` shell with crisp wireframe content
 * so Foundations → Layouts previews genuine `@container` reflow live.
 */
export function renderLayoutMiniPreview(layoutId: string): ReactNode {
  const miniVars = {
    "--lay-canvas": "var(--fui-canvas)",
    "--lay-surface": "var(--fui-surface)",
    "--lay-elevated": "var(--fui-elevated)",
    "--lay-border": "var(--fui-border-strong)",
    "--lay-border-strong": "rgba(56,189,248,0.4)",
    "--lay-radius": "3px",
    "--lay-gap": "8px",
    "--lay-pad": "10px",
    "--lay-height": "auto",
  } as CSSProperties;

  switch (layoutId) {
    case "bento-showcase":
      return (
        <BentoShowcase
          style={miniVars}
          header={<span style={WIRE_BLOCK}>HEADER // NAV</span>}
          hero={
            <div>
              <WirePill accent>HERO (8 COL)</WirePill>
              <div style={{ ...WIRE_BLOCK, marginTop: 6, color: "var(--fui-ink)" }}>
                Modular Feature Spotlight
              </div>
            </div>
          }
          metricColumn={
            <div>
              <WirePill>METRIC (4 COL)</WirePill>
              <div style={{ ...WIRE_BLOCK, marginTop: 6, color: "var(--fui-signal-ok)" }}>
                99.98%
              </div>
            </div>
          }
          tiles={[
            <span key="a" style={WIRE_BLOCK}>TILE 01</span>,
            <span key="b" style={WIRE_BLOCK}>TILE 02</span>,
            <span key="c" style={WIRE_BLOCK}>TILE 03</span>,
          ]}
        />
      );

    case "triage-workbench":
      return (
        <TriageWorkbench
          style={miniVars}
          header={<span style={WIRE_BLOCK}>TRIAGE // INBOX (12)</span>}
          navRail={
            <>
              <WirePill accent>Inbox</WirePill>
              <WirePill>Active</WirePill>
              <WirePill>Backlog</WirePill>
            </>
          }
          queuePane={
            <>
              <div style={{ ...WIRE_BLOCK, color: "var(--fui-ink)" }}>#408 Token Audit</div>
              <div style={WIRE_BLOCK}>#409 Grid Reflow</div>
              <div style={WIRE_BLOCK}>#410 CDP Gate</div>
            </>
          }
          inspectorPane={
            <div>
              <WirePill accent>INSPECTOR</WirePill>
              <div style={{ ...WIRE_BLOCK, marginTop: 6 }}>
                Diff summary, assignees &amp; telemetry.
              </div>
            </div>
          }
        />
      );

    case "swiss-editorial-grid":
      return (
        <SwissEditorialGrid
          style={miniVars}
          masthead={<span style={WIRE_BLOCK}>FORMA // ISSUE 09</span>}
          indexRail={
            <>
              <WirePill accent>01 GRID</WirePill>
              <WirePill>02 TYPE</WirePill>
              <WirePill>03 PRINT</WirePill>
            </>
          }
          hero={
            <div style={{ ...WIRE_BLOCK, color: "var(--fui-ink)", fontSize: 12, fontWeight: 700 }}>
              12-Column Hairline Grid
            </div>
          }
          body={<div style={WIRE_BLOCK}>Exposed 1px rules · sticky index rail · stark space</div>}
        />
      );

    case "split-ai-ide":
      return (
        <SplitAiIde
          style={miniVars}
          header={<span style={WIRE_BLOCK}>AGENT IDE // RUN #408</span>}
          sessionRail={
            <>
              <WirePill accent>Run #408</WirePill>
              <WirePill>Run #407</WirePill>
            </>
          }
          stream={<div style={WIRE_BLOCK}>Reasoning trace &amp; tool calls...</div>}
          composer={<WirePill accent>/plan refactor...</WirePill>}
          artifactPane={<div style={WIRE_BLOCK}>DIFF +142 / -18</div>}
        />
      );

    case "sticky-scrollytelling":
      return (
        <StickyScrollytelling
          style={miniVars}
          steps={[
            { id: "s1", content: <span style={WIRE_BLOCK}>01 // Architecture</span> },
            { id: "s2", content: <span style={WIRE_BLOCK}>02 // Tokens</span> },
          ]}
          renderStage={(idx) => (
            <div>
              <WirePill accent>STICKY STAGE #{idx + 1}</WirePill>
              <div style={{ ...WIRE_BLOCK, marginTop: 6 }}>Interactive visual artifact</div>
            </div>
          )}
        />
      );

    case "floating-os-desktop":
      return (
        <FloatingOsDesktop
          style={miniVars}
          menuBar={<span style={WIRE_BLOCK}>SYSTEM // 12:00</span>}
          primaryTitle="CANVAS.APP"
          primaryWindow={<span style={WIRE_BLOCK}>Primary spatial window</span>}
          secondaryTitle="STATS.SYS"
          secondaryWindow={<span style={WIRE_BLOCK}>Secondary inspector</span>}
          dock={
            <>
              <WirePill accent>App</WirePill>
              <WirePill>Logs</WirePill>
              <WirePill>Term</WirePill>
            </>
          }
        />
      );

    case "command-hud-dashboard":
      return (
        <CommandHudDashboard
          style={miniVars}
          ticker={<span style={WIRE_BLOCK}>TICKER // NOMINAL · 14.2ms</span>}
          quadrants={[
            { id: "q1", label: "SIGNAL", content: <span style={WIRE_BLOCK}>Waveform</span> },
            { id: "q2", label: "UPTIME", content: <span style={WIRE_BLOCK}>99.98%</span> },
            { id: "q3", label: "NODES", content: <span style={WIRE_BLOCK}>31/32 OK</span> },
            { id: "q4", label: "LATENCY", content: <span style={WIRE_BLOCK}>p99 48ms</span> },
          ]}
          eventRail={<span style={WIRE_BLOCK}>EVENT RAIL // 0 FAULTS</span>}
        />
      );

    case "masonry-archive":
      return (
        <MasonryArchive
          style={miniVars}
          filterBar={
            <div style={{ display: "flex", gap: 4 }}>
              <WirePill accent>All</WirePill>
              <WirePill>Print</WirePill>
              <WirePill>Web</WirePill>
            </div>
          }
          items={[
            <div key="1" style={{ ...WIRE_BLOCK, minHeight: 28 }}>ITEM 01</div>,
            <div key="2" style={{ ...WIRE_BLOCK, minHeight: 44 }}>ITEM 02</div>,
            <div key="3" style={{ ...WIRE_BLOCK, minHeight: 24 }}>ITEM 03</div>,
          ]}
          detailRail={<span style={WIRE_BLOCK}>DETAIL RAIL</span>}
        />
      );

    default:
      return null;
  }
}

function seededNoise(seed: number, idx: number): number {
  const x = Math.sin((seed + 1) * 97.3 + (idx + 1) * 31.7) * 10000;
  return x - Math.floor(x);
}

/**
 * Renders the actual `@vault/telemetry/<id>.tsx` primitive with deterministic seed-driven
 * sample data so clicking `Simulate Live Data` updates every widget smoothly.
 */
export function renderTelemetryWidget(
  telemetryId: string,
  options: { seed: number; reducedMotion: boolean }
): ReactNode {
  const { seed, reducedMotion } = options;

  switch (telemetryId) {
    case "inline-sparkline": {
      const data = Array.from({ length: 15 }, (_, i) =>
        Number((18 + i * 1.9 + seededNoise(seed, i) * 14).toFixed(1))
      );
      return <InlineSparkline data={data} label="REQ/SEC" unit="k" />;
    }

    case "uptime-strip": {
      const faultIdx = seed === 0 ? 19 : Math.floor(seededNoise(seed, 1) * 54);
      const degIdx = (faultIdx + 17) % 60;
      const segments: UptimeSegment[] = Array.from({ length: 60 }, (_, idx) => {
        const status: UptimeStatus =
          idx === faultIdx ? "outage" : idx === degIdx ? "degraded" : "operational";
        return {
          label: idx === 59 ? "Today" : `${60 - idx}d ago`,
          status,
          uptimePct: status === "outage" ? 96.4 : status === "degraded" ? 99.1 : 100,
        };
      });
      return <UptimeStrip segments={segments} serviceName="EDGE API" />;
    }

    case "activity-heatmap": {
      const values = Array.from({ length: 56 }, (_, i) =>
        Math.floor(seededNoise(seed, i) * 5)
      );
      return <ActivityHeatmap values={values} label="DEPLOY CADENCE" />;
    }

    case "latency-histogram": {
      const ranges = ["4ms", "8ms", "12ms", "16ms", "20ms", "28ms", "36ms", "48ms", "64ms", "96ms"];
      const base = [14, 38, 64, 52, 31, 19, 12, 7, 4, 2];
      const buckets: LatencyBucket[] = ranges.map((rangeMs, i) => ({
        rangeMs,
        count: Math.max(2, Math.round(base[i] * (0.7 + seededNoise(seed, i) * 0.65))),
        percentile: i === 2 ? "p50" : i === 6 ? "p95" : i === 8 ? "p99" : undefined,
      }));
      return <LatencyHistogram buckets={buckets} label="EDGE LATENCY" />;
    }

    case "radial-step-gauge": {
      const val = seed === 0 ? 74 : Math.round(35 + seededNoise(seed, 3) * 58);
      return <RadialStepGauge value={val} label="GPU LOAD" unit="%" />;
    }

    case "led-status-matrix": {
      const pool: LedState[] = ["active", "active", "busy", "active", "idle", "warn", "active", "busy"];
      const faultPos = seed === 0 ? 19 : Math.floor(seededNoise(seed, 5) * 32);
      const cells: LedCell[] = Array.from({ length: 32 }, (_, idx) => {
        const state: LedState =
          idx === faultPos ? "fault" : pool[(idx + seed) % pool.length];
        return {
          id: `POD-${String(idx + 1).padStart(2, "0")}`,
          state,
          load: state === "fault" ? "ERR" : state === "idle" ? "2%" : `${24 + ((idx * 11 + seed * 7) % 68)}%`,
        };
      });
      return <LedStatusMatrix cells={cells} reducedMotion={reducedMotion} />;
    }

    case "live-oscilloscope": {
      const freq = 2.0 + seededNoise(seed, 2) * 1.6;
      const amp = 0.55 + seededNoise(seed, 4) * 0.35;
      return (
        <LiveOscilloscope
          frequency={freq}
          amplitude={amp}
          reducedMotion={reducedMotion}
        />
      );
    }

    case "segmented-quota-bar": {
      const prompt = Math.round(30 + seededNoise(seed, 1) * 24);
      const context = Math.round(20 + seededNoise(seed, 2) * 20);
      const tools = Math.round(10 + seededNoise(seed, 3) * 16);
      const headroom = Math.max(8, 100 - prompt - context - tools);
      const segments: QuotaSegment[] = [
        { id: "prompt", label: "Prompt", value: prompt, tone: "accent" },
        { id: "context", label: "Context", value: context, tone: "ok" },
        { id: "tools", label: "Tools", value: tools, tone: "warn" },
        { id: "free", label: "Headroom", value: headroom, tone: "muted" },
      ];
      return <SegmentedQuotaBar segments={segments} />;
    }

    case "diff-delta-pill": {
      const positive = seed % 2 === 0;
      const mag = (8.4 + seededNoise(seed, 9) * 12).toFixed(1);
      return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <DiffDeltaPill
            delta={positive ? `+${mag}%` : `-${mag}%`}
            label="THROUGHPUT"
            polarity={positive ? "positive" : "negative"}
            direction={positive ? "up" : "down"}
          />
          <DiffDeltaPill
            delta={`-${(1.8 + seededNoise(seed, 7) * 3.5).toFixed(1)}ms`}
            label="P99 LATENCY"
            polarity="positive"
            direction="down"
          />
        </div>
      );
    }

    case "node-topology-mini": {
      const hops: TopologyHop[] = [
        { id: "edge", label: "EDGE", status: "ok", latencyMs: 3 + Math.floor(seededNoise(seed, 1) * 4) },
        { id: "router", label: "ROUTER", status: "ok", latencyMs: 5 + Math.floor(seededNoise(seed, 2) * 6) },
        {
          id: "agent",
          label: "AGENT",
          status: seed % 3 === 1 ? "ok" : "warn",
          latencyMs: 11 + Math.floor(seededNoise(seed, 3) * 9),
        },
        { id: "store", label: "STORE", status: "ok", latencyMs: 2 + Math.floor(seededNoise(seed, 4) * 4) },
      ];
      return <NodeTopologyMini hops={hops} reducedMotion={reducedMotion} />;
    }

    default:
      return null;
  }
}
