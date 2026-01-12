package props

import "github.com/a-h/templ"

// Tabs Templ component props
type Tabs struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Variant    string // "default" or "pill"
}

// Tab Templ component props
type Tab struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Active     bool
	Variant    string // "default" or "pill" - should match parent Tabs variant
}
