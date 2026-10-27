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
  //
  // With `reorderable` the deck also becomes a drag-to-reorder list, toggled
  // by a Reorder button in the head. Entering reorder mode fades a drag handle
  // in at each card's left edge and disables every button in the deck bar the
  // toggle; a card's own content stops taking pointer events, so its links and
  // menus are inert while reordering. Cards are moved by dragging only, and
  // Escape is the one key bound, to leave the mode.

  let {
    items = $bindable([]),
    card,
    label = '',
    action,
    reorderable = false,
    reordering = $bindable(false),
    getId = (item: T) => (item as any)?.id ?? (item as any),
    name = '',
    reorderLabel = 'Reorder',
    reorderDoneLabel = 'Done',
    onreorder,
    class: className
  }: CardDeckProps<T> = $props()

  let root: HTMLDivElement | undefined = $state()
  let draggingId: string | number | null = $state(null)
  // The commit frame: the items are reordered and the cards' offsets dropped
  // together here, two changes that cancel out — so they must not animate, or
  // each displaced card slides a slot it has already travelled.
  let settling = $state(false)

  let ids = $derived(items.map((item) => getId(item)))
  let hasHead = $derived(!!label || !!action || reorderable)

  // Turns the deck's buttons off while reordering — a card's menu or action
  // shouldn't be reachable, and it should look unreachable — sparing the
  // reorder toggle itself. Only buttons this disabled are re-enabled, so a
  // button the consumer had already disabled stays that way.
  $effect(() => {
    if (!reordering || !root) return
    const disabled = Array.from(root.querySelectorAll('button')).filter(
      (btn) => !btn.disabled && !btn.hasAttribute('data-card-deck-reorder')
    )
    disabled.forEach((btn) => (btn.disabled = true))
    return () => disabled.forEach((btn) => (btn.disabled = false))
  })

  function toggleReorder() {
    reordering = !reordering
  }

  // The deck's own cards, in DOM order, which is always the items' order.
  function cardElements(): HTMLElement[] {
    if (!root) return []
    return Array.from(root.querySelectorAll<HTMLElement>(':scope > [data-card-deck-card]'))
  }

  function onpointerdown(e: PointerEvent) {
    if (!reordering || e.button > 0 || !root) return
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-card-deck-card]')
    if (!el || el.parentElement !== root) return
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
    if (from < 0 || !root) return
    // Positions are measured once: every later position is derived from them,
    // so a card sliding out of the way can't feed back into the maths.
    const boxes = cards.map((c) => ({ top: c.offsetTop, height: c.offsetHeight }))
    const centers = boxes.map((b) => b.top + b.height / 2)
    const gap = parseFloat(getComputedStyle(root).rowGap) || 0
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
      flushSync(() => (draggingId = null))
      card.style.transform = target

      let settled = false
      function settle() {
        if (settled) return
        settled = true
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
        void root?.offsetHeight
        flushSync(() => (settling = false))
        if (to !== from) onreorder?.(next)
      }
      if (current === target) settle()
      else {
        card.addEventListener('transitionend', settle, { once: true })
        setTimeout(settle, 300)
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
  }

  // Escape is a way out of the mode, not a way to reorder — the cards
  // themselves are drag-only.
  function onkeydown(e: KeyboardEvent) {
    if (reordering && e.key === 'Escape') toggleReorder()
  }

  // Cards are grab handles while reordering, never links or buttons — this
  // also catches a link activated from the keyboard.
  function onclickcapture(e: MouseEvent) {
    if (!reordering) return
    if (!(e.target as Element | null)?.closest('[data-card-deck-card]')) return
    e.preventDefault()
    e.stopPropagation()
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={root}
  data-card-deck
  data-card-deck-reordering={reordering || undefined}
  class={cn(
    'flex flex-col gap-0.5 p-0.5 rounded-2xl bg-background-default-secondary w-full',
    className
  )}
  {onpointerdown}
  {onkeydown}
  {onclickcapture}
>
  {#if hasHead}
    <div
      data-card-deck-head
      class="text-sm font-medium text-foreground-default-secondary flex items-center justify-between gap-1 py-1.5 px-2.5"
    >
      <span data-card-deck-label>{label}</span>
      {#if action || reorderable}
        <div data-card-deck-action class="flex items-center gap-1">
          {@render action?.()}
          {#if reorderable}
            <BaseButton
              data-card-deck-reorder
              size="sm"
              icon={reordering ? Tick : undefined}
              aria-pressed={reordering}
              onclick={toggleReorder}
              class={clsx({
                // Bang-prefixed, as the resting button's own background,
                // border, hover states and icon colour would otherwise win.
                '!bg-background-success-bold !text-foreground-inverse !border-transparent hover:!bg-background-success-bold [&_svg]:!text-icon-inverse':
                  reordering
              })}
            >
              {reordering ? reorderDoneLabel : reorderLabel}
            </BaseButton>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  {#each items as item, index (getId(item))}
    <div
      data-card-deck-card
      data-card-deck-id={getId(item)}
      class={cn(
        'relative flex items-center gap-1.5 p-3 rounded-xl border border-border bg-background w-full',
        {
          'transition-[padding] duration-150 ease-out motion-reduce:transition-none': reorderable,
          // Room for the handle, a grab cursor, and the card's own content
          // made inert: the whole card is the grab target. Vertical drags
          // belong to the deck, not to the scroller.
          'pl-8 cursor-grab touch-none select-none transition-[padding,transform] [&_*]:pointer-events-none':
            reordering,
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
              'opacity-0 -translate-x-1': !reordering,
              'opacity-100 translate-x-0': reordering
            }
          )}
        />
      {/if}
      {@render card(item, index)}
    </div>
  {/each}

  {#if reorderable && name}
    <input type="hidden" {name} value={ids.join(',')} />
  {/if}
</div>
