<script lang="ts">
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContextWorkspace from './DrawerContextWorkspace.svelte'
  import { createEventDispatcher } from 'svelte'
  import { DoubleArrow } from '@invopop/ui-icons'
  import MenuItemCollapsible from './MenuItemCollapsible.svelte'

  const dispatch = createEventDispatcher()

  export let companies: Company[] = []
  export let selectedCompany: Company | null = null

  let companyDropdown: BaseDropdown
  let isOpen = false
  export let collapsed = false

  $: name = selectedCompany?.name || ''
  $: country = selectedCompany?.country || ''
  $: picture = selectedCompany?.logo_url || ''
  $: isSandbox = selectedCompany?.sandbox
  $: items = [
    ...companies.map((c) => ({
      value: c.id,
      label: c.name,
      selected: c.slug === selectedCompany?.slug && !!c.sandbox === !!selectedCompany?.sandbox,
      country: c.country,
      picture: c.logo_url,
      sandbox: c.sandbox
    }))
  ] as DrawerOption[]

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
  <MenuItemCollapsible
    slot="trigger"
    {collapsed}
    title={name}
    subtitle={isSandbox ? 'Sandbox' : ''}
    icon={collapsed ? undefined : DoubleArrow}
    active={isOpen}
    bold
  >
    <ProfileAvatar {name} {picture} {country} dark large />
  </MenuItemCollapsible>
  <DrawerContextWorkspace {items} on:click={selectCompany} />
</BaseDropdown>
