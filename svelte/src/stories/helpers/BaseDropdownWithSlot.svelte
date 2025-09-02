<script lang="ts">
  import BaseDropdown from '../../lib/BaseDropdown.svelte'
</script>

<BaseDropdown>
  {#snippet trigger()}
    <button class="border p-4" >This is the trigger</button>
  {/snippet}
  <div class="border border-red-300 p-4">This is the content</div>
</BaseDropdown>
