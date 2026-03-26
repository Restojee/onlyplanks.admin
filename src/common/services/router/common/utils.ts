import { HistoryState } from "@common/services/router/common/types";

export const getCurrentState = (): HistoryState => {
  const url = new URL(window.location.href);
  return {
    pathname: url.pathname,
    search: url.search,
    params: Object.fromEntries(url.searchParams.entries()),
  };
};
