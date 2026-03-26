import { inject } from 'inversify';
import { ViewModel } from '@common/hocs/withView';
import { Action, AsyncAction, Computed, OnMounted, State } from '@common/hocs/withView/decorators';
import { LevelCommentsDataAccess } from '../../model/services/LevelCommentsDataAccess';
import { LevelCommentsActions } from '../../model/services/LevelCommentsActions';
import { LevelCommentsActionsInjectKey, LevelCommentsDataAccessInjectKey } from '../../model/common/constants';
import { getLevelCommentsColumns } from '../utils/columns';
import { getLevelCommentsToolbarItems } from '../utils/toolbarItems';
import type { TreeNode } from '@ui/DataTreeTable';
import type { Comment } from '@common/api/comments/models';
import { Notification } from '@ui/Notification';

export interface LevelCommentsProps {
  levelId: number;
  onClose?: () => void;
  onSetContentManagerRef?: (ref: any) => void;
}

export interface CommentFormData {
  userId?: number;
  text: string;
}

class LevelCommentsModel extends ViewModel<LevelCommentsProps> {
  constructor(
    @inject(LevelCommentsDataAccessInjectKey) private readonly dataAccess: LevelCommentsDataAccess,
    @inject(LevelCommentsActionsInjectKey) private readonly actions: LevelCommentsActions,
  ) {
    super();
    this.handleCellEdit = this.handleCellEdit.bind(this);
  }

  @State()
  public title = 'Управление комментариями уровня';

  @State()
  public selectedRows: TreeNode<Comment>[] = [];

  @State()
  public commentsList: Comment[] = [];

  @State()
  public formData: CommentFormData = {
    userId: undefined,
    text: '',
  };

  @State()
  public loading: boolean = false;

  @OnMounted()
  @AsyncAction()
  public async initialize(): Promise<void> {
    const { levelId } = this.props;
    if (!levelId) return;

    await this.loadComments();
  }

  @AsyncAction()
  public async loadComments(): Promise<void> {
    this.loading = true;
    try {
      this.commentsList = await this.actions.getComments(this.props.levelId);
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось загрузить комментарии');
    } finally {
      this.loading = false;
    }
  }

  @AsyncAction()
  public async handleDelete(rows: TreeNode<Comment>[]): Promise<void> {
    const ids = rows.map(row => row.data.id);
    
    if (ids.length === 0) {
      Notification.warning('Предупреждение', 'Выберите комментарии для удаления');
      return;
    }

    try {
      await this.dataAccess.delete(ids);
      await this.loadComments();
      Notification.success('Успех', 'Комментарии удалены');
    } catch (error) {
      Notification.error('Ошибка', 'Не удалось удалить комментарии');
    }
  }

  @Action()
  public handleFormFieldChange(field: 'userId' | 'text', value: number | string): void {
    if (field === 'userId') {
      this.formData.userId = value as number;
    } else if (field === 'text') {
      this.formData.text = value as string;
    }
  }

  @Action()
  public handleFormCancel(): void {
    this.formData.userId = undefined;
    this.formData.text = '';
  }

  @AsyncAction()
  public async handleCreateComment(): Promise<void> {
    const { userId, text } = this.formData;

    if (!userId) {
      Notification.warning('Предупреждение', 'Выберите пользователя');
      return;
    }

    if (!text.trim()) {
      Notification.warning('Предупреждение', 'Текст комментария обязателен');
      return;
    }

    try {
      await this.dataAccess.create({
        levelId: this.props.levelId,
        userId,
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
  public async handleCellEdit(rowId: number, columnId: string, value: string): Promise<void> {
    await this.dataAccess.update({ id: rowId, text: value });
    await this.loadComments();
    Notification.success('Успех', 'Комментарий обновлен');
  }

  @Computed()
  public get pageTitle(): string {
    return this.title;
  }

  @Computed()
  public get tableColumns() {
    return getLevelCommentsColumns();
  }

  @Computed()
  public get getToolbarItems() {
    return getLevelCommentsToolbarItems({
      selectedRows: this.selectedRows,
      userId: this.formData.userId,
      text: this.formData.text,
      onUserIdChange: (value) => this.handleFormFieldChange('userId', value),
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

export default LevelCommentsModel;
