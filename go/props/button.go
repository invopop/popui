package props

import "github.com/a-h/templ"

// Button Templ component props
type Button struct {
	Type      string
	Variant   string
	Class     string
	Disabled  bool
	Small     bool
	Autofocus bool
	Name      string
	Value     string
	Attrs     templ.Attributes
}
