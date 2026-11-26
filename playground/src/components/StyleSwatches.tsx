import { TokenSwatch } from "./TokenSwatch";
import { swatchRegistry } from "../swatches";

interface StyleSwatchProps {
  styleId: string;
}

export function StyleSwatch({ styleId }: StyleSwatchProps) {
  const renderSwatch = swatchRegistry[styleId];
  if (renderSwatch) {
    return <>{renderSwatch()}</>;
  }
  return <TokenSwatch styleId={styleId} />;
}
