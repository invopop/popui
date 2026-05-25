<script lang="ts">
  import clsx from 'clsx'
  import { Icon } from '@steeze-ui/svelte-icon'
  import {
    Add,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Logout,
    Settings,
    Team
  } from '@invopop/ui-icons'
  import BaseDropdown from '$lib/BaseDropdown.svelte'
  import BaseFlag from '$lib/BaseFlag.svelte'
  import DrawerContext from '$lib/DrawerContext.svelte'
  import GlobalSearch from '$lib/GlobalSearch.svelte'
  import ProfileAvatar from '$lib/ProfileAvatar.svelte'
  import { useSidebar } from '$lib/sidebar/index.js'
  import type { DrawerOption } from '$lib/types.ts'

  const sidebar = useSidebar()
  let collapsed = $derived(sidebar.state === 'collapsed' && !sidebar.isMobile)
  let dropdownOpen = $state(false)

  const workspaces = [
    {
      label: 'Acme Inc.',
      value: 'acme',
      selected: true,
      country: 'US',
      useAvatar: true,
      groupBy: 'live'
    },
    { label: 'Acme EU', value: 'acme-eu', country: 'ES', useAvatar: true, groupBy: 'live' },
    {
      label: 'Acme Sandbox',
      value: 'acme-sandbox',
      sandbox: true,
      useAvatar: true,
      groupBy: 'sandbox'
    }
  ] as DrawerOption[]

  const options = [
    ...workspaces,
    { separator: true, value: 'separator-1', label: '' },
    { label: 'Create workspace', value: 'add', icon: Add, rightIcon: ExternalLink },
    { label: 'Invite members', value: 'invite', icon: Team, rightIcon: ExternalLink },
    { label: 'Admin', value: 'admin', icon: Settings, rightIcon: ExternalLink },
    { separator: true, value: 'separator-2', label: '' },
    { label: 'Log out', value: 'logout', icon: Logout, destructive: true }
  ] as DrawerOption[]
</script>

<BaseDropdown
  bind:isOpen={dropdownOpen}
  placement="bottom-start"
  class={clsx({
    'mx-auto': collapsed,
    'w-full': !collapsed
  })}
>
  {#snippet trigger()}
    <div
      class={clsx(
        'flex items-center gap-2 rounded-lg text-base font-semibold text-foreground-inverse hover:bg-background-selected-inverse overflow-hidden',
        {
          'w-full py-0.5 pl-0.5 pr-2': !collapsed,
          'p-0.5': collapsed
        }
      )}
    >
      <div class="min-w-7">
        <ProfileAvatar dark name="Acme Inc." variant="md" />
      </div>
      {#if !collapsed}
        <span class="truncate min-w-0">Acme Inc.</span>
        <div class="min-w-3.5">
          <BaseFlag country="US" />
        </div>
        <Icon
          src={dropdownOpen ? ChevronUp : ChevronDown}
          class="size-3 text-icon-inverse-secondary shrink-0 ml-auto"
        />
      {/if}
    </div>
  {/snippet}
  <DrawerContext
    widthClass="w-[304px]"
    autofocus
    groups={[
      { slug: 'live', label: 'Live' },
      { slug: 'sandbox', label: 'Sandbox' }
    ]}
    items={options}
    onclick={() => {}}
  />
</BaseDropdown>

<GlobalSearch {collapsed} onOpen={() => {}} />
