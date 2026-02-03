<script lang="ts">
  import { onMount } from 'svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Search, Close, Pulse } from '@invopop/ui-icons'
  import ShortcutWrapper from './ShortcutWrapper.svelte'
  import type { InputSearchProps } from './types.js'
  import clsx from 'clsx'

  const debounce = (target: HTMLInputElement) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      oninput?.(target.value)
    }, 750)
  }

  let {
    value = $bindable(''),
    shortcut = '',
    placeholder = '',
    icon = Search,
    focusOnLoad = false,
    size = 'md',
    loading = false,
    oninput,
    onclick,
    onfocus,
    onblur,
    ...rest
  }: InputSearchProps = $props()

  let input: HTMLInputElement | undefined = $state()
  let timer: ReturnType<typeof setTimeout>

  export const focus = () => {
    input?.focus()
  }

  export const blur = () => {
    input?.blur()
  }

  export const toggle = () => {
    input === document.activeElement ? blur() : focus()
  }

  export const clear = () => {
    value = ''
    oninput?.('')
  }

  let shortcutKeys = $derived(shortcut.split(''))

  function handleInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    debounce(target)
  }

  onMount(() => {
    if (!focusOnLoad) return

    focus()
  })
</script>

<div class="relative flex items-center">
  <input
    bind:this={input}
    bind:value
    type="text"
    class={clsx(
      'flex items-center gap-1 w-full px-2 pl-7 rounded-lg border bg-background-default-default text-base text-foreground-default-default placeholder:text-foreground-default-tertiary outline-none caret-foreground-accent focus:ring-0 border-border-default-secondary hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active',
      {
        'h-[26px]': size === 'xs',
        'h-7 py-1': size === 'sm',
        'h-8 py-1.5': size === 'md'
      }
    )}
    style:padding-right={shortcut && (value || loading)
      ? `${shortcutKeys.length * 20 + 32}px`
      : shortcut
        ? `${shortcutKeys.length * 20 + 12}px`
        : value || loading
          ? '28px'
          : undefined}
    {placeholder}
    {...rest}
    oninput={handleInput}
    {onfocus}
    {onblur}
    {onclick}
  />
  <Icon src={icon} class="absolute left-2 size-4 text-foreground-default-tertiary" />

  {#if loading}
    <div
      class="absolute"
      style:right={shortcut ? `${shortcutKeys.length * 20 + 16}px` : '8px'}
    >
      <Icon src={Pulse} class="size-4 pulse-icon" />
    </div>
  {:else if value}
    <button
      type="button"
      class="absolute text-foreground-default-tertiary hover:text-foreground-default-default"
      style:right={shortcut ? `${shortcutKeys.length * 20 + 16}px` : '8px'}
      onclick={clear}
      tabindex="-1"
    >
      <Icon src={Close} class="size-4" />
    </button>
  {/if}

  {#if shortcut}
    <div class="absolute right-2 flex items-center gap-1">
      {#each shortcutKeys as key}
        <ShortcutWrapper>
          <span class="text-sm font-semibold">{key}</span>
        </ShortcutWrapper>
      {/each}
    </div>
  {/if}
</div>
