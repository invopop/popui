import type { IconSource } from '@steeze-ui/svelte-icon'

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
    const { [toPascalCase(icon)]: i } = await import('@steeze-ui/heroicons')
    return i
  } catch (error) {
    console.log(error)
  }
}
