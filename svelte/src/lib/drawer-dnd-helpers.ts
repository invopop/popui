import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge'

export type DndItem = {
  id: string
  locked?: boolean
  [key: string]: any
}

export type DropIndicatorState = {
  itemId: string
  edge: Edge
} | null

/**
 * Checks if dropping an item would result in no position change
 * (i.e., dropping right next to its current position)
 */
export function shouldShowDropIndicator(
  sourceId: string,
  targetId: string,
  sourceGroup: string,
  targetGroup: string,
  edge: Edge,
  items: DndItem[]
): boolean {
  // Always show for cross-group drops
  if (sourceGroup !== targetGroup) {
    return true
  }

  // Check if dropping would result in no position change
  const sourceIndex = items.findIndex((item) => item.id === sourceId)
  const targetIndex = items.findIndex((item) => item.id === targetId)

  // Don't show indicator if dropping adjacent to current position
  const isAdjacentTop = edge === 'top' && targetIndex === sourceIndex + 1
  const isAdjacentBottom = edge === 'bottom' && targetIndex === sourceIndex - 1

  return !isAdjacentTop && !isAdjacentBottom
}

/**
 * Calculates the new index where a dragged item should be inserted
 */
export function calculateInsertIndex(
  sourceIndex: number,
  targetIndex: number,
  edge: Edge
): number {
  let insertIndex = targetIndex

  // Adjust target index if source was before target (array shifts after removal)
  if (sourceIndex < targetIndex) {
    insertIndex = targetIndex - 1
  }

  // If dropping on bottom edge, insert after
  if (edge === 'bottom') {
    insertIndex = insertIndex + 1
  }

  return insertIndex
}

/**
 * Reorders items within the same group
 */
export function reorderItems<T extends DndItem>(
  items: T[],
  sourceId: string,
  targetId: string,
  edge: Edge
): T[] {
  const sourceIndex = items.findIndex((item) => item.id === sourceId)
  const targetIndex = items.findIndex((item) => item.id === targetId)

  if (sourceIndex === -1 || targetIndex === -1) {
    return items
  }

  const newItems = [...items]
  const [draggedItem] = newItems.splice(sourceIndex, 1)
  const insertIndex = calculateInsertIndex(sourceIndex, targetIndex, edge)

  newItems.splice(insertIndex, 0, draggedItem)
  return newItems
}

/**
 * Moves an item from one group to another
 */
export function moveItemBetweenGroups<T extends DndItem>(
  sourceItems: T[],
  targetItems: T[],
  sourceId: string,
  targetId?: string,
  edge?: Edge
): { newSourceItems: T[]; newTargetItems: T[] } {
  const draggedItem = sourceItems.find((item) => item.id === sourceId)

  if (!draggedItem) {
    return { newSourceItems: sourceItems, newTargetItems: targetItems }
  }

  const newSourceItems = sourceItems.filter((item) => item.id !== sourceId)

  // If no target specified, append to end
  if (!targetId || !edge) {
    const newTargetItems = [...targetItems, draggedItem]
    return { newSourceItems, newTargetItems }
  }

  // Insert at specific position based on target and edge
  const targetIndex = targetItems.findIndex((item) => item.id === targetId)
  if (targetIndex === -1) {
    const newTargetItems = [...targetItems, draggedItem]
    return { newSourceItems, newTargetItems }
  }

  const newTargetItems = [...targetItems]
  const insertIndex = edge === 'bottom' ? targetIndex + 1 : targetIndex
  newTargetItems.splice(insertIndex, 0, draggedItem)

  return { newSourceItems, newTargetItems }
}
