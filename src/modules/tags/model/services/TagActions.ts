import { injectable, inject } from 'inversify';
import TagsApi from '@common/api/tags/api';
import { TagDataAccessInjectKey, TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import { TagDataAccess } from './TagDataAccess';
import { TreeNode } from '@ui/DataTreeTable';
import { Action } from '@common/hocs/withView/decorators';
import AsyncAction from '@common/hocs/withView/decorators/AsyncAction';
import type { TagData, TagFormData } from '@/modules/tags/model/entities/types';
import { Notification } from '@ui/Notification';

@injectable()
export class TagActions {
  constructor(
    @inject(TagsApiInjectKey) private tagsApi: TagsApi,
    @inject(TagDataAccessInjectKey) private dataAccess: TagDataAccess
  ) {}

  @AsyncAction()
  public async createTag(data: TagFormData): Promise<TagData> {

    const response = await this.tagsApi.create({
      description: data.description,
      name: data.name,
      parentTagId: data.parentTagId,
    })

    const tag: TagData = {
      description: response.description,
      name: response.name,
      id: response.id,
      parentTagId: response.parentTagId,
      parentTag: response.parentTag,
    };

    this.dataAccess.add(tag);

    console.log('Создан тег:', data);
    return tag;
  }

  @AsyncAction()
  public async updateTag(id: number, data: Partial<TagData>): Promise<TagData> {
    const tag = this.dataAccess.entityManager.getEntityById(id);

    const payload = {
      id: tag.id,
      name: tag.name,
      description: tag.description,
      parentTagId: tag.parentTagId ?? tag.parentTag?.id,
      ...data,
    };

    await this.tagsApi.update(payload)
    Notification.success('Успех', 'Информация о теге обновлена')
    return this.dataAccess.entityManager.update(id, data).getEntityById(id)
  }

  @AsyncAction()
  public async deleteTags(ids: number[]): Promise<void> {
    await Promise.all(ids.map(id => this.tagsApi.remove({ id })));
    this.dataAccess.removeMany(ids);
  }

  @AsyncAction()
  public async deleteSelectedTags(selectedRows: TreeNode<TagData>[]): Promise<void> {
    const ids = selectedRows.map(row => row.data.id);
    await this.deleteTags(ids);
  }

  @AsyncAction()
  public async loadTags(): Promise<TagData[]> {
    const response = await this.tagsApi.collect();

    const result: TagData[] = [];
    const walk = (items: TagData[]): void => {
      items.forEach(t => {
        result.push(t);
        walk(t.childs);
      });
    };
    walk(response);

    this.dataAccess.entityManager.setAll(result);
    return result;
  }
}

export default TagActions;
