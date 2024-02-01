<script lang="ts">
  export let country = ''
  export let width = 12

  $: iso = country.toLowerCase()
</script>

<!-- https://github.com/HatScripts/circle-flags -->
<img src={`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`} alt={country} {width} />
