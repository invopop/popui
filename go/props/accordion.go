package props

import "github.com/a-h/templ"

// Accordion Templ component props
type Accordion struct {
	Class      string
	Title      string
	Open       bool
	Scrollable bool
	Attrs      templ.Attributes
}
