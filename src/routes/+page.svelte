<script lang="ts">
  import '../app.css'
  import BaseButton from '$lib/BaseButton.svelte'
  import InputSelect from '$lib/InputSelect.svelte'
  import InputSearch from '$lib/InputSearch.svelte'
</script>

<div class="p-4 space-y-4">
  <h1 class="text-2xl">Invopop UI Kit</h1>
  <p>Library of shared, re-usable UI components for Invopop projects</p>

  <BaseButton label="Hey There" />
  <div>
    <InputSelect label="This is the label" />
  </div>
  <div>
    <InputSearch placeholder="Search" shortcut="⌘K" />
  </div>
</div>
