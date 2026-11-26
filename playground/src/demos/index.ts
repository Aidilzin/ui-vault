import { cursorReactiveDemos } from "./cursor-reactive";
import { textKineticDemos } from "./text-kinetic";
import { layoutMorphDemos } from "./layout-morph";
import { shaderCanvasDemos } from "./shader-canvas";
import { physicsOpticsDemos } from "./physics-optics";
import { scrollDrivenDemos } from "./scroll-driven";
import { microFeedbackDemos } from "./micro-feedback";
import type { DemoMap } from "./types";

export const animationDemoRegistry: DemoMap = {
  ...cursorReactiveDemos,
  ...textKineticDemos,
  ...layoutMorphDemos,
  ...shaderCanvasDemos,
  ...physicsOpticsDemos,
  ...scrollDrivenDemos,
  ...microFeedbackDemos,
};
