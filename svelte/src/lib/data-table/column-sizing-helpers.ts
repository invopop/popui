import type { ColumnSizingState } from '@tanstack/table-core'

/**
 * Calculate initial column sizes based on available container width
 * Scales column sizes proportionally if container is wider than default sizes
 */
export function calculateColumnSizing(
  columns: any[],
  containerWidth: number
): ColumnSizingState | null {
  // Collect all column sizes
  const defaultSizes: Record<string, number> = {}
  columns.forEach((col: any) => {
    if (col.size) {
      defaultSizes[col.id] = col.size
    }
  })

  const totalDefaultSize = Object.values(defaultSizes).reduce((sum, size) => sum + size, 0)

  // If container is wider than default, scale columns proportionally
  if (containerWidth > totalDefaultSize && totalDefaultSize > 0) {
    const scale = containerWidth / totalDefaultSize
    const newSizing: ColumnSizingState = {}
    Object.entries(defaultSizes).forEach(([key, value]) => {
      newSizing[key] = Math.floor(value * scale)
    })
    return newSizing
  }

  return null
}
