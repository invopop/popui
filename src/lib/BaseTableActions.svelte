<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { EllipsisHorizontal } from '@steeze-ui/heroicons'
  import type { TableAction } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let actions: TableAction[]

  let actionDropdown: BaseDropdown
</script>

<BaseDropdown bind:this={actionDropdown}>
  <Icon slot="trigger" src={EllipsisHorizontal} class="w-5 mt-1" />
  <ul class="bg-white border border-neutral-100 rounded space-y-0.5 p-1 min-w-dropdown">
    {#each actions as action}
      <li>
        <button
          class="hover:bg-neutral-50 rounded py-1.5 px-2 flex items-center space-x-2 w-full"
          on:click|stopPropagation={() => {
            dispatch('clickAction', action)
            actionDropdown.toggle()
          }}
        >
          {#if action.icon}
            <Icon src={action.icon} class="w-5 text-neutral-500" />
          {/if}
          <span class="text-sm font-medium text-neutral-800 whitespace-nowrap">{action.label}</span>
        </button>
      </li>
    {/each}
  </ul>
</BaseDropdown>
