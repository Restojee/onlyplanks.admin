import { Metadata } from "@common/hocs/withView/constants";

function Action(): PropertyDecorator {
  return (target: any, key) => {
    const ctor = target.constructor;
    const states = Reflect.getMetadata(Metadata.action, ctor) || [];
    states.push(key);
    Reflect.defineMetadata(Metadata.action, states, ctor);
  };
}

export default Action;
