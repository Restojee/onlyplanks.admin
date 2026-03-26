import { injectable } from 'inversify';
import HttpConfig = Http.HttpConfig;
import { Http } from "@common/http/types";

@injectable()
class HttpConfigService {
  private getRuntimeConfig(): { apiUrl?: string; storageUrl?: string } {
    const cfg = (window as any).__APP_CONFIG__;
    return (cfg && typeof cfg === 'object') ? cfg : {};
  }

  private config: HttpConfig = {
    url: '',
    storageUrl: '',
    getToken: () => localStorage.getItem('accessToken')
  };

  getConfig(): HttpConfig {
    const runtime = this.getRuntimeConfig();
    return {
      ...this.config,
      url: runtime.apiUrl ?? this.config.url,
      storageUrl: runtime.storageUrl ?? this.config.storageUrl,
    };
  }

  setConfig(config: HttpConfig): void {
    this.config = config;
  }

  updateConfig(config: Partial<HttpConfig>): void {
    this.config = { ...this.config, ...config };
  }

  updateToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
  }
}

export default HttpConfigService;
