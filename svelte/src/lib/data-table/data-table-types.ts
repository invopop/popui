import type { Component, Snippet } from 'svelte'
import type { StatusType, AnyProp, TableAction, EmptyStateProps } from '$lib/types.js'
import type { IconSource } from '@steeze-ui/svelte-icon'
import type { Table } from '@tanstack/table-core'

export type CellType = 'text' | 'boolean' | 'tag' | 'date' | 'currency' | 'custom'

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

export type CellConfig =
  | TextCellConfig
  | BooleanCellConfig
  | TagCellConfig
  | DateCellConfig
  | CurrencyCellConfig

export interface DataTableColumn<TData> {
  id: string
  accessorKey?: keyof TData
  header?: string // Header text to display - can be any string like "Created At", "Customer Name", etc. Use empty string or omit for no header
  cellType?: CellType
  cellConfig?: CellConfig
  cell?: (value: any, row: TData) => Snippet | Component | string
  enableSorting?: boolean
  enableHiding?: boolean
  enableResizing?: boolean
  size?: number
  minSize?: number
  maxSize?: number
}

export interface DataTableProps<TData> {
  data: TData[]
  columns: DataTableColumn<TData>[]
  disableSelection?: boolean
  disablePagination?: boolean
  rowActions?: TableAction[]
  getRowActions?: (row: TData) => TableAction[]
  onRowAction?: (action: AnyProp, row: TData) => void
  initialPageSize?: number
  pageSizeOptions?: number[]
  emptyState?: Omit<EmptyStateProps, 'children' | 'check'>
  onRowClick?: (row: TData) => void
  onSelectionChange?: (selectedRows: TData[]) => void
  filters?: Snippet
  paginationSelectedSlot?: Snippet
  paginationUnselectedSlot?: Snippet
  // Manual pagination (server-side) support
  manualPagination?: boolean // Enable server-side pagination mode
  pageCount?: number // Total number of pages (for manual pagination)
  rowCount?: number // Total number of rows (for manual pagination)
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  onSortingChange?: (columnId: string, direction: 'asc' | 'desc') => void
}

export interface DataTablePaginationProps<T> {
  table: Table<T>
  id?: string
  class?: string
  showRowsPerPage?: boolean
  rowsPerPageOptions?: number[]
  itemsLabel?: string
  children?: Snippet
  selectedSlot?: Snippet
  unselectedSlot?: Snippet
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}
