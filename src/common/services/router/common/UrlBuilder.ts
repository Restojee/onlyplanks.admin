class UrlBuilder {
  private basePath: string;
  private params: Record<string, string> = {};

  private constructor(basePath: string = window.location.pathname) {
    this.basePath = basePath;
  }

  public static create(basePath: string = window.location.pathname): UrlBuilder {
    return new UrlBuilder(basePath);
  }

  public withParam(key: string, value?: string): UrlBuilder {if (value === undefined || value === null) {
      delete this.params[key];
    } else {
      this.params[key] = value;
    }
    return this;
  }

  public withParams(params: Record<string, string>): UrlBuilder {
    if (typeof params !== 'object' || params === null) {
      throw new Error('UrlBuilder: withParams должен принимать объект');
    }

    Object.entries(params).forEach(([key, value]) => this.withParam(key, value));
    return this;
  }

  public withAnchor(anchor: string): UrlBuilder {
    if (!anchor || typeof anchor !== 'string') {
      throw new Error('UrlBuilder: anchor должен быть строкой и не пустым');
    }

    this.basePath += `#${encodeURIComponent(anchor)}`;
    return this;
  }

  public build(): string {
    const url = new URL(window.location.origin + this.basePath);
    Object.entries(this.params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    });
    return url.pathname + url.search;
  }

  public toString(): string {
    return this.build();
  }
}

export default UrlBuilder;
