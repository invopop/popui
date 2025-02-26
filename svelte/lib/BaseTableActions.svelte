<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { TableAction, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import { createEventDispatcher } from 'svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { Options } from '@invopop/ui-icons'
  import clsx from 'clsx'

  const dispatch = createEventDispatcher()

  export let actions: TableAction[]

  let actionDropdown: BaseDropdown
  let isOpen = false

  $: items = actions.map((a) => ({
    label: a.label,
    value: a,
    icon: a.icon,
    footer: a.footer,
    destructive: a.destructive
  })) as DrawerOption[]

  $: overlayClasses = clsx({
    'group-hover:bg-black/[.16]': !isOpen,
    'bg-black/[.32]': isOpen
  })

  export const toggle = () => {
    actionDropdown.toggle()
  }
</script>

<BaseDropdown bind:isOpen bind:this={actionDropdown}>
  <div class="relative group flex justify-center items-center rounded p-1" slot="trigger">
    <span class="{overlayClasses} absolute inset-0" />
    <Icon slot="trigger" src={Options} class="w-4 text-neutral-500" />
  </div>
  <DrawerContext
    {items}
    on:click={(e) => {
      dispatch('clickAction', e.detail)
      actionDropdown.toggle()
    }}
  />
</BaseDropdown>
