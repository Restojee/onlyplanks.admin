import { RoleEndpoints, RoleUrls } from './endpoints';
import { HttpHandler } from '@common/http/HttpHandler';
import {
  type RoleCollectArgs,
  type RoleCollectResponse,
  type RoleGetArgs,
  type RoleGetResponse,
  type RoleCreateArgs,
  type RoleCreateResponse,
  type RoleDeleteArgs,
  type RoleDeleteResponse,
  type RoleUpdateArgs,
  type RoleUpdateResponse,
  type RoleSetPermissionsArgs,
  type RoleSetPermissionsResponse,
  type AssignRoleToUserArgs,
  type AssignRoleToUserResponse,
} from './types';
import { inject, injectable } from 'inversify';
import { HttpHandlerInjectKey } from '@common/http/constants';

@injectable()
class RolesApi {
  public static GlobalInjectKey = 'RolesApiKey';

  constructor(@inject(HttpHandlerInjectKey) private http: HttpHandler) {}

  public collect(args?: RoleCollectArgs): Promise<RoleCollectResponse> {
    return this.http.get<RoleCollectArgs, RoleCollectResponse>({
      url: RoleUrls[RoleEndpoints.Collect],
      params: args,
    });
  }

  public get(args: RoleGetArgs): Promise<RoleGetResponse> {
    return this.http.get<RoleGetArgs, RoleGetResponse>({
      url: `${RoleUrls[RoleEndpoints.Get]}/${args.roleId}`,
    });
  }

  public create(args: RoleCreateArgs): Promise<RoleCreateResponse> {
    return this.http.post<RoleCreateArgs, RoleCreateResponse>({
      url: RoleUrls[RoleEndpoints.Create],
      params: args,
    });
  }

  public update(args: RoleUpdateArgs): Promise<RoleUpdateResponse> {
    return this.http.put<RoleUpdateArgs, RoleUpdateResponse>({
      url: RoleUrls[RoleEndpoints.Update],
      params: args,
    });
  }

  public delete(args: RoleDeleteArgs): Promise<RoleDeleteResponse> {
    return this.http.delete<RoleDeleteArgs, RoleDeleteResponse>({
      url: `${RoleUrls[RoleEndpoints.Delete]}/${args.roleId}`,
    });
  }

  public setPermissions(args: RoleSetPermissionsArgs): Promise<RoleSetPermissionsResponse> {
    return this.http.put<RoleSetPermissionsArgs, RoleSetPermissionsResponse>({
      url: RoleUrls[RoleEndpoints.SetPermissions],
      params: args,
    });
  }

  public assignToUser(args: AssignRoleToUserArgs): Promise<AssignRoleToUserResponse> {
    return this.http.post<AssignRoleToUserArgs, AssignRoleToUserResponse>({
      url: RoleUrls[RoleEndpoints.AssignToUser],
      params: args,
    });
  }
}

export default RolesApi;
