import { injectable, inject } from 'inversify';
import EntityManager from '@common/store/entity/EntityManager';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import type { CommentRow } from '@common/api/comments/models';
import CommentApi from '@common/api/comments/api';
import { CommentApiInjectKey } from '@/constants';
import type {
  CollectCommentPagedRequest,
  CollectCommentPagedResponse,
  CreateCommentAdminRequest,
  CreateCommentAdminResponse,
  UpdateCommentAdminRequest,
  UpdateCommentAdminResponse,
  DeleteCommentBulkRequest,
  DeleteCommentBulkResponse,
} from '@common/api/comments/models';

@injectable()
export class CommentedDataAccess {
  @State()
  private readonly _entityManager: EntityManager<CommentRow>;

  @State()
  public filterSearchText: string = '';

  @State()
  public filterLevelId?: number;

  @State()
  public filterUserId?: number;

  constructor(@inject(CommentApiInjectKey) private readonly commentApi: CommentApi) {
    this._entityManager = new EntityManager<CommentRow>({
      getRowId: (row) => row.id,
    });
  }

  @Computed()
  public get entityManager(): EntityManager<CommentRow> {
    return this._entityManager;
  }

  @Action()
  public setAll(rows: CommentRow[]): void {
    this._entityManager.setAll(rows);
  }

  @Action()
  public create(row: CommentRow): void {
    this._entityManager.create(row);
  }

  @Action()
  public update(id: number, updates: Partial<CommentRow>): void {
    this._entityManager.update(id, updates);
  }

  @Action()
  public remove(id: number): void {
    this._entityManager.remove(id);
  }

  @Action()
  public setFilterSearchText(text: string): void {
    this.filterSearchText = text;
  }

  @Action()
  public setFilterLevelId(levelId: number): void {
    this.filterLevelId = levelId;
  }

  @Action()
  public setFilterUserId(userId: number): void {
    this.filterUserId = userId;
  }

  public async collectPaged(request: CollectCommentPagedRequest): Promise<CollectCommentPagedResponse> {
    return this.commentApi.collectPaged(request);
  }

  public async createAdmin(request: CreateCommentAdminRequest): Promise<CreateCommentAdminResponse> {
    return this.commentApi.createAdmin(request);
  }

  public async updateAdmin(request: UpdateCommentAdminRequest): Promise<UpdateCommentAdminResponse> {
    return this.commentApi.updateAdmin(request);
  }

  public async deleteBulk(request: DeleteCommentBulkRequest): Promise<void> {
    return this.commentApi.deleteBulk(request);
  }
}

export default CommentedDataAccess;
