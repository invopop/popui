# Component Refactor Guide

## Overview
This guide documents the patterns and practices learned during the Accordion component refactor for PopUI. Use this as a reference when refactoring other components to maintain consistency.

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
- **Always use a `variantClasses` helper function** when classes need to be added based on props
- **Inside `variantClasses`, always use `utils.Clsx`** with map[string]bool for conditional classes
- **Don't use prefixes on private functions** - context is clear from the file (use `variantClasses`, not `componentVariantClasses`)

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
│   └── section.templ       # Section wrapper
└── pages/
    ├── docs_home.templ     # /docs landing page
    └── accordion.templ     # Component documentation
```

### Page Template
```templ
templ ComponentName() {
    @layouts.DocsLayout("Title", "Description") {
        <div class="space-y-8">
            <!-- Title & Description -->
            <div>
                <h1 class="text-4xl font-bold mb-4">Component Name</h1>
                <p class="text-lg text-foreground-default-secondary">
                    Brief description
                </p>
            </div>

            <!-- Preview Section -->
            @modules.Section("Preview", "preview") {
                <div class="p-6 rounded-lg border border-border-default-secondary bg-background-default-secondary space-y-2">
                    <!-- Live component examples -->
                </div>
            }

            <!-- Usage Section -->
            @modules.Section("Usage", "usage") {
                @modules.CodeBlock(modules.CodeBlockProps{
                    Language: "go",
                    Code: `package showcase

import (
    popui "github.com/invopop/popui/go"
    "github.com/invopop/popui/go/props"
)

templ ComponentExample() {
    // Exact code from Preview section
}`,
                })
            }

            <!-- API Reference Section -->
            @modules.Section("API Reference", "api") {
                @modules.APITable(modules.APITableProps{
                    Title:       "Component",
                    Description: "Description of the component",
                    Items: []modules.APITableItem{
                        {Name: "ID", Type: "string", Default: "", Description: "Unique identifier"},
                        // ... more props
                    },
                })
            }
        </div>
    }
}
```

### Code Examples - CRITICAL RULES

1. **Always show the full picture**:
   - Include `package showcase` declaration
   - Include all necessary imports
   - Wrap in a `templ FunctionName()` function
   - Show complete, runnable code

2. **Preview and Code MUST match exactly**:
   - The code in the Usage section must be identical to the Preview section
   - If Preview has 2 accordion items, Usage code shows 2 accordion items
   - If Preview uses `popui.Description()`, Usage code shows `popui.Description()`
   - Users need to see exactly what produces the preview

3. **Use PopUI components consistently**:
   - Use `@popui.Description()` instead of `<p>` tags
   - Use proper PopUI semantic components throughout

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

## Routing

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

---

## Component-Specific Patterns

### Accordion (Details/Summary)
- Use native HTML `<details>` and `<summary>` elements
- Add `group` class to `<details>` for parent-state styling
- Use `group-open:` prefix for expanded state styling
- Example: `group-open:before:rotate-90` for chevron animation

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

---

## Common Pitfalls to Avoid

❌ **DON'T:**
- Use external CSS classes
- Add useless comments
- Create wrapper divs unnecessarily
- Use `<p>` tags when PopUI has semantic components
- Show partial code examples
- Have mismatched Preview and Usage sections

✅ **DO:**
- Use PopUI's own design tokens from `components.css`
- Keep components clean and minimal
- Use `utils.TwMerge` for class merging
- Group related CSS classes logically
- Add helpful descriptions to API tables
- Show complete, runnable code examples
- Ensure Preview and Usage match exactly
- Include package, imports, and function wrapper in code examples

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

When refactoring new components:

1. **Structure**: Create props in `go/props/`, follow 3-prop pattern
2. **Styling**: Convert to inline Tailwind, use PopUI tokens
3. **Documentation**: Create page in `go/internal/ui/pages/`
4. **Routing**: Add route in `serve.go`
5. **Code Examples**: Show complete code with package, imports, and function
6. **Verification**: Ensure Preview matches Usage code exactly
7. **API Docs**: Add helpful descriptions for all props

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
- [ ] Have you tested it works at `/docs/components/[name]`?
