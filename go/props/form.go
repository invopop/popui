package props

import "github.com/a-h/templ"

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
