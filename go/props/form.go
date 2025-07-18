package props

import "github.com/a-h/templ"

// Form Templ component props
type Form struct {
	ID     string
	Name   string
	Action templ.SafeURL
	Method string
	Target string
	Class  string
	Attrs  templ.Attributes
}

// Fieldset properties to configure a simple fieldset.
type Fieldset struct {
	Legend      string
	Class       string
	Attrs       templ.Attributes
	LegendAttrs templ.Attributes
}

// OptionGroup Templ component props.
type OptionGroup struct {
	Label      string
	Class      string
	Attrs      templ.Attributes
	LabelAttrs templ.Attributes
}

// InputTitle Templ component props.
type InputTitle struct {
	Title string
	Class string
	Attrs templ.Attributes
}
