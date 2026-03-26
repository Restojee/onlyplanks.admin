import { LevelEndpoints, LevelUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";

import { inject, injectable } from "inversify";
import {
  LevelByIdRequest,
  LevelByIdResponse,
  LevelCollectRequest,
  LevelCollectResponse,
  LevelCreateRequest,
  LevelCreateResponse,
  LevelRemoveRequest, LevelRemoveResponse,
  LevelUpdateRequest,
  LevelUpdateResponse,
  LevelTagCollectRequest,
  LevelTagCollectResponse,
  LevelTagCreateRequest,
  LevelTagCreateResponse,
  LevelTagDeleteRequest,
  LevelTagDeleteResponse,
  LevelUpdateImageRequest,
} from "@common/api/levels/models";
import { HttpHandlerInjectKey } from "@common/http/constants";

@injectable()
class LevelsApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public collect(args: LevelCollectRequest): Promise<LevelCollectResponse> {
    return this.http.get<LevelCollectRequest, LevelCollectResponse>({
      url: LevelUrls[LevelEndpoints.Collect],
      params: args,
    })
  }

  public get(args: LevelByIdRequest): Promise<LevelByIdResponse> {
    return this.http.get<LevelByIdRequest, LevelByIdResponse>({
      url: `${LevelUrls[LevelEndpoints.ById]}/${args.id}`,
    })
  }

  public create(args: LevelCreateRequest): Promise<LevelCreateResponse> {
    return this.http.post<LevelCreateRequest, LevelCreateResponse>({
      url: LevelUrls[LevelEndpoints.Create],
      params: args,
    })
  }

  public update(args: LevelUpdateRequest): Promise<LevelUpdateResponse> {
    return this.http.put<LevelUpdateRequest, LevelUpdateResponse>({
      url: LevelUrls[LevelEndpoints.Update],
      params: args,
    })
  }

  public updateImage(args: LevelUpdateImageRequest): Promise<string> {
    return this.http.post<{}, string>({
      url: `${LevelUrls[LevelEndpoints.UpdateImage]}/${args.id}/update-image`,
      file: args.image,
    })
  }

  public remove(args: LevelRemoveRequest): Promise<LevelRemoveResponse> {
    return this.http.delete<LevelRemoveRequest, LevelRemoveResponse>({
      url: `${LevelUrls[LevelEndpoints.Remove]}/${args.id}`,
    })
  }

  public tagCollect(args: LevelTagCollectRequest): Promise<LevelTagCollectResponse> {
    return this.http.get<LevelTagCollectRequest, LevelTagCollectResponse>({
      url: LevelUrls[LevelEndpoints.TagCollect],
      params: args,
    })
  }

  public tagCreate(args: LevelTagCreateRequest): Promise<LevelTagCreateResponse> {
    return this.http.post<LevelTagCreateRequest, LevelTagCreateResponse>({
      url: LevelUrls[LevelEndpoints.TagCreate],
      params: args,
    })
  }

  public tagDelete(args: LevelTagDeleteRequest): Promise<LevelTagDeleteResponse> {
    return this.http.delete<LevelTagDeleteRequest, LevelTagDeleteResponse>({
      url: LevelUrls[LevelEndpoints.TagDelete],
      params: args,
    })
  }
}

export default LevelsApi;
