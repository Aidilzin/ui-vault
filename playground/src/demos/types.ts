import type { ComponentType } from "react";

export interface DemoProps {
  motionEpoch: number;
}

export type DemoMap = Record<string, ComponentType<DemoProps>>;
