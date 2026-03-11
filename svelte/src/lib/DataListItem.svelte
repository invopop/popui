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
    children,
    onCopy,
    onLink
  }: DataListItemProps = $props()

  let valueStyles = $derived(
    clsx('text-foreground font-medium text-base truncate min-w-0', {
      'font-mono slashed-zero tabular-nums lining-nums': monospaced
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

<div class="flex gap-6 items-center group">
  <div class="text-foreground-default-secondary text-base min-w-[125px]">
    {label}
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class={clsx(
      'flex flex-1 gap-1 items-center group-hover:bg-background-default-secondary py-1 pl-2 pr-1 rounded-md min-w-0',
      { 'cursor-pointer': clickAction }
    )}
    onclick={clickAction ? handleAreaClick : undefined}
  >
    <div class="flex-1 min-w-0 h-8">
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
        variant="outline"
        icon={ExternalLink}
        onclick={onLink}
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    {/if}
  </div>
</div>
