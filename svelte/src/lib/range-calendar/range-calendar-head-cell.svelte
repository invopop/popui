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
    'text-[#989AA4] w-(--cell-size) h-(--cell-size) text-sm font-normal border-b border-neutral-100 flex items-center justify-center',
    className
  )}
  {...restProps}
/>
