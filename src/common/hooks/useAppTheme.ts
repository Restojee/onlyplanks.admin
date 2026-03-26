import { Theme } from "@common/themes/core/Theme";
import { useInjection } from "@common/hooks/useInjection";
import { ThemeInjectKey } from "@common/themes/common/constants";

const useTheme = () => {
  return useInjection<Theme>(ThemeInjectKey);
}

export default useTheme;
