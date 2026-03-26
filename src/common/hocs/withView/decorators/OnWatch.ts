import { Metadata } from "@common/hocs/withView/constants";

function OnWatch<T>(propertyFn: (vm: T) => any): MethodDecorator {
  return (target: any, key) => {
    const ctor = target.constructor;
    const watchers = Reflect.getMetadata(Metadata.watchers, ctor) || [];
    watchers.push({ propertyFn, handlerName: key });
    Reflect.defineMetadata(Metadata.watchers, watchers, ctor);
  };
}

export default OnWatch;
