


 
export function getInheritedMetadata(metaKey: string, constructor: Function): string[] {
  const keys = new Set<string>();
  let currentConstructor = constructor;

  
  while (currentConstructor && currentConstructor !== Object) {
    const metadata: string[] = Reflect.getMetadata(metaKey, currentConstructor) || [];
    metadata.forEach(key => keys.add(key));

    
    currentConstructor = Object.getPrototypeOf(currentConstructor);
  }

  return Array.from(keys);
}
