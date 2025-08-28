<script lang="ts">
  import Select, { getStore } from 'svelte-select-kit'
  import type { SelectOption } from './types'
  interface Props {
    disabled?: boolean;
    placeholder?: string;
    value?: string;
    options?: SelectOption[];
  }

  let {
    disabled = false,
    placeholder = '',
    value = $bindable(''),
    options = []
  }: Props = $props();

  const { matchCount } = getStore()
</script>

<Select.Input
  bind:value
  {disabled}
  {placeholder}
  class="py-1.5 px-2.5 border w-full rounded-md placeholder:text-neutral-500 text-base tracking-tight border-neutral-200 hover:border-neutral-300 text-neutral-800 outline-none caret-workspace-accent focus:border-workspace-accent focus:shadow-active"
/>
<Select.ListBox >
  {#snippet children({ open })}
    {#if open}
      <div
        class="{$matchCount === 0
          ? 'invisible'
          : ''} mt-[3px] border border-neutral-200 bg-white shadow-lg rounded-md p-1 space-y-0.5"
      >
        {#each options as option}
          <Select.Item
            id={String(option.value)}
            value={String(option.value)}
            class="py-1.5 border border-transparent rounded pl-2 pr-1.5 flex items-center justify-start w-full data-[active=true]:bg-workspace-accent-100"
          >
            {option.label}
          </Select.Item>
        {/each}
      </div>
    {/if}
  {/snippet}
</Select.ListBox>
