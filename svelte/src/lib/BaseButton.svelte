<script lang="ts">
  import type { BaseButtonProps } from '$lib/types.ts'
  import Button from './button/button.svelte'

  let {
    icon,
    iconTheme = 'default',
    iconPosition = 'left',
    type = 'button',
    variant = 'outline',
    disabled = false,
    size = 'md',
    dangerIcon = false,
    shortcut = false,
    fullwidth = false,
    notification = false,
    children,
    onclick,
    class: className,
    ...rest
  }: BaseButtonProps = $props()

  let iconClass = $derived(dangerIcon ? 'text-icon-critical' : '')
  let fullWidthClass = $derived(fullwidth ? 'w-full' : '')
  let buttonProps = $derived({
    variant,
    size,
    icon,
    iconPosition,
    iconClass,
    type,
    disabled,
    onclick,
    class: `${fullWidthClass} ${className || ''}`,
    ...rest
  })
</script>

{#if children}
  <Button {...buttonProps}>
    {@render children()}
  </Button>
{:else}
  <Button {...buttonProps} />
{/if}
