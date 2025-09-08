<script lang="ts">
  import type { InputRadioProps } from './types'

  let {
    checked = false,
    id = Math.random().toString(36).slice(2, 7),
    name = '',
    onchange,
    ...rest
  }: InputRadioProps = $props()

  let el: HTMLInputElement | undefined = $state()

  $effect(() => {
    if (el && checked) {
      el.focus()
    }
  })

  function updateInput(event: Event) {
    const target = event.target as HTMLInputElement

    onchange?.(target.checked)
  }
</script>

<input
  bind:this={el}
  type="radio"
  {id}
  {name}
  {checked}
  class="form-radio h-5 w-5 border-neutral-200 text-workspace-accent focus:ring-0 focus:ring-offset-0 cursor-pointer"
  {...rest}
  onchange={updateInput}
/>
