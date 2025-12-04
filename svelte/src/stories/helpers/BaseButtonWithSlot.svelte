<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import BaseButton from '$lib/BaseButton.svelte'
  import type { ButtonVariant, IconPosition } from '$lib/types.js'

  interface Props {
    slot?: string
    disabled?: boolean
    icon?: IconSource | undefined
    iconPosition?: IconPosition
    variant?: ButtonVariant
    size?: 'sm' | 'md' | 'lg'
    dangerIcon?: boolean
    shortcut?: boolean
    fullwidth?: boolean
    notification?: boolean
  }

  let {
    slot = '',
    disabled = false,
    icon = undefined,
    iconPosition = 'left',
    variant = 'outline',
    size = 'md',
    dangerIcon = false,
    shortcut = false,
    fullwidth = false,
    notification = false
  }: Props = $props()
</script>

{#if slot}
  <BaseButton
    {dangerIcon}
    {disabled}
    {icon}
    {iconPosition}
    {variant}
    {size}
    {shortcut}
    {fullwidth}
    {notification}
  >
    {slot}
  </BaseButton>
{:else}
  <BaseButton
    {dangerIcon}
    {disabled}
    {icon}
    {iconPosition}
    {variant}
    {size}
    {shortcut}
    {fullwidth}
    {notification}
  />
{/if}
