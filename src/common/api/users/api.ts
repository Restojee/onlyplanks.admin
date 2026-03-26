import { UserEndpoints, UserUrls } from './endpoints';
import { HttpHandler } from "@common/http/HttpHandler";
import { inject, injectable } from "inversify";
import { HttpHandlerInjectKey } from "@common/http/constants";
import {
  CollectUsersRequest,
  CollectUsersResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserResponse,
  MeResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserAvatarRequest,
  UpdateUserAvatarResponse,
} from '@common/api/users/models';

@injectable()
class UserApi {

  constructor(@inject(HttpHandlerInjectKey) private readonly http: HttpHandler) {}

  public me(): Promise<MeResponse> {
    return this.http.get({
      url: UserUrls[UserEndpoints.Me],
    })
  }

  public collect(request: CollectUsersRequest): Promise<CollectUsersResponse> {
    return this.http.get({
      url: UserUrls[UserEndpoints.Collect],
      params: request,
    })
  }

  public createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
    return this.http.post({
      url: UserUrls[UserEndpoints.Create],
      params: request
    })
  }

  public updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    console.log(request)
    return this.http.put({
      url: UserUrls[UserEndpoints.Update],
      params: request
    })
  }

  public deleteUser(id: number): Promise<DeleteUserResponse> {
    return this.http.delete({
      url: `${UserUrls[UserEndpoints.Delete]}/${id}`,
    })
  }

  public updateUserAvatar(request: UpdateUserAvatarRequest, file: File): Promise<UpdateUserAvatarResponse> {
    return this.http.post({
      url: UserUrls[UserEndpoints.UpdateAvatar],
      params: request,
      file: file,
    })
  }
}

export default UserApi;
