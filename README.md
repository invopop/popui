# Invopop UI Kit

Set of reusable components to be used inside Console UI and other Invopop Microfrontends.

Everything inside `src/lib` is part of the library, everything else will be omitted on the NPM package.

## Runing Storybook

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development storybook server:

```bash
npm run storybook
```

## Compiling Web Components

The following command will compile a file called `dist/invopop-web-components.js` that can be imported on any external project.

```bash
npm run build-web-components
```

A test HTML file using this script can be found at `src/wbc-preview/index.html`

## Building the Svelte Library

To build the Svelte library:

```bash
npm run package
```

To create a production version of the showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing the Svelte Library

To publish the library to [npm](https://www.npmjs.com):

```bash
npm publish
```

## Building the Web Components Library

To build the Web Components library:

```bash
npm run build-web-components
```

This will generate a `/dist/index.js` file that you can include on any HTML to test. There is a ready-to-use HTML file with an example of any of the components located in `/src/wbc-preview/index.html`

## Publishing the Web Components Library

To publish the Web Components library to [npm](https://www.npmjs.com):

```bash
npm publish-wbc
```

## Using the Web Components Library in your module

Include the CDN script in your HTML file

```html
<script src="https://cdn.jsdelivr.net/npm/@invopop/web-components@0.0.1/index.js" defer></script>
```

Use any of the components available

```html
<ui-button>Default Button</ui-button>
```

You can pass props and listen to events

```html
<ui-button onClick="alert('button click')" type="primary">Primary Button</ui-button>
```

## Available Web Components

> NOTE: Due to web component limitations booleans need to be passed as strings ie: "true", other structures like objects or arrays need to be passed as JSON.stringify()

| Component          | Events Emitted | Props Accepted                                                                     |
| ------------------ | -------------- | ---------------------------------------------------------------------------------- |
| `ui-button`        | `@click`       | `type`: 'default', 'primary', 'secondary', 'danger', 'dark'` (default: 'default')  |
|                    |                | `disabled`: boolean (default: false)                                               |
|                    |                | `small`: boolean (default: false)                                                  |
|                    |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                    |                | `iconPosition`: 'right', 'left' (default: left)                                    |
|                    |                |                                                                                    |
| `ui-button-file`   | `@click`       | `type`: 'default', 'primary', 'secondary', 'danger', 'dark'` (default: 'default')  |
|                    |                | `disabled`: boolean (default: false)                                               |
|                    |                | `name`: string (default: '')                                                       |
|                    |                | `fullwidth`: boolean (default: false)                                              |
|                    |                |                                                                                    |
| `ui-checkbox`      | `@change`      | `checked`: boolean (default: false)                                                |
|                    |                |                                                                                    |
| `ui-input-search`  | `@input`       | `placeholder`: string (default: '')                                                |
|                    |                | `shortcut`: string (default: '')                                                   |
|                    |                |                                                                                    |
| `ui-input-text`    | `@input`       | `id`: string (default: '')                                                         |
|                    |                | `label`: string (default: '')                                                      |
|                    |                | `placeholder`: string (default: '')                                                |
|                    |                | `errorText`: string (default: '')                                                  |
|                    |                | `disabled`: boolean (default: 'false')                                             |
|                    |                |                                                                                    |
| `ui-list-item`     | `@input`       | `value`: string (default: '')                                                      |
|                    |                | `label`: string (default: '')                                                      |
|                    |                |                                                                                    |
| `ui-radio`         | `@change`      | `checked`: boolean (default: false)                                                |
|                    |                |                                                                                    |
| `ui-section`       |                | `title`: string (default: '')                                                      |
|                    |                |                                                                                    |
| `ui-select`        | `@change`      | `id`: string (default: '')                                                         |
|                    |                | `name`: string (default: '')                                                       |
|                    |                | `label`: string (default: '')                                                      |
|                    |                | `placeholder`: string (default: '')                                                |
|                    |                | `value`: string (default: '')                                                      |
|                    |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                    |                | `disabled`: boolean (default: 'false')                                             |
|                    |                | `disablePlaceholder`: boolean (default: 'false')                                   |
|                    |                | `options`: string (default: '[]')                                                  |
|                    |                |                                                                                    |
| `ui-tag-search`    | `@clear`       | `label`: string (default: '')                                                      |
|                    |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                    |                |                                                                                    |
| `ui-tag-status`    |                | `label`: string (default: '')                                                      |
|                    |                | `status`: 'default', 'success', 'warning', 'danger', 'orange' (default: 'default') |
|                    |                |                                                                                    |
| `ui-title-main`    |                | `title`: string (default: '')                                                      |
|                    |                |                                                                                    |
| `ui-title-section` |                | `title`: string (default: '')                                                      |
|                    |                |                                                                                    |
| `ui-toggle`        | `@change`      | `checked`: boolean (default: false)                                                |
