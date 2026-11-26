import type { ReactNode } from "react";
import { precisionSystemsSwatches } from "./precision-systems";
import { retroComputeSwatches } from "./retro-compute";
import { kineticRebelSwatches } from "./kinetic-rebel";
import { spatialPhysicsSwatches } from "./spatial-physics";
import { modernCraftSwatches } from "./modern-craft";
import { editorialWarmSwatches } from "./editorial-warm";

export const swatchRegistry: Record<string, () => ReactNode> = {
  ...precisionSystemsSwatches,
  ...retroComputeSwatches,
  ...kineticRebelSwatches,
  ...spatialPhysicsSwatches,
  ...modernCraftSwatches,
  ...editorialWarmSwatches,
};
