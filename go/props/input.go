package props

import "github.com/a-h/templ"

// Input defines the properties that can be used with input fields.
type Input struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Type        string
	Placeholder string
	Value       string
	Name        string
	Label       string
	Prefix      string
	Autofocus   bool
	Readonly    bool
	Required    bool
	Disabled    bool
	Error       Error
}
