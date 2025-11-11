<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: RangeCalendarPrimitive.HeadCellProps = $props()
</script>

<RangeCalendarPrimitive.HeadCell
  bind:ref
  class={cn(
    'text-foreground-default-tertiary w-(--cell-size) h-(--cell-size) text-xs font-normal border-b border-border flex items-center justify-center',
    className
  )}
  {...restProps}
/>
