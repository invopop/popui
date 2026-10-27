<script lang="ts" generics="T">
  import clsx from 'clsx'
  import type { CardDeckProps } from './types'
  import { cn } from './utils.js'

  // CardDeck stacks cards on a tinted background — use it to group related
  // cards into one visual unit (billing plans, payment methods, addresses).
  // With `href` each card is a link; with `maxHeight` the cards scroll under a
  // fixed head, faded at whichever edge has more to show.

  let {
    items = [],
    card,
    label = '',
    action,
    href,
    maxHeight = '',
    class: className
  }: CardDeckProps<T> = $props()

  let list: HTMLDivElement | undefined = $state()
  let fadeTop = $state(false)
  let fadeBottom = $state(false)
  let overflowing = $state(false)

  let hasHead = $derived(!!label || !!action)

  // Fades the scrolled list's edges only where there is more to scroll to, so
  // a list at rest at the top shows a hard top edge and a soft bottom one.
  let listMask = $derived.by(() => {
    if (!fadeTop && !fadeBottom) return undefined
    const top = fadeTop ? 'transparent 0, black 24px' : 'black 0'
    const bottom = fadeBottom ? 'black calc(100% - 24px), transparent 100%' : 'black 100%'
    return `linear-gradient(to bottom, ${top}, ${bottom})`
  })

  function updateFade() {
    if (!list || !maxHeight) {
      fadeTop = fadeBottom = overflowing = false
      return
    }
    overflowing = list.scrollHeight > list.clientHeight + 1
    fadeTop = list.scrollTop > 0
    fadeBottom = list.scrollTop + list.clientHeight < list.scrollHeight - 1
  }

  // A capped list doesn't change size as cards come and go, so the cards are
  // observed too; re-run on every change of the items to pick up new ones.
  $effect(() => {
    if (!list || !maxHeight) return updateFade()
    void items.length
    updateFade()
    const observer = new ResizeObserver(updateFade)
    observer.observe(list)
    Array.from(list.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  })
</script>

<div
  data-card-deck
  class={cn(
    'flex flex-col gap-0.5 p-0.5 rounded-2xl bg-background-default-secondary w-full',
    className
  )}
>
  {#if hasHead}
    <div
      data-card-deck-head
      class="text-sm font-medium text-foreground-default-secondary flex items-center justify-between gap-1 py-1.5 px-2.5"
    >
      <span data-card-deck-label>{label}</span>
      {#if action}
        <div data-card-deck-action class="flex items-center gap-1">
          {@render action()}
        </div>
      {/if}
    </div>
  {/if}

  <!-- An overflowing list is a focusable, labelled region, so the cut-off cards
       can be scrolled to from the keyboard even when they hold nothing focusable. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    bind:this={list}
    data-card-deck-cards
    role={overflowing ? 'region' : undefined}
    aria-label={overflowing ? label || 'Cards' : undefined}
    tabindex={overflowing ? 0 : undefined}
    class={clsx('flex flex-col gap-0.5 rounded-xl', {
      // No scrollbar: it would sit over the cards' right edge, and the faded,
      // cut-off last card already says the list scrolls.
      'overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden':
        !!maxHeight,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-selected-bold':
        overflowing
    })}
    style:max-height={maxHeight || undefined}
    style:mask-image={listMask}
    style:-webkit-mask-image={listMask}
    onscroll={updateFade}
  >
    {#each items as item, index}
      {@const cardHref = href?.(item)}
      <svelte:element
        this={cardHref ? 'a' : 'div'}
        href={cardHref}
        data-card-deck-card
        class={cn(
          'flex items-center gap-1.5 p-3 rounded-xl border border-border bg-background w-full',
          {
            // The inputs' focus border, without their outer shadow: the card's
            // own border sits inside it, where a scrolling list can't clip it.
            'hover:border-border-default-secondary focus-visible:outline-none focus-visible:border-border-selected-bold':
              !!cardHref
          }
        )}
      >
        {@render card(item, index)}
      </svelte:element>
    {/each}
  </div>
</div>
