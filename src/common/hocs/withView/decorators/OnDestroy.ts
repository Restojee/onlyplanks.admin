import { Metadata } from "@common/hocs/withView/constants";

function OnDestroy(): MethodDecorator {
  return (target, key) => {
    const ctor = target.constructor;
    const destroys = Reflect.getMetadata(Metadata.onDestroy, ctor) || [];
    destroys.push(key);
    Reflect.defineMetadata(Metadata.onDestroy, destroys, ctor);
  };
}

export default OnDestroy;
