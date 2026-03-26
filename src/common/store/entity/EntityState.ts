class EntityState<E extends {}> {

  protected _entity: E;

  get entity(): E {
    return this._entity;
  }
  set entity(value: E) {
    this._entity = value;
  }

  constructor(entity: E) {
    this._entity = entity;
  }

  get getEntity() {
    return this._entity;
  }

  public fieldKeys: Record<string, string> = {};

  public getFieldKeys(): Record<string, string> {
    return this.fieldKeys;
  }

  public getField(key: string) {
    return this._entity[this.getFieldKeys()[key]]
  }

  public setField(key: string, value: any) {
    return this._entity[this.getFieldKeys()[key]] = value;
  }
}

export default EntityState;
