import { injectable } from 'inversify';
import orderBy from 'lodash/orderBy';
import { SortDirection } from '@common/types/sorting';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export type ServerSortFn<T> = (
  data: T[],
  config: SortConfig
) => Promise<T[]>;

export type LocalSortFn<T> = (
  data: T[],
  config: SortConfig
) => T[];

@injectable()
export class SortingService<T = any> {
  private _sortConfig: SortConfig  = null;
  private _isLoading: boolean = false;
  private _onChange?: () => void;

  private _serverFn?: ServerSortFn<T>;
  private _localFn?: LocalSortFn<T>;

  constructor() {}

  setLocalSorting(fn?: LocalSortFn<T>, onChange?: () => void): void {
    this._onChange = onChange;
    this._localFn = fn;
    this._serverFn = undefined;
  }

  setServerSorting(fn: ServerSortFn<T>, onChange?: () => void): void {
    this._onChange = onChange;
    this._serverFn = fn;
    this._localFn = undefined;
  }

  setSortConfig(field: string, direction: SortDirection): void {
    this._sortConfig = { field, direction };
    this._onChange?.();
  }

  clearSort(): void {
    this._sortConfig = null;
    this._onChange?.();
  }

  reset(): void {
    this._sortConfig = null;
    this._isLoading = false;
    this._serverFn = undefined;
    this._localFn = undefined;
  }

  async sort(data: T[]): Promise<T[]> {
    if (!this._sortConfig) return data;

    if (this._serverFn) {
      return this.sortServer(data);
    }

    return this.sortLocal(data);
  }

  private async sortServer(data: T[]): Promise<T[]> {
    if (!this._serverFn || !this._sortConfig) return data;

    this._isLoading = true;

    try {
      return await this._serverFn(data, this._sortConfig);
    } catch (error) {
      console.error('Failed to sort data:', error);
      return data;
    } finally {
      this._isLoading = false;
    }
  }

  sortLocal(data: T[]): T[] {
    if (!this._sortConfig) return data;

    if (this._localFn) {
      return this._localFn(data, this._sortConfig);
    }

    return this.defaultLocalSort(data);
  }

  private defaultLocalSort(data: T[]): T[] {
    if (!this._sortConfig) return data;

    const { field, direction } = this._sortConfig;
    
    
    const sortPath = field === 'id' || field === 'parentId' ? field : `data.${field}`;
    
    return orderBy(data, [sortPath], [direction]);
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get sortField(): string  {
    return this._sortConfig?.field ?? null;
  }

  get sortDirection(): SortDirection  {
    return this._sortConfig?.direction ?? null;
  }
}
