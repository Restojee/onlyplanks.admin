import { UrlBuilder } from "@common/services/router";

export interface HistoryState {
  pathname: string;
  search: string;
  params: Record<string, string>;
}

export interface HistoryContextValue {
  location: HistoryState;
  push: (url: UrlBuilder) => void;
  replace: (url: UrlBuilder) => void;
}
