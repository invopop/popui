package props

import "github.com/a-h/templ"

// Select Templ component props
type Select struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Name       string
	Label      string
	Disabled   bool
	Autofocus  bool
	Multiple   bool
	Required   bool
	Error      Error
}
