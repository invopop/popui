package props

import "github.com/a-h/templ"

// Avatar Templ component props
type Avatar struct {
	Class   string
	Initial string
	Large   bool
	Attrs   templ.Attributes
}
