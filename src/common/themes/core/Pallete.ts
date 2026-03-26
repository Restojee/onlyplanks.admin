import { ThemeColorKey } from '@common/themes/common/types';
import { Theme } from "@common/themes/core/Theme";
import { inject, injectable } from "inversify";
import { ThemeInjectKey } from "@common/themes/common/constants";

@injectable()
class Palette {

  constructor(
    @inject(ThemeInjectKey) public readonly theme: Theme
  ) {
    return this;
  }

  public getColor = (colorKey?: ThemeColorKey) => {
    return this.theme.get().palette.colors[colorKey]
  }
}

export default Palette;
