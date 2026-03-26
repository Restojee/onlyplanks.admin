import { injectable } from 'inversify';
import { State, Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { TabItem } from '@ui/Tabs';
import LevelTagsModule from '@/modules/levels/tags/view';
import LevelCompletedModule from '@/modules/levels/completed/view';
import LevelCommentsModule from '@/modules/levels/modules/comments/view';
import LevelFavoritesModule from '@/modules/levels/modules/favorites/view';
import { SidebarTabConfig } from '@ui/SidebarTabs';

export interface LevelContentProps {
  levelId: number;
  onClose?: () => void;
}

@injectable()
class LevelContentModel extends ViewModel<LevelContentProps> {
  constructor() {
    super();
  }

  @Computed()
  get tabs (): SidebarTabConfig[] {
    const activeTabProps = {
      levelId: this.props.levelId,
      onSetContentManagerRef: this.setContentManagerRef,
    };
    return [
      {
        key: 'tags',
        title: 'Теги',
        component: LevelTagsModule,
        props: activeTabProps
      },
      {
        key: 'completed',
        title: 'Выполнения',
        component: LevelCompletedModule,
        props: activeTabProps
      },
      {
        key: 'comments',
        title: 'Комментарии',
        component: LevelCommentsModule,
        props: activeTabProps
      },
      {
        key: 'favorites',
        title: 'Избранное',
        component: LevelFavoritesModule,
        props: activeTabProps
      },
    ]
  }

  @State()
  public contentManagerRef: any = null;

  @Action()
  public setContentManagerRef = (ref: any): void => {
    this.contentManagerRef = ref;
  }

  @Computed()
  public get canCreate(): boolean {
    return !!this.contentManagerRef?.handleCreate;
  }

  @Computed()
  public get canDelete(): boolean {
    return !!this.contentManagerRef?.handleDelete && !!this.contentManagerRef?.selectedRows?.length;
  }

  @Action()
  public handleCreate = (): void => {
    this.contentManagerRef?.handleCreate?.();
  }

  @Action()
  public handleDelete = (): void => {
    this.contentManagerRef?.handleDelete?.();
  }
}

export default LevelContentModel;
