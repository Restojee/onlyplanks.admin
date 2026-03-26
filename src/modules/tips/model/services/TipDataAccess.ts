import { injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { TreeNode } from '@ui/DataTreeTable';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { TipData, TipFormData } from '@/modules/tips/model/entities/types';

@injectable()
export class TipDataAccess {

  @State()
  public tipFormData: TipFormData;

  @State()
  private readonly _entityManager: EntityManager<TipData>;

  constructor() {
    this._entityManager = new EntityManager<TipData>({
      getRowId: row => row.id
    });
    this.tipFormData = { title: '', text: '' };
  }

  @Computed()
  public get entityManager(): EntityManager<TipData> {
    return this._entityManager;
  }

  @Action()
  public add(tip: TipData): void {
    this._entityManager.create(tip);
  }

  @Action()
  public update(tip: TipData): void {
    this._entityManager.set(tip);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public removeMany(ids: number[]): void {
    ids.forEach(id => this._entityManager.remove(id));
  }

  @Action()
  public filter(predicate: (tip: TipData) => boolean): TreeNode<TipData>[] {
    const filtered = this._entityManager.getCollection.filter(predicate);

    return filtered.map(tip => ({
      id: tip.id,
      data: tip,
    }));
  }
}

export default TipDataAccess;
