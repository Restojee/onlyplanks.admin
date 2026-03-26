import Palette from "@common/themes/core/Pallete";
import { Instances } from "@common/instances/Instances";
import { PaletteInjectKey } from "@common/themes/common/constants";
import { useInjection } from "@common/hooks/useInjection";

export const useAppPalette = () => {
  return useInjection<Palette>(PaletteInjectKey);
}
