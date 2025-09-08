<script lang="ts">
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, CompanySelectorProps, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContextWorkspace from './DrawerContextWorkspace.svelte'
  import { DoubleArrow } from '@invopop/ui-icons'
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
  let items = $derived([
    ...companies.map((c) => ({
      value: c.id,
      label: c.name,
      selected: c.slug === selectedCompany?.slug && !!c.sandbox === !!selectedCompany?.sandbox,
      country: c.country,
      picture: c.logo_url,
      sandbox: c.sandbox
    }))
  ] as DrawerOption[])

  function selectCompany(event: CustomEvent) {
    companyDropdown?.toggle()

    if (event.detail === 'add') {
      onAdd?.()
      return
    }

    selectedCompany = companies.find((c) => c.id === event.detail) || null
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
      <ProfileAvatar {name} {picture} {country} dark large />
    </MenuItemCollapsible>
  {/snippet}
  <DrawerContextWorkspace {items} on:click={selectCompany} />
</BaseDropdown>
