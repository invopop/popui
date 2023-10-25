<script lang="ts">
  export let type = ''
  export let name = ''
  export let disabled = false
  export let fullwidth = false
</script>

<button
  {disabled}
  class:opacity-30={disabled}
  class:w-full={fullwidth}
  class="border border-neutral-200 hover:border-neutral-300 rounded-xl flex items-center space-x-2"
>
  <span
    class="px-2 py-1 bg-neutral-50 border-r border-neutral-200 hover:border-neutral-300 rounded-l-lg text-neutral-500 text-base font-semibold"
    >{type.toUpperCase()}</span
  >
  <span class="pr-3 text-sm py-1 text-neutral-800">{name}</span>
</button>
