import { Provider } from "@common/instances/types";
import { DIScope } from "@common/hocs/types";

export const withGlobalInstances = (...providers: Provider[]): Provider[] => {
  return providers.map(item => ({ ...item, scope: DIScope.Global }))
}
