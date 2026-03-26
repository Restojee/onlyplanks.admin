import { Roles } from "@common/types/roles";
import LevelEntity from "@/modules/levels/model/entities/LevelEntity";
import { LevelEntityForm } from "@/modules/levels/model/entities/LevelEntityForm";
import { ModalService } from "@common/services/modal/ModalService";

import { ModalEntity } from "@common/services/modal/ModalEntity";
import { levelMappers } from "@/modules/levels/model/common/mappers";
import LevelDataAccess from "@/modules/levels/model/services/LevelDataAccess";
import LevelsApi from "@common/api/levels";
import LevelSelectors from "@/modules/levels/model/services/LevelSelectors";
import { inject, injectable } from 'inversify';
import { LevelEndpoints } from "@common/api/levels/endpoints";
import {
  LevelByIdRequest,
  LevelCollectRequest,
  LevelRemoveRequest,
  LevelUpdateRequest,
  LevelUpdateImageRequest,
} from '@common/api/levels/models';
import { LevelDataAccessInjectKey, LevelsApiInjectKey } from '@/modules/levels/model/common/constants';
import { Action, AsyncAction } from '@common/hocs/withView/decorators';
import type { LevelData } from '@/modules/levels/common/types';
import { PaginationResponse } from '@ui/ContentManager/ContentManager.model';

const getLoadingMs = 1000;
const mutateLoadingMs = 500;

@injectable()
class LevelActions {

  constructor(
    @inject(LevelsApiInjectKey) private readonly levelsApi: LevelsApi,
    @inject(LevelDataAccessInjectKey) private readonly levelDataAccess: LevelDataAccess,
  ) {
    
  }
  private getLevelApi(): LevelsApi{
    return this.levelsApi;
  };

  @AsyncAction()
  public async createLevel(data: { name: string; description?: string }): Promise<void> {
    const response = await this.getLevelApi().create({
      name: data.name,
      description: data.description
    });

    this.levelDataAccess.addLevel(response);
  }

  @AsyncAction()
  public async updateLevelCell(id: number, field: string, value: string): Promise<void> {
    const level = this.levelDataAccess.levels.getEntityById(id);
    const updateData: Partial<LevelData> = { [field]: value }
    await this.getLevelApi().update({ ...level, ...updateData });
    this.levelDataAccess.updateLevel(id, updateData);
  }

  @AsyncAction()
  public async updateLevelImage(args: LevelUpdateImageRequest): Promise<void> {
    await this.getLevelApi().updateImage(args);
  }

  public async removeLevel(request: LevelRemoveRequest) {
    await this.getLevelApi().remove(request);
    this.levelDataAccess.removeLevel(request.id)
  }

  @AsyncAction()
  public async loadLevelCollection(request: LevelCollectRequest): Promise<PaginationResponse> {
    const response = await this.getLevelApi().collect({
      page: request.page,
      size: request.size,
      name: request.name,
      description: request.description,
      userId: request.userId,
      isCompleted: request.isCompleted,
      isFavorite: request.isFavorite,
      isCreatedByUser: request.isCreatedByUser,
      isWithComment: request.isWithComment,
      sortField: request.sortField,
      sortDirection: request.sortDirection,
    });
    
    
    if (request.page === 1) {
      this.levelDataAccess.setLevels(response.records);
    } else {
      this.levelDataAccess.addLevels(response.records);
    }
    
    return {
      data: response.records,
      page: response.page,
      pageSize: response.pageSize,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  }

  @AsyncAction()
  public async loadLevelById(request: LevelByIdRequest) {
    const response = await this.getLevelApi().get(request);

    this.levelDataAccess.setLevel({
      ...response,
      user: response.user,
      tags: response.tags,
      completed: response.completed,
    })
  }
}

export default LevelActions;
