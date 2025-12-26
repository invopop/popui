package props

import "github.com/a-h/templ"

// Breadcrumbs defines the props for the Breadcrumbs component.
type Breadcrumbs struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Breadcrumb defines the props for an individual breadcrumb item.
type Breadcrumb struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
	Href       templ.SafeURL
}
