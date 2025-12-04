<script lang="ts">
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { AnyProp, CompanySelectorProps, DrawerOption, DrawerGroup } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { DoubleArrow, Workspace, AddCircle, ExternalLink } from '@invopop/ui-icons'
  import MenuItemCollapsible from './MenuItemCollapsible.svelte'

  let companyDropdown: BaseDropdown | undefined = $state()
  let isOpen = $state(false)

  let {
    companies = [],
    selectedCompany = $bindable(null),
    collapsed = false,
    onAdd,
    onSelect
  }: CompanySelectorProps = $props()

  let name = $derived(selectedCompany?.name || '')
  let country = $derived(selectedCompany?.country || '')
  let picture = $derived(selectedCompany?.logo_url || '')
  let isSandbox = $derived(selectedCompany?.sandbox)

  let groups: DrawerGroup[] = [
    {
      label: 'Live',
      slug: 'live',
      emptyIcon: Workspace,
      emptyTitle: 'No workspaces here',
      emptyDescription: 'Create a workspace to start'
    },
    {
      label: 'Sandbox',
      slug: 'sandbox',
      emptyIcon: Workspace,
      emptyTitle: 'No workspaces here',
      emptyDescription: 'Create a workspace to start'
    }
  ]

  let items = $derived([
    ...companies.map((c) => ({
      value: c.id,
      label: c.name,
      selected: c.slug === selectedCompany?.slug && !!c.sandbox === !!selectedCompany?.sandbox,
      country: c.country,
      picture: c.logo_url,
      sandbox: c.sandbox,
      groupBy: c.sandbox ? 'sandbox' : 'live'
    })),
    {
      separator: true
    },
    {
      value: 'add',
      label: 'Create workspace',
      icon: AddCircle,
      rightIcon: ExternalLink
    }
  ] as DrawerOption[])

  function selectCompany(value: AnyProp) {
    companyDropdown?.toggle()

    if (value === 'add') {
      onAdd?.()
      return
    }

    selectedCompany = companies.find((c) => c.id === value) || null
    onSelect?.(selectedCompany)
  }
</script>

<BaseDropdown
  bind:isOpen
  bind:this={companyDropdown}
  placement="bottom-start"
  fullWidth={!collapsed}
>
  {#snippet trigger()}
    <MenuItemCollapsible
      {collapsed}
      title={name}
      subtitle={isSandbox ? 'Sandbox' : ''}
      icon={collapsed ? undefined : DoubleArrow}
      active={isOpen}
      bold
    >
      <ProfileAvatar {name} {picture} {country} dark variant="lg" />
    </MenuItemCollapsible>
  {/snippet}
  <DrawerContext {items} {groups} onclick={selectCompany} widthClass="w-[300px]" />
</BaseDropdown>
