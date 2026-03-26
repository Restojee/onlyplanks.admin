import { inject } from "inversify";
import {
  NavigationDataAccessInjectKey,
  NavigationItemCategoryMeta,
  NavigationSelectorsInjectKey,
} from "@/modules/navigation/common/constants";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import { Section } from "@/modules/navigation/view/Section";
import { CollectionProps } from "@ui/Collection/types";
import Computed from "@common/hocs/withView/decorators/Computed";
import { ViewModel } from "@common/hocs/withView";
import { Theme } from "@common/themes/core/Theme";
import { ThemeInjectKey } from "@common/themes/common/constants";
import { NavigationSelectors } from "@/modules/navigation/model/NavigationSelectors";

class NavigationPanelViewModel extends ViewModel<{}> {

  constructor(
    @inject(NavigationSelectorsInjectKey)
    private readonly navigationDataAccess: NavigationSelectors,

    @inject(ThemeInjectKey)
    public theme: Theme
  ) {
    super();
    console.log(theme.get())
  }

  @Computed()
  public get getNavigationItemsProps(): CollectionProps["data"] {
    return {
      itemKey: NavigationItemCategoryMeta.Title,
      items: this.navigationDataAccess.getNavigationItems,
      Component: Section
    }
  }
}

export default NavigationPanelViewModel;
