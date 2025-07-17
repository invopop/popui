package props

import "github.com/a-h/templ"

// AppHeader Templ component props
type AppHeader struct {
	Class string
	Attrs templ.Attributes
}

// AppContent Templ component props
type AppContent struct {
	Class          string
	CenterVertical bool
	Attrs          templ.Attributes
}

// AppFooter Templ component props
type AppFooter struct {
	Class string
	Attrs templ.Attributes
}
