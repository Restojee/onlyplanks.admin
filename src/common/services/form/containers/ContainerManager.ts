import { makeObservable, observable, action } from 'mobx';
import { ContainerComponentConfig } from './types';



 
export class ContainerPropsManager<TProps = any> {
  public props: TProps;
  private changeCallbacks: Array<(props: TProps) => void> = [];

  constructor(initialProps: TProps) {
    this.props = initialProps;
    makeObservable(this, {
      props: observable,
      updateProps: action
    });
  }

  public getProps(): TProps {
    return this.props;
  }

  public updateProps(newProps: Partial<TProps>): void {
    this.props = { ...this.props, ...newProps };
    this.changeCallbacks.forEach(callback => callback(this.props));
  }

  public onPropsChange(callback: (props: TProps) => void): () => void {
    this.changeCallbacks.push(callback);
    return () => {
      const index = this.changeCallbacks.indexOf(callback);
      if (index > -1) {
        this.changeCallbacks.splice(index, 1);
      }
    };
  }
}



 
export class ContainerInstance<TViewModel = any, TProps extends {} = {}> {
  public readonly config: ContainerComponentConfig<TViewModel, TProps>;
  public readonly propsManager: ContainerPropsManager<TProps>;
  public viewModel?: TViewModel;

  constructor(config: ContainerComponentConfig<TViewModel, TProps>) {
    this.config = config;
    this.propsManager = new ContainerPropsManager(config.props || {} as TProps);
    
    makeObservable(this, {
      viewModel: observable,
      setViewModel: action
    });
  }

  public setViewModel(viewModel: TViewModel): void {
    this.viewModel = viewModel;
  }

  public getViewModel(): TViewModel {
    return this.viewModel;
  }

  public getComponent(): React.ComponentType<any> {
    return this.config.Component;
  }
}



 
export class ContainerManager {
  public containers: Map<string, ContainerInstance> = new Map();

  constructor() {
    makeObservable(this, {
      containers: observable,
      addContainer: action,
      removeContainer: action,
      updateContainerProps: action
    });
  }

  

 
  public addContainer<TViewModel = any, TProps extends {} = {}>(
    config: ContainerComponentConfig<TViewModel, TProps>
  ): ContainerInstance<TViewModel, TProps> {
    const container = new ContainerInstance(config);
    this.containers.set(config.key, container as ContainerInstance);
    return container;
  }

  

 
  public removeContainer(key: string): boolean {
    return this.containers.delete(key);
  }

  

 
  public getContainer<TViewModel = any, TProps extends {} = {}>(
    key: string
  ): ContainerInstance<TViewModel, TProps> {
    return this.containers.get(key) as ContainerInstance<TViewModel, TProps>;
  }

  

 
  public getAllContainers(): ContainerInstance[] {
    return Array.from(this.containers.values());
  }

  

 
  public updateContainerProps<TProps = any>(key: string, props: Partial<TProps>): void {
    const container = this.containers.get(key);
    if (container) {
      container.propsManager.updateProps(props);
    }
  }

  

 
  public createViewModel<TViewModel>(
    key: string,
    ViewModelClass: new (...args: any[]) => TViewModel,
    ...args: any[]
  ): TViewModel {
    const container = this.containers.get(key);
    if (!container) return undefined;

    const viewModel = new ViewModelClass(...args);
    container.setViewModel(viewModel);
    return viewModel;
  }

  


 
  public integrateWrappedComponent<TProps extends {} = {}>(
    key: string,
    WrappedComponent: React.ComponentType<TProps>,
    props?: TProps
  ): ContainerInstance<any, TProps> {
    const config: ContainerComponentConfig<any, TProps> = {
      key,
      Component: WrappedComponent,
      props: props || {} as TProps
    };

    const container = new ContainerInstance(config);
    this.containers.set(key, container as ContainerInstance);
    return container;
  }

  

 
  public clear(): void {
    this.containers.clear();
  }
}


export type { ContainerComponentConfig } from './types';