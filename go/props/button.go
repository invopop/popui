package props

import "github.com/a-h/templ"

// Button Templ component props
type Button struct {
	Variant  string
	Class    string
	Disabled bool
	Small    bool
	Attrs    templ.Attributes
}
