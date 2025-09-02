<script lang="ts">
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContextWorkspace from './DrawerContextWorkspace.svelte'
  import { createEventDispatcher } from 'svelte'
  import { DoubleArrow } from '@invopop/ui-icons'
  import MenuItemCollapsible from './MenuItemCollapsible.svelte'

  const dispatch = createEventDispatcher()


  let companyDropdown: BaseDropdown = $state()
  let isOpen = $state(false)
  interface Props {
    companies?: Company[];
    selectedCompany?: Company | null;
    collapsed?: boolean;
  }

  let { companies = [], selectedCompany = $bindable(null), collapsed = false }: Props = $props();

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
    companyDropdown.toggle()

    if (event.detail === 'add') {
      dispatch('add')
      return
    }

    selectedCompany = companies.find((c) => c.id === event.detail) || null
    dispatch('select', selectedCompany)
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
