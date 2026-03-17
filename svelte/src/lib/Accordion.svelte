<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronDown } from '@invopop/ui-icons'
  import clsx from 'clsx'
  import type { AccordionProps } from './types'
  import { cn } from './utils.js'

  let { label, open = true, children, onToggle, class: className }: AccordionProps = $props()

  let isOpen = $derived(open)

  function toggle() {
    isOpen = !isOpen
    onToggle?.(isOpen)
  }
</script>

<div class={cn('flex flex-col', className)}>
  <button
    data-accordion-trigger
    class="flex items-center gap-1.5 overflow-clip pl-2 py-2 pr-1.5 rounded-lg cursor-pointer"
    onclick={toggle}
  >
    <p data-accordion-label class="text-sm font-medium text-foreground-default-secondary text-left">
      {label}
    </p>
    <Icon
      data-accordion-icon
      src={ChevronDown}
      class={clsx('size-3 text-icon-default-secondary transition-transform', {
        '-rotate-90': !isOpen
      })}
    />
  </button>
  {#if isOpen}
    <div data-accordion-content>
      {@render children?.()}
    </div>
  {/if}
</div>
