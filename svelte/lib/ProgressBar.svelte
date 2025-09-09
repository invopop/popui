<script lang="ts">
  export let percentage = 0
</script>

<div class="w-full h-1 flex-shrink-0 rounded-full bg-neutral-200">
  <div class="rounded-full h-1 bg-workspace-accent" style="width: {percentage}%;" />
</div>
