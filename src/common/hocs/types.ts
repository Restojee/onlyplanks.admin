import * as React from "react";
import { Constructor, InstanceKey } from "@common/utils/di/types";
import { Provider } from "@common/instances/types";

export interface Module<Props extends {} = {}> {
  create?(): void;
  destroy?(): void;
  getProps?(): Props
  
}

export interface ModuleLifeCycle {
  onCreate(): void;
  onDestroy(): void;
}

export enum DIScope {
  Local = 'Local',
  Global = 'Global'
}

export interface ModuleOptions<P> extends Partial<ModuleLifeCycle> {
  component: React.FunctionComponent<P>,
  key: InstanceKey,
  providers: Array<Provider>,
  scope?: DIScope
}
