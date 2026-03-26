import { Metadata } from "@common/hocs/withView/constants";

export async function callOnInit<Instance>(instance: Instance): Promise<void> {
  const methods: string[] = Reflect.getMetadata(Metadata.onInit, instance.constructor) || [];

  for (const method of methods) {
    const result = (instance as any)[method]?.();
    if (result instanceof Promise) {
      await result;
    }
  }
}
