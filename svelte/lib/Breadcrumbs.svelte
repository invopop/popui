<script lang="ts">
  import type { Breadcrumb } from './types.js'
  import { Slash } from '@invopop/ui-icons'
  import BaseFlag from './BaseFlag.svelte'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { createEventDispatcher } from 'svelte'

  export let breadcrumbs: Breadcrumb[] = []

  const dispatch = createEventDispatcher()
</script>

<ul class="flex items-center justify-start text-neutral-800">
  {#each breadcrumbs as breadcrumb, i}
    <li class="pr-1 text-lg flex items-center space-x-1.5 text-neutral-800">
      {#if breadcrumb.url}
        <a href={breadcrumb.url}>
          <span class:text-neutral-400={i < breadcrumbs.length - 1}>{breadcrumb.label}</span>
        </a>
      {:else}
        <button
          class={i < breadcrumbs.length - 1 ? 'text-neutral-400' : 'font-medium'}
          on:click|stopPropagation={async () => {
            await navigator.clipboard.writeText(breadcrumb.label)
            dispatch('copied', breadcrumb.label)
          }}
        >
          {breadcrumb.label}
        </button>
      {/if}
      {#if breadcrumb.country}
        <BaseFlag country={breadcrumb.country} width={14} />
      {/if}
    </li>
    {#if i < breadcrumbs.length - 1}
      <Icon src={Slash} class="w-3 h-3 text-neutral-300 pr-1" />
    {/if}
  {/each}
</ul>
