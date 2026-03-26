import { ApplicationJson, HeadersType, MethodTypes } from '@common/services/modal/common/constants';
import HttpHeaders from '@common/http/HttpHeaders';
import { HttpError } from '@common/http/HttpError';

class HttpSender {

  constructor(private readonly httpHeaders: HttpHeaders) {}

  private async getResponseData<R>(response: Response): Promise<R> {
    const contentType = response.headers.get(HeadersType.ContentType);

    if (contentType && contentType.includes(ApplicationJson)) {
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || JSON.stringify(data)
        throw new HttpError(errorMessage, response.status, data);
      }

      return data;
    }

    const text = await response.text()

    if (!response.ok) {
      throw new HttpError(text, response.status, { message: text });
    }

    return text as R;
  }

  private getBodyParams<T extends {}>(options?: T): string {
    return JSON.stringify(options);
  }

  private getFormDataBody(file: File | string): FormData {
    const formData = new FormData();
    formData.append('formFile', file);
    return formData;
  }

  private canHaveBody(method: keyof typeof MethodTypes): boolean {
    return method !== MethodTypes.GET && method !== MethodTypes.HEAD;
  }

  public async call<T extends {}, R>(
    url: string,
    method: keyof typeof MethodTypes,
    body?: T,
    file?: File | string,
  ): Promise<R> {
    const headers = file ? this.httpHeaders.getHeadersForFormData() : this.httpHeaders.getDefaultHeaders();
    const init: RequestInit = {
      method,
      headers,
    };

    if (this.canHaveBody(method)) {
      if (file) {
        init.body = this.getFormDataBody(file);
      } else if (body !== undefined) {
        init.body = this.getBodyParams(body);
      }
    }

    const response = await fetch(url, init);
    return await this.getResponseData<R>(response);
  }

}

export default HttpSender;
