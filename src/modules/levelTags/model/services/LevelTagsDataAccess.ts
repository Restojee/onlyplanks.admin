import { injectable } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { LevelTagBindingData } from '../entities/types';

@injectable()
export class LevelTagsDataAccess {
  @State()
  private readonly _entityManager: EntityManager<LevelTagBindingData>;

  @State()
  public filterSearchText: string = '';

  @State()
  public filterSelectedColumnsMap: Record<string, boolean> = {
    tag: true,
    level: true,
    user: true,
  };

  @State()
  public filterLevelId?: number;

  @State()
  public filterUserId?: number;

  @State()
  public filterTagId?: number;

  constructor() {
    this._entityManager = new EntityManager<LevelTagBindingData>({
      getRowId: (row) => row.id,
    });
  }

  @Computed()
  public get entityManager(): EntityManager<LevelTagBindingData> {
    return this._entityManager;
  }

  @Computed()
  public get filterSelectedColumns(): string[] {
    return Object.entries(this.filterSelectedColumnsMap)
      .filter(([, isSelected]) => Boolean(isSelected))
      .map(([key]) => key);
  }

  @Action()
  public setAll(rows: LevelTagBindingData[]): void {
    this._entityManager.setAll(rows);
  }

  @Action()
  public create(row: LevelTagBindingData): void {
    this._entityManager.create(row);
  }

  @Action()
  public setFilterSearchText(text: string): void {
    this.filterSearchText = text;
  }

  @Action()
  public setFilterSelectedColumns(columns: string[]): void {
    const next: Record<string, boolean> = {};
    columns.forEach((c) => {
      next[c] = true;
    });
    this.filterSelectedColumnsMap = next;
  }

  @Action()
  public setFilterLevelId(levelId: number): void {
    this.filterLevelId = levelId;
  }

  @Action()
  public setFilterUserId(userId: number): void {
    this.filterUserId = userId;
  }

  @Action()
  public setFilterTagId(tagId: number): void {
    this.filterTagId = tagId;
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public update(id: number, updates: Partial<LevelTagBindingData>): void {
    this._entityManager.update(id, updates);
  }
}

export default LevelTagsDataAccess;
