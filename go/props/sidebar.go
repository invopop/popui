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

// SidebarItem defines the property for a single sidebar navigation item.
type SidebarItem struct {
	ID       string
	Class    string
	Selected bool
	Attrs    templ.Attributes
	Href     templ.SafeURL
}
