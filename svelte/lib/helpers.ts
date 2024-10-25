import type { IconSource } from '@steeze-ui/svelte-icon'
import type { FeedItemStatus } from './types.js'

export function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, (text) => text.replace(/-/, '').toUpperCase())
}

export async function resolveIcon(
  icon: IconSource | string | undefined = undefined
): Promise<IconSource | undefined> {
  if (!icon) return undefined

  if (typeof icon !== 'string') {
    return icon
  }

  try {
    const { [toPascalCase(icon)]: i } = await import('@invopop/ui-icons')
    return i
  } catch (error) {
    console.log(error)
  }
}

export function getCountryName(code: string) {
  if (code === 'global') return 'Global'

  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  return regionNames.of(code.toUpperCase())
}

export function getStatusType(status: string): FeedItemStatus {
  const statuses: Record<string, FeedItemStatus> = {
    OK: 'success',
    KO: 'failure',
    ERR: 'alert',
    RUN: 'run',
    QUEUED: 'queued',
    SKIP: 'skip',
    SIGNED: 'signed'
  }

  return statuses[status]
}

export function getScrollableContainer(element: HTMLElement) {
  if (!element) {
    return undefined
  }

  let parent = element.parentElement
  while (parent) {
    const { overflow } = window.getComputedStyle(parent)
    if (overflow.split(' ').every((o) => o === 'auto' || o === 'scroll')) {
      return parent
    }
    parent = parent.parentElement
  }

  return document.documentElement
}

export function scrollIntoTableView(element: HTMLElement) {
  const offset = 40
  const offsetTop = offset + 40
  const container = getScrollableContainer(element)

  if (!container) return

  const containerRect = container.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  const elementTop = elementRect.top - containerRect.top + container.scrollTop
  const elementBottom = elementRect.bottom - containerRect.top + container.scrollTop

  const isAboveView = elementTop - offsetTop < container.scrollTop
  const isBelowView = elementBottom + offset > container.scrollTop + container.clientHeight

  if (isAboveView) {
    container.scrollTo({
      top: elementTop - offsetTop,
      behavior: 'smooth'
    })
  } else if (isBelowView) {
    container.scrollTo({
      top: elementBottom - container.clientHeight + offset,
      behavior: 'smooth'
    })
  }
}
