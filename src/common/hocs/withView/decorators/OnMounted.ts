import { Metadata } from "@common/hocs/withView/constants";

function OnMounted(): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const ctor = target.constructor;
    const inits: (string | symbol)[] = Reflect.getMetadata(Metadata.onInit, ctor) || [];
    inits.push(propertyKey);
    Reflect.defineMetadata(Metadata.onInit, inits, ctor);
  };
}

export default OnMounted;
