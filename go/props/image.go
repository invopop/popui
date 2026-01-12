package props

import "github.com/a-h/templ"

// Image properties for displaying images.
type Image struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Src        string
	Alt        string
}
