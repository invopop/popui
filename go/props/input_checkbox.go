package props

import "github.com/a-h/templ"

// InputCheckbox defines the properties that can be used when building
// input checkboxes.
type InputCheckbox struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Autofocus  bool
	Checked    bool
	Switch     bool
	Name       string
	Value      string
	Attrs      templ.Attributes
}
