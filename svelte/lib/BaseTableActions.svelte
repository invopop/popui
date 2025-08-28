<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { TableAction, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import { createEventDispatcher } from 'svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { Options } from '@invopop/ui-icons'
  import clsx from 'clsx'

  const dispatch = createEventDispatcher()

  interface Props {
    actions: TableAction[];
  }

  let { actions }: Props = $props();

  let actionDropdown: BaseDropdown = $state()
  let isOpen = $state(false)

  let items = $derived(actions.map((a) => ({
    label: a.label,
    value: a,
    icon: a.icon,
    separator: a.separator,
    destructive: a.destructive
  })) as DrawerOption[])

  let overlayClasses = $derived(clsx({
    'group-hover:bg-neutral-800/[.05]': !isOpen,
    'bg-neutral-800/[.1]': isOpen
  }))

  export const toggle = () => {
    actionDropdown.toggle()
  }
</script>

<BaseDropdown bind:isOpen bind:this={actionDropdown}>
  {#snippet trigger()}
    <div class="relative group flex justify-center items-center rounded p-1" >
      <span class="{overlayClasses} absolute inset-0 rounded"></span>
      {#snippet trigger()}
        <Icon  src={Options} class="w-4 text-neutral-500" />
      {/snippet}
    </div>
  {/snippet}
  <DrawerContext
    {items}
    on:click={(e) => {
      dispatch('clickAction', e.detail)
      actionDropdown.toggle()
    }}
  />
</BaseDropdown>
