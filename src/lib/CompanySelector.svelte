<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { createEventDispatcher } from 'svelte'
  import clsx from 'clsx'
  import { Add, ChevronDown, Settings } from '@invopop/ui-icons'

  const dispatch = createEventDispatcher()

  export let companies: Company[] = []
  export let selectedCompany: Company | null = null

  let companyDropdown: BaseDropdown
  let isOpen = false
  export let collapsed = false

  $: name = selectedCompany?.name || ''
  $: country = selectedCompany?.country || ''
  $: items = [
    ...companies.map((c) => ({
      value: c.id,
      label: c.name,
      selected: c.slug === selectedCompany?.slug,
      country: c.country
    })),
    { value: 'add', label: 'Add workspace', icon: Add, footer: true },
    { value: 'settings', label: 'Settings', icon: Settings, footer: true }
  ] as DrawerOption[]

  $: styles = clsx(
    { 'p-[7px]': collapsed },
    { 'space-x-2 w-full pl-1 pr-2 py-[7px]': !collapsed },
    { 'border-white-10 bg-white-5': isOpen },
    { 'border-transparent': !isOpen }
  )

  function selectCompany(event: CustomEvent) {
    companyDropdown.toggle()

    if (event.detail === 'add') {
      dispatch('add')
      return
    }

    if (event.detail === 'settings') {
      dispatch('settings')
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
  <span
    slot="trigger"
    title={name}
    class="{styles} text-white text-sm font-medium flex items-center justify-between border focus:border-white-10 active:border-white-10 hover:bg-white-5 rounded"
  >
    <span class:space-x-2={!collapsed} class="flex items-center">
      <ProfileAvatar {name} {country} dark large />
      {#if !collapsed}
        <span class="whitespace-nowrap">{name}</span>
      {/if}
    </span>
    {#if !collapsed}
      <Icon src={ChevronDown} class="{isOpen ? 'rotate-180' : ''} h-4 w-4 text-white-40 mt-px" />
    {/if}
  </span>
  <DrawerContext {items} on:click={selectCompany} />
</BaseDropdown>
