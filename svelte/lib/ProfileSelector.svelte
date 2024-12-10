<script lang="ts">
  import { offset } from 'svelte-floating-ui/dom'
  import clsx from 'clsx'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import { createFloatingActions } from 'svelte-floating-ui'
  import type { DrawerOption } from './types.js'
  import { Company, ExternalLink, Header, Skip, User } from '@invopop/ui-icons'
  import DrawerContext from './DrawerContext.svelte'
  import { createEventDispatcher } from 'svelte'

  export let name = ''
  export let orgName = ''
  export let picture = ''
  export let collapsed = false
  export let enableSwitchOrg = false

  const dispatch = createEventDispatcher()

  const [floatingRef, floatingContent] = createFloatingActions({
    strategy: 'absolute',
    placement: 'top-start',
    middleware: [offset(4)]
  })

  let hovered = false
  let leaveHoverTimeout: ReturnType<typeof setTimeout> | null = null

  $: styles = clsx({ 'p-[5px]': collapsed }, { 'w-full pl-1.5 pr-2 py-[7px]': !collapsed })

  $: items = [
    {
      label: 'Configure Profile',
      value: 'profile',
      icon: User
    },
    {
      label: 'Configure Workspace',
      value: 'workspace',
      icon: Header
    },
    {
      label: `Configure ${orgName || 'Organization'}`,
      value: 'organization',
      icon: Company,
      rightIcon: ExternalLink,
      footer: true
    },
    {
      label: 'Switch Organization',
      value: 'switch',
      icon: Skip,
      rightIcon: ExternalLink,
      footer: true
    }
  ].filter((i) => {
    if (i.value !== 'switch') return true
    return enableSwitchOrg
  }) as DrawerOption[]

  function handleHover() {
    if (leaveHoverTimeout) {
      clearTimeout(leaveHoverTimeout)
    }
    hovered = true
  }

  function handleBlur() {
    leaveHoverTimeout = setTimeout(() => {
      hovered = false
    }, 200)
  }

  function handleClickChild(event: CustomEvent) {
    dispatch('clickItem', event.detail)
  }
</script>

<button
  class="{styles} text-white text-base flex items-center justify-between space-x-1 focus:border-white-10 active:border-white-10 hover:bg-white-5 rounded"
  on:click
  on:mouseenter={handleHover}
  on:mouseleave={handleBlur}
  use:floatingRef
>
  <span class="flex items-center space-x-2">
    <ProfileAvatar {name} {picture} dark large />
    {#if !collapsed}
      <div class="flex flex-col items-start">
        <span class="whitespace-nowrap tracking-normal font-medium">{name}</span>
        <span class="text-sm text-white-50">{orgName}</span>
      </div>
    {/if}
  </span>
</button>
{#if hovered}
  <div
    use:floatingContent
    role="contentinfo"
    on:mouseenter={handleHover}
    on:mouseleave={handleBlur}
    class="z-30"
  >
    <DrawerContext on:click={handleClickChild} {items} />
  </div>
{/if}
