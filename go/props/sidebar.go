package props

import "github.com/a-h/templ"

// Sidebar Templ component props
type Sidebar struct {
	Title string
	Class string
	Attrs templ.Attributes
}

// SidebarSection Templ component props
type SidebarSection struct {
	Title string
	Class string
	Attrs templ.Attributes
}
