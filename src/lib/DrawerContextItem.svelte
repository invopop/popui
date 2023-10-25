<script lang="ts">
  import type { DrawerOption } from '$lib/types.ts'
  import InputCheckbox from '$lib/InputCheckbox.svelte'

  export let multiple = false
  export let item: DrawerOption
</script>

<li class="px-2 py-1.5 hover:bg-neutral-50 rounded-xl flex items-center justify-between space-x-2">
  <span class="text-neutral-800 text-sm font-medium">{item.label}</span>
  {#if multiple}
    <InputCheckbox />
  {/if}
</li>
