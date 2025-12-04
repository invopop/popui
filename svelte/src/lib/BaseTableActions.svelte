<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import type { DrawerOption, BaseTableActionsProps } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { Options } from '@invopop/ui-icons'
  import clsx from 'clsx'
  import BaseButton from './BaseButton.svelte'

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
      'group-hover:bg-foreground/[.05]': !isOpen,
      'bg-foreground/[.1]': isOpen
    })
  )

  export const toggle = () => {
    actionDropdown?.toggle()
  }
</script>

{#snippet trigger()}
  <BaseButton variant="ghost" aria-label="Row actions" icon={Options} />
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
