<script lang="ts">
  import type { DrawerContextItemProps } from './types.ts'
  import InputCheckbox from './InputCheckbox.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { onMount } from 'svelte'
  import { Success, Tick } from '@invopop/ui-icons'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import TagStatus from './TagStatus.svelte'

  let {
    multiple = false,
    item = $bindable(),
    scrollIfSelected = false,
    workspace = false,
    onchange,
    onclick
  }: DrawerContextItemProps = $props()

  let el: HTMLElement | undefined = $state()

  let hasIcon = $derived(item.icon || workspace)

  let styles = $derived(
    clsx(
      { 'py-1 space-x-3': workspace },
      { 'py-1.5 space-x-1.5': !workspace },
      { 'pl-1.5': !hasIcon },
      { 'pl-2': hasIcon },
      { 'bg-workspace-accent-100': item.selected && !multiple },
      { 'group-hover:bg-neutral-100': (!item.selected && !item.disabled) || multiple }
    )
  )
  let labelStyles = $derived(
    clsx(
      { 'text-danger-500': item.destructive },
      { 'text-neutral-800': !item.destructive },
      { 'tracking-tight max-w-[200px]': workspace },
      { 'tracking-normal': !workspace }
    )
  )
  let title = $derived(item.label.length > 25 ? item.label : undefined)

  onMount(() => {
    if (!scrollIfSelected) return

    if (item.selected) {
      el?.scrollIntoView()
    }
  })

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    if (multiple) {
      item.selected = !item.selected
      onchange?.(item)
    } else {
      onclick?.(item.value)
    }
  }
</script>

<button
  bind:this={el}
  class="cursor-pointer w-full px-1 py-0.5 disabled:opacity-30 group"
  disabled={item.disabled}
  onclick={handleClick}
>
  <div class="{styles} rounded pr-2 flex items-center justify-start w-full">
    {#if workspace}
      <ProfileAvatar name={item.label} picture={item.picture} large />
    {:else if item.icon}
      <Icon
        src={item.icon}
        class="w-4 h-4 {item.destructive
          ? 'text-danger-500'
          : item.iconClass || 'text-neutral-500'}"
      />
    {/if}
    <div class="whitespace-nowrap flex-1 text-left flex flex-col truncate" {title}>
      <span class="flex items-center space-x-1.5">
        {#if item.color}
          <TagStatus status={item.color} dot />
        {/if}
        <span class="{labelStyles} text-base font-medium truncate">{item.label}</span>
      </span>

      {#if item.country}
        <span class="flex space-x-1 items-center">
          <BaseFlag country={item.country} width={10} />
          <span class="text-sm text-neutral-500 tracking-normal">
            {getCountryName(item.country)}
          </span>
        </span>
      {/if}
    </div>
    {#if multiple}
      <InputCheckbox
        bind:checked={item.selected}
        onchange={() => {
          onchange?.(item)
        }}
      />
    {:else if item.selected}
      <Icon src={Success} class="w-4 h-4 text-workspace-accent" />
    {:else if item.rightIcon}
      <Icon src={item.rightIcon} class="w-4 h-4 text-neutral-400" />
    {/if}
  </div>
</button>
