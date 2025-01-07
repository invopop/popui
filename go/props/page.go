package props

import "github.com/a-h/templ"

// PageSection Templ component props
type PageSection struct {
	Title       string
	Description string
	Class       string
	Attrs       templ.Attributes
}
