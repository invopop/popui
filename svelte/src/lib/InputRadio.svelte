<script lang="ts">
  import type { InputRadioProps } from './types'

  let {
    checked = false,
    disabled = false,
    id = Math.random().toString(36).slice(2, 7),
    name = '',
    label,
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

{#snippet radioInput()}
  <input
    bind:this={el}
    type="radio"
    {id}
    {name}
    {checked}
    {disabled}
    class="appearance-none size-4 rounded-full border checked:border-0 checked:bg-background-accent checked:border-0 checked:bg-background-accent cursor-pointer focus:outline-none focus:ring-0 shrink-0 disabled:cursor-not-allowed border-border-default-secondary disabled:checked:bg-border-default-secondary disabled:checked:border"
    {...rest}
    onchange={updateInput}
  />
{/snippet}

{#if label}
  <label class="flex items-center gap-2 cursor-pointer">
    {@render radioInput()}
    <span class="text-base text-foreground whitespace-nowrap">
      {label}
    </span>
  </label>
{:else}
  {@render radioInput()}
{/if}
