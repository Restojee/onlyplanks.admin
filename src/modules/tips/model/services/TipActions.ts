import { injectable, inject } from 'inversify';
import TipsApi from '@common/api/tips/api';
import { TipDataAccessInjectKey, TipsApiInjectKey } from '@/modules/tips/model/common/constants';
import { TipDataAccess } from './TipDataAccess';
import { TreeNode } from '@ui/DataTreeTable';
import { Action } from '@common/hocs/withView/decorators';
import AsyncAction from '@common/hocs/withView/decorators/AsyncAction';
import type { TipData, TipFormData } from '@/modules/tips/model/entities/types';

@injectable()
export class TipActions {
  constructor(
    @inject(TipsApiInjectKey) private tipsApi: TipsApi,
    @inject(TipDataAccessInjectKey) private dataAccess: TipDataAccess
  ) {}

  @AsyncAction()
  public async createTip(data: TipFormData): Promise<TipData> {

    const response = await this.tipsApi.create({
      title: data.title,
      text: data.text
    })

    const tip: TipData = {
      title: response.title,
      text: response.text,
      user: response.user,
      createdUtcDate: response.createdUtcDate,
      modifiedUtcDate: response.modifiedUtcDate,
      id: response.id,
    };

    this.dataAccess.add(tip);

    return tip;
  }

  @AsyncAction()
  public async updateTip(id: number, data: Partial<TipData>): Promise<void> {
    const tip = this.dataAccess.entityManager.getEntityById(id);
    await this.tipsApi.update({ ...tip, ...data })
  }

  @AsyncAction()
  public async deleteTips(ids: number[]): Promise<void> {
    await Promise.all(
      ids.map(id => this.tipsApi.remove({ tipId: id }))
    )
    this.dataAccess.removeMany(ids);
  }

  @AsyncAction()
  public async deleteSelectedTips(selectedRows: TreeNode<TipData>[]): Promise<void> {
    if (selectedRows.length === 0) {
      throw new Error('Не выбраны заметки для удаления');
    }

    const ids = selectedRows.map(row => row.data.id);
    await this.deleteTips(ids);
  }

  @AsyncAction()
  public async loadTips(page?: number, size?: number, search?: string, sortField?: string, sortDirection?: 'asc' | 'desc'): Promise<{ 
    data: TipData[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }> {
    const response = await this.tipsApi.collect({ page, size, search, sortField, sortDirection });

    this.dataAccess.entityManager.setAll(response.records);
    
    return {
      data: response.records,
      page: response.page,
      pageSize: response.pageSize,
      totalItems: response.totalItems,
      totalPages: response.totalPages,
    };
  }
}

export default TipActions;
