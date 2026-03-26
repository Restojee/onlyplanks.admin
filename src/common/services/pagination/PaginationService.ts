import { injectable } from 'inversify';
import { Action, Computed, State } from '@common/hocs/withView/decorators';

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginationData {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

@injectable()
export class PaginationService<T = any> {

  @State()
  public pagination: PaginationState;

  @State()
  public data: T[];

  @Action()
  goToPage(page: number): void {
    const paginationData = this.getPaginationData;
    if (page >= 1 && page <= paginationData.totalPages) {
      this.pagination.pageIndex = page - 1;
    }
  }

  @Action()
  setData(data: any[]) {
    this.data = data;
  }

  @Action()
  setPagination(pagination: PaginationState) {
    this.pagination = pagination;
  }

  @Action()
  setPageSize(pageSize: number): void {
    this.pagination.pageSize = pageSize;
    this.pagination.pageIndex = 0;
  }

  @Action()
  setTotalItems(totalItems: number): void {
    this.pagination.totalItems = totalItems;
  }

  @Action()
  setConfiguration(config: { data: T[], pagination?: PaginationState }): void {
    const { data, pagination } = config;
    this.data = data;
    this.pagination = pagination;
  }

  @Action()
  reset(): void {
    this.pagination.pageIndex = 0;
    this.pagination.totalItems = 0;
  }

  @Action()
  nextPage(): void {
    const paginationData = this.getPaginationData;
    if (paginationData.hasNextPage) {
      this.pagination.pageIndex++;
    }
  }

  @Action()
  previousPage(): void {
    const paginationData = this.getPaginationData;
    if (paginationData.hasPreviousPage) {
      this.pagination.pageIndex--;
    }
  }

  @Computed()
  get paginationConfig() {
    const paginationData = this.getPaginationData;
    return {
      currentPage: this.pagination.pageIndex + 1,
      pageSize: this.pagination.pageSize,
      totalItems: this.pagination.totalItems,
      totalPages: paginationData.totalPages,
      startIndex: paginationData.startIndex,
      endIndex: paginationData.endIndex,
      hasPreviousPage: paginationData.hasPreviousPage,
      hasNextPage: paginationData.hasNextPage,
      pageSizeOptions: [10, 25, 50, 100],
    };
  }

  @Computed()
  get getPaginationCallbacks() {
    return {
      onPageChange: (page: number) => this.goToPage(page),
      onPageSizeChange: (pageSize: number) => this.setPageSize(pageSize),
      onNextPage: () => this.nextPage(),
      onPreviousPage: () => this.previousPage(),
    };
  }

  @Computed()
  get getPageData(): T[] {
    this.pagination.totalItems = this.data.length;
    const startIndex = this.pagination.pageIndex * this.pagination.pageSize;
    const endIndex = startIndex + this.pagination.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  @Computed()
  public get getPaginationData(): PaginationData {
    const currentPage = this.pagination.pageIndex + 1;
    const totalPages = Math.ceil(this.pagination.totalItems / this.pagination.pageSize);
    const startIndex = (currentPage - 1) * this.pagination.pageSize + 1;
    const endIndex = Math.min(currentPage * this.pagination.pageSize, this.pagination.totalItems);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return {
      totalPages,
      startIndex,
      endIndex,
      hasPreviousPage,
      hasNextPage
    };
  }
}
