import { Metadata } from "@common/hocs/withView/constants";

function Computed(): PropertyDecorator {
  return (target: any, key) => {
    const ctor = target.constructor;
    const states = Reflect.getMetadata(Metadata.computed, ctor) || [];
    states.push(key);
    Reflect.defineMetadata(Metadata.computed, states, ctor);
  };
}

export default Computed;
