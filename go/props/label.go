package props

import "github.com/a-h/templ"

// Label defines the tag properties for labels.
type Label struct {
	ID    string
	Hint  string
	Class string
	Attrs templ.Attributes
}
