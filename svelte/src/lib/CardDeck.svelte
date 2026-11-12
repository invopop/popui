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
  // Spreading reads every element, so an item replaced in place counts too,
  // not only a change of length.
  $effect(() => {
    if (!list || !maxHeight) return updateFade()
    void [...items]
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
    // The scrolling list's focus ring is drawn by the deck: the list's own
    // edge-fade mask would hide any ring on the list.
    'has-[[data-card-deck-cards]:focus-visible]:ring-2 has-[[data-card-deck-cards]:focus-visible]:ring-border-selected-bold',
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
    class={clsx('flex flex-col gap-0.5 focus-visible:outline-none', {
      // No scrollbar: it would sit over the cards' right edge, and the faded,
      // cut-off last card already says the list scrolls.
      // The scroll padding matches the edge fade, so a card scrolled into view
      // by focus stops clear of the fade instead of under it.
      'overflow-y-auto overscroll-contain scroll-py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden':
        !!maxHeight
    })}
    style:max-height={maxHeight || undefined}
    style:mask-image={listMask}
    style:-webkit-mask-image={listMask}
    onscroll={updateFade}
  >
    <!-- Keyed by the item itself, so a card's state (a loaded image, a typed
         value) stays with its item when the list is filtered or reordered. -->
    {#each items as item, index (item)}
      {@const cardHref = href?.(item)}
      <svelte:element
        this={cardHref ? 'a' : 'div'}
        href={cardHref}
        data-card-deck-card
        class={cn(
          'flex items-center gap-1.5 p-3 rounded-xl border border-border bg-background w-full',
          {
            // The inputs' focus border, doubled by an inset ring: both sit
            // inside the card, where a scrolling list can't clip them.
            'hover:border-border-default-secondary focus-visible:outline-none focus-visible:border-border-selected-bold focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-border-selected-bold':
              !!cardHref
          }
        )}
      >
        {@render card(item, index)}
      </svelte:element>
    {/each}
  </div>
</div>
