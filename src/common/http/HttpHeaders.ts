import { ApplicationJson, Bearer, HeadersType } from "@common/services/modal/common/constants";
import { Http } from "@common/http/types";

class HttpHeaders {

  constructor(private readonly getToken: Http.GetToken) {}

  public static getBearerToken(getToken: Http.GetToken): string {
    return `${Bearer}${getToken()}`;
  }

  public getDefaultHeaders(): Headers {
    const headers = new Headers();
    headers.set(HeadersType.ContentType, ApplicationJson);
    headers.set(HeadersType.Authorization, HttpHeaders.getBearerToken(this.getToken));
    return headers;
  }

  public getHeadersForFormData(): Headers {
    const headers = new Headers();
    headers.set(HeadersType.Authorization, HttpHeaders.getBearerToken(this.getToken));
    return headers;
  }
}

export default HttpHeaders;
