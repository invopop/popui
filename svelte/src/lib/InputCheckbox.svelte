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

<label for={id} class="inline-flex items-center gap-2 cursor-pointer text-base text-foreground">
  <input
    {id}
    type="checkbox"
    {checked}
    {indeterminate}
    class="form-checkbox size-4 text-background-accent rounded border border-border-default-secondary hover:border-border-default-primary focus:ring-0 focus:ring-offset-0 bg-background"
    {...rest}
    onchange={updateInput}
    {onclick}
  />
  {#if label}
    <span>{label}</span>
  {/if}
</label>
