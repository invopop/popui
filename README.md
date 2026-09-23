# Popui

Popui is a set of reusable components to be used inside Console UI and other Invopop Apps.

This repository contains:

- **Svelte Component Library** - Reusable Svelte components with Tailwind theme configuration

> **Note:** The Go library has been moved to [github.com/invopop/popui.go](https://github.com/invopop/popui.go)

## Svelte Component Library

The Svelte library includes a comprehensive set of reusable UI components built with Svelte 5 and Tailwind CSS.

### Running Storybook for Development

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start the development Storybook server:

```bash
cd svelte
npm install
npm run storybook
```

> For using a different `accent` color for some components you can set the `--workspace-accent-color:` CSS variable placed in `.storybook/variables.css` file.

### Publishing the Svelte Library

Releases are automatic. Every merge to `main` that changes the library (`svelte/src/lib`, `svelte/package.json`, the lockfile or the Svelte config) publishes a new version to [npm](https://www.npmjs.com) and creates a matching `popui@x.y.z` tag and [GitHub release](https://github.com/invopop/popui/releases), with notes listing the PRs merged since the last one. Changes to stories or docs don't release.

The version is worked out by the release workflow, not edited by hand, and follows the same markers as our Go releases. It reads every commit message since the last release, including the commits a merged PR brings in or a squashed PR's title and description:

- **Minor** by default: `0.100.0` → `0.101.0`. `#minor` says the same thing explicitly.
- **Patch** with `#patch` in a message: `0.101.0` → `0.101.1`.
- **Major** with `#major` in a message: `0.101.1` → `1.0.0`.

If messages disagree, the largest wins: `#major` over `#minor` over `#patch`. Only the marker as a whole word counts, so `#patching` or a PR reference like `#218` doesn't.

The version in `svelte/package.json` is a floor, not the current version. It's only used when it's higher than the last release, which is how to jump to a specific version (as the move from `0.1.x` to `0.100.0` did). Otherwise leave it alone.

### Using the Svelte Library

Install the package:

```bash
npm install @invopop/popui
```

Import components in your Svelte app:

```svelte
<script>
  import { InputText } from '@invopop/popui'
</script>

<InputText
  label="Name"
  placeholder="Company's legal name"
  oninput={(event) => {
    console.log(event.detail)
  }}
/>
```

A complete catalogue of examples is available on [Storybook](https://popui-svelte.netlify.app/).

### Tailwind Theme

The library exports a Tailwind theme configuration that you can import into your own projects:

```css
@import "@invopop/popui/tailwind.theme.css";
```

This provides access to the Popui design system's color palette, typography, spacing, and other design tokens.
