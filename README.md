# Invopop UI Kit

Set of reusable components to be used inside Console UI and other Invopop Microfrontends.

Everything inside `src/lib` is part of the library, everything else will be omitted on the NPM package.

## Runing Storybook

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development storybook server:

```bash
npm run storybook
```

## Compiling Web Components

```bash
npm run build-web-components
```

The following command will compile a file called `dist/invopop-web-components.js` that can be imported on any external project.

A test HTML file using this script can be found at `src/wbc-preview/index.html``

## Building

To build the library:

```bash
npm run package
```

To create a production version of the showcase app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Publishing

To publish the library to [npm](https://www.npmjs.com):

```bash
npm publish
```
