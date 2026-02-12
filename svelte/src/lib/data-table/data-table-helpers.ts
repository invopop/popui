// Helper functions for data table operations
import type { Table, Row } from '@tanstack/table-core'
import type BaseDropdown from '$lib/BaseDropdown.svelte'

export function reorderFrozenColumn<TData>(
  columnId: string,
  table: Table<TData>,
  frozenColumns: Set<string>
) {
  const currentOrder =
    table.getState().columnOrder.length > 0
      ? table.getState().columnOrder
      : table.getAllLeafColumns().map((col) => col.id)

  const newOrder = [...currentOrder]
  const columnIndex = newOrder.indexOf(columnId)

  if (columnIndex > -1) {
    newOrder.splice(columnIndex, 1)

    const selectIndex = newOrder.indexOf('select')
    const insertIndex = selectIndex >= 0 ? selectIndex + 1 : 0

    let lastFrozenIndex = insertIndex
    for (let i = insertIndex; i < newOrder.length; i++) {
      if (frozenColumns.has(newOrder[i])) {
        lastFrozenIndex = i + 1
      } else {
        break
      }
    }

    newOrder.splice(lastFrozenIndex, 0, columnId)
    table.setColumnOrder(newOrder)
  }
}

export function reorderUnfrozenColumn<TData>(
  columnId: string,
  table: Table<TData>,
  frozenColumns: Set<string>
) {
  const currentOrder =
    table.getState().columnOrder.length > 0
      ? table.getState().columnOrder
      : table.getAllLeafColumns().map((col) => col.id)

  const newOrder = [...currentOrder]
  const columnIndex = newOrder.indexOf(columnId)

  if (columnIndex > -1) {
    newOrder.splice(columnIndex, 1)

    const selectIndex = newOrder.indexOf('select')
    const insertIndex = selectIndex >= 0 ? selectIndex + 1 : 0

    // Find the first unfrozen column position (after all frozen columns)
    let firstUnfrozenIndex = insertIndex
    for (let i = insertIndex; i < newOrder.length; i++) {
      if (frozenColumns.has(newOrder[i])) {
        firstUnfrozenIndex = i + 1
      } else {
        break
      }
    }

    newOrder.splice(firstUnfrozenIndex, 0, columnId)
    table.setColumnOrder(newOrder)
  }
}

export function calculateFrozenOffset(
  columnId: string,
  headers: any[],
  frozenColumns: Set<string>
): number {
  let offset = 0

  // Find the position of current column
  for (const header of headers) {
    if (header.id === columnId) {
      break
    }
    // Only add width of previous frozen columns that are visible (or select column)
    const isVisible = header.column?.getIsVisible?.() ?? true
    if (isVisible && (frozenColumns.has(header.id) || header.id === 'select')) {
      offset += header.getSize()
    }
  }

  return offset
}

export function handleScrollEvent(
  event: Event,
  lastScrollLeft: number,
  columnDropdowns: Record<string, BaseDropdown>
): number {
  const target = event.target as HTMLDivElement
  if (target.scrollLeft !== lastScrollLeft) {
    // Close all column dropdowns
    Object.values(columnDropdowns).forEach((dropdown) => {
      if (dropdown) {
        dropdown.close()
      }
    })
    return target.scrollLeft
  }
  return lastScrollLeft
}

// Keyboard navigation helpers
export function shouldIgnoreKeyEvent(event: KeyboardEvent): boolean {
  const targetTag = (event.target as HTMLElement).tagName
  return targetTag === 'INPUT' || targetTag === 'TEXTAREA'
}

export function handleArrowDown<TData>(
  currentIndex: number,
  rows: Row<TData>[],
  shiftKey: boolean,
  enableSelection: boolean,
  onScroll: () => void
): number {
  if (currentIndex === -1 && rows.length > 0) {
    // No row focused, focus first row
    const newIndex = 0
    onScroll()
    if (shiftKey && enableSelection) {
      rows[newIndex].toggleSelected(true)
    }
    return newIndex
  } else if (currentIndex < rows.length - 1) {
    // Move down
    const newIndex = currentIndex + 1
    onScroll()
    if (shiftKey && enableSelection) {
      rows[newIndex].toggleSelected(true)
    }
    return newIndex
  }
  return currentIndex
}

export function handleArrowUp<TData>(
  currentIndex: number,
  rows: Row<TData>[],
  shiftKey: boolean,
  enableSelection: boolean,
  onScroll: () => void
): number {
  // Deselect current row first when going up with shift
  if (shiftKey && enableSelection && currentIndex >= 0) {
    rows[currentIndex].toggleSelected(false)
  }

  if (currentIndex === -1 && rows.length > 0) {
    // No row focused, focus first row
    onScroll()
    return 0
  } else if (currentIndex > 0) {
    // Move up
    const newIndex = currentIndex - 1
    onScroll()
    return newIndex
  }
  return currentIndex
}

export function handleSelectKey<TData>(
  currentIndex: number,
  rows: Row<TData>[],
  enableSelection: boolean
): void {
  if (currentIndex >= 0 && currentIndex < rows.length && enableSelection) {
    rows[currentIndex].toggleSelected()
  }
}
