package props

import "github.com/a-h/templ"

// Fieldset properties to configure a simple fieldset.
type Fieldset struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Legend     string
	Variant    string
}
