<script lang="ts">
  import { useSidebar } from '$lib/sidebar/index.js'
  import MenuItem from '$lib/MenuItem.svelte'
  import {
    Dashboard,
    Folder,
    History,
    List,
    Search,
    Settings,
    User,
    Workflow
  } from '@invopop/ui-icons'

  const sidebar = useSidebar()
  let collapsed = $derived(sidebar.state === 'collapsed' && !sidebar.isMobile)
</script>

<div class="p-2 flex flex-col gap-3">
  <ul class="space-y-0.5">
    <li>
      <MenuItem
        label="Dashboard"
        icon={Dashboard}
        active
        collapsedSidebar={collapsed}
        onclick={() => {}}
      />
    </li>
    <li>
      <MenuItem label="Workflows" icon={Workflow} collapsedSidebar={collapsed} onclick={() => {}} />
    </li>
    <li>
      <MenuItem
        label="Job history"
        icon={History}
        collapsedSidebar={collapsed}
        onclick={() => {}}
      />
    </li>
    <li>
      <MenuItem
        label="Documents"
        icon={Folder}
        collapsable
        collapsedSidebar={collapsed}
        onclick={() => {}}
        children={[
          { label: 'Invoices', url: '#invoices', active: false },
          { label: 'Receipts', url: '#receipts', active: false }
        ]}
      />
    </li>
  </ul>

  <div>
    {#if !collapsed}
      <div
        class="px-2 pb-1 text-xs font-medium uppercase tracking-wide text-foreground-inverse-secondary"
      >
        Settings
      </div>
    {/if}
    <ul class="space-y-0.5">
      <li>
        <MenuItem label="Series" icon={List} collapsedSidebar={collapsed} onclick={() => {}} />
      </li>
      <li>
        <MenuItem label="Search" icon={Search} collapsedSidebar={collapsed} onclick={() => {}} />
      </li>
      <li>
        <MenuItem label="Profile" icon={User} collapsedSidebar={collapsed} onclick={() => {}} />
      </li>
      <li>
        <MenuItem
          label="Integrations"
          icon={Settings}
          collapsedSidebar={collapsed}
          onclick={() => {}}
        />
      </li>
    </ul>
  </div>
</div>
