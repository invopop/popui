package props

import "github.com/a-h/templ"

type Select struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Disabled   bool
	Error      Error
	Attrs      templ.Attributes
}
