import type { ColumnDef, Row } from '@tanstack/table-core'
import { renderComponent, renderSnippet } from './render-helpers.js'
import InputCheckbox from '$lib/InputCheckbox.svelte'
import type { Snippet } from 'svelte'

/**
 * Create the selection column definition for row selection
 */
export function createSelectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }: any) =>
      renderComponent(InputCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        onchange: (value: boolean) => table.toggleAllPageRowsSelected(value),
        indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
        'aria-label': 'Select all'
      }),
    cell: ({ row }: any) =>
      renderComponent(InputCheckbox, {
        checked: row.getIsSelected(),
        onchange: (value: boolean) => row.toggleSelected(value),
        'aria-label': 'Select row'
      }),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
    size: 40,
    minSize: 40,
    maxSize: 40
  }
}

/**
 * Create the actions column definition for row actions
 */
export function createActionsColumn<TData>(
  rowActionsSnippet: Snippet<[{ row: Row<TData> }]>
): ColumnDef<TData> {
  return {
    id: 'actions',
    cell: ({ row }: any) => renderSnippet(rowActionsSnippet, { row }),
    enableResizing: false,
    size: 44,
    minSize: 44,
    maxSize: 44
  }
}
