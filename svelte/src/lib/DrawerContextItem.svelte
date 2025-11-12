<script lang="ts">
  import type { DrawerContextItemProps } from './types.ts'
  import InputCheckbox from './InputCheckbox.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { onMount } from 'svelte'
  import { Success } from '@invopop/ui-icons'
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import TagStatus from './TagStatus.svelte'

  let {
    multiple = false,
    item = $bindable(),
    scrollIfSelected = false,
    onchange,
    onclick
  }: DrawerContextItemProps = $props()

  let el: HTMLElement | undefined = $state()

  let styles = $derived(
    clsx(
      'px-2 py-1.5 space-x-1.5',
      { 'bg-background-selected': item.selected && !multiple },
      {
        'group-hover:bg-background-default-secondary':
          (!item.selected && !item.disabled) || multiple
      }
    )
  )
  let labelStyles = $derived(
    clsx({ 'text-danger-500': item.destructive }, { 'text-neutral-800': !item.destructive })
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
  class="cursor-pointer w-full disabled:opacity-30 group"
  disabled={item.disabled}
  onclick={handleClick}
>
  <div class="{styles} rounded-md pr-2 flex items-center justify-start w-full">
    {#if item.icon}
      <Icon
        src={item.icon}
        class="w-4 h-4 {item.destructive ? 'text-icon-critical' : item.iconClass || 'text-icon'}"
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
          <span class="text-sm text-foreground-default-secondary">
            {getCountryName(item.country)}
          </span>
        </span>
      {/if}
    </div>
    {#if multiple}
      <InputCheckbox
        checked={item.selected ?? false}
        onchange={(value) => {
          item.selected = value
          onchange?.(item)
        }}
      />
    {:else if item.selected}
      <Icon src={Success} class="size-4 text-icon-selected" />
    {:else if item.rightIcon}
      <Icon src={item.rightIcon} class="size-4 text-icon-default-secondary" />
    {/if}
  </div>
</button>
