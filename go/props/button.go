package props

import "github.com/a-h/templ"

// Button Templ component props
type Button struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Type       string
	Variant    string
	Size       string
	Disabled   bool
	Autofocus  bool
	Name       string
	Value      string
	Form       string
}

// AnchorButton Templ component props
type AnchorButton struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Variant    string
	Size       string
	Href       templ.SafeURL
	Target     string
	Rel        string
	Download   bool
}
