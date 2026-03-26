import { action, computed, makeObservable, observable } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";
import { getInheritedMetadata } from "@common/hocs/withView/utils/utils";


export function createObservers<T extends {}>(instance: T): void {
  const observableDefs: Record<string, any> = {};

  const metadataMap: [string, any][] = [
    [Metadata.input, observable],
    [Metadata.computed, computed],
    [Metadata.action, action],
    [Metadata.state, observable.deep],
  ];

  for (const [metaKey, decorator] of metadataMap) {
    const keys: string[] = getInheritedMetadata(metaKey, instance.constructor);
    for (const key of keys) {
      if (key in instance || hasPropertyInPrototypeChain(instance, key)) {
        observableDefs[key] = decorator;
      }
    }
  }
  
  makeObservable(instance, observableDefs);
}



 
export function hasPropertyInPrototypeChain(instance: any, propertyName: string): boolean {
  let current = instance;
  while (current) {
    if (Object.prototype.hasOwnProperty.call(current, propertyName) || 
        Object.getOwnPropertyDescriptor(current, propertyName) ||
        (current.constructor && current.constructor.prototype && 
         Object.getOwnPropertyDescriptor(current.constructor.prototype, propertyName))) {
      return true;
    }
    current = Object.getPrototypeOf(current);
  }
  return false;
}
