import type { DrawerOption } from './types'

/**
 * Get all focusable items (non-separator, non-disabled, non-locked)
 */
export function getFocusableItems(items: DrawerOption[]): DrawerOption[] {
  return items.filter((item) => !item.separator && !item.disabled && !item.locked)
}

/**
 * Calculate next focused index based on arrow key direction
 */
export function getNextFocusedIndex(
  currentIndex: number,
  direction: 'up' | 'down',
  itemsCount: number
): number {
  if (itemsCount === 0) return -1

  if (direction === 'down') {
    return currentIndex < itemsCount - 1 ? currentIndex + 1 : 0
  } else {
    return currentIndex > 0 ? currentIndex - 1 : itemsCount - 1
  }
}

/**
 * Handle selection of focused item
 */
export function selectFocusedItem(
  items: DrawerOption[],
  focusedIndex: number,
  multiple: boolean
): { item: DrawerOption; shouldUpdate: boolean } | null {
  const focusableItems = getFocusableItems(items)

  if (focusedIndex >= 0 && focusedIndex < focusableItems.length) {
    const focusedItem = focusableItems[focusedIndex]
    if (multiple) {
      return {
        item: { ...focusedItem, selected: !focusedItem.selected },
        shouldUpdate: true
      }
    } else {
      return {
        item: focusedItem,
        shouldUpdate: false
      }
    }
  }

  return null
}
