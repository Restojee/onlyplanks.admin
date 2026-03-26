import { injectable, inject } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { TreeNode } from '@ui/DataTreeTable';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { TagData, TagFormData } from '@/modules/tags/model/entities/types';

@injectable()
export class TagDataAccess {

  @State()
  public tagFormData: TagFormData;

  @State()
  private readonly _entityManager: EntityManager<TagData>;

  constructor() {
    this._entityManager = new EntityManager<TagData>({
      getRowId: tag => tag.id
    });
    this.tagFormData = { name: '', description: '', parentTagId: undefined };
  }

  @Computed()
  public get entityManager(): EntityManager<TagData> {
    return this._entityManager;
  }

  @Action()
  public add(tag: TagData): void {
    this._entityManager.create(tag);
  }

  @Action()
  public update(tag: TagData): void {
    this._entityManager.set(tag);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public removeMany(ids: number[]): void {
    console.log(ids)
    ids.forEach(id => this._entityManager.remove(id));
  }

  @Action()
  public filter(predicate: (tag: TagData) => boolean): TreeNode<TagData>[] {
    const filtered = this._entityManager.getCollection.filter(predicate);

    return filtered.map(tag => ({
      id: tag.id,
      data: tag,
    }));
  }
}

export default TagDataAccess;
