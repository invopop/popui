package props

import "github.com/a-h/templ"

// Popover Templ component props
type Popover struct {
	ID            string
	Class         string
	Attributes    templ.Attributes
	ButtonLabel   string
	ButtonVariant string
	RightAlign    bool
}

// PopoverItem menu item component props
type PopoverItem struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}
