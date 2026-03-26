import EntityState from '@common/store/entity/EntityState';

export interface IEntityManager<E extends { id: string }> {
  readonly entities: Record<string, E>;
  ids: string[];
  
  getCollection: Array<E>;
  
  create(entity: E): void;
  remove(id: string): void;
  upsert(entityList: E[]): void;
  update(id: string, updates: Partial<E>): void;
  set(entity: E): void;
  updateIds(): void;
}
