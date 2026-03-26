import { ColumnDef, SortingState, Column } from '@tanstack/react-table';
import { SortDirection } from '@common/types/sorting';
import { ThemeSizes } from '@common/themes/common/types';

import type { IntegrateRenderer, IntegrateType } from './hooks/useCellIntegrations';
import type { EditableCellEditorProps } from './components/EditableCell/EditableCell';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    editable?: boolean;
    integrate?: IntegrateType | IntegrateRenderer<any>;
    editableComponent?: (ctx: EditableCellEditorProps) => React.ReactNode;
    onEdit?: (value: string, rowData: TData) => void;
  }
}

export enum DefaultColumnId {
  SELECT = 'select',
  EXPAND = 'expand',
}

export type DataTreeColumnDef<TData> = ColumnDef<TreeNode<TData>> & {
  integrate?: IntegrateType | IntegrateRenderer<any>;
};

export interface TreeNode<T = unknown> {
  id: string | number;
  data: T;
  children?: TreeNode<T>[];
  parentId?: string | number ;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageSizeOptions?: number[];
}

export interface PaginationCallbacks {
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

export interface DataTreeTableProps<T extends {} = unknown> {
  data: TreeNode<T>[];
  columns: DataTreeColumnDef<T>[];
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (field: string, direction: SortDirection ) => void;
  onRowSelect?: (selectedRow: TreeNode<T> ) => void;
  onRowCheck?: (checkedRows: TreeNode<T>[]) => void;
  onRowExpand?: (expandedRowIds: Set<string | number>) => void;
  onRowDelete?: (selectedRows: TreeNode<T>[]) => void;
  onCellEdit?: (rowId: string | number, columnId: string, value: unknown, rowData: T) => void;
  selectedRowId?: string | number ;
  checkedIds?: Set<string | number>;
  enableRowSelection?: boolean;
  enableRowClickSelection?: boolean;
  useSingleSelect?: boolean;
  enableSorting?: boolean;
  enableColumnResizing?: boolean;
  defaultExpanded?: boolean;
  className?: string;
  size?: ThemeSizes;
  showColumnBorders?: boolean;
  minHeight?: number;
  pagination?: PaginationConfig;
  onPagination?: PaginationCallbacks;
  dataKey: string;
}

export interface ExpandedState {
  [key: string]: boolean;
}

export interface SelectionState {
  [key: string]: boolean;
}
