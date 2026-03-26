import { Metadata } from "@common/hocs/withView/constants";

function OnUnmounted(): MethodDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const ctor = target.constructor;
    const unmounts: (string | symbol)[] = Reflect.getMetadata(Metadata.onUnmounted, ctor) || [];
    unmounts.push(propertyKey);
    Reflect.defineMetadata(Metadata.onUnmounted, unmounts, ctor);
  };
}

export default OnUnmounted;
