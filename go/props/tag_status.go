package props

import "github.com/a-h/templ"

// TagStatus Templ component props
type TagStatus struct {
	ID     string
	Label  string
	Status string // grey, green, yellow, red, orange, blue, purple, olive, teal, crimson, blueViolet, steelBlue, empty
	Dot    bool
	Class  string
	Attrs  templ.Attributes
}
