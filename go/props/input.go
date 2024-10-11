package props

import "github.com/a-h/templ"

type Label struct {
	ID    string
	Class string
	Attrs templ.Attributes
}

type InputText struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Error      Error
	Attrs      templ.Attributes
}
