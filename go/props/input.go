package props

import "github.com/a-h/templ"

// Label Templ component props
type Label struct {
	ID    string
	Class string
	Attrs templ.Attributes
}

// InputText Templ component props
type InputText struct {
	ID          string
	Placeholder string
	Type        string
	Class       string
	Label       string
	LabelClass  string
	Error       Error
	Attrs       templ.Attributes
}
