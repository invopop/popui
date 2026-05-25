<script lang="ts">
  import clsx from 'clsx'
  import CounterWidget from '$lib/CounterWidget.svelte'
  import MenuItem from '$lib/MenuItem.svelte'
  import { useSidebar } from '$lib/sidebar/index.js'
  import { Pops, Question } from '@invopop/ui-icons'

  const sidebar = useSidebar()
  let collapsed = $derived(sidebar.state === 'collapsed' && !sidebar.isMobile)
</script>

<section class={clsx({ 'flex justify-center': collapsed })}>
  <CounterWidget
    label="Pops"
    icon={Pops}
    current={6400}
    total={10000}
    resetDate="Jan 1, 2027"
    {collapsed}
    allowOverage
  />
</section>

<ul class="space-y-0.5">
  <li>
    <MenuItem label="Help" icon={Question} collapsedSidebar={collapsed} onclick={() => {}} />
  </li>
</ul>
