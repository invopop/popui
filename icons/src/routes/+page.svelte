<script lang="ts">
  import { Icon } from '@steeze-ui/svelte-icon'
  import * as Icons from '$lib/index.js'

  const icons: Record<string, Icons.IconSource> = Icons

  const themes = Object.keys(icons[Object.keys(icons)[0]])
  const backgrounds = ['light', 'dark']

  let theme = 'default'
  let background = 'light'
</script>

<div class={'icon-viewer ' + background}>
  <h1>Popui Iconpack</h1>
  <div class="icon-viewer-settings-group">
    <label for="theme-select">Theme</label>
    <select id="theme-select" bind:value={theme}>
      {#each themes as th}
        <option value={th}>{th}</option>
      {/each}
    </select>
  </div>

  <div class="icon-viewer-settings-group">
    <label for="background-select">Background</label>
    <select id="theme-select" bind:value={background}>
      {#each backgrounds as bg}
        <option value={bg}>{bg}</option>
      {/each}
    </select>
  </div>

  <div class="icons">
    {#each Object.keys(icons) as Src}
      <Icon src={icons[Src]} size="16px" {theme} />
    {/each}
  </div>
</div>

<style>
  * {
    margin: 0;
  }

  :global(body) {
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .icon-viewer {
    max-width: 600px;
    padding: 2rem;
    border-radius: 8px;
  }

  .icon-viewer.dark {
    background: #333;
    color: white;
  }

  .icon-viewer {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .icons {
    margin: 24px 0;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
</style>
