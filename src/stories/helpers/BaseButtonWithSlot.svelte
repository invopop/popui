<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import BaseButton from '../../lib/BaseButton.svelte'
  import type { ButtonVariant, IconPosition } from '$lib/types.js'

  export let slot = ''
  export let disabled = false
  export let icon: IconSource | undefined = undefined
  export let iconPosition: IconPosition = 'left'
  export let variant: ButtonVariant = 'default'
  export let small = false
  export let dangerIcon = false
</script>

{#if slot}
  <BaseButton {dangerIcon} {disabled} {icon} {iconPosition} {variant} {small}>{slot}</BaseButton>
{:else}
  <BaseButton {dangerIcon} {disabled} {icon} {iconPosition} {variant} {small} />
{/if}
