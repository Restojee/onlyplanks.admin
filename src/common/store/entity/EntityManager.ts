import { makeAutoObservable } from 'mobx';

export type RowType = string | number;
class EntityManager<E extends {} = {}> {

  public entities: Map<(number | string), E> = new Map();
  public ids: RowType[] = [];

  public get getCollection(): Array<E> {
    return this.ids.map(id => this.entities.get(id)).filter(Boolean);
  }

  public getRowId: (row: E) => RowType

  constructor(options: {
    getRowId: (row: E) => RowType
  }) {
    this.getRowId = options.getRowId;
    makeAutoObservable(this)
  }

  public getRecords(): Map<RowType, E> {
    return this.entities;
  }

  public getEntityById(id: RowType): E {
    return this.getRecords().get(id);
  }

  public create(entity: E): this {
    if (!this.entities.has(this.getRowId(entity))) {
      this.ids.push(this.getRowId(entity));
    }
    this.entities.set(this.getRowId(entity), entity);
    return this;
  }

  public remove(id: RowType): this {
    this.entities.delete(id);
    this.ids = this.ids.filter(existingId => existingId !== id);
    return this;
  }

  public upsert(entityList: E[]): this {
    entityList.forEach(entity => {
      if (!this.entities.has(this.getRowId(entity))) {
        this.ids.push(this.getRowId(entity));
      }
      this.entities.set(this.getRowId(entity), entity);
    });
    return this;
  }

  public setAll(entityList: E[]): this {
    this.clear();
    this.upsert(entityList);
    return this;
  }

  public clear(): this {
    this.entities.clear();
    this.ids = [];
    return this;
  }

  public update(id: RowType, updates: Partial<E>): this {
    const entity = this.entities.get(id);
    if (!entity) return this;
    this.set({ ...entity, ...updates });
    return this;
  }

  public set(entity: E): this {
    if (!this.entities.has(this.getRowId(entity))) {
      this.ids.push(this.getRowId(entity));
    }
    this.entities.set(this.getRowId(entity), entity);
    return this;
  }

  public updateIds(): this {
    this.ids = Array.from(this.entities.keys());
    return this;
  }
}

export default EntityManager;
