<script lang="ts">
  export let label = ''
  export let value = ''
</script>

<div class="flex space-x-6 text-sm items-center">
  <div class="text-neutral-500">{label}</div>
  <div class="text-neutral-800">
    <slot>
      {value}
    </slot>
  </div>
</div>
