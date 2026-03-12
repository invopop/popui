<script lang="ts">
  import clsx from 'clsx'
  import type { DataListItemProps } from './types'
  import BaseButton from './BaseButton.svelte'
  import { Duplicate, ExternalLink } from '@invopop/ui-icons'
  import { copyToClipboard } from './helpers'

  let {
    label = '',
    value = '',
    monospaced = false,
    vertical = false,
    children,
    onCopy,
    onLink
  }: DataListItemProps = $props()

  let valueStyles = $derived(
    clsx('text-foreground font-medium text-base min-w-0 h-6 flex items-center', {
      'font-mono slashed-zero tabular-nums lining-nums': monospaced,
      truncate: !children
    })
  )

  let clickAction = $derived(onCopy || onLink)

  const handleAreaClick = async (e: MouseEvent) => {
    // Only handle click if not clicking on a button
    if ((e.target as HTMLElement).closest('button')) return

    if (onCopy) {
      await copyToClipboard(value)
      onCopy()
    } else if (onLink) {
      onLink()
    }
  }
</script>

<div
  class={clsx('flex', {
    'flex-col gap-1.5': vertical,
    'gap-6 items-center': !vertical
  })}
>
  <div
    class={clsx('text-foreground-default-secondary text-base', {
      'pl-2': vertical,
      'min-w-[125px]': !vertical
    })}
  >
    {label}
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={clsx(
      'flex flex-1 gap-1.5 items-start group hover:bg-background-default-secondary py-1 pl-2 pr-1 rounded-md min-w-0 min-h-8',
      { 'cursor-pointer': clickAction }
    )}
    onclick={clickAction ? handleAreaClick : undefined}
  >
    <div class="flex-1 min-w-0 overflow-x-auto">
      <div class={valueStyles}>
        {#if children}
          {@render children()}
        {:else}
          {value}
        {/if}
      </div>
    </div>
    {#if onCopy}
      <BaseButton
        size="sm"
        variant="outline"
        icon={Duplicate}
        onclick={async () => {
          await copyToClipboard(value)
          onCopy()
        }}
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    {/if}
    {#if onLink}
      <BaseButton
        size="sm"
        variant="outline"
        icon={ExternalLink}
        onclick={onLink}
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    {/if}
  </div>
</div>
