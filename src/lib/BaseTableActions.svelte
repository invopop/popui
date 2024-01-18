<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { TableAction, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import { createEventDispatcher } from 'svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { Options } from '@invopop/ui-icons'

  const dispatch = createEventDispatcher()

  export let actions: TableAction[]

  let actionDropdown: BaseDropdown

  $: items = actions.map((a) => ({
    label: a.label,
    value: a,
    icon: a.icon,
    footer: a.footer,
    destructive: a.destructive
  })) as DrawerOption[]
</script>

<BaseDropdown bind:this={actionDropdown}>
  <Icon slot="trigger" src={Options} class="w-5 mt-1 text-neutral-500" />
  <DrawerContext
    {items}
    on:click={(e) => {
      dispatch('clickAction', e.detail)
      actionDropdown.toggle()
    }}
  />
</BaseDropdown>
