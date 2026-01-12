package props

import "github.com/a-h/templ"

const (
	// FieldsetVariantCard represents a card-style fieldset.
	FieldsetVariantCard string = "card"
)

// Fieldset properties to configure a simple fieldset.
type Fieldset struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Legend     string
	Variant    string
}
