<script lang="ts">
  export let label = ''
  export let value = ''
</script>

<div class="flex space-x-4 text-base items-center">
  <div class="text-neutral-500 min-w-[125px]">{label}</div>
  <div class="text-neutral-800 font-medium">
    <slot>
      {value}
    </slot>
  </div>
</div>
