<script lang="ts">
  import { Tooltip as TooltipPrimitive } from 'bits-ui'
  let { ref = $bindable(null), children }: TooltipPrimitive.TriggerProps = $props()
</script>

<TooltipPrimitive.Trigger bind:ref data-slot="tooltip-trigger">
{@render children?.()}
</TooltipPrimitive.Trigger>
