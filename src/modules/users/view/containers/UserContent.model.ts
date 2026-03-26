import { injectable } from 'inversify';
import { State, Action, Computed } from '@common/hocs/withView/decorators';
import { ViewModel } from '@common/hocs/withView';
import { SidebarTabConfig } from '@ui/SidebarTabs';
import UserCompletedModule from '@/modules/users/modules/completed/view';
import UserFavoritesModule from '@/modules/users/modules/favorites/view';
import UserCommentsModule from '@/modules/users/modules/comments/view';

export interface UserContentProps {
  userId: number;
  onClose?: () => void;
}

@injectable()
class UserContentModel extends ViewModel<UserContentProps> {
  constructor() {
    super();
  }

  @Computed()
  get tabs (): SidebarTabConfig[] {
    const activeTabProps = {
      userId: this.props.userId,
      onSetContentManagerRef: this.setContentManagerRef,
    };
    return [
      {
        key: 'completed',
        title: 'Выполненные',
        component: UserCompletedModule,
        props: activeTabProps
      },
      {
        key: 'favorites',
        title: 'Избранные',
        component: UserFavoritesModule,
        props: activeTabProps
      },
      {
        key: 'comments',
        title: 'Комментарии',
        component: UserCommentsModule,
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

export default UserContentModel;
