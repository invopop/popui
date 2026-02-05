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
  class="overflow-hidden transition-all duration-300 ease-in-out relative rounded-md"
  style={expanded ? 'width: 12rem;' : 'width: 2.5rem;'}
  use:clickOutside
  onclick_outside={handleClickOutside}
>
  <div
    class="w-48 transition-opacity duration-200 absolute left-0 top-0"
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
    class="transition-opacity duration-200"
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
