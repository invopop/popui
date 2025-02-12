package props

import "github.com/a-h/templ"

// Notification Templ component props
type Notification struct {
	Class string
	Text  string
	Type  string
	Attrs templ.Attributes
}
