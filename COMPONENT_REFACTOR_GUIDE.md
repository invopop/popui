# Component Refactor Guide

## Overview
This guide documents the patterns and practices learned during the Accordion component refactor for PopUI. Use this as a reference when refactoring other components to maintain consistency.

---

## ⚠️ MANDATORY REFACTORING WORKFLOW ⚠️

**CRITICAL: You MUST complete ALL these steps for EVERY component refactor. No exceptions.**

### Step 1: Create Documentation FIRST (MANDATORY)
Before writing any component code:

1. **Create documentation page**: `go/internal/ui/pages/[component].templ`
2. **Create MDX examples**: `go/internal/ui/pages/examples/[component]/*.mdx` (minimum 3 examples)
3. **Add route**: `go/cmd/popui/serve.go` - add GET route and handler function
4. **Add to sidebar**: `go/internal/ui/layouts/docs.templ` - add navigation link
5. **Add to templ2html**: `go/cmd/templ2html/main.go` - add static generation for Netlify

### Step 2: Create Component Props
1. Create props file: `go/props/[component].go`
2. Follow 3-prop pattern: `ID`, `Class`, `Attributes`
3. Add component-specific props

### Step 3: Implement Component
1. Create component file: `go/[component].templ`
2. Extract CSS classes from `components.css`
3. Use variadic props with `props.First()`
4. Use `utils.TwMerge` and `utils.Clsx`

### Step 4: Update Examples
1. Update `go/examples/admin.templ` to use new component
2. Check `go/examples/page.templ` for old references
3. Search for all old component usages and update

---

## Component Structure Pattern

### Follow the 3-Prop Pattern
Each component should have a consistent prop structure:

```go
type ComponentProps struct {
    ID         string
    Class      string
    Attributes templ.Attributes
    // Component-specific props...
}
```

### Props Organization
- **Always** create dedicated prop files under `go/props/` package
- Each sub-component gets its own prop struct
- Example: `Accordion`, `AccordionTrigger`, `AccordionContent` all have separate structs

### Component Implementation
Use the `props.First()` helper to get the first prop or a zero value:

```go
templ Component(p ...ComponentProps) {
    {{ prp := props.First(p) }}
    
    <element
        if prp.ID != "" {
            id={ prp.ID }
        }
        class={ utils.TwMerge("base-classes", variantClasses(prp), prp.Class) }
        { prp.Attributes... }
    >
        { children... }
    </element>
}

func variantClasses(prp ComponentProps) string {
    return utils.Clsx(
        map[string]bool{
            "variant-class": prp.Variant == "value",
            "other-class":   prp.SomeCondition,
        },
    )
}
```

**Key Patterns:**
- Variadic parameter: `p ...ComponentProps`
- Use `props.First(p)` instead of manual `if len(p) > 0` check
- The `First()` helper is generic and returns zero value if array is empty
- **Extract complex Go code to private functions** - keep templ templates clean and readable
- **Use a SINGLE helper function** per component that combines all conditional logic
- **Inside helper functions, always use `utils.Clsx`** with map[string]bool for conditional classes
- **Don't use prefixes on private functions** - context is clear from the file (use `variantClasses`, not `componentVariantClasses`)
- **Always place private helper functions at the BOTTOM of the file** - public templ components first
- **Never create multiple helper functions** - one helper that handles variants, sizes, and states

---

## CSS Classes

### ⚠️ CRITICAL: Source of Truth is components.css
- **ALWAYS** use `components.css` as the single source of truth
- **NEVER** invent or guess CSS classes
- **NEVER** use external CSS classes directly
- **Extract @apply classes and use them inline** in the templ component

### How to Extract Classes from components.css
1. Find the component class in `components.css` (e.g., `.popui-avatar`)
2. Look at the `@apply` directive
3. Copy those exact classes into your templ component
4. Handle variants (like `--large`, `--initial`) with conditional logic

**Example from components.css:**
```css
.popui-avatar {
  @apply h-5 w-5 bg-background text-foreground-default-secondary rounded-md flex items-center justify-center font-semibold relative font-sans;
}
.popui-avatar--large {
  @apply !h-8 !w-8 rounded-lg;
}
.popui-avatar--initial {
  @apply border border-border;
}
```

**Becomes in templ:**
```templ
templ Avatar(p ...props.Avatar) {
    {{ avatar := props.First(p) }}
    {{
        var sizeClasses string
        var borderClasses string
        if avatar.Size == "lg" {
            sizeClasses = "!h-8 !w-8 rounded-lg"
        } else {
            sizeClasses = "h-5 w-5 rounded-md"
        }
        if avatar.Initial != "" {
            borderClasses = "border border-border"
        }
    }}
    <div class={
        utils.TwMerge(
            "bg-background text-foreground-default-secondary flex items-center justify-center font-semibold relative font-sans",
            sizeClasses,
            borderClasses,
            avatar.Class,
        ),
    }>
        { children... }
    </div>
}
```

### Class Organization
```templ
class={ utils.TwMerge(
    "flex items-center justify-between px-4 py-3",
    "bg-background border border-border-default-secondary",
    "hover:bg-background-default-secondary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground",
    "disabled:opacity-50 disabled:pointer-events-none",
    "transition-colors duration-200",
    p.Class,
) }
```

**Important:** Never add comments inside `utils.TwMerge()` calls. Keep the class strings clean and uncommented.

### Using TwMerge
- Import: `"github.com/Oudwins/tailwind-merge-go"`
- Wrapper in `go/utils/utils.go`:
```go
func TwMerge(classes ...string) string {
    return twmerge.Merge(classes...)
}
```

---

## Documentation Site

### Structure
```
go/internal/ui/
├── layouts/
│   ├── base.templ          # Base HTML with CSS/JS
│   └── docs.templ          # Docs layout with nav/sidebar
├── modules/
│   ├── api_table.templ     # API reference table
│   ├── code_block.templ    # Code examples with syntax highlighting
│   ├── example.templ       # Unified example component (preview + code)
│   ├── preview_box.templ   # Preview container
│   └── section.templ       # Section wrapper
└── pages/
    ├── docs_home.templ     # /docs landing page
    ├── accordion.templ     # Component documentation
    └── examples/           # Code examples in MDX format - organized by component
        ├── accordion/
        │   └── default.mdx
        ├── avatar/
        │   ├── default.mdx
        │   ├── sizes.mdx
        │   └── with_images.mdx
        └── button/
            ├── default.mdx
            ├── variants.mdx
            ├── sizes.mdx
            ├── with_icons.mdx
            ├── disabled.mdx
            └── anchor.mdx
```

**Organization Rules:**
- Examples live in `examples/[component]/` folders
- File names remove component prefix (e.g., `button_default.mdx` → `button/default.mdx`)
- Embed paths use folder structure: `//go:embed examples/button/default.mdx`
- Keeps examples organized and easy to find

### Example Component - Unified Pattern
The `Example` component unifies preview and code display. It replaces the old pattern of manually creating PreviewBox and CodeBlock separately.

**Key Features:**
- Optional title and description
- Automatic preview box styling
- Automatic code block with markdown extraction
- Language defaults to "go" (can be omitted)
- Code examples stored in separate `.mdx` files

**Props:**
```go
type ExampleProps struct {
    Title       string  // Optional: Example title
    Description string  // Optional: Example description
    Code        string  // Required: Code to display (supports markdown with code fences)
    Language    string  // Optional: Language for syntax highlighting (defaults to "go")
}
```

**Usage:**
```templ
// 1. Embed the MDX file at the top of your page
//go:embed examples/button/default.mdx
var buttonDefaultCode string

// 2. Use the Example component
@modules.Example(modules.ExampleProps{
    Title:       "Optional Title",
    Description: "Optional description of this example",
    Code:        buttonDefaultCode,  // Language defaults to "go"
}) {
    <!-- Live preview content here -->
    @popui.Component(props.Component{})
}
```

### MDX File Format for Examples
Store code examples in `go/internal/ui/pages/examples/*.mdx`:

```markdown
```go
package showcase

import (
    popui "github.com/invopop/popui/go"
    "github.com/invopop/popui/go/props"
)

templ ComponentExample() {
    @popui.Component(props.Component{})
}
```
```

**Key Points:**
- Files use `.mdx` extension
- Code wrapped in markdown code fences (` ```go `)
- Embedded at compile-time using `//go:embed`
- Code extraction handled automatically by `CodeBlock` component
- Zero runtime overhead

### Sidebar Active States
The docs layout automatically highlights the current page in the sidebar:
- Slugifies the page title to match routes
- Applies `bg-background-default-secondary` to active links
- Same styling as hover state for consistency

**Implementation:**
```templ
templ DocsLayout(title, description string) {
    {{ currentPath := slugify(title) }}  // Auto-generates /docs/components/[slug]
    // Sidebar links compare against currentPath
}

func slugify(title string) string {
    return "/docs/components/" + strings.ToLower(strings.ReplaceAll(title, " ", "-"))
}
```

### Page Template (New Pattern)
```templ
package pages

import (
    _ "embed"
    popui "github.com/invopop/popui/go"
    "github.com/invopop/popui/go/internal/ui/layouts"
    "github.com/invopop/popui/go/internal/ui/modules"
    "github.com/invopop/popui/go/props"
)

//go:embed examples/component_default.mdx
var componentDefaultCode string

//go:embed examples/component_variants.mdx
var componentVariantsCode string

templ ComponentName() {
    @layouts.DocsLayout("Component Name", "Brief description") {
        <!-- Basic Example (no title) -->
        @modules.Example(modules.ExampleProps{
            Code: componentDefaultCode,
        }) {
            @popui.Component(props.Component{})
        }

        <!-- Example with Title -->
        @modules.Example(modules.ExampleProps{
            Title:       "Variants",
            Description: "Different component variants",
            Code:        componentVariantsCode,
        }) {
            @popui.Component(props.Component{Variant: "primary"})
            @popui.Component(props.Component{Variant: "secondary"})
        }

        <!-- API Reference -->
        @modules.Section("API Reference", "api") {
            @modules.APITable(modules.APITableProps{
                Title:       "Component",
                Description: "Description",
                Items: []modules.APITableItem{
                    {Name: "ID", Type: "string", Default: "", Description: "Unique identifier"},
                },
            })
        }
    }
}
```

### Old Pattern (Deprecated)
```templ
<!-- DON'T DO THIS ANYMORE -->
<div class="space-y-8">
    <div>
        <h1 class="text-4xl font-bold mb-4">Component Name</h1>
        <p class="text-lg text-foreground-default-secondary">Description</p>
    </div>
    
    @modules.Section("Preview", "preview") {
        <div class="p-6 rounded-lg ...">
            <!-- preview -->
        </div>
    }
    
    @modules.Section("Usage", "usage") {
        @modules.CodeBlock(modules.CodeBlockProps{
            Language: "go",
            Code: `inline code string...`,
        })
    }
}
```

### Code Examples - CRITICAL RULES

1. **Store examples in separate MDX files**:
   - Location: `go/internal/ui/pages/examples/`
   - Format: Markdown with code fences (` ```go `)
   - Extension: `.mdx`
   - Embed with `//go:embed examples/filename.mdx`

2. **Always show the full picture**:
   - Include `package showcase` declaration
   - Include all necessary imports
   - Wrap in a `templ FunctionName()` function
   - Show complete, runnable code

3. **Preview and Code MUST match exactly**:
   - The code in the MDX file must match what's in the preview
   - If Preview has 2 items, code shows 2 items
   - Users need to see exactly what produces the preview

4. **Use the Example component**:
   - Replaces manual PreviewBox + CodeBlock
   - Cleaner, more maintainable
   - Language defaults to "go" (omit unless needed)

### API Table Structure
```go
type APITableItem struct {
    Name        string // Prop name
    Type        string // Go type
    Default     string // Default value
    Description string // What the prop does
    Required    bool   // Is it required?
}
```

### Syntax Highlighting
- Using **Prism.js** for client-side syntax highlighting
- Added to `base.templ`:
```templ
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-go.min.js"></script>
```

### Code Block Component
```templ
type CodeBlockProps struct {
    Code     string
    Language string
}

templ CodeBlock(props CodeBlockProps) {
    <pre class="w-full p-4 overflow-x-auto m-0 rounded-md bg-background-default-secondary border border-border-default-secondary"><code class={ "text-sm language-" + props.Language }>{ props.Code }</code></pre>
}
```

---

### Routing

### Integration into Serve Command
Add routes in `go/cmd/popui/serve.go`:

```go
// Documentation routes
e.GET("/docs", docsHome())
e.GET("/docs/components/accordion", docsAccordion())

// Handler functions
func docsHome() echo.HandlerFunc {
    return func(c echo.Context) error {
        return pages.DocsHome().Render(c.Request().Context(), c.Response().Writer)
    }
}
```

### ⚠️ CRITICAL: Update templ2html Generator for Netlify
**ALWAYS** add new component pages to `go/cmd/templ2html/main.go` for static site generation:

```go
docsPages := map[string]func() error{
    "components/newcomponent/index.html": func() error {
        return renderPage(publicPath, "components/newcomponent/index.html", pages.NewComponent())
    },
}
```

This ensures the component documentation is included in the Netlify preview build.

---

## Component-Specific Patterns

### Accordion (Details/Summary)
- Use native HTML `<details>` and `<summary>` elements
- Add `group` class to `<details>` for parent-state styling
- Use `group-open:` prefix for expanded state styling
- Example: `group-open:before:rotate-90` for chevron animation

### Card Components
Card components should be **fully decoupled** with slot-based architecture:

**Key Patterns:**
- **Card** is just a container with optional `Href` for link behavior
- **CardHeader** is standalone - expects Avatar/Flag as children via slots
- All sub-components (CardHeader, CardProgressBar, CardDashboard, CardFile) are independent
- Never nest prop structs (old: `Card.Header`) - use composition via children instead

**Before (Coupled):**
```templ
@Card(props.Card{
    Header: props.CardHeader{
        Title: "Title",
        ImgSrc: "/image.png",
    },
})
```

**After (Decoupled):**
```templ
@Card(props.Card{}) {
    @CardHeader(props.CardHeader{
        Title: "Title",
    }) {
        @Avatar(props.Avatar{Size: "lg"}) {
            @Image(props.Image{Src: "/image.png"})
        }
    }
}
```

**Slot Architecture Benefits:**
- Avatar can be omitted if not needed
- Flag can be added independently
- Header can have custom children in the free slot
- Maximum flexibility without prop complexity

**Helper Functions for Business Logic:**
- Move calculations to private functions at bottom of file
- Example: `percentValue()`, `percentColor()`, `formatAmount()`
- Keep templ code clean, move Go logic to helpers
- Use CSS functions for dynamic styles (e.g., `percentageStyle()`)

### Parent-State Styling
When child elements need to respond to parent state:
```templ
// Parent with group class
<details class="group">
    // Child responds to parent's open state
    <div class="group-open:visible invisible">...</div>
</details>
```

---

## Development Workflow

### Never Ask About Template Generation
- User has `air` running in background
- Templates auto-regenerate on save
- Focus on making changes, not regeneration

### Testing Changes
1. Make edits to `.templ` files
2. Air automatically regenerates
3. Refresh browser at `http://localhost:3000/docs`

### ⚠️ CRITICAL: Always Format Go Code
**MANDATORY: Format all Go files before committing changes or at the end of your session.**

When you're done with all your changes to `.go` files (props, utils, etc.), run:
```bash
gofmt -s -w path/to/file.go
```

Or format all Go files in the project:
```bash
find go -name "*.go" -not -path "*/node_modules/*" -exec gofmt -s -w {} \;
```

**Key Points:**
- Use `gofmt -s` flag (simplifies code)
- GitHub Actions will fail if code is not formatted
- This includes all `.go` files in the `go/` directory
- Generated `*_templ.go` files are automatically formatted by templ
- **No need to format after every single change** - do it at the end of your session or before committing
- If you follow Go standards and proper indentation when writing code, formatting may not be needed at all

**Common Errors:**
- `File is not gofmt-ed with -s` - means you forgot to format before committing
- Run formatting at the end of the session, not after every change

---

## Common Pitfalls to Avoid

❌ **DON'T:**
- Use external CSS classes
- Add useless comments
- Create wrapper divs unnecessarily
- Use `<p>` tags when PopUI has semantic components
- Show partial code examples
- Have mismatched Preview and Usage sections
- Create multiple helper functions for the same component
- Forget text sizing classes (text-xs, text-sm, etc.) when components have text content
- Rely on incompatible Tailwind v3 plugins
- Nest prop structs (e.g., `Card.Header`) - use composition instead
- Include business logic in templ templates - extract to helper functions

✅ **DO:**
- Use PopUI's own design tokens from `components.css`
- Keep components clean and minimal
- Use `utils.TwMerge` for class merging
- Group related CSS classes logically
- Add helpful descriptions to API tables
- Show complete, runnable code examples
- Ensure Preview and Usage match exactly
- Include package, imports, and function wrapper in code examples
- Use ONE helper function that combines all conditional logic (variants, sizes, states)
- Add appropriate text sizing for components with text/initials
- Reset browser defaults explicitly in styles.css @layer base when needed
- Decouple components using slot architecture for maximum flexibility
- Move calculations and business logic to private helper functions at bottom of file

---

## File Locations Reference

### Components
- Main components: `go/*.templ`
- Generated Go: `go/*_templ.go`
- Props: `go/props/*.go`

### Documentation
- Layouts: `go/internal/ui/layouts/`
- Modules: `go/internal/ui/modules/`
- Pages: `go/internal/ui/pages/`
- Routes: `go/cmd/popui/serve.go`

### Assets
- CSS: `go/assets/components.css`
- JS: `go/assets/*.js`

### Utilities
- TwMerge wrapper: `go/utils/utils.go`

---

## Future Component Refactors

When refactoring new components, **YOU MUST FOLLOW THE MANDATORY WORKFLOW** at the top of this document.

**DO NOT CREATE ANY COMPONENT CODE UNTIL DOCUMENTATION EXISTS.**

This checklist is for reference only - the workflow section at the top defines the mandatory order:

1. ✅ **Documentation FIRST** (see Step 1 in Mandatory Workflow)
2. ✅ **Props Structure** (see Step 2 in Mandatory Workflow)  
3. ✅ **Component Implementation** (see Step 3 in Mandatory Workflow)
4. ✅ **Update Examples** (see Step 4 in Mandatory Workflow)

---

## Questions to Ask Before Refactoring

- [ ] Does the component follow the 3-prop pattern (ID, Class, Attributes)?
- [ ] Are props in the `props` package?
- [ ] Are all CSS classes from PopUI (not external libraries)?
- [ ] Does it use `utils.TwMerge`?
- [ ] Is documentation page created with Preview, Usage, and API sections?
- [ ] Does the code example show package, imports, and complete function?
- [ ] Does the Usage code match the Preview exactly?
- [ ] Are all API props documented with descriptions?
- [ ] Is the route added to `serve.go`?
- [ ] **Is the component page added to `templ2html/main.go` for Netlify?**
- [ ] Have you tested it works at `/docs/components/[name]`?
