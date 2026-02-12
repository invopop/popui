import type { Component, Snippet } from 'svelte'
import type { StatusType, AnyProp, TableAction, EmptyStateProps, TableSortBy } from '$lib/types.js'
import type { IconSource } from '@steeze-ui/svelte-icon'
import type { Table, Row, Header } from '@tanstack/table-core'
import type { RenderComponentConfig, RenderSnippetConfig } from './render-helpers.js'
import type BaseDropdown from '$lib/BaseDropdown.svelte'

export type CellType = 'text' | 'boolean' | 'tag' | 'date' | 'currency' | 'uuid' | 'custom'

export interface BooleanCellConfig {
  icon?: IconSource
  iconClass?: string
  showWhenTrue?: boolean // default true
  showWhenFalse?: boolean // default false
}

export type CellConfig =
  | TextCellConfig
  | BooleanCellConfig
  | TagCellConfig
  | DateCellConfig
  | CurrencyCellConfig
  | UuidCellConfig

export interface CurrencyCellConfig {
  className?: string
}

export interface DataTableColumn<TData> {
  id: string
  accessorKey?: keyof TData
  header?: string // Header text to display - can be any string like "Created At", "Customer Name", etc. Use empty string or omit for no header
  cellType?: CellType
  cellConfig?: CellConfig
  cell?: Snippet<[TData]> | ((value: any, row: TData) => Snippet | Component | string | RenderComponentConfig<any> | RenderSnippetConfig<any>)
  enableSorting?: boolean
  enableHiding?: boolean
  enableResizing?: boolean
  disableColumnFilter?: boolean
  size?: number
  minSize?: number
  maxSize?: number
  meta?: DataTableColumnMeta
  loadingConfig?: LoadingConfig // Configuration for loading skeleton placeholders
}

export interface DataTableColumnMeta {
  cellType?: CellType
  dbField?: string
  disableColumnFilter?: boolean
  filterIcon?: IconSource
  filterLabel?: string
  filterOptions?: Array<{ value: string; label: string; [key: string]: any }>
  filterType?: 'select' | 'text' | 'numeric' | 'date' | 'uuid'
  loadingConfig?: LoadingConfig
}

export interface DataTableHeaderCellProps<TData> {
  header: Header<TData, unknown>
  index: number
  headers: Header<TData, unknown>[]
  frozenColumns: Set<string>
  columnDropdowns?: Record<string, BaseDropdown>
  onSortingChange?: (columnId: string, direction: TableSortBy) => void
  onFilterChange?: (columnId: string) => void
  onFreezeChange?: (columnId: string) => void
  manualPagination?: boolean
  loading?: boolean
}

export interface DataTablePaginationProps<T> {
  table: Table<T>
  id?: string
  class?: string
  showRowsPerPage?: boolean
  rowsPerPageOptions?: number[]
  itemsLabel?: string
  children?: Snippet
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  // Pass these directly for reactivity instead of accessing through table.options
  data?: T[]
  rowCount?: number
  manualPagination?: boolean
  disabled?: boolean
}

export interface DataTableRowProps<TData> {
  row: Row<TData>
  rowIndex: number
  frozenColumns: Set<string>
  focusedRowIndex: number
  loading?: boolean
  onRowClick?: (row: TData) => void
  getRowClassName?: (row: TData) => string
  getRowState?: (row: TData) => { isSuccess?: boolean; isError?: boolean }
  StickyCellWrapper: Snippet<
    [
      {
        children: any
        align?: 'left' | 'right'
        isFirst?: boolean
        isLast?: boolean
        isFrozen?: boolean
        isLastFrozen?: boolean
      }
    ]
  >
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: DataTableColumn<TData>[]
  loading?: boolean // Show skeleton placeholders instead of data (default: false)
  disableSelection?: boolean
  disablePagination?: boolean
  disableKeyboardNavigation?: boolean
  disableControls?: boolean // Disable all controls (filters, pagination, view options)
  rowActions?: TableAction[]
  getRowActions?: (row: TData) => TableAction[]
  onRowAction?: (action: AnyProp, row: TData) => void
  initialPageSize?: number
  initialPage?: number // Initial page index (0-based, default: 0)
  initialSortColumn?: string // Initial column to sort by
  initialSortDirection?: TableSortBy // Initial sort direction
  initialFrozenColumns?: string[] // Initial columns to freeze (column IDs)
  initialColumnOrder?: string[] // Initial column order (column IDs)
  initialColumnVisibility?: Record<string, boolean> // Initial column visibility state
  initialColumnSizing?: Record<string, number> // Initial column sizes (column ID -> width in pixels)
  pageSizeOptions?: number[]
  emptyState?: Omit<EmptyStateProps, 'children' | 'check'>
  onRowClick?: (row: TData) => void
  onSelectionChange?: (selectedRows: TData[]) => void
  filters?: Snippet
  paginationSlot?: Snippet
  children?: Snippet // Snippet to render as empty state icon
  // Manual pagination (server-side) support
  manualPagination?: boolean // Enable server-side pagination mode
  manualSorting?: boolean // Enable server-side sorting mode
  pageCount?: number // Total number of pages (for manual pagination)
  rowCount?: number // Total number of rows (for manual pagination)
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSortingChange?: (columnId: string, direction: TableSortBy) => void
  onFilterChange?: (columnId: string) => void
  onFreezeChange?: (columnId: string) => void
  onColumnResize?: (columnSizes: Record<string, number>) => void
  onColumnOrderChange?: (columnOrder: string[]) => void
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void
  getRowClassName?: (row: TData) => string
  getRowState?: (row: TData) => { isSuccess?: boolean; isError?: boolean }
}

export interface DateCellConfig {
  className?: string
}

export interface LoadingConfig {
  lines?: number // Number of skeleton lines to show (default: 1)
  showAvatar?: boolean // Show skeleton avatar before lines (default: false)
  avatarSize?: number // Size of skeleton avatar in pixels (default: 32)
}

// Extend TanStack Table's ColumnMeta to include our custom properties
declare module '@tanstack/table-core' {
  interface ColumnMeta<TData, TValue> {
    cellType?: CellType
    disableColumnFilter?: boolean
    loadingConfig?: LoadingConfig
  }
}

export interface TagCellConfig {
  options: Array<{
    value: string
    label: string
    color: StatusType
  }>
  showDot?: boolean
}

export interface TextCellConfig {
  className?: string
}

export interface UuidCellConfig {
  prefixLength?: number // default 4 - chars from start
  suffixLength?: number // default 4 - chars from end
  full?: boolean // default false - show full UUID
  disabled?: boolean // default false
  onCopy?: (value: string) => void
}
