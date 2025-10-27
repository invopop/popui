<script lang="ts">
  let { percentage = 0 }: { percentage?: number } = $props()
</script>

<div class="w-full h-1 shrink-0 rounded-full bg-neutral-200">
  <div class="rounded-full h-1 bg-workspace-accent" style="width: {percentage}%;"></div>
</div>
