import defaultTheme from '../../../resources/theme.json';
import { ThemePaddingSizesMap } from "@ui/Layout/ui/Flex/common/types";
import { ThemeSizes, ThemeSizeValue } from "@common/themes/common/types";
import { calcSize, getBorderRadius, getPaddingStyles } from "@common/themes/common/utils";
import { injectable } from "inversify";

@injectable()
export class Theme {

  get() {
    return defaultTheme;
  }
  getPadding(paddingSizesMap: ThemePaddingSizesMap) {
    return getPaddingStyles(this.getLayoutSpaceMap(), paddingSizesMap)
  }
  getBorderRadius(sizes: ThemeSizes) {
    return getBorderRadius(this.getBorderRadiusMap(), sizes)
  }
  getLayoutSpaceMap() {
    return this.get().layout.space;
  }
  getBorderRadiusMap() {
    return this.get().layout.border.radius
  }
  getCalculatedSize(size: ThemeSizeValue) {
    return calcSize(size);
  }
}
