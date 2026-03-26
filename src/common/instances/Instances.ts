import { Constructor, InstanceKey } from "@common/utils/di/types";
import { Container as DIContainer } from "inversify";
import { Provider } from "@common/instances/types";

type InstanceType = InstanceKey | Constructor;

export enum BindingScope {
  Request = "Request",
  Transient = "Transient",
  Singleton = "Singleton"
}


export class Instances {

  private readonly Container: DIContainer;

  constructor(parent?: DIContainer) {
    this.Container = new DIContainer({ parent })
  }

  







 
  public bind(providers: Provider[], scope?: BindingScope): void {
    providers.forEach(service => {
      if (service.provide && service.useFactory) {
        this.addWithFactory(service.key, service.useFactory);
      } else {
        this.add(service.key, service.provide, scope);
      }
    });
  }

  public createChildContainer(): Instances {
    return new Instances(this.Container);
  }

  






 
  public add(key: InstanceType, constructor: Constructor, scope?: BindingScope): void {
    const binding = this.Container.bind(key).to(constructor);

    if (scope) {
      const scopeActions = {
        [BindingScope.Request]: () => binding.inRequestScope(),
        [BindingScope.Transient]: () => binding.inTransientScope(),
        [BindingScope.Singleton]: () => binding.inSingletonScope()
      };

      scopeActions[scope]?.();
    }
  }

  





 
  public get<Instance>(key: InstanceType): Instance {
    return this.Container.get<Instance>(key);
  }

  



 
  public remove(key: InstanceKey): void {
    this.Container.unbind(key);
  }

  






 
  public addWithFactory<T>(key: InstanceType, factory: () => T): void {
    this.Container
      .bind(key)
      .toDynamicValue(factory)
      .inSingletonScope();
  }
}
