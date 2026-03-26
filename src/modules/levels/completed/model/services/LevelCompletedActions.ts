import { inject, injectable } from 'inversify';
import CompletedApi from '@common/api/completed/api';
import { CompletedApiInjectKey } from '@/constants';
import { LevelsApiInjectKey } from '@/modules/levels/model/common/constants';
import LevelsApi from '@common/api/levels';
import { Level } from '@common/api/levels/models';

@injectable()
export class LevelCompletedActions {
  constructor(
    @inject(CompletedApiInjectKey) private readonly completedApi: CompletedApi,
    @inject(LevelsApiInjectKey) private readonly levelApi: LevelsApi,
  ) {}

  public async getByLevelId(levelId: number): Promise<Level> {
    return await this.levelApi.get({ id: levelId });
  }

}
