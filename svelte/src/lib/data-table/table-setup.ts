import type {
  ColumnSizingState,
  ColumnSizingInfoState,
  ColumnOrderState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  Updater
} from '@tanstack/table-core'
import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/table-core'
import { createSvelteTable } from './data-table-svelte.svelte.js'
import type { DataTableColumn } from './data-table-types.js'
import { createColumns } from './create-columns.js'
import { createSelectionColumn, createActionsColumn } from './column-definitions.js'
import type { Snippet } from 'svelte'
import type { Row } from '@tanstack/table-core'

/**
 * Build TanStack columns from configuration
 */
export function buildColumns<TData>(
  columnConfig: DataTableColumn<TData>[],
  enableSelection: boolean,
  rowActionsSnippet: Snippet<[{ row: Row<TData> }]> | null,
  hasRowActions: boolean
) {
  const cols: any[] = []

  // Add selection column if enabled
  if (enableSelection) {
    cols.push(createSelectionColumn<TData>())
  }

  // Add user-defined columns
  cols.push(...createColumns(columnConfig))

  // Add actions column if row actions are defined
  if (hasRowActions && rowActionsSnippet) {
    cols.push(createActionsColumn<TData>(rowActionsSnippet))
  }

  return cols
}

/**
 * Create state updater function
 */
function createStateUpdater<T>(setState: (value: T) => void) {
  return (updater: Updater<T>) => {
    setState(typeof updater === 'function' ? (updater as (old: T) => T)(undefined as any) : updater)
  }
}

interface TableSetupOptions<TData> {
  enableSelection: boolean
  enablePagination: boolean
  // Data getters
  getData?: () => TData[]
  getColumns?: () => any[]
  // State getters
  getRowSelection: () => RowSelectionState
  getColumnVisibility: () => VisibilityState
  getSorting: () => SortingState
  getPagination: () => PaginationState
  getColumnSizing: () => ColumnSizingState
  getColumnSizingInfo: () => ColumnSizingInfoState
  getColumnOrder: () => ColumnOrderState
  // State setters
  setRowSelection: (value: RowSelectionState) => void
  setColumnVisibility: (value: VisibilityState) => void
  setSorting: (value: SortingState) => void
  setPagination: (value: PaginationState) => void
  setColumnSizing: (value: ColumnSizingState) => void
  setColumnSizingInfo: (value: ColumnSizingInfoState) => void
  setColumnOrder: (value: ColumnOrderState) => void
}

/**
 * Create the TanStack table instance with all configuration
 */
export function setupTable<TData>(options: TableSetupOptions<TData>) {
  const tableOptions: any = {
    state: {
      get sorting() {
        return options.getSorting()
      },
      get columnVisibility() {
        return options.getColumnVisibility()
      },
      get rowSelection() {
        return options.getRowSelection()
      },
      get pagination() {
        return options.getPagination()
      },
      get columnSizing() {
        return options.getColumnSizing()
      },
      get columnSizingInfo() {
        return options.getColumnSizingInfo()
      },
      get columnOrder() {
        return options.getColumnOrder()
      }
    },
    get data() {
      return options.getData?.() ?? []
    },
    get columns() {
      return options.getColumns?.() ?? []
    },
    enableRowSelection: options.enableSelection,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onRowSelectionChange: (updater: Updater<RowSelectionState>) => {
      if (typeof updater === 'function') {
        options.setRowSelection(updater(options.getRowSelection()))
      } else {
        options.setRowSelection(updater)
      }
    },
    onSortingChange: (updater: Updater<SortingState>) => {
      if (typeof updater === 'function') {
        options.setSorting(updater(options.getSorting()))
      } else {
        options.setSorting(updater)
      }
    },
    onColumnVisibilityChange: (updater: Updater<VisibilityState>) => {
      if (typeof updater === 'function') {
        options.setColumnVisibility(updater(options.getColumnVisibility()))
      } else {
        options.setColumnVisibility(updater)
      }
    },
    onPaginationChange: (updater: Updater<PaginationState>) => {
      if (typeof updater === 'function') {
        options.setPagination(updater(options.getPagination()))
      } else {
        options.setPagination(updater)
      }
    },
    onColumnSizingChange: (updater: Updater<ColumnSizingState>) => {
      if (typeof updater === 'function') {
        options.setColumnSizing(updater(options.getColumnSizing()))
      } else {
        options.setColumnSizing(updater)
      }
    },
    onColumnSizingInfoChange: (updater: Updater<ColumnSizingInfoState>) => {
      if (typeof updater === 'function') {
        options.setColumnSizingInfo(updater(options.getColumnSizingInfo()))
      } else {
        options.setColumnSizingInfo(updater)
      }
    },
    onColumnOrderChange: (updater: Updater<ColumnOrderState>) => {
      if (typeof updater === 'function') {
        options.setColumnOrder(updater(options.getColumnOrder()))
      } else {
        options.setColumnOrder(updater)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: options.enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel()
  }

  return createSvelteTable(tableOptions)
}
