export class EntityAdapter {
  static upsert<E extends { id: string }>(
    map: Map<string, E>,
    list: E[]
  ): void {
    for (const item of list) {
      map.set(item.id, item);
    }
  }

  static create<E extends { id: string }>(
    map: Map<string, E>,
    entity: E
  ): void {
    map.set(entity.id, entity);
  }

  static remove<E extends { id: string }>(
    map: Map<string, E>,
    id: string
  ): void {
    map.delete(id);
  }

  static update<E extends { id: string }>(
    map: Map<string, E>,
    id: string,
    updates: Partial<E>
  ): void {
    const current = map.get(id);
    if (current) {
      map.set(id, { ...current, ...updates });
    }
  }

  static toArray<E>(map: Map<string, E>): E[] {
    return Array.from(map.values());
  }

  static getById<E>(map: Map<string, E>, id: string): E {
    return map.get(id);
  }
}
