<script lang="ts">
  import clsx from 'clsx'

  export let label = ''
  export let value = ''
  export let valueMonospaced = false
  export let fullWidth = false

  $: styles = clsx({
    'tabular-nums slashed-zero lining-nums font-mono': valueMonospaced,
    'w-full': fullWidth
  })
</script>

<div class="flex space-x-4 text-base items-center">
  <div class="text-neutral-500 min-w-[125px]">{label}</div>
  <div class="{styles} text-neutral-800 font-medium">
    <slot>
      {value}
    </slot>
  </div>
</div>
