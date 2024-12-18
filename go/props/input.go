package props

import "github.com/a-h/templ"

// Label Templ component props
type Label struct {
	ID    string
	Class string
	Attrs templ.Attributes
}

// Input Templ component props
type Input struct {
	ID          string
	Placeholder string
	Type        string
	Value       string
	Name        string
	Autofocus   bool
	Readonly    bool
	Required    bool
	Disabled    bool
	Class       string
	Label       string
	LabelClass  string
	Error       Error
	Attrs       templ.Attributes
}
