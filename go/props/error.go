package props

import "github.com/a-h/templ"

// Error Templ component props
type Error struct {
	Error      error
	Text       string
	Class      string
	Attributes templ.Attributes
}

// Empty returns true if the error has no data
func (e Error) Empty() bool {
	return e.Error == nil && e.Text == "" && len(e.Attributes) == 0
}
