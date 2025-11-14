<script lang="ts">
  let { percentage = 0 }: { percentage?: number } = $props()
</script>

<div class="w-full h-1 shrink-0 rounded-full bg-background-default-secondary">
  <div class="rounded-full h-1 bg-foreground-accent" style="width: {percentage}%;"></div>
</div>
