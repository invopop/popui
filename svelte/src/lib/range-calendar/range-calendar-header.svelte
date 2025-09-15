<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: RangeCalendarPrimitive.HeaderProps = $props()
</script>

<RangeCalendarPrimitive.Header
  bind:ref
  class={cn(
    'h-11 flex w-full items-center justify-center gap-1.5 text-base font-medium pt-2 pb-3',
    className
  )}
  {...restProps}
/>
