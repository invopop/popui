<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import ProfileAvatar from './ProfileAvatar.svelte'
  import type { Company } from './types.js'
  import { ChevronDown, ChevronUp } from '@steeze-ui/heroicons'

  export let selectedCompany: Company | null = null

  let open = false

  $: name = selectedCompany?.name || ''
  $: icon = open ? ChevronUp : ChevronDown
</script>

<button
  on:click={() => {
    open = !open
  }}
  class="text-white text-sm font-semibold flex items-center justify-between space-x-1 border border-white-10 hover:border-white-20 focus:bg-white-5 px-2 py-1.5 rounded-lg w-full"
>
  <span class="flex items-center space-x-1">
    <ProfileAvatar {name} dark />
    <span>{name}</span>
  </span>
  <Icon src={icon} class="h-4 w-4 text-white-40 mt-px" />
</button>
