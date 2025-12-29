package props

// Head Templ component properties.
type Head struct {
	Title       string
	Description string

	// AlpineJS when true includes Alpine.js in the head.
	AlpineJS bool

	// HTMX when true loads the htmx library
	HTMX bool

	// Scripts is a list of additional script paths to include.
	Scripts []Script
	// Stylesheets is a list of additional stylesheet links to include.
	Stylesheets []Link
}

// PopupLayout Templ component props
type PopupLayout struct {
	Title string
}

// Script defines a script to include in the head section.
type Script struct {
	Src   string
	Defer bool
	Async bool
}

// Link defines a link to include in the head section.
type Link struct {
	Href string
	Rel  string // default rel will be "stylesheet"
}

// RelOrStylesheet returns the rel or "stylesheet" value if not set.
func (l Link) RelOrStylesheet() string {
	if l.Rel == "" {
		return "stylesheet"
	}
	return l.Rel
}
