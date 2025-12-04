<script lang="ts">
  import ShortcutWrapper from '../../lib/ShortcutWrapper.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Slash } from '@invopop/ui-icons'

  interface Props {
    size?: 'sm' | 'md'
    theme?: 'light' | 'navigation'
  }

  let { size = 'sm', theme = 'light' }: Props = $props()

  const iconSizeClass = size === 'sm' ? 'size-[9px]' : 'size-3'
</script>

<ShortcutWrapper {size} {theme}>
  <Icon src={Slash} class={iconSizeClass} />
</ShortcutWrapper>
