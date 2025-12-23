# Popui

Popui is a set of reusable components to be used inside Console UI and other Invopop Apps.

Currently we provide different libraries and examples for

- Svelte
- Go

## Svelte

### Runing Storybook for development

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development storybook server:

```bash
npm run storybook
```

> For using a different `accent` color for some components you can set the `--workspace-accent-color:` CSS variable placed in `.storybook/variables.css` file.

### Publishing the Svelte Library

To publish the library to [npm](https://www.npmjs.com) you only need to manually increase the version of package.json and make a PR to `main` branch. Once merged, it will automatically relase a new version of the library.

### Using the Svelte Library in your app

```
import { InputText } from '@invopop/popui'

<div>
  <InputText
    label="Name"
    placeholder="Company's legal name"
    on:input={(event) => {
      console.log(event.detail)
    }}
  />
</div>
```

A complete catalogue of examples is availabe on [Storybook](https://popui-svelte.netlify.app/)

## Go

For Go, we are using Templ for creating template wrappers around these HTML components.

### Building CSS Assets

Go requires the CSS with all the Tailwind components to be built independently. To do this, run the go generate command and check any potential errors with your node instalation:

```bash
go generate ./...
```

This will compile the admin templ and compile it to `public/index.html`

```bash
go run ./go/cmd/templ2html
```

### Development server

To run a development server for the Go library:

```bash
air
```

This command will compile the `.templ` templates and start up a web server loading the `go/examples/page.templ` file.

Air will also watch for changes and re-run everything for you, with the exception of the tailwind classes which will need to be rebuilt manually (for the time being).

### Using the Go Package

There are two options for incorporating the Popui styles.

**Option 1**: using the lightweight stylesheet provided in the repository and the embedded filesystem. With Echo's `StaticFS` method, server assets using:

```go
e.StaticFS(popui.AssetPath, popui.Assets)
```

Then use the `EmbeddedCSS()` header method for the lightweight version (only includes utilities from component classes):

```go
templ Head() {
  <head>
    <title>Title</title>
    @popui.EmbeddedCSS()
  </head>
}
```

**Option 2**: using the full stylesheet with all Tailwind utilities. Use `EmbeddedFullCSS()` when you need access to all utility classes (useful for examples and development):

```go
templ Head() {
  <head>
    <title>Title</title>
    @popui.EmbeddedFullCSS()
  </head>
}
```

### Use the Go Templ Components

```go
import (
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/props"
)

templ Page() {
    <div class="max-w-md">
        @popui.Button(
            props.Button{
                Variant: "primary",
                Small: true,
            }) {
            Click Me
        }
    </div>
}
```

You can check out examples of each component in `go/examples/page.templ` file.

## Web Components

Some of the Svelte components have a wrapper for making it work using Web Components

### Building the Web Components Library

To build the Web Components library:

```bash
npm run build-web-components
```

This will generate a `/dist/index.js` file that you can include on any HTML to test. There is a ready-to-use HTML file with an example of any of the components located in `/src/wbc-preview/index.html`

### Publishing the Web Components Library

To publish the Web Components library to [npm](https://www.npmjs.com):

```bash
npm publish-wbc
```

### Using the Web Components Library in your app

Include the CDN script in your HTML file

```html
<script src="https://cdn.jsdelivr.net/npm/@invopop/web-components@0.0.13/index.js" defer></script>
```

Use any of the components available

```html
<popui-button>Default Button</popui-button>
```

You can pass props and listen to events

```html
<popui-button onClick="alert('button click')" type="primary">Primary Button</popui-button>
```

### Available Web Components

> NOTE: Due to web component limitations booleans need to be passed as strings ie: "true", other structures like objects or arrays need to be passed as JSON.stringify()

| Component             | Events Emitted | Props Accepted                                                                     |
| --------------------- | -------------- | ---------------------------------------------------------------------------------- |
| `popui-button`        | `@click`       | `type`: 'default', 'primary', 'secondary', 'danger', 'dark'` (default: 'default')  |
|                       |                | `disabled`: boolean (default: false)                                               |
|                       |                | `small`: boolean (default: false)                                                  |
|                       |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                       |                | `iconPosition`: 'right', 'left' (default: left)                                    |
|                       |                |                                                                                    |
| `popui-button-file`   | `@click`       | `type`: 'default', 'primary', 'secondary', 'danger', 'dark'` (default: 'default')  |
|                       |                | `disabled`: boolean (default: false)                                               |
|                       |                | `name`: string (default: '')                                                       |
|                       |                | `fullwidth`: boolean (default: false)                                              |
|                       |                |                                                                                    |
| `popui-checkbox`      | `@change`      | `checked`: boolean (default: false)                                                |
|                       |                |                                                                                    |
| `popui-input-search`  | `@input`       | `placeholder`: string (default: '')                                                |
|                       |                | `shortcut`: string (default: '')                                                   |
|                       |                |                                                                                    |
| `popui-input-text`    | `@input`       | `id`: string (default: '')                                                         |
|                       |                | `label`: string (default: '')                                                      |
|                       |                | `placeholder`: string (default: '')                                                |
|                       |                | `errorText`: string (default: '')                                                  |
|                       |                | `disabled`: boolean (default: 'false')                                             |
|                       |                |                                                                                    |
| `popui-list-item`     | `@input`       | `value`: string (default: '')                                                      |
|                       |                | `label`: string (default: '')                                                      |
|                       |                |                                                                                    |
| `popui-radio`         | `@change`      | `checked`: boolean (default: false)                                                |
|                       |                |                                                                                    |
| `popui-section`       |                | `title`: string (default: '')                                                      |
|                       |                |                                                                                    |
| `popui-select`        | `@change`      | `id`: string (default: '')                                                         |
|                       |                | `name`: string (default: '')                                                       |
|                       |                | `label`: string (default: '')                                                      |
|                       |                | `placeholder`: string (default: '')                                                |
|                       |                | `value`: string (default: '')                                                      |
|                       |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                       |                | `disabled`: boolean (default: 'false')                                             |
|                       |                | `disablePlaceholder`: boolean (default: 'false')                                   |
|                       |                | `options`: string (default: '[]')                                                  |
|                       |                |                                                                                    |
| `popui-tag-search`    | `@clear`       | `label`: string (default: '')                                                      |
|                       |                | `icon`: Cog6Tooth (Heroicons library name) (default: undefined)                    |
|                       |                |                                                                                    |
| `popui-tag-status`    |                | `label`: string (default: '')                                                      |
|                       |                | `status`: 'default', 'success', 'warning', 'danger', 'orange' (default: 'default') |
|                       |                |                                                                                    |
| `popui-title-main`    |                | `title`: string (default: '')                                                      |
|                       |                |                                                                                    |
| `popui-title-section` |                | `title`: string (default: '')                                                      |
|                       |                |                                                                                    |
| `popui-toggle`        | `@change`      | `checked`: boolean (default: false)                                                |
