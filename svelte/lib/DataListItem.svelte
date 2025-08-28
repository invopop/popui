<script lang="ts">
  import clsx from 'clsx'

  interface Props {
    label?: string;
    value?: string;
    monospaced?: boolean;
    monospacedNums?: boolean;
    fullWidth?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    label = '',
    value = '',
    monospaced = false,
    monospacedNums = false,
    fullWidth = false,
    children
  }: Props = $props();

  let styles = $derived(clsx({
    'font-mono': monospaced,
    'slashed-zero tabular-nums lining-nums': monospacedNums,
    'w-full': fullWidth
  }))
</script>

<div class="flex space-x-4 text-base items-center">
  <div class="text-neutral-500 min-w-[125px]">{label}</div>
  <div class="{styles} text-neutral-800 font-medium">
    {#if children}{@render children()}{:else}
      {value}
    {/if}
  </div>
</div>
