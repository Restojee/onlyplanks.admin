import { injectable, inject } from 'inversify';
import { Computed, AsyncAction, Action, OnMounted, OnWatch } from '@common/hocs/withView/decorators';
import type { PaginationService, PaginationState } from './PaginationService';
import { PaginationServiceInjectKey } from '@/constants';
import { PaginationResponse } from '@ui/ContentManager/ContentManager.model';

export interface AsyncPaginationConfig<T = any> {
  data: T[];
  initialPageSize?: number;
  onPageLoad?: PageLoadHandler;
  pagination?: PaginationState;
}

export type PageLoadHandler = (page: number, pageSize: number) => Promise<PaginationResponse>

@injectable()
export class AsyncPaginationService<T = any> {

  private onPageLoadHandler?: PageLoadHandler;

  constructor(
    @inject(PaginationServiceInjectKey) private paginationService: PaginationService<T>
  ) {}

  @Action()
  setData(data: T[]) {
    this.paginationService.setData(data);
  }

  @Action()
  setPagination(pagination: PaginationState) {
    this.paginationService.setPagination(pagination);
  }

  @Action()
  async setPageLoadHandler(handler: PageLoadHandler) {
    this.onPageLoadHandler = handler;
    await this.loadPage(1);
  }

  @AsyncAction()
  async loadPage(page: number): Promise<void> {
    const currentPageSize = this.paginationService.paginationConfig.pageSize;
    const result = await this.onPageLoadHandler(page, currentPageSize);

    this.paginationService.setPageSize(result.pageSize);
    this.paginationService.setTotalItems(result.totalItems);
    this.paginationService.goToPage(result.page);
  }

  @AsyncAction()
  async setPageSize(pageSize: number): Promise<void> {
    this.paginationService.setPageSize(pageSize);
    await this.loadPage(1);
  }

  @AsyncAction()
  async nextPage(): Promise<void> {
    const paginationData = this.paginationService.getPaginationData;
    if (paginationData.hasNextPage) {
      await this.loadPage(this.paginationService.paginationConfig.currentPage + 1);
    }
  }

  @AsyncAction()
  async previousPage(): Promise<void> {
    const paginationData = this.paginationService.getPaginationData;
    if (paginationData.hasPreviousPage) {
      await this.loadPage(this.paginationService.paginationConfig.currentPage - 1);
    }
  }

  @AsyncAction()
  async goToPage(page: number): Promise<void> {
    await this.loadPage(page);
  }

  @Computed()
  get paginationConfig() {
    return this.paginationService.paginationConfig;
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
}
