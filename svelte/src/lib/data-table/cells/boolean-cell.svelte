<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { BooleanCellConfig } from '../data-table-types.js'

  let { value, config }: { value: boolean; config?: BooleanCellConfig } = $props()

  const showWhenTrue = config?.showWhenTrue ?? true
  const showWhenFalse = config?.showWhenFalse ?? false
  const shouldShow = value ? showWhenTrue : showWhenFalse
</script>

{#if shouldShow && config?.icon}
  <div class="flex justify-center">
    <Icon src={config.icon} class={config.iconClass ?? 'size-4 text-icon'} />
  </div>
{/if}
