<script lang="ts">
  import type { DrawerContextItemProps } from './types.ts'
  import InputCheckbox from './InputCheckbox.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { onMount, onDestroy } from 'svelte'
  import { Success } from '@invopop/ui-icons'
  import clsx from 'clsx'
  import BaseFlag from './BaseFlag.svelte'
  import { getCountryName } from './helpers.js'
  import TagStatus from './TagStatus.svelte'
  import ProfileAvatar from './ProfileAvatar.svelte'

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
      { 'bg-background-selected': item?.selected && !multiple },
      {
        'group-hover:bg-background-default-secondary':
          (!item?.selected && !item?.disabled) || multiple
      }
    )
  )

  let labelStyles = $derived(
    clsx(
      { 'text-foreground-critical': item?.destructive },
      { 'text-foreground': !item?.destructive },
      { 'opacity-30': item?.locked }
    )
  )
  let title = $derived(item?.label && item.label.length > 25 ? item.label : undefined)

  onMount(() => {
    if (scrollIfSelected && item?.selected) {
      el?.scrollIntoView()
    }
  })

  function handleClick(event: MouseEvent) {
    event.stopPropagation()
    if (!item) return

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
  disabled={item?.disabled}
  onclick={handleClick}
>
  <div class="bg-background rounded-md">
    <div class="{styles} rounded-md pr-2 flex items-center justify-start w-full">
    {#if item?.useAvatar}
      <ProfileAvatar name={item?.label || ''} picture={item?.picture || ''} variant="sm" />
    {:else if item?.picture}
      <ProfileAvatar name={item?.label || ''} picture={item?.picture} variant="sm" />
    {:else if item?.icon}
      <Icon
        src={item.icon}
        class="w-4 h-4 {item?.destructive
          ? 'text-icon-critical'
          : item?.iconClass || 'text-icon'} {item?.locked ? 'opacity-30' : ''}"
      />
    {/if}
    <div class="whitespace-nowrap flex-1 text-left flex items-center space-x-1.5 truncate" {title}>
      {#if item?.color}
        <TagStatus status={item.color} dot />
      {/if}
      <span class="{labelStyles} text-base font-medium truncate">{item?.label || ''}</span>

      {#if item?.country}
        <BaseFlag country={item.country} />
        <span class="text-xs font-medium text-foreground-default-secondary uppercase">
          {item.country}
        </span>
      {/if}
    </div>
    {#if item?.action}
      <div class="no-drag !cursor-default">
        {@render item.action(item)}
      </div>
    {:else if multiple}
      <InputCheckbox
        checked={item?.selected ?? false}
        onchange={(value) => {
          if (item) {
            item.selected = value
            onchange?.(item)
          }
        }}
      />
    {:else if item?.selected}
      <Icon src={Success} class="size-4 text-icon-selected" />
    {:else if item?.rightIcon}
      <Icon src={item.rightIcon} class="size-4 text-icon-default-secondary" />
    {/if}
    </div>
  </div>
</button>
