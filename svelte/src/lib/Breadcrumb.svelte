<script lang="ts">
  import type { BreadcrumbProps } from './types.js'
  import BaseFlag from './BaseFlag.svelte'
  import clsx from 'clsx'

  let { breadcrumb, isLast, oncopied }: BreadcrumbProps = $props()

  let textStyles = $derived(
    clsx('font-sans text-lg leading-6 tracking-[-0.16px] whitespace-nowrap', {
      'text-foreground-default-secondary font-normal': !isLast,
      'text-foreground font-medium': isLast,
      'cursor-pointer': breadcrumb.copiable
    })
  )

  async function handleClick(event: MouseEvent) {
    event.stopPropagation()
    await navigator.clipboard.writeText(breadcrumb.label)
    oncopied?.(breadcrumb.label)
  }
</script>

<li class="flex items-center gap-1">
  {#if breadcrumb.url}
    <a href={breadcrumb.url} class={textStyles}>
      {breadcrumb.label}
    </a>
  {:else if breadcrumb.copiable}
    <button class={textStyles} onclick={handleClick}>
      {breadcrumb.label}
    </button>
  {:else}
    <span class={textStyles}>
      {breadcrumb.label}
    </span>
  {/if}
  {#if breadcrumb.country}
    <BaseFlag country={breadcrumb.country} />
  {/if}
</li>
