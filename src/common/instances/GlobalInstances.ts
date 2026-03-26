import { Instances } from "@common/instances/Instances";
import { Container } from "inversify";
import { Constructor } from "@common/utils/di/types";

export class GlobalInstances {
  private static instance: Instances;

  public static getInstance(): Instances {
    if (!GlobalInstances.instance) {
      GlobalInstances.instance = new Instances();
    }

    return GlobalInstances.instance;
  }

  public static get<T>(key: any): T {
    const instance = GlobalInstances.getInstance();
    return instance.get<T>(key);
  }

  public static createContainer(constructor: Constructor): Container {
    const childContainer = new Container();

    childContainer.bind(constructor).toDynamicValue((context: any) => {
      return context.container.get(constructor);
    }).inSingletonScope();

    return childContainer;
  }
}
