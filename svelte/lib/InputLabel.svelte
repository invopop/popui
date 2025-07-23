<script lang="ts">
  export let id = ''
  export let label = ''
</script>

<label for={id} class="text-sm font-medium text-neutral-500 mb-2" {...$$restProps}>{label}</label>
