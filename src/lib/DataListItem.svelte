<script lang="ts">
  import clsx from 'clsx'

  export let label = ''
  export let value = ''
  export let valueMonospaced = false

  $: styles = clsx({
    'tabular-nums slashed-zero': valueMonospaced
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
