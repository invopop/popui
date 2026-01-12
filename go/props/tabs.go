package props

import "github.com/a-h/templ"

// Tabs Templ component props
type Tabs struct {
	Class string
	Attrs templ.Attributes
}

// Tab Templ component props
type Tab struct {
	Class  string
	Active bool
	Attrs  templ.Attributes
}
