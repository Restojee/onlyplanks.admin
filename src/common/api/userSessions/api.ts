import { inject, injectable } from 'inversify';
import { HttpHandler } from '@common/http/HttpHandler';
import { HttpHandlerInjectKey } from '@common/http/constants';
import { UserSessionEndpoints, UserSessionUrls } from './endpoints';
import type { CollectUserSessionsRequest, CollectUserSessionsResponse } from './models';

@injectable()
class UserSessionsApi {
  constructor(@inject(HttpHandlerInjectKey) private http: HttpHandler) {}

  public collect(args: CollectUserSessionsRequest): Promise<CollectUserSessionsResponse> {
    return this.http.get<CollectUserSessionsRequest, CollectUserSessionsResponse>({
      url: UserSessionUrls[UserSessionEndpoints.Collect],
      params: args,
    });
  }
}

export default UserSessionsApi;
