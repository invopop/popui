<script lang="ts">
  import clsx from 'clsx'
  import type { DataListItemProps } from './types'
  import BaseButton from './BaseButton.svelte'
  import { Duplicate, ExternalLink } from '@invopop/ui-icons'
  import { copyToClipboard, isModifiedClick, openInNewTab } from './helpers'

  let {
    label = '',
    value = '',
    monospaced = false,
    vertical = false,
    children,
    linkHref,
    linkTarget,
    onCopy,
    onLink
  }: DataListItemProps = $props()

  let areaEl: HTMLDivElement | undefined = $state()

  let valueStyles = $derived(
    clsx('text-foreground font-medium text-base min-w-0', {
      'font-mono slashed-zero tabular-nums lining-nums': monospaced,
      truncate: !children,
      'leading-6': !children,
      'flex items-start': children
    })
  )

  let hasLink = $derived(!!(linkHref || onLink))
  let clickAction = $derived(!!onCopy || hasLink)
  let linkRel = $derived(linkTarget === '_blank' ? 'noopener' : undefined)

  const handleAreaClick = async (e: MouseEvent) => {
    // Only handle click if not clicking on a button or the link itself
    if ((e.target as HTMLElement).closest('button, a')) return

    if (onCopy) {
      await copyToClipboard(value)
      onCopy()
      return
    }

    if (linkHref && isModifiedClick(e)) {
      openInNewTab(linkHref)
      return
    }

    if (linkHref) {
      // Click the rendered anchor so the client-side router (e.g. SvelteKit)
      // handles the navigation the same way a direct click would.
      areaEl?.querySelector<HTMLAnchorElement>('a[href]')?.click()
      return
    }

    onLink?.()
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
      'min-w-[148px]': !vertical
    })}
  >
    {label}
  </div>
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={areaEl}
    class={clsx(
      'flex flex-1 gap-1.5 items-start group hover:bg-background-default-secondary py-1 pl-2 pr-1 rounded-md min-w-0 min-h-8',
      { 'cursor-pointer': clickAction }
    )}
    onclick={clickAction ? handleAreaClick : undefined}
  >
    <div
      class={clsx('flex-1 min-w-0', {
        'overflow-x-auto': children
      })}
    >
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
    {#if hasLink}
      <BaseButton
        size="sm"
        variant="outline"
        icon={ExternalLink}
        href={linkHref}
        target={linkTarget}
        rel={linkRel}
        onclick={onLink}
        class="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    {/if}
  </div>
</div>
