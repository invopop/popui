<script lang="ts">
  import type { IconSource } from '@steeze-ui/svelte-icon'
  import BaseButton from '../../lib/BaseButton.svelte'
  import type { ButtonType, IconPosition } from '$lib/types.js'

  export let slot = 'Button'
  export let disabled = false
  export let icon: IconSource | undefined = undefined
  export let iconPosition: IconPosition = 'left'
  export let type: ButtonType = 'default'
</script>

<BaseButton {disabled} {icon} {iconPosition} {type}>{slot}</BaseButton>
