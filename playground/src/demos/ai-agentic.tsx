import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { StreamingTokenText } from "@vault/animations/ai-agentic/streaming-token-text";
import { ReasoningTrace } from "@vault/animations/ai-agentic/reasoning-trace";
import { ToolCallStep } from "@vault/animations/ai-agentic/tool-call-step";
import { AgentApprovalCard } from "@vault/animations/ai-agentic/agent-approval-card";
import { InlineCodeDiff } from "@vault/animations/ai-agentic/inline-code-diff";
import { SlashPromptComposer } from "@vault/animations/ai-agentic/slash-prompt-composer";
import { ChainOfThoughtRail } from "@vault/animations/ai-agentic/chain-of-thought-rail";
import type { DemoMap, DemoProps } from "./types";

function StreamingTokenTextDemo({ motionEpoch }: DemoProps) {
  const [replay, setReplay] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <StreamingTokenText key={`${replay}-${motionEpoch}`} />
      <button type="button" className="btn-fui" onClick={() => setReplay((k) => k + 1)}>
        <RotateCcw size={11} />
        <span>Replay Stream</span>
      </button>
    </div>
  );
}

function ReasoningTraceDemo({ motionEpoch }: DemoProps) {
  const [replay, setReplay] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
      <ReasoningTrace key={`${replay}-${motionEpoch}`} />
      <button type="button" className="btn-fui" onClick={() => setReplay((k) => k + 1)}>
        <RotateCcw size={11} />
        <span>Replay Reasoning</span>
      </button>
    </div>
  );
}

export const aiAgenticDemos: DemoMap = {
  "streaming-token-text": StreamingTokenTextDemo,
  "reasoning-trace": ReasoningTraceDemo,
  "tool-call-step": () => <ToolCallStep />,
  "agent-approval-card": () => <AgentApprovalCard />,
  "inline-code-diff": () => <InlineCodeDiff />,
  "slash-prompt-composer": () => <SlashPromptComposer />,
  "chain-of-thought-rail": () => <ChainOfThoughtRail />,
};
