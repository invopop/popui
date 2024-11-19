package props

import "github.com/a-h/templ"

// Select Templ component props
type Select struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Disabled   bool
	Error      Error
	Attrs      templ.Attributes
}
