<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { DrawerOption, BaseTableActionsProps } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { Options } from '@invopop/ui-icons'
  import clsx from 'clsx'

  let { actions, onclick }: BaseTableActionsProps = $props()

  let actionDropdown: BaseDropdown | undefined = $state()
  let isOpen = $state(false)

  let items = $derived(
    actions.map((a) => ({
      label: a.label,
      value: a,
      icon: a.icon,
      separator: a.separator,
      destructive: a.destructive
    })) as DrawerOption[]
  )

  let overlayClasses = $derived(
    clsx({
      'group-hover:bg-neutral-800/[.05]': !isOpen,
      'bg-neutral-800/[.1]': isOpen
    })
  )

  export const toggle = () => {
    actionDropdown?.toggle()
  }
</script>

{#snippet trigger()}
  <div class="relative group flex justify-center items-center rounded p-1">
    <span class="{overlayClasses} absolute inset-0 rounded"></span>
    <Icon src={Options} class="w-4 text-neutral-500" />
  </div>
{/snippet}

<BaseDropdown bind:isOpen bind:this={actionDropdown} {trigger}>
  <DrawerContext
    {items}
    onclick={(e) => {
      onclick?.(e)
      actionDropdown?.toggle()
    }}
  />
</BaseDropdown>
