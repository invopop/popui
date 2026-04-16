<script lang="ts">
  import type { ShortcutWrapperProps } from './types'
  import clsx from 'clsx'

  let { size = 'sm', theme = 'light', children }: ShortcutWrapperProps = $props()

  const styles = $derived(
    clsx('inline-flex items-center justify-center border', {
      'size-4 rounded': size === 'sm',
      'size-5 rounded-md': size === 'md',
      'bg-background-default-secondary border-border-default-secondary shadow-shortcut text-foreground-default-secondary':
        theme === 'light',
      'border-border-inverse-secondary shadow-shortcut-inverse text-foreground-inverse-secondary':
        theme === 'navigation' && size === 'sm',
      'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.15)] text-foreground-inverse-secondary':
        theme === 'navigation' && size === 'md'
    })
  )
</script>

<div class={styles}>
  {@render children?.()}
</div>
