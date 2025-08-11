<script lang="ts">
  import type { DrawerOption } from './types.ts'
  import InputCheckbox from './InputCheckbox.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher, onMount } from 'svelte'
  import { Tick } from '@invopop/ui-icons'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import TagStatus from './TagStatus.svelte'

  const dispatch = createEventDispatcher()

  export let multiple = false
  export let item: DrawerOption
  export let scrollIfSelected = false
  export let workspace = false

  let el: HTMLElement

  $: hasIcon = item.icon || workspace

  $: styles = clsx(
    { 'py-1 space-x-3': workspace },
    { 'py-1.5 space-x-1': !workspace },
    { 'px-1.5': hasIcon },
    { 'px-2': !hasIcon },
    { 'bg-workspace-accent-100': item.selected && !multiple },
    { 'hover:bg-neutral-100 rounded': !item.selected }
  )
  $: labelStyles = clsx(
    { 'text-danger-500': item.destructive },
    { 'text-neutral-800': !item.destructive },
    { 'tracking-tight max-w-[200px]': workspace },
    { 'tracking-normal': !workspace }
  )

  onMount(() => {
    if (!scrollIfSelected) return

    if (item.selected) {
      el.scrollIntoView()
    }
  })
</script>

<button
  bind:this={el}
  class="{styles} border border-transparent rounded px-1 flex items-center justify-start w-full disabled:opacity-30"
  disabled={item.disabled}
  on:click|stopPropagation={() => {
    if (multiple) {
      item.selected = !item.selected
      dispatch('change', item)
    } else {
      dispatch('click', item.value)
    }
  }}
>
  {#if workspace}
    <ProfileAvatar name={item.label} picture={item.picture} large />
  {:else if item.icon}
    <Icon
      src={item.icon}
      class="w-4 h-4 {item.destructive ? 'text-danger-500' : item.iconClass || 'text-neutral-500'}"
    />
  {/if}
  <div class="whitespace-nowrap flex-1 text-left flex flex-col truncate" title={item.label}>
    <span class="flex items-center space-x-1.5">
      {#if item.color}
        <TagStatus status={item.color} dot />
      {/if}
      <span class="{labelStyles} text-base font-medium truncate">{item.label}</span>
    </span>

    {#if item.country}
      <span class="flex space-x-1 items-center">
        <BaseFlag country={item.country} width={10} />
        <span class="text-sm text-neutral-500 tracking-normal">{getCountryName(item.country)}</span>
      </span>
    {/if}
  </div>
  {#if multiple}
    <InputCheckbox
      bind:checked={item.selected}
      on:change={() => {
        dispatch('change', item)
      }}
    />
  {:else if item.selected}
    <Icon src={Tick} class="w-5 h-5 text-workspace-accent text-neutral-500" />
  {:else if item.rightIcon}
    <Icon src={item.rightIcon} class="w-5 h-5 text-neutral-800" />
  {/if}
</button>
