<script lang="ts">
  import { createTwind } from '../helpers/twind.ts'
  const { tw, sheet } = createTwind()

  export function getSheet() {
    return sheet.target
  }

  export let title = ''
</script>

<h1 class={tw`text-neutral-800 font-semibold text-2xl`}>
  {title}
</h1>
