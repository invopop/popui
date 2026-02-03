import type { Header, Cell } from '@tanstack/table-core'
import clsx from 'clsx'

/**
 * Calculate inline styles for table headers
 */
export function getHeaderStyle<TData>(
  header: Header<TData, unknown>,
  isLastScrollable: boolean,
  isFrozen: boolean = false,
  leftOffset: number = 0
): string {
  const size = header.getSize()

  if (header.id === 'actions' || header.id === 'select') {
    return `width: ${size}px; min-width: ${size}px; max-width: ${size}px;`
  }

  if (isFrozen) {
    return `min-width: ${size}px; max-width: ${size}px; left: ${leftOffset}px;`
  }

  if (isLastScrollable) {
    return `min-width: ${size}px;`
  }

  return `min-width: ${size}px; max-width: ${size}px;`
}

/**
 * Calculate CSS classes for table headers
 */
export function getHeaderClasses<TData>(
  header: Header<TData, unknown>,
  isLastScrollable: boolean,
  isFirstHeader: boolean = false,
  isLastHeader: boolean = false,
  isFrozen: boolean = false,
  isLastFrozen: boolean = false
): string {
  const isSticky = header.id === 'actions' || header.id === 'select' || isFrozen
  const isResizable = header.column.getCanResize()

  return clsx(
    'relative whitespace-nowrap overflow-hidden',
    {
      'sticky right-0 text-right bg-background': header.id === 'actions',
      'sticky left-0 bg-background z-10': header.id === 'select' || isFrozen,
      'after:content-[""] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-4 after:w-px after:bg-background-default-tertiary': isResizable && !isSticky,
      'w-full': isLastScrollable,
      '!pl-4': isFirstHeader && !isSticky,
      '!pr-4': isLastHeader && !isSticky,
      'px-3': isSticky,
      'pl-4': isSticky && isFirstHeader,
      'pr-4': isSticky && isLastHeader
    }
  )
}

/**
 * Calculate inline styles for table cells
 */
export function getCellStyle<TData>(
  cell: Cell<TData, unknown>,
  isLastScrollable: boolean,
  isFrozen: boolean = false,
  leftOffset: number = 0
): string {
  const size = cell.column.getSize()

  if (cell.column.id === 'actions' || cell.column.id === 'select') {
    return `width: ${size}px; min-width: ${size}px; max-width: ${size}px;`
  }

  if (isFrozen) {
    return `min-width: ${size}px; max-width: ${size}px; left: ${leftOffset}px;`
  }

  if (isLastScrollable) {
    return `min-width: ${size}px;`
  }

  return `min-width: ${size}px; max-width: ${size}px;`
}

/**
 * Calculate CSS classes for table cells
 */
export function getCellClasses<TData>(
  cell: Cell<TData, unknown>,
  isLastScrollable: boolean,
  isFirstDataColumn: boolean = false,
  isFirstCell: boolean = false,
  isLastCell: boolean = false,
  isFrozen: boolean = false
): string {
  const isSticky = cell.column.id === 'actions' || cell.column.id === 'select' || isFrozen
  const isCurrency = cell.column.columnDef.meta?.cellType === 'currency'

  return clsx(
    'whitespace-nowrap overflow-hidden',
    {
      'sticky right-0 text-right': cell.column.id === 'actions',
      'sticky left-0 z-10': cell.column.id === 'select' || isFrozen,
      'bg-background': isSticky,
      '!p-0': isSticky,
      'w-full': isLastScrollable,
      'font-medium': isFirstDataColumn,
      '!pl-4': isFirstCell && !isSticky,
      '!pr-4': isLastCell && !isSticky,
      'text-right': isCurrency
    }
  )
}
