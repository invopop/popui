<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import BaseButton from '../../lib/BaseButton.svelte'
  import type { ButtonType, IconPosition } from '$lib/types.js'

  export let slot = ''
  export let disabled = false
  export let icon: IconSource | undefined = undefined
  export let iconPosition: IconPosition = 'left'
  export let type: ButtonType = 'default'
  export let small = false
</script>

{#if slot}
  <BaseButton {disabled} {icon} {iconPosition} {type} {small}>{slot}</BaseButton>
{:else}
  <BaseButton {disabled} {icon} {iconPosition} {type} {small} />
{/if}
