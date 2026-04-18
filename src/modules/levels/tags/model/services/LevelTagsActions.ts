import { injectable, inject } from 'inversify';
import { AsyncAction } from '@common/hocs/withView/decorators';
import { LevelTagsDataAccess } from './LevelTagsDataAccess';
import { LevelTagsDataAccessInjectKey } from '../common/constants';
import { LevelsApiInjectKey } from '@/modules/levels/model/common/constants';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import LevelsApi from '@common/api/levels';
import TagsApi from '@common/api/tags/api';
import { Notification } from '@ui/Notification';
import AuthService from '@common/containers/Security/Auth/Auth.service';
import { AuthServiceInjectKey } from '@common/containers/Security/Auth/constants';

@injectable()
export class LevelTagsActions {
  constructor(
    @inject(LevelTagsDataAccessInjectKey) private dataAccess: LevelTagsDataAccess,
    @inject(AuthServiceInjectKey) private authService: AuthService,
    @inject(LevelsApiInjectKey) private levelsApi: LevelsApi,
    @inject(TagsApiInjectKey) private tagsApi: TagsApi
  ) {}

  @AsyncAction()
  public async loadAllTags(): Promise<void> {
    const response = await this.tagsApi.collect();
    const result: any[] = [];
    const walk = (items: any[] | undefined): void => {
      (items || []).forEach(t => {
        result.push(t);
        walk(t.childs);
      });
    };
    walk(response as any);
    this.dataAccess.setAllTags(result as any);
  }

  @AsyncAction()
  public async loadLevelTags(levelId: number): Promise<void> {
    this.dataAccess.setLevelId(levelId);
    const level = await this.levelsApi.get({ id: levelId });
    this.dataAccess.setLevelTags(level.tags || []);
  }

  @AsyncAction()
  public async attachTags(tagIds: number[]): Promise<void> {
    if (!this.dataAccess.levelId) {
      Notification.error('Ошибка', 'ID уровня не определен');
      return;
    }

    if (tagIds.length === 0) {
      Notification.warning('Предупреждение', 'Выберите теги для прикрепления');
      return;
    }

    const currentTagIds = new Set(this.dataAccess.levelTags.map(t => t.id));
    const tagsToAdd = tagIds.filter(id => !currentTagIds.has(id));

    if (tagsToAdd.length === 0) {
      Notification.warning('Предупреждение', 'Выбранные теги уже прикреплены');
      return;
    }

    try {
      await this.levelsApi.tagCreate({
        levelIds: [this.dataAccess.levelId],
        tagIds: tagsToAdd,
        userId: this.authService.user?.id,
      });

      await this.loadLevelTags(this.dataAccess.levelId);
      Notification.success('Успех', `Прикреплено тегов: ${tagsToAdd.length}`);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось прикрепить теги');
      throw error;
    }
  }

  @AsyncAction()
  public async detachTags(tagIds: number[]): Promise<void> {
    if (!this.dataAccess.levelId) {
      Notification.error('Ошибка', 'ID уровня не определен');
      return;
    }

    if (tagIds.length === 0) {
      Notification.warning('Предупреждение', 'Выберите теги для открепления');
      return;
    }

    if (tagIds.length === 0) {
      Notification.warning('Предупреждение', 'Выбранные теги не прикреплены');
      return;
    }

    try {
      await this.levelsApi.tagDelete({
        levelTagIds: tagIds,
        levelId: this.dataAccess.levelId,
      });

      await this.loadLevelTags(this.dataAccess.levelId);
      Notification.success('Успех', `Откреплено тегов: ${tagIds.length}`);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось открепить теги');
      throw error;
    }
  }
}

export default LevelTagsActions;
