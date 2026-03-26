import EntityManager from "@common/store/entity/EntityManager";
import { injectable } from "inversify";
import type { LevelData } from '@/modules/levels/common/types';
import { State, Action, Computed } from '@common/hocs/withView/decorators';
import type { ContentManagerRef } from '@ui/ContentManager';

export interface LevelFormData {
  name: string;
  description: string;
}
@injectable()
class LevelDataAccess {

  @State()
  public levelFormData: LevelFormData = { name: '', description: '' };

  @State()
  public levels: EntityManager<LevelData> = new EntityManager<LevelData>({
    getRowId: row => row.id
  });
  @Computed()
  private get getLevelEntityManager(): EntityManager<LevelData>{
    return this.levels;
  };

  @Action()
  public setLevels(levels: LevelData[]): void {
    this.getLevelEntityManager.setAll(levels);
  }

  @Action()
  public addLevels(levels: LevelData[]): void {
    levels.forEach(level => this.getLevelEntityManager.create(level));
  }

  @Action()
  public addLevel(level: LevelData): void {
    this.getLevelEntityManager.create(level);
  }

  @Action()
  public setLevel(level: LevelData): void {
    this.getLevelEntityManager.set(level);
  }

  @Action()
  public updateLevel(id: number, data: Partial<LevelData>): void {
    this.getLevelEntityManager.update(id, data);
  }

  @Action()
  public removeLevel(levelId: number): void {
    this.getLevelEntityManager.remove(levelId);
  }
}

export default LevelDataAccess;
