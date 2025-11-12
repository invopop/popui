<script lang="ts">
  import type { ShortcutWrapperProps } from './types'
  import clsx from 'clsx'

  let { size = 'sm', theme = 'light', children }: ShortcutWrapperProps = $props()

  const styles = $derived(
    clsx('inline-flex items-center justify-center border', {
      'size-4 rounded': size === 'sm',
      'size-5 rounded-md': size === 'md',
      'bg-background-default-secondary border-border-default-secondary shadow-[0px_1px_0px_#DFE0E6] text-foreground-default-secondary':
        theme === 'light',
      'bg-background-inverse-secondary border-border-inverse-secondary shadow-[0px_1px_0px_rgba(255,255,255,0.20)] text-foreground-inverse-secondary':
        theme === 'navigation'
    })
  )
</script>

<div class={styles}>
  {@render children?.()}
</div>
