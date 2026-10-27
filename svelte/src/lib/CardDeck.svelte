<script lang="ts" generics="T">
  import { flushSync } from 'svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Drag, Tick } from '@invopop/ui-icons'
  import clsx from 'clsx'
  import BaseButton from './BaseButton.svelte'
  import type { CardDeckProps } from './types'
  import { cn } from './utils.js'

  // CardDeck stacks cards on a tinted background — use it to group related
  // cards into one visual unit (billing plans, payment methods, addresses).
  // With `href` each card is a link; with `maxHeight` the cards scroll under a
  // fixed head, faded at whichever edge has more to show.
  //
  // With `reorderable` the deck also becomes a drag-to-reorder list, toggled
  // by a Reorder button in the head. Entering reorder mode fades a drag handle
  // in at each card's left edge and makes the head's action and every card's
  // content inert, so their links, menus and buttons can't be reached and read
  // as disabled; only the toggle stays live. Cards are moved by dragging only,
  // and Escape is the one key bound, to leave the mode.

  // Fallback identities for object items carrying no id, keyed by the item so
  // they outlive any reordering. An item is numbered in the order this deck
  // first sees it and keeps that number from then on: re-deriving it from the
  // live index would relabel every item on every move, losing the permutation.
  // The numbers mean nothing outside this deck instance, so a deck whose order
  // is persisted needs a getId returning real ids.
  const fallbackIds = new WeakMap<object, string>()
  let fallbackCount = 0

  function defaultGetId(item: T): string | number {
    if (item === null || typeof item !== 'object') return item as string | number
    const id = (item as { id?: string | number }).id
    if (id !== undefined && id !== null) return id
    if (!fallbackIds.has(item)) fallbackIds.set(item, String(++fallbackCount))
    return fallbackIds.get(item) as string
  }

  let {
    items = $bindable([]),
    card,
    label = '',
    action,
    reorderable = false,
    reordering = $bindable(false),
    getId = defaultGetId,
    href,
    maxHeight = '',
    name = '',
    reorderLabel = 'Reorder',
    reorderDoneLabel = 'Done',
    onreorder,
    class: className
  }: CardDeckProps<T> = $props()

  let root: HTMLDivElement | undefined = $state()
  let list: HTMLDivElement | undefined = $state()
  let fadeTop = $state(false)
  let fadeBottom = $state(false)
  let draggingId: string | number | null = $state(null)
  // The commit frame: the items are reordered and the cards' offsets dropped
  // together here, two changes that cancel out — so they must not animate, or
  // each displaced card slides a slot it has already travelled.
  let settling = $state(false)
  // From release until the drop is committed. A drag started in that window
  // would be measured against cards still holding the last drop's offsets,
  // and the pending commit would then reorder by stale indices.
  let committing = false

  let ids = $derived(items.map((item) => getId(item)))
  let hasHead = $derived(!!label || !!action || reorderable)
  // Reorder mode only exists on a reorderable deck: without the toggle there
  // would be no handle and no way out of it.
  let isReordering = $derived(reorderable && reordering)

  // Wraps whatever goes inert while reordering. Inert doesn't trigger
  // BaseButton's disabled: styles, so its faded look is reapplied here.
  let inertStyles = $derived(
    clsx('contents', {
      'pointer-events-none [&_button]:opacity-30': isReordering
    })
  )

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
      fadeTop = fadeBottom = false
      return
    }
    fadeTop = list.scrollTop > 0
    fadeBottom = list.scrollTop + list.clientHeight < list.scrollHeight - 1
  }

  // A capped list doesn't change size as cards come and go, so the cards are
  // observed too; re-run on every change of the items to pick up new ones.
  $effect(() => {
    if (!list || !maxHeight) return updateFade()
    void ids
    updateFade()
    const observer = new ResizeObserver(updateFade)
    observer.observe(list)
    Array.from(list.children).forEach((child) => observer.observe(child))
    return () => observer.disconnect()
  })

  // Cards are grab handles while reordering: a link card mustn't navigate,
  // whether clicked or activated from the keyboard.
  function onCardClick(e: MouseEvent) {
    if (isReordering) e.preventDefault()
  }

  function toggleReorder() {
    reordering = !reordering
  }

  // The deck's own cards, in DOM order, which is always the items' order.
  function cardElements(): HTMLElement[] {
    if (!list) return []
    return Array.from(list.querySelectorAll<HTMLElement>(':scope > [data-card-deck-card]'))
  }

  function onpointerdown(e: PointerEvent) {
    if (!isReordering || e.button > 0 || !list) return
    if (committing || draggingId !== null) return
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-card-deck-card]')
    if (!el || el.parentElement !== list) return
    // Suppresses the text selection and native image drag that would
    // otherwise start under the pointer. It also keeps focus off the card,
    // which is deliberate: cards are dragged, never selected.
    e.preventDefault()
    startDrag(el, e)
  }

  // Drags a card vertically within the deck. The dragged card follows the
  // pointer while the cards it passes slide into the slot it left, and on
  // release it animates into its new slot before the items are reordered —
  // the card is already sitting where it will land, so the commit is
  // invisible.
  function startDrag(card: HTMLElement, event: PointerEvent) {
    const cards = cardElements()
    const from = cards.indexOf(card)
    if (from < 0 || !list) return
    // Positions are measured once: every later position is derived from them,
    // so a card sliding out of the way can't feed back into the maths.
    const boxes = cards.map((c) => ({ top: c.offsetTop, height: c.offsetHeight }))
    const centers = boxes.map((b) => b.top + b.height / 2)
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0
    // Removing the dragged card from the flow closes a gap this tall.
    const slot = boxes[from].height + gap
    const startY = event.clientY
    let to = from

    draggingId = ids[from]
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'
    // Capture keeps the moves coming even when the pointer outruns the card.
    try {
      card.setPointerCapture(event.pointerId)
    } catch {
      // Browsers reject ids they no longer track, which is harmless here.
    }

    // Shifts every other card by one slot when it sits between the card's old
    // and new index — the exact offset it gets once the drag is committed.
    function layout() {
      cards.forEach((c, i) => {
        if (i === from) return
        let dy = 0
        if (to > from && i > from && i <= to) dy = -slot
        else if (to < from && i >= to && i < from) dy = slot
        c.style.transform = dy ? `translateY(${dy}px)` : ''
      })
    }

    function onMove(e: PointerEvent) {
      const dy = e.clientY - startY
      // A swap happens as the dragged card's leading edge crosses the centre
      // of its neighbour, which is where the exchange reads as complete.
      const top = boxes[from].top + dy
      const bottom = top + boxes[from].height
      let next = from
      while (next > 0 && top < centers[next - 1]) next--
      while (next < cards.length - 1 && bottom > centers[next + 1]) next++
      if (next !== to) {
        to = next
        layout()
      }
      card.style.transform = `translateY(${dy}px)`
    }

    function onUp() {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      // Where the card comes to rest: the slot it now owns, measured against
      // the layout captured at drag start.
      let rest = 0
      if (to > from) rest = boxes[to].top + boxes[to].height - boxes[from].height - boxes[from].top
      else if (to < from) rest = boxes[to].top - boxes[from].top
      const current = card.style.transform
      const target = rest ? `translateY(${rest}px)` : ''
      // Releasing the card restores its transform transition, so it glides
      // the last few pixels into place.
      committing = true
      flushSync(() => (draggingId = null))
      card.style.transform = target

      let settled = false
      function settle() {
        if (settled) return
        settled = true
        card.removeEventListener('transitionend', onTransitionEnd)
        // Committing is a swap of two equal quantities: every card's layout
        // position shifts by exactly the offset it was holding, so the reorder
        // and the transform reset cancel out to no visible movement — as long
        // as they land in one frame with transitions off.
        const next = items.slice()
        if (to !== from) next.splice(to, 0, ...next.splice(from, 1))
        flushSync(() => {
          settling = true
          if (to !== from) items = next
        })
        cards.forEach((c) => (c.style.transform = ''))
        // Flushes layout so the untransitioned state is what the frame paints.
        void list?.offsetHeight
        flushSync(() => (settling = false))
        committing = false
        if (to !== from) onreorder?.(next)
      }
      // Only the card's own glide counts: transitions inside it bubble up
      // here too, and would commit the drop before the card has landed.
      function onTransitionEnd(e: TransitionEvent) {
        if (e.target === card && e.propertyName === 'transform') settle()
      }
      if (current === target) settle()
      else {
        card.addEventListener('transitionend', onTransitionEnd)
        setTimeout(settle, 300)
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  // Escape is a way out of the mode, not a way to reorder — the cards
  // themselves are drag-only. It's heard window-wide, as focus needn't be in
  // the deck: Safari and Firefox on macOS don't focus a clicked button.
  function onkeydown(e: KeyboardEvent) {
    if (isReordering && e.key === 'Escape') toggleReorder()
  }
</script>

<svelte:window {onkeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={root}
  data-card-deck
  data-card-deck-reordering={isReordering || undefined}
  class={cn(
    'flex flex-col gap-0.5 p-0.5 rounded-2xl bg-background-default-secondary w-full',
    className
  )}
  {onpointerdown}
>
  {#if hasHead}
    <div
      data-card-deck-head
      class="text-sm font-medium text-foreground-default-secondary flex items-center justify-between gap-1 py-1.5 px-2.5"
    >
      <span data-card-deck-label>{label}</span>
      {#if action || reorderable}
        <div data-card-deck-action class="flex items-center gap-1">
          {#if action}
            <div data-card-deck-action-content inert={isReordering} class={inertStyles}>
              {@render action()}
            </div>
          {/if}
          {#if reorderable}
            <BaseButton
              data-card-deck-reorder
              size="sm"
              icon={isReordering ? Tick : undefined}
              onclick={toggleReorder}
              class={clsx({
                // Bang-prefixed, as the resting button's own background,
                // border, hover states and icon colour would otherwise win.
                '!bg-background-success-bold !text-foreground-inverse !border-transparent hover:!bg-background-success-bold [&_svg]:!text-icon-inverse':
                  isReordering
              })}
            >
              {isReordering ? reorderDoneLabel : reorderLabel}
            </BaseButton>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  <!-- Positioned, so the cards' offsetTop is measured against the list and not
       thrown off by its scroll position. -->
  <div
    bind:this={list}
    data-card-deck-cards
    class={clsx('relative flex flex-col gap-0.5', {
      // No scrollbar: it would sit over the cards' right edge, and the faded,
      // cut-off last card already says the list scrolls.
      'overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden':
        !!maxHeight
    })}
    style:max-height={maxHeight || undefined}
    style:mask-image={listMask}
    style:-webkit-mask-image={listMask}
    onscroll={updateFade}
  >
    {#each items as item, index (getId(item))}
      {@const cardHref = href?.(item)}
      <svelte:element
        this={cardHref ? 'a' : 'div'}
        href={cardHref}
        draggable={cardHref ? 'false' : undefined}
        onclick={cardHref ? onCardClick : undefined}
        data-card-deck-card
        data-card-deck-id={getId(item)}
        class={cn(
          'relative flex items-center gap-1.5 p-3 rounded-xl border border-border bg-background w-full',
          {
            'transition-[padding] duration-150 ease-out motion-reduce:transition-none': reorderable,
            'hover:border-border-default-secondary': !!cardHref && !isReordering,
            // Room for the handle and a grab cursor: the whole card is the grab
            // target. Vertical drags belong to the deck, not to the scroller.
            'pl-8 cursor-grab touch-none select-none transition-[padding,transform]': isReordering,
            '!transition-none': settling || draggingId === getId(item),
            // The card under the pointer tracks it 1:1 and lifts above the
            // cards it passes.
            'cursor-grabbing z-10 shadow-[0_6px_16px_rgb(0_0_0/0.12)]': draggingId === getId(item)
          }
        )}
      >
        {#if reorderable}
          <!-- Present up front, collapsed, so entering the mode has something to
               animate in from. -->
          <Icon
            src={Drag}
            data-card-deck-handle
            aria-hidden="true"
            class={clsx(
              'absolute left-2 top-1/2 -translate-y-1/2 size-4 text-icon pointer-events-none transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-none',
              {
                'opacity-0 -translate-x-1': !isReordering,
                'opacity-100 translate-x-0': isReordering
              }
            )}
          />
        {/if}
        <!-- Inert while reordering, so the card's links, menus and buttons
             can't be reached and the pointer lands on the card itself. -->
        <div data-card-deck-content inert={isReordering} class={inertStyles}>
          {@render card(item, index)}
        </div>
      </svelte:element>
    {/each}
  </div>

  {#if reorderable && name}
    <input type="hidden" {name} value={ids.join(',')} />
  {/if}
</div>
