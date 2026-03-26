import { inject, injectable } from 'inversify';
import { HttpHandler } from '@common/http/HttpHandler';
import { HttpHandlerInjectKey } from '@common/http/constants';
import { NotesEndpoints, NotesUrls } from './endpoints';
import type {
  CollectNotesRequest,
  CollectNotesResponse,
  CreateNoteRequest,
  CreateNoteResponse,
  UpdateNoteRequest,
  UpdateNoteResponse,
  RemoveNotesRequest,
  RemoveNotesResponse,
} from './models';

@injectable()
class NotesApi {
  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(args: CollectNotesRequest): Promise<CollectNotesResponse> {
    return this.http.get<CollectNotesRequest, CollectNotesResponse>({
      url: NotesUrls[NotesEndpoints.Collect],
      params: args,
    });
  }

  public create(args: CreateNoteRequest): Promise<CreateNoteResponse> {
    return this.http.post<CreateNoteRequest, CreateNoteResponse>({
      url: NotesUrls[NotesEndpoints.Create],
      params: args,
    });
  }

  public update(args: UpdateNoteRequest): Promise<UpdateNoteResponse> {
    return this.http.put<UpdateNoteRequest, UpdateNoteResponse>({
      url: NotesUrls[NotesEndpoints.Update],
      params: args,
    });
  }

  public remove(args: RemoveNotesRequest): Promise<RemoveNotesResponse> {
    return this.http.delete<RemoveNotesRequest, RemoveNotesResponse>({
      url: NotesUrls[NotesEndpoints.Remove],
      params: {
        noteIds: args.noteIds,
      } as any,
    });
  }
}

export default NotesApi;
