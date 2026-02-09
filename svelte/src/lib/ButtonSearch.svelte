<script lang="ts">
  import { Search, Pulse } from '@invopop/ui-icons'
  import BaseButton from './BaseButton.svelte'
  import InputSearch from './InputSearch.svelte'
  import { clickOutside } from './clickOutside.js'
  import type { ButtonSearchProps } from './types.js'

  let {
    value = $bindable(''),
    expanded = $bindable(false),
    placeholder = 'Search...',
    size = 'sm',
    loading = false,
    autofocus = false,
    oninput,
    onExpand,
    onCollapse
  }: ButtonSearchProps = $props()

  let inputSearch: InputSearch | undefined = $state()
  let isLoadingCollapsed = $derived(loading && !expanded)

  function handleExpand() {
    expanded = true
    onExpand?.()
  }

  function handleClickOutside() {
    if (expanded && value.trim() === '') {
      expanded = false
      onCollapse?.()
    }
  }

  function handleInput(newValue: string) {
    value = newValue
    oninput?.(newValue)
  }

  $effect(() => {
    if (expanded && inputSearch) {
      inputSearch.focus()
    }
  })
</script>

<div
  class="overflow-hidden transition-all duration-150 ease-in-out relative rounded-md"
  class:w-[280px]={expanded}
  class:w-10={!expanded}
  use:clickOutside
  onclick_outside={handleClickOutside}
>
  <div
    class="w-[280px] transition-opacity duration-100 absolute left-0 top-0"
    class:opacity-0={!expanded}
    class:opacity-100={expanded}
    class:pointer-events-none={!expanded}
  >
    <InputSearch
      bind:this={inputSearch}
      bind:value
      {placeholder}
      {size}
      {loading}
      {autofocus}
      oninput={handleInput}
    />
  </div>
  <div
    class="transition-opacity duration-100"
    class:opacity-0={expanded}
    class:opacity-100={!expanded}
    class:pointer-events-none={expanded}
  >
    <BaseButton
      icon={isLoadingCollapsed ? Pulse : Search}
      class={isLoadingCollapsed ? 'pulse-icon' : ''}
      onclick={handleExpand}
    />
  </div>
</div>
