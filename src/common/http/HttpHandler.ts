import {
  MethodTypes,
} from "@common/services/modal/common/constants";
import { getEndpointPath, getUrlWithQuery } from "@common/services/modal/common/utils";
import { inject, injectable } from "inversify";
import HttpConfigService from "@common/http/HttpConfig";
import HttpSender from "@common/http/HttpSender";
import HttpHeaders from "@common/http/HttpHeaders";
import { HttpConfigInjectKey } from "@common/http/constants";
import { Http } from "@common/http/types";
import qs from 'qs';

@injectable()
export class HttpHandler implements Http.ClientHandler {

  private readonly httpHeaders: HttpHeaders = new HttpHeaders(() => this.configService.getConfig().getToken());
  private readonly httpSender: HttpSender = new HttpSender(this.httpHeaders);

  constructor(@inject(HttpConfigInjectKey) private configService: HttpConfigService) {}

  private get config(): Http.HttpConfig {
    return this.configService.getConfig();
  }

  private getUrl(endpoint: string, params?: URLSearchParams) {
    let url = getEndpointPath(this.config.url, endpoint);
    if (params) {
      url = getUrlWithQuery(url, params.toString())
    }
    return url;
  }

  public async get<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    let url = this.getUrl(options.url);
    if (options.params) {
      const queryString = qs.stringify(options.params, { arrayFormat: 'repeat' });
      url = `${url}?${queryString}`;
    }
    return this.httpSender.call(url, MethodTypes.GET);
  }

  public async post<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    let url = this.getUrl(options.url);
    return this.httpSender.call(url, MethodTypes.POST, options.params, options.file);
  }

  public async put<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    return this.httpSender.call(this.getUrl(options.url), MethodTypes.PUT, options.params, options.file);
  }

  public async delete<T extends {}, R>(options: Http.ClientOptions<T>): Promise<R> {
    let urlWithParams = this.getUrl(options.url);
    if (options.params) {
      const queryString = qs.stringify(options.params, { arrayFormat: 'repeat' });
      urlWithParams = `${urlWithParams}?${queryString}`;
    }
    return this.httpSender.call(urlWithParams, MethodTypes.DELETE);
  }
}
