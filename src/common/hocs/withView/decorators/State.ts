import { Metadata } from "../constants"
function State(): PropertyDecorator {
  return (target: any, key) => {
    const ctor = target.constructor;
    const states = Reflect.getMetadata(Metadata.state, ctor) || [];
    states.push(key);
    Reflect.defineMetadata(Metadata.state, states, ctor);
  };
}

export default State;
