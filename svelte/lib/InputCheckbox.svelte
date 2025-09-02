<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let id = Math.random().toString(36).slice(2, 7)
  export let checked = false
  export let indeterminate = false
  export let label = ''

  const dispatch = createEventDispatcher()

  function updateInput(event: unknown) {
    const target = (event as PointerEvent).target as HTMLInputElement

    checked = target.checked

    dispatch('change', checked)
  }
</script>

<label
  for={id}
  class="inline-flex items-center space-x-2 cursor-pointer group text-base text-neutral-800"
>
  <input
    {id}
    type="checkbox"
    {checked}
    {indeterminate}
    class="form-checkbox w-4 h-4 text-workspace-accent focus:text-workspace-accent rounded border border-neutral-200 hover:border-neutral-300 group-hover:border-neutral-300 focus:ring-0 focus:ring-offset-0"
    {...$$restProps}
    on:change={updateInput}
    on:click|stopPropagation
  />
  {#if label}
    <span>{label}</span>
  {/if}
</label>
