package props

import "github.com/a-h/templ"

// EmptyState defines the props for the EmptyState component.
type EmptyState struct {
	Class       string
	Attributes  templ.Attributes
	Title       string
	Description string
}
