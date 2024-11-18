<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company, DrawerOption } from './types.js'
  import BaseDropdown from './BaseDropdown.svelte'
  import DrawerContextWorkspace from './DrawerContextWorkspace.svelte'
  import { createEventDispatcher } from 'svelte'
  import clsx from 'clsx'
  import { DoubleArrow } from '@invopop/ui-icons'

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
      selected: c.slug === selectedCompany?.slug,
      country: c.country,
      picture: c.logo_url,
      sandbox: c.sandbox
    }))
  ] as DrawerOption[]

  $: styles = clsx(
    { 'p-1': collapsed },
    { 'space-x-2 w-full p-[7px]': !collapsed },
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
    class="{styles} text-white text-base font-semibold flex items-center justify-between border focus:border-white-10 active:border-white-10 hover:bg-white-5 rounded"
  >
    <span class:space-x-2={!collapsed} class="flex items-center">
      <ProfileAvatar {name} {picture} {country} dark large />
      {#if !collapsed}
        <div>
          <div class="whitespace-nowrap max-w-[140px] truncate tracking-tight">{name}</div>
          {#if isSandbox}
            <div class="text-sm font-medium text-yellow-600">Sandbox</div>
          {/if}
        </div>
      {/if}
    </span>
    {#if !collapsed}
      <Icon src={DoubleArrow} class="h-4 w-4 text-white-40 mt-px" />
    {/if}
  </span>
  <DrawerContextWorkspace {items} on:click={selectCompany} />
</BaseDropdown>
