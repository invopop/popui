<script lang="ts">
  import type { InputCheckboxProps } from './types'

  let {
    id = Math.random().toString(36).slice(2, 7),
    checked = $bindable(false),
    indeterminate = false,
    label = '',
    onchange,
    onclick,
    ...rest
  }: InputCheckboxProps = $props()

  function updateInput(event: Event) {
    const target = event.target as HTMLInputElement

    checked = target.checked

    onchange?.(checked)
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
    {...rest}
    onchange={updateInput}
    {onclick}
  />
  {#if label}
    <span>{label}</span>
  {/if}
</label>
