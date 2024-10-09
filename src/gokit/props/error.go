package props

import "github.com/a-h/templ"

type Error struct {
	Text  string
	Class string
	Attrs templ.Attributes
}

// Empty returns true if the error has no data
func (e Error) Empty() bool {
	return e.Text == "" && len(e.Attrs) == 0
}
