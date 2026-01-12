package props

import "github.com/a-h/templ"

// FlashMessage defines the props for the FlashMessage component.
type FlashMessage struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Type       string
	Message    string
}
