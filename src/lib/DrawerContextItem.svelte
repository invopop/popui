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

  const dispatch = createEventDispatcher()

  export let multiple = false
  export let item: DrawerOption

  let el: HTMLElement

  $: hasIcon = item.icon || item.country

  $: styles = clsx(
    { 'py-1 space-x-3': item.country },
    { 'py-1.5 space-x-2': !item.country },
    { 'px-1.5': hasIcon },
    { 'px-2': !hasIcon },
    { 'bg-accent-100': item.selected && item.country },
    { 'bg-accent-50': item.selected && !item.country },
    { 'hover:bg-neutral-50 hover:border-neutral-100 rounded-sm': !item.selected }
  )
  $: labelStyles = clsx(
    { 'text-danger-500': item.destructive },
    { 'text-neutral-800': !item.destructive },
    { 'text-base font-semibold tracking-tight': item.country },
    { 'text-sm font-medium tracking-normal': !item.country }
  )

  onMount(() => {
    if (item.selected) {
      el.scrollIntoView()
    }
  })
</script>

<button
  bind:this={el}
  class="{styles} border border-transparent rounded pr-2 flex items-center justify-start w-full"
  on:click|stopPropagation={() => {
    dispatch('click', item.value)
  }}
>
  {#if item.country}
    <ProfileAvatar name={item.label} large />
  {:else if item.icon}
    <Icon
      src={item.icon}
      class="w-5 h-5 {item.destructive ? 'text-danger-500' : 'text-neutral-500'}"
    />
  {/if}
  <div class="whitespace-nowrap flex-1 text-left max-w-40 truncate" title={item.label}>
    <span class={labelStyles}>{item.label}</span>
    {#if item.country}
      <span class="flex space-x-1 items-center">
        <BaseFlag country={item.country} />
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
    <Icon src={Tick} class="w-5 h-5 text-accent-500" />
  {:else if item.rightIcon}
    <Icon src={item.rightIcon} class="w-5 h-5 text-neutral-300" />
  {/if}
</button>
