package props

import "github.com/a-h/templ"

// TagStatus Templ component props
type TagStatus struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
	Status     string // grey, green, yellow, red, orange, blue, purple, olive, teal, crimson, steelBlue, empty
	Dot        bool
}
