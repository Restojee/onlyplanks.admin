export namespace Http {
  export interface ClientHandler {
    get: <T extends {}, R>(options: ClientOptions<T>) => Promise<R>;
    delete: <T extends {}, R>(options: ClientOptions<T>) => Promise<R>;
    post: <T extends {}, R>(options: ClientOptions<T>) => Promise<R>;
    put: <T extends {}, R>(options: ClientOptions<T>) => Promise<R>;
  }

  export interface ClientOptions<T extends {}> {
    url: string;
    params?: T;
    file?: File | string;
  }

  export type EndpointFunction<Args = any, ReturnType = any> = (
    http: ClientHandler,
    args: Args,
  ) => ReturnType;

  export enum Codes {
    Success = 200,
    Created = 201,
    NotAuthorized =  401,
    BadRequest = 400,
    NotAccess = 403
  }

  export type GetToken = () => string;

  export interface HttpConfig {
    url: string;
    storageUrl: string
    getToken: GetToken;
  }
}
