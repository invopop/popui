package props

import "github.com/a-h/templ"

// Select Templ component props
type Select struct {
	ID         string
	Name       string
	Class      string
	Label      string
	LabelClass string
	LabelHint  string
	Disabled   bool
	Autofocus  bool
	Multiple   bool
	Required   bool
	Error      Error
	Attrs      templ.Attributes
}
