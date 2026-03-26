import { Metadata } from "@common/hocs/withView/constants";

function Prop(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const constructor = target.constructor;
    const existing = Reflect.getMetadata(Metadata.input, constructor) || [];
    Reflect.defineMetadata(
      Metadata.input,
      [...existing, propertyKey],
      constructor
    );
  };
}

export default Prop;
