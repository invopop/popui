<script lang="ts">
  import type { SelectOption } from '$lib/types.ts'

  export let items: SelectOption[]
</script>

<ul
  class="w-60 border border-neutral-100 rounded-2xl p-2 text-neutral-800 text-sm font-medium shadow-lg"
>
  {#each items as item}
    <li>{item.label}</li>
  {/each}
</ul>
