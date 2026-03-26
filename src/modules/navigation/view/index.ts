import withModule from "@common/hocs/withModule";
import NavigationContainer from "@/modules/navigation/view/NavigationContainer/NavigationContainer";
import { NavigationDataAccess } from "@/modules/navigation/model/NavigationDataAccess";
import {
  NavigationActionsInjectKey,
  NavigationDataAccessInjectKey,
  NavigationSelectorsInjectKey,
} from "@/modules/navigation/common/constants";
import { NavigationSelectors } from "@/modules/navigation/model/NavigationSelectors";
import { NavigationActions } from "@/modules/navigation/model/NavigationActions";

export default withModule({
  key: 'NavigationModule',
  component: NavigationContainer,
  providers: [
    {
      key: NavigationDataAccessInjectKey,
      provide: NavigationDataAccess,
    },
    {
      key: NavigationSelectorsInjectKey,
      provide: NavigationSelectors,
    },
    {
      key: NavigationActionsInjectKey,
      provide: NavigationActions,
    },
  ]
});
