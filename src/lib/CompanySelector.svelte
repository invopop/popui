<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, DrawerOption } from './types.js'
  import { ChevronDown, ChevronUp, Plus } from '@steeze-ui/heroicons'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContext from './DrawerContext.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let companies: Company[] = []
  export let selectedCompany: Company | null = null

  let companyDropdown: BaseDropdown
  let isOpen = false

  $: name = selectedCompany?.name || ''
  $: icon = isOpen ? ChevronUp : ChevronDown
  $: items = [
    ...companies.map((c) => ({
      value: c.id,
      label: c.name,
      selected: c.slug === selectedCompany?.slug
    })),
    { value: 'add', label: 'Add company', icon: Plus, footer: true }
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

<BaseDropdown bind:isOpen bind:this={companyDropdown} placement="bottom-start">
  <span
    slot="trigger"
    class="text-white text-sm font-medium flex items-center justify-between space-x-2 border border-white-10 hover:border-white-20 focus:bg-white-5 pl-1.5 pr-2 py-[7px] rounded w-full"
  >
    <span class="flex items-center space-x-2">
      <ProfileAvatar {name} dark large />
      <span>{name}</span>
    </span>
    <Icon src={icon} class="h-4 w-4 text-white-40 mt-px" />
  </span>
  <DrawerContext {items} on:click={selectCompany} />
</BaseDropdown>
