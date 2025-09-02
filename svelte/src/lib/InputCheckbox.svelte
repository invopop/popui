<script lang="ts">
  import type { InputCheckboxProps } from './types'

  let {
    checked = $bindable(false),
    indeterminate = false,
    onchange,
    onclick,
    ...rest
  }: InputCheckboxProps = $props()

  function updateInput(event: unknown) {
    // If event is not a native event we skip the dispatch to avoid infinite loop
    if (event instanceof CustomEvent) return

    const target = (event as PointerEvent).target as HTMLInputElement

    checked = target.checked

    onchange?.(checked)
  }
</script>

<input
  type="checkbox"
  {checked}
  {indeterminate}
  class="form-checkbox w-4 h-4 text-workspace-accent focus:text-workspace-accent rounded border border-neutral-200 hover:border-neutral-300 group-hover:border-neutral-300 focus:ring-0 focus:ring-offset-0"
  {...rest}
  onchange={updateInput}
  {onclick}
/>
