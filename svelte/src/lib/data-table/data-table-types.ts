import type { Component, Snippet } from 'svelte'
import type { StatusType, AnyProp, TableAction, EmptyStateProps } from '$lib/types.js'
import type { IconSource } from '@steeze-ui/svelte-icon'
import type { Table } from '@tanstack/table-core'

export type CellType = 'text' | 'boolean' | 'tag' | 'date' | 'currency' | 'uuid' | 'custom'

export interface TextCellConfig {
  className?: string
}

export interface BooleanCellConfig {
  icon?: IconSource
  iconClass?: string
  showWhenTrue?: boolean // default true
  showWhenFalse?: boolean // default false
}

export interface TagCellConfig {
  options: Array<{
    value: string
    label: string
    color: StatusType
  }>
  showDot?: boolean
}

export interface DateCellConfig {
  className?: string
}

export interface CurrencyCellConfig {
  className?: string
}

export interface UuidCellConfig {
  prefixLength?: number // default 4 - chars from start
  suffixLength?: number // default 4 - chars from end
  full?: boolean // default false - show full UUID
  disabled?: boolean // default false
  onCopy?: (value: string) => void
}

export type CellConfig =
  | TextCellConfig
  | BooleanCellConfig
  | TagCellConfig
  | DateCellConfig
  | CurrencyCellConfig
  | UuidCellConfig

export interface DataTableColumn<TData> {
  id: string
  accessorKey?: keyof TData
  header?: string // Header text to display - can be any string like "Created At", "Customer Name", etc. Use empty string or omit for no header
  cellType?: CellType
  cellConfig?: CellConfig
  cell?: Snippet<[TData]> | ((value: any, row: TData) => Snippet | Component | string)
  enableSorting?: boolean
  enableHiding?: boolean
  enableResizing?: boolean
  disableColumnFilter?: boolean
  size?: number
  minSize?: number
  maxSize?: number
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: DataTableColumn<TData>[]
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
  initialSortDirection?: 'asc' | 'desc' // Initial sort direction
  initialFrozenColumns?: string[] // Initial columns to freeze (column IDs)
  initialColumnOrder?: string[] // Initial column order (column IDs)
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
  onSortingChange?: (columnId: string, direction: 'asc' | 'desc') => void
  onFilterChange?: (columnId: string) => void
  onFreezeChange?: (columnId: string) => void
  onColumnResize?: (columnSizes: Record<string, number>) => void
  onColumnOrderChange?: (columnOrder: string[]) => void
  getRowClassName?: (row: TData) => string
  getRowState?: (row: TData) => { isSuccess?: boolean; isError?: boolean }
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
