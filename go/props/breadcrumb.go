package props

import "github.com/a-h/templ"

// Breadcrumb defines the props for the Breadcrumb component.
type Breadcrumb struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// BreadcrumbItem defines the props for the BreadcrumbItem component.
type BreadcrumbItem struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
	Href       templ.SafeURL
}
