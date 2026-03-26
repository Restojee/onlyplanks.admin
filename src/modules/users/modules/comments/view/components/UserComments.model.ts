import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { Action, AsyncAction, Computed, OnMounted, OnWatch, State } from '@common/hocs/withView/decorators';
import { UserCommentsDataAccess } from '../../model/services/UserCommentsDataAccess';
import { UserCommentsActions } from '../../model/services/UserCommentsActions';
import { UserCommentsActionsInjectKey, UserCommentsDataAccessInjectKey } from '../../model/common/constants';
import { getUserCommentsColumns } from '../utils/columns';
import { getUserCommentsToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Comment } from '@common/api/comments/models';
import { Notification } from '@ui/Notification';

export interface UserCommentsProps {
  userId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

class UserCommentsModel extends ViewModel<UserCommentsProps> {
  constructor(
    @inject(UserCommentsDataAccessInjectKey) private readonly dataAccess: UserCommentsDataAccess,
    @inject(UserCommentsActionsInjectKey) private readonly actions: UserCommentsActions,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  @State()
  public contentManagerRef: any;

  @Action()
  public setContentManagerRef () {
    this.contentManagerRef = {
      handleDelete: () => this.handleDelete(this.selectedRows),
      selectedRows: this.selectedRows,
    }
  }


  @State()
  public title = 'Комментарии пользователя';

  @State()
  public selectedRows: TreeNode<Comment>[] = [];

  @Computed()
  public get commentsList(): Comment[] {
    return this.dataAccess.commentsData;
  }

  @State()
  public loading: boolean = false;

  @State()
  public formData = {
    levelId: 0,
    text: '',
  };

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { userId } = this.props;
    if (!userId) return;

    await this.loadComments();
  }

  @AsyncAction()
  public async loadComments(): Promise<void> {
    this.loading = true;
    try {
      await this.actions.loadByUserId(this.props.userId);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить комментарии');
    } finally {
      this.loading = false;
    }
  }

  @AsyncAction()
  public async handleDelete(rows: TreeNode<Comment>[]): Promise<void> {
    if (rows.length === 0) {
      Notification.warning('Предупреждение', 'Выберите элементы для удаления');
      return;
    }

    try {
      for (const row of rows) {
        await this.dataAccess.delete({ levelCommentId: row.data.id });
      }
      await this.loadComments();
      Notification.success('Успех', 'Комментарии удалены');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось удалить комментарии');
    }
  }

  @Action()
  public handleFormFieldChange(field: 'levelId' | 'text', value: number | string): void {
    if (field === 'levelId') {
      this.formData.levelId = value as number;
    } else if (field === 'text') {
      this.formData.text = value as string;
    }
  }

  @Action()
  public handleFormCancel(): void {
    this.formData.levelId = undefined;
    this.formData.text = '';
  }

  @AsyncAction()
  public async handleCreateComment(): Promise<void> {
    const { levelId, text } = this.formData;

    if (!levelId) {
      Notification.warning('Предупреждение', 'Выберите уровень');
      return;
    }

    if (!text.trim()) {
      Notification.warning('Предупреждение', 'Текст комментария обязателен');
      return;
    }

    try {
      await this.dataAccess.create({
        levelId,
        userId: this.props.userId,
        text,
      });
      await this.loadComments();
      Notification.success('Успех', 'Комментарий добавлен');
      this.handleFormCancel();
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось добавить комментарий');
    }
  }

  @AsyncAction()
  public async handleCellEdit(rowId: number, columnId: string, value: any): Promise<void> {
    if (columnId === 'text') {
      try {
        await this.dataAccess.update({ id: rowId, text: value });
        await this.loadComments();
        Notification.success('Успех', 'Комментарий обновлен');
      } catch (error) {
        Notification.error('Ошибка', 'Не удалось обновить комментарий');
      }
    }
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns() {
    return getUserCommentsColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getUserCommentsToolbarItems({
      selectedRows: this.selectedRows,
      levelId: this.formData.levelId,
      text: this.formData.text,
      onLevelIdChange: (value) => this.handleFormFieldChange('levelId', value),
      onTextChange: (value) => this.handleFormFieldChange('text', value),
      onSubmit: this.handleCreateComment.bind(this),
      onCancel: this.handleFormCancel.bind(this),
      onDelete: this.handleDelete.bind(this),
    });
  }

  @Computed()
  public get commentsCollection() {
    return this.commentsList;
  }

  public entityToTreeNode = (comment: Comment) => {
    return { id: comment.id, data: comment, children: [] };
  }

  @Action()
  public handleRowSelect = (rows: TreeNode<Comment>[]): void => {
    this.selectedRows = rows;
  }

  public handleClose = (): void => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}

export default UserCommentsModel;
