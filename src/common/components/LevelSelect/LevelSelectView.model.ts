import { inject } from 'inversify';
import { State, AsyncAction, Computed, OnMounted, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { type ListItemOptions } from '@ui/Select/common/types';
import LevelActions from '@/modules/levels/model/services/LevelActions';
import LevelDataAccess from '@/modules/levels/model/services/LevelDataAccess';
import { LevelActionsInjectKey, LevelDataAccessInjectKey } from '@/modules/levels/model/common/constants';
import { InfiniteScrollService } from '@common/services/InfiniteScrollService';
import type { LevelSelectViewProps } from './LevelSelectView';

class LevelSelectViewModel extends ViewModel<LevelSelectViewProps> {
  @State()
  public infiniteScroll: InfiniteScrollService;

  @State()
  public searchQuery: string = '';

  constructor(
    @inject(LevelActionsInjectKey) private levelActions: LevelActions,
    @inject(LevelDataAccessInjectKey) private levelDataAccess: LevelDataAccess
  ) {
    super();
    this.infiniteScroll = new InfiniteScrollService(20);
  }

  @OnMounted()
  onMounted(): void {
    this.loadLevels();
  }

  @AsyncAction()
  async loadLevels(): Promise<void> {
    try {
      await this.infiniteScroll.loadFirstPage(async (params) => {
        return await this.levelActions.loadLevelCollection({
          page: params.page,
          size: params.pageSize,
          name: params.search,
        });
      });
    } catch (error) {
      console.error('[LevelSelect] Error loading levels:', error);
      throw error;
    }
  }

  @AsyncAction()
  public async loadNextPage(): Promise<void> {
    try {
      await this.infiniteScroll.loadNextPage(async (params) => {
        return await this.levelActions.loadLevelCollection({
          page: params.page,
          size: params.pageSize,
          name: params.search,
        });
      });
    } catch (error) {
      console.error('[LevelSelect] Error loading next page:', error);
      }
  }

  @Action()
  public handleSearchChange(query: string): void {
    this.searchQuery = query;
    this.infiniteScroll.handleSearchChange(query, async (params) => {
      return await this.levelActions.loadLevelCollection({
        page: params.page,
        size: params.pageSize,
        name: params.search,
      });
    });
  }

  @Computed()
  get options(): ListItemOptions[] {
    const levels = this.levelDataAccess.levels.getCollection;
    return levels.map(level => ({
      label: level.name,
      value: level.id,
    }));
  }

  @Computed()
  get hasMore(): boolean {
    return this.infiniteScroll.hasMore;
  }

  @Computed()
  get isLoadingMore(): boolean {
    return this.infiniteScroll.loadingMore;
  }

  @Computed()
  get placeholder(): string {
    return this.infiniteScroll.loading ? 'Загрузка...' : (this.props.placeholder || 'Выберите уровень...');
  }

  @Computed()
  get isDisabled(): boolean {
    return this.props.disabled || this.infiniteScroll.loading;
  }

  public handleChange = (option: ListItemOptions): void => {
    this.props.onChange?.(option.value as number);
  }
}

export default LevelSelectViewModel;
