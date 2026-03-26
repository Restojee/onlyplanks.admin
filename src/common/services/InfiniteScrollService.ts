import { makeObservable, observable, action, computed } from 'mobx';

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  searchQuery: string;
}

export interface LoadDataParams {
  page: number;
  pageSize: number;
  search?: string;
}

export interface LoadDataResponse {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}




 
export class InfiniteScrollService {
  @observable
  public currentPage: number = 1;

  @observable
  public totalPages: number = 1;

  @observable
  public pageSize: number = 20;

  @observable
  public loading: boolean = false;

  @observable
  public loadingMore: boolean = false;

  @observable
  public searchQuery: string = '';

  private searchDebounceTimeout: NodeJS.Timeout  = null;
  private readonly searchDebounceMs: number = 300;

  constructor(pageSize: number = 20) {
    this.pageSize = pageSize;
    makeObservable(this);
  }

  @computed
  public get hasMore(): boolean {
    return this.currentPage < this.totalPages;
  }

  @computed
  public get isLoading(): boolean {
    return this.loading || this.loadingMore;
  }

  @action
  public setSearchQuery(query: string): void {
    this.searchQuery = query;
  }

  @action
  public setPaginationState(response: LoadDataResponse): void {
    this.currentPage = response.page;
    this.totalPages = response.totalPages;
    this.pageSize = response.pageSize;
  }

  @action
  public setLoading(value: boolean): void {
    this.loading = value;
  }

  @action
  public setLoadingMore(value: boolean): void {
    this.loadingMore = value;
  }

  @action
  public reset(): void {
    this.currentPage = 1;
    this.totalPages = 1;
    this.searchQuery = '';
    this.loading = false;
    this.loadingMore = false;
  }

  

 
  public async loadFirstPage(
    loadDataFn: (params: LoadDataParams) => Promise<LoadDataResponse>
  ): Promise<void> {
    this.setLoading(true);
    this.currentPage = 1;
    
    try {
      const response = await loadDataFn({
        page: 1,
        pageSize: this.pageSize,
        search: this.searchQuery,
      });
      
      this.setPaginationState(response);
    } finally {
      this.setLoading(false);
    }
  }

  

 
  public async loadNextPage(
    loadDataFn: (params: LoadDataParams) => Promise<LoadDataResponse>
  ): Promise<void> {
    if (!this.hasMore || this.isLoading) {
      return;
    }

    this.setLoadingMore(true);
    
    try {
      const nextPage = this.currentPage + 1;
      const response = await loadDataFn({
        page: nextPage,
        pageSize: this.pageSize,
        search: this.searchQuery,
      });
      
      this.setPaginationState(response);
    } finally {
      this.setLoadingMore(false);
    }
  }

  

 
  public handleSearchChange(
    query: string,
    loadDataFn: (params: LoadDataParams) => Promise<LoadDataResponse>
  ): void {
    this.setSearchQuery(query);

    if (this.searchDebounceTimeout) {
      clearTimeout(this.searchDebounceTimeout);
    }

    this.searchDebounceTimeout = setTimeout(() => {
      this.loadFirstPage(loadDataFn);
    }, this.searchDebounceMs);
  }
}

export default InfiniteScrollService;
