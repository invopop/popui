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
    const { [toPascalCase(icon)]: i } = await import('@invopop/ui-icons')
    return i
  } catch (error) {
    console.log(error)
  }
}

export function getCountryName(code: string) {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  return regionNames.of(code.toUpperCase())
}
