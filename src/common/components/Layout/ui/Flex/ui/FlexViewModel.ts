import { inject } from "inversify";
import { Theme } from "@common/themes/core/Theme";
import { ThemeInjectKey } from "@common/themes/common/constants";

class FlexViewModel {

  constructor(@inject(ThemeInjectKey) public theme: Theme) {}

}

export default FlexViewModel;
