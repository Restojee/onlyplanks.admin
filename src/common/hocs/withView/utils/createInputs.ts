import { runInAction } from "mobx";
import { Metadata } from "@common/hocs/withView/constants";
import {  hasPropertyInPrototypeChain } from "./createObservers";
import { getInheritedMetadata } from "@common/hocs/withView/utils/utils";

export function createInputs<Instance extends {}, Props extends {}>(instance: Instance, props: Props): void {
  runInAction(() => {
    const inputProperties: string[] = getInheritedMetadata(Metadata.input, instance.constructor);
    
    inputProperties.forEach(propName => {
      if (props.hasOwnProperty(propName) && (propName in instance || hasPropertyInPrototypeChain(instance, propName))) {
        
        if (instance[propName] !== props[propName]) {
          instance[propName] = props[propName];
        }
      }
    });
  });
}
