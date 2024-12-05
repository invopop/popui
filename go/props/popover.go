package props

import "github.com/a-h/templ"

// Popover Templ component props
type Popover struct {
	ID            string
	Class         string
	ButtonLabel   string
	ButtonVariant string
	RightAlign    bool
	Stretch       bool
	Attrs         templ.Attributes
}
