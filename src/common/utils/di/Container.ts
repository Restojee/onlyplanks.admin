import { Constructor, InstanceKey, LifecycleType } from "@common/utils/di/types";

export class Container {
  private static instances: Map<InstanceKey, any> = new Map();
  private static bindings: Map<InstanceKey, LifecycleType> = new Map();

  public static register(token: InstanceKey, lifecycleType: LifecycleType): void {
    this.bindings.set(token, lifecycleType);
  }

  public static destroy(token: InstanceKey): void {
    this.instances.get(token).dispose();
    this.instances.delete(token);
  }

  public static get<T>(token: InstanceKey): T {
    return this.instances.get(token);
  }

  public static resolve<T>(token: InstanceKey, constructor: Constructor): T {
    if (!this.instances.has(token)) {

      const paramTypes = Reflect.getMetadata("design:paramtypes", constructor) || [];
      console.info(`Param types for ${constructor.name}:`, paramTypes);

      
      const injectTokens: InstanceKey[] = Reflect.getMetadata("inject:tokens", constructor) || [];
      console.info(`Token names for ${constructor.name}:`, injectTokens);

      
      const dependencies = paramTypes.map((paramType: string, index: number) => {
        const token = injectTokens[index] || paramType;
        return this.resolve(token, constructor);
      });

      const instance = new constructor(...dependencies);
      this.instances.set(token, instance);
    }

    return this.instances.get(token);
  }
}