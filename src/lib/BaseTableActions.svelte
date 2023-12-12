<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import { EllipsisHorizontal } from '@steeze-ui/heroicons'
  import type { TableAction, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import { createEventDispatcher } from 'svelte'
  import DrawerContext from './DrawerContext.svelte'

  const dispatch = createEventDispatcher()

  export let actions: TableAction[]

  let actionDropdown: BaseDropdown

  $: items = actions.map((a) => ({
    label: a.label,
    value: a,
    icon: a.icon,
    footer: a.footer
  })) as DrawerOption[]
</script>

<BaseDropdown bind:this={actionDropdown}>
  <Icon slot="trigger" src={EllipsisHorizontal} class="w-5 mt-1" />
  <DrawerContext
    {items}
    on:click={(e) => {
      dispatch('clickAction', e.detail)
      actionDropdown.toggle()
    }}
  />
</BaseDropdown>
