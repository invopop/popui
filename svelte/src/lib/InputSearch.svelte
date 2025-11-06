<script lang="ts">
  import { onMount } from 'svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Search } from '@invopop/ui-icons'
  import ShortcutWrapper from './ShortcutWrapper.svelte'
  import type { InputSearchProps } from './types.js'

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
    type="search"
    class="flex items-center gap-1 h-8 w-full px-2 py-1.5 pl-7 rounded-lg border bg-background-default-default text-base text-foreground-default-default placeholder:text-foreground-default-tertiary outline-none caret-workspace-accent focus:ring-0 border-border-default-secondary hover:border-border-default-secondary-hover focus:border-border-selected-bold focus:shadow-active"
    style:padding-right={shortcut ? `${shortcutKeys.length * 20 + 12}px` : undefined}
    {placeholder}
    {...rest}
    oninput={handleInput}
    {onfocus}
    {onblur}
    {onclick}
  />
  <Icon src={icon} class="absolute left-2 size-4 text-foreground-default-tertiary" />

  {#if shortcut}
    <div class="absolute right-2 flex items-center gap-1">
      {#each shortcutKeys as key}
        <ShortcutWrapper>
          <span class="text-xs font-semibold">{key}</span>
        </ShortcutWrapper>
      {/each}
    </div>
  {/if}
</div>
