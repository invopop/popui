<script lang="ts">
  import { RangeCalendar as RangeCalendarPrimitive } from 'bits-ui'
  import { buttonVariants, type ButtonVariant } from '$lib/button/index.js'
  import { cn } from '$lib/utils.js'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronLeft } from '@invopop/ui-icons'
  let {
    ref = $bindable(null),
    class: className,
    children,
    variant = 'outline',
    ...restProps
  }: RangeCalendarPrimitive.PrevButtonProps & {
    variant?: ButtonVariant
  } = $props()
</script>

{#snippet Fallback()}
  <Icon src={ChevronLeft} class="size-4 shrink-0" />
{/snippet}
<RangeCalendarPrimitive.PrevButton
  bind:ref
  class={cn(
    buttonVariants({ variant, size: 'sm' }),
    'size-6 group select-none disabled:opacity-50 rtl:rotate-180',
    className
  )}
  children={children || Fallback}
  {...restProps}
/>
