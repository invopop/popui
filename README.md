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

To publish the library to [npm](https://www.npmjs.com), manually increase the version in `svelte/package.json` and make a PR to the `main` branch. Once merged, it will automatically release a new version of the library.

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
