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
    'size-(--cell-size) flex select-none flex-col items-center justify-center gap-1 whitespace-nowrap p-0 font-medium leading-none rounded-lg text-foreground!',
    // today
    '[&[data-today]:not([data-selected]):not([data-outside-month])]:border-b [&[data-today]:not([data-selected]):not([data-outside-month])]:border-background-accent [&[data-today]:not([data-selected]):not([data-outside-month])]:rounded-none',
    // range Start
    'data-[range-start]:bg-background-accent data-[range-start]:text-foreground-inverse! data-[range-start]:font-semibold data-[range-start]:shadow-[0px_0px_0px_2px_rgba(22,153,88,0.12)]',
    // range middle
    'data-[range-middle]:rounded-none data-[range-middle]:bg-background-default-secondary',
    // range End
    'data-[range-end]:bg-background-accent data-[range-end]:text-foreground-inverse! data-[range-end]:font-semibold data-[range-end]:shadow-[0px_0px_0px_2px_rgba(22,153,88,0.12)]',
    // Outside months - must come after range styles to override
    '[&[data-outside-month]]:!text-transparent [&[data-outside-month]]:!bg-transparent [&[data-outside-month]]:!shadow-none [&[data-outside-month]:not([data-selected])]:pointer-events-none',
    // Disabled
    'data-[disabled]:text-foreground-default-tertiary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    // Unavailable
    'data-[unavailable]:line-through',
    // focus
    'focus:border-ring focus:ring-ring/50 focus:relative',
    // Default text color
    'text-foreground-default-primary',
    // inner spans
    '[&>span]:text-sm [&>span]:opacity-70',
    className
  )}
  {...restProps}
/>
