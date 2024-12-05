package props

import "github.com/a-h/templ"

// Form Templ component props
type Form struct {
	Name   string
	Action templ.SafeURL
	Method string
	Target string
	Class  string
	Attrs  templ.Attributes
}
