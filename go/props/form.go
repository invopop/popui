package props

import "github.com/a-h/templ"

// Form Templ component props
type Form struct {
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
