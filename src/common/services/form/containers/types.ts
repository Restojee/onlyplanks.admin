import React from 'react';



 
export interface ContainerComponentConfig<TViewModel = any, TProps extends {} = {}> {
  key: string;
  Component: React.ComponentType<any>;
  props?: TProps;
  viewModelClass?: new (...args: any[]) => TViewModel;
}