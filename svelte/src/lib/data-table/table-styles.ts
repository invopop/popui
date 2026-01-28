import type { Header, Cell } from '@tanstack/table-core'
import clsx from 'clsx'

/**
 * Calculate inline styles for table headers
 */
export function getHeaderStyle<TData>(header: Header<TData, unknown>, isLastScrollable: boolean): string {
  const size = header.getSize()

  if (header.id === 'actions' || header.id === 'select') {
    return `width: ${size}px; min-width: ${size}px; max-width: ${size}px;`
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
  isLastHeader: boolean = false
): string {
  const isSticky = header.id === 'actions' || header.id === 'select'

  return clsx(
    'relative whitespace-nowrap overflow-hidden',
    {
      'sticky right-0 text-right bg-background': header.id === 'actions',
      'sticky left-0 bg-background z-10': header.id === 'select',
      'w-full': isLastScrollable,
      'hover:!bg-transparent': !header.column.getCanSort(),
      '!pl-6': isFirstHeader && !isSticky,
      '!pr-6': isLastHeader && !isSticky,
      'px-3': isSticky,
      'pl-6': isSticky && isFirstHeader,
      'pr-6': isSticky && isLastHeader
    }
  )
}

/**
 * Calculate inline styles for table cells
 */
export function getCellStyle<TData>(cell: Cell<TData, unknown>, isLastScrollable: boolean): string {
  const size = cell.column.getSize()

  if (cell.column.id === 'actions' || cell.column.id === 'select') {
    return `width: ${size}px; min-width: ${size}px; max-width: ${size}px;`
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
  isLastCell: boolean = false
): string {
  const isSticky = cell.column.id === 'actions' || cell.column.id === 'select'

  return clsx(
    'whitespace-nowrap overflow-hidden',
    {
      'sticky right-0 text-right': cell.column.id === 'actions',
      'sticky left-0 z-10': cell.column.id === 'select',
      '!p-0': isSticky,
      'w-full': isLastScrollable,
      'font-medium': isFirstDataColumn,
      '!pl-6': isFirstCell && !isSticky,
      '!pr-6': isLastCell && !isSticky
    }
  )
}
