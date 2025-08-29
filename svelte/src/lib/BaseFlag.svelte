<script lang="ts">
  interface Props {
    country?: string;
    width?: number;
  }

  let { country = '', width = 12 }: Props = $props();

  let iso = $derived(country.toLowerCase())
</script>

<!-- https://github.com/HatScripts/circle-flags -->
<img src={`https://hatscripts.github.io/circle-flags/flags/${iso}.svg`} alt={country} {width} />
