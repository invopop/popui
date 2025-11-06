<script lang="ts">
  import ShortcutWrapper from '../../lib/ShortcutWrapper.svelte'

  interface Props {
    size?: 'sm' | 'md'
    theme?: 'light' | 'navigation'
    letter?: string
  }

  let { size = 'sm', theme = 'light', letter = 'F' }: Props = $props()

  const textSizeClass = size === 'sm' ? 'text-xs' : 'text-sm'
  const textColorClass =
    theme === 'light' ? 'text-foreground-default-secondary' : 'text-foreground-inverse-secondary'
  const fontClass = size === 'sm' ? 'font-semibold' : 'font-medium font-mono'
</script>

<ShortcutWrapper {size} {theme}>
  <span class="{textSizeClass} {textColorClass} {fontClass}">{letter}</span>
</ShortcutWrapper>
