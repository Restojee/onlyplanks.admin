import { inject } from 'inversify';
import { State, AsyncAction, Computed, OnMounted, Action } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { type ListItemOptions } from '@ui/Select/common/types';
import type { Tag } from '@common/api/tags/types';
import TagsApi from '@common/api/tags/api';
import { TagsApiInjectKey } from '@/modules/tags/model/common/constants';
import type { TagSelectViewProps } from './TagSelectView';

class TagSelectViewModel extends ViewModel<TagSelectViewProps> {
  @State()
  private tags: Tag[] = [];

  @State()
  public searchQuery: string = '';

  @State()
  public loading: boolean = false;

  constructor(
    @inject(TagsApiInjectKey) private tagsApi: TagsApi,
  ) {
    super();
  }

  @OnMounted()
  public onMounted(): void {
    this.loadTags();
  }

  @AsyncAction()
  public async loadTags(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.tagsApi.collect();
      const result: Tag[] = [];

      const walk = (items: Tag[] | undefined): void => {
        (items || []).forEach(t => {
          result.push(t);
          walk(t.childs);
        });
      };

      walk(response);
      this.tags = result;
    } finally {
      this.loading = false;
    }
  }

  @Action()
  public handleSearchChange(query: string): void {
    this.searchQuery = query;
  }

  @Computed()
  public get options(): ListItemOptions[] {
    const q = String(this.searchQuery).trim().toLowerCase();
    const filtered = q
      ? this.tags.filter(t => t.name.toLowerCase().includes(q))
      : this.tags;

    return filtered.map(t => ({
      label: t.name,
      value: t.id,
    }));
  }

  @Computed()
  public get placeholder(): string {
    return this.loading ? 'Загрузка...' : (this.props.placeholder || 'Выберите тег...');
  }

  @Computed()
  public get isDisabled(): boolean {
    return this.props.disabled || this.loading;
  }

  public handleChange = (option: ListItemOptions): void => {
    this.props.onChange?.(option.value as number);
  }
}

export default TagSelectViewModel;
