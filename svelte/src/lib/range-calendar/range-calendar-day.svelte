<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui'
  import { buttonVariants } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'
  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: RangeCalendarPrimitive.DayProps = $props()
</script>

<RangeCalendarPrimitive.Day
  bind:ref
  class={cn(
    buttonVariants({ variant: 'ghost' }),
    'size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-normal leading-none',
    // today
    '[&[data-today]:not([data-selected]):not([data-outside-month])]:border-b [&[data-today]:not([data-selected]):not([data-outside-month])]:border-workspace-accent [&[data-today]:not([data-selected]):not([data-outside-month])]:rounded-none',
    // range Start
    'data-[range-start]:bg-workspace-accent data-[range-start]:text-white data-[range-start]:font-semibold data-[range-start]:shadow-active',
    // range middle
    'data-[range-middle]:rounded-none data-[range-middle]:bg-neutral-100',
    // range End
    'data-[range-end]:bg-workspace-accent data-[range-end]:text-white data-[range-end]:font-semibold data-[range-end]:shadow-active',
    // Outside months
    '[&[data-outside-month]]:text-transparent [&[data-outside-month]]:bg-transparent [&[data-outside-month]]:shadow-none [&[data-outside-month]:not([data-selected])]:pointer-events-none',
    // Disabled
    'data-[disabled]:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    // Unavailable
    'data-[unavailable]:line-through',
    // focus
    'focus:border-ring focus:ring-ring/50 focus:relative',
    // inner spans
    '[&>span]:text-xs [&>span]:opacity-70',
    className
  )}
  {...restProps}
/>
