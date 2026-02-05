import type { ColumnDef } from '@tanstack/table-core'
import { renderComponent } from './render-helpers.js'
import type { DataTableColumn } from './data-table-types.js'
import TextCell from './cells/text-cell.svelte'
import BooleanCell from './cells/boolean-cell.svelte'
import TagCell from './cells/tag-cell.svelte'
import DateCell from './cells/date-cell.svelte'
import CurrencyCell from './cells/currency-cell.svelte'
import UuidCell from './cells/uuid-cell.svelte'
import type { Snippet } from 'svelte'
import { renderSnippet } from './render-helpers.js'

export function createColumns<TData>(columns: DataTableColumn<TData>[]): ColumnDef<TData>[] {
  return columns.map((col) => {
    const tanstackCol: ColumnDef<TData> = {
      id: col.id,
      accessorKey: col.accessorKey as string,
      header: col.header,
      enableSorting: col.enableSorting ?? true,
      enableHiding: col.enableHiding ?? true,
      enableResizing: col.enableResizing ?? true,
      disableColumnFilter: col.disableColumnFilter ?? false,
      size: col.size,
      minSize: col.minSize,
      maxSize: col.maxSize,
      meta: {
        cellType: col.cellType
      }
    }

    // Cell renderer
    if (col.cell) {
      // Custom cell renderer - can be a Snippet or a function
      tanstackCol.cell = ({ row }) => {
        const value = col.accessorKey ? row.original[col.accessorKey] : undefined

        // Check if it's a function or a Snippet
        if (typeof col.cell === 'function') {
          return col.cell(value, row.original)
        } else {
          // It's a Snippet, render it with the row data
          return renderSnippet(col.cell, row.original)
        }
      }
    } else if (col.cellType) {
      // Built-in cell renderer based on type
      tanstackCol.cell = ({ row }) => {
        const value = col.accessorKey ? row.original[col.accessorKey] : undefined

        switch (col.cellType) {
          case 'text':
            return renderComponent(TextCell, { value: value as any, config: col.cellConfig as any })
          case 'boolean':
            return renderComponent(BooleanCell, { value: value as any, config: col.cellConfig as any })
          case 'tag':
            return renderComponent(TagCell, { value: value as any, config: col.cellConfig as any })
          case 'date':
            return renderComponent(DateCell, { value: value as any, config: col.cellConfig as any })
          case 'currency':
            return renderComponent(CurrencyCell, { value: value as any, config: col.cellConfig as any })
          case 'uuid':
            return renderComponent(UuidCell, { value: value as any, config: col.cellConfig as any })
          default:
            return value
        }
      }
    }

    return tanstackCol
  })
}
