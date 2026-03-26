import { makeAutoObservable } from 'mobx';
import { getCurrentState } from "@common/services/router/common/utils";
import { injectable } from "inversify";
import UrlBuilder from "@common/services/router/common/UrlBuilder";

@injectable()
class HistoryService {
  public location = getCurrentState();

  constructor() {
    makeAutoObservable(this);
    window.addEventListener('popstate', this.updateLocation);
  }

  public updateLocation = () => {
    const next = getCurrentState();
    if (
      this.location.pathname !== next.pathname ||
      this.location.search !== next.search
    ) {
      this.location = next;
    }
  };

  public push = (url: UrlBuilder) => {
    window.history.pushState({}, '', url.toString());
    this.updateLocation();
  };

  public replace = (url: UrlBuilder) => {
    window.history.replaceState({}, '', url.toString());
    this.updateLocation();
  };
}

export default HistoryService;
