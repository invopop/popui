package props

import "github.com/a-h/templ"

// Notification defines the props for the Notification component.
type Notification struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Type        string
	Text        string
	Description string
}
