import { inject, injectable } from 'inversify';
import { Action, Computed, State } from '@common/hocs/withView/decorators';
import EntityManager from '@common/store/entity/EntityManager';
import NotesApi from '@common/api/notes/api';
import type { Note, CollectNotesRequest, CreateNoteRequest, UpdateNoteRequest } from '@common/api/notes/models';
import { NotesApiInjectKey } from '../common/constants';

@injectable()
export class NotesDataAccess {
  @State()
  private readonly _entityManager: EntityManager<Note>;

  @State()
  public filterSearchText: string = '';

  @State()
  public filterLevelId?: number;

  @State()
  public filterUserId?: number;

  constructor(@inject(NotesApiInjectKey) private readonly api: NotesApi) {
    this._entityManager = new EntityManager<Note>({ getRowId: (row) => row.id });
  }

  @Computed()
  public get entityManager(): EntityManager<Note> {
    return this._entityManager;
  }

  @Action()
  public setAll(rows: Note[]): void {
    this._entityManager.setAll(rows);
  }

  @Action()
  public setFilterSearchText(text: string): void {
    this.filterSearchText = text;
  }

  @Action()
  public setFilterLevelId(levelId?: number): void {
    this.filterLevelId = levelId;
  }

  @Action()
  public setFilterUserId(userId?: number): void {
    this.filterUserId = userId;
  }

  public async collect(request: CollectNotesRequest): Promise<Note[]> {
    return this.api.collect(request);
  }

  public async create(request: CreateNoteRequest): Promise<Note> {
    return this.api.create(request);
  }

  public async update(request: UpdateNoteRequest): Promise<Note> {
    return this.api.update(request);
  }

  public async delete(noteIds: number[]): Promise<void> {
    await this.api.remove({ noteIds });
  }
}

export default NotesDataAccess;
