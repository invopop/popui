<script lang="ts">
  import BaseDropdown from '../../lib/BaseDropdown.svelte'
</script>

<BaseDropdown>
  <button class="border p-4" slot="trigger">This is the trigger</button>
  <div class="border border-red-300 p-4">This is the content</div>
</BaseDropdown>
