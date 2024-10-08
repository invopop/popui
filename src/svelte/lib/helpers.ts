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
