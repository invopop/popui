package props

import "github.com/a-h/templ"

// InputText defines the properties that can be used with input text fields.
type InputText struct {
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
