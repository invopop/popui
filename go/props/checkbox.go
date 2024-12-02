package props

import "github.com/a-h/templ"

// Checkbox Templ component props
type Checkbox struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Autofocus  bool
	Checked    bool
	Name       string
	Value      string
	Attrs      templ.Attributes
}
