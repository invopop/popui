package props

import "github.com/a-h/templ"

// Checkbox Templ component props
type Checkbox struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Attrs      templ.Attributes
}
