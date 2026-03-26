import { injectable } from 'inversify';
import { State, Action, Computed } from '@common/hocs/withView/decorators';
import { TagData } from '@/modules/levels/common/types';
import EntityManager from '@common/store/entity/EntityManager';

@injectable()
export class LevelTagsDataAccess {

  @State()
  public levelId: number  = null;

  @State()
  public levelTags: TagData[] = [];

  @State()
  private readonly _entityManager: EntityManager<TagData>;

  constructor() {
    this._entityManager = new EntityManager<TagData>({
      getRowId: tag => tag.id
    });
  }

  @Computed()
  public get entityManager(): EntityManager<TagData> {
    return this._entityManager;
  }

  @Computed()
  public get sortedTags(): TagData[] {
    const attachedTagIds = new Set(this.levelTags.map(t => t.id));
    
    return [...this._entityManager.getCollection].sort((a, b) => {
      const aAttached = attachedTagIds.has(a.id);
      const bAttached = attachedTagIds.has(b.id);
      if (aAttached && !bAttached) return -1;
      if (!aAttached && bAttached) return 1;
      return 0;
    });
  }

  @Action()
  public setLevelId(levelId: number): void {
    this.levelId = levelId;
  }

  @Action()
  public setAllTags(tags: TagData[]): void {
    this._entityManager.setAll(tags);
  }

  @Action()
  public setLevelTags(tags: TagData[]): void {
    this.levelTags = tags;
  }

  @Action()
  public isTagAttached(tagId: number): boolean {
    return this.levelTags.some(t => t.id === tagId);
  }
}

export default LevelTagsDataAccess;
