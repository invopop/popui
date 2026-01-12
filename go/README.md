## Go

This Go packages uses Templ for creating template wrappers to define Popui components and use as much as possible the shared styles with the base popui svelte components.

NOTE: ensure that all commands listed in this readme are run from the `./go` path.


### Building

Go requires the CSS with all the Tailwind components to be built independently. To do this, run the go generate command and check any potential errors with your node installation:

```bash
go generate ./...
```

### Documentation site

Use the popui utility to compile the project into the `public` directory with a single `index.html` for the development site.

```bash
go build ./cmd/popui && ./popui build
```

Run a development server to be able to quickly test changes to the templates using the air utility, this will ensure the Tailwind classes, generated code, and binary are correctly prepared.

```bash
air
```

### Using the Go Package

Ensure the public assets are loaded using something like the following example for the go echo library:

```go
e.StaticFS(popui.AssetPath, popui.Assets)
```

Build your own layout using the `popui.App` as a base:

```go
import (
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/props"
)

templ Page() {
    @popui.App(props.App{Title: "Test App"}) {
        @popui.Main() {
            @popui.Article() {
                @popui.Button(
                    props.Button{
                        Variant: "primary",
                        Small: true,
                    }) {
                    Click Me
                }
            }
        }
    }
}
```

You can check out examples of each component in `examples` path and documentation project.
