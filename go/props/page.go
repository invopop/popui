package props

import "github.com/a-h/templ"

// PageHeader Templ component props
type PageHeader struct {
	Title       string
	Class       string
	Attrs       templ.Attributes
	Breadcrumbs []PageBreadcrumb
}

// PageBreadcrumb defines a Page Breadcrumb to be displayed on a PageHeader
type PageBreadcrumb struct {
	Name  string
	URL   templ.SafeURL
	Attrs templ.Attributes
}

// PageSection Templ component props
type PageSection struct {
	Title       string
	Description string
	Class       string
	Attrs       templ.Attributes
}
