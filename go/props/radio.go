package props

import "github.com/a-h/templ"

// Radio Templ component props
type Radio struct {
	ID          string
	Class       string
	Label       string
	Description string
	Autofocus   bool
	Required    bool
	Checked     bool
	Name        string
	Value       string
	Attrs       templ.Attributes
}
