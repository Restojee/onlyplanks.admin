import { reaction } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";

export function createWatchers<Instance>(instance: Instance): void {
  const watchers = Reflect.getMetadata(Metadata.watchers, instance.constructor) || [];

  for (const { propertyFn, handlerName } of watchers) {
    
    const initialValue = propertyFn(instance);
    
    
    if (initialValue !== undefined) {
      (instance as any)[handlerName]?.(initialValue);
    }
    
    
    reaction(
      () => propertyFn(instance),
      (newValue, oldValue) => {
        (instance as any)[handlerName]?.(newValue, oldValue);
      },
      { fireImmediately: false }
    );
  }
}
