package props

import "github.com/a-h/templ"

// Page Templ component props
type Page struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// PageContainer Templ component props
type PageContainer struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// PageHeader Templ component props
type PageHeader struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Title       string
	Breadcrumbs []PageBreadcrumb
}

// PageBreadcrumb defines a Page Breadcrumb to be displayed on a PageHeader.
// Attrs can be used to add extra properties such as target="_blank"
type PageBreadcrumb struct {
	Name  string
	URL   templ.SafeURL
	Attrs templ.Attributes
}

// PageContent Templ component props
type PageContent struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// PageSection Templ component props
type PageSection struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Title       string
	Description string
}

// PageSections Templ component props
type PageSections struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// PageActions Templ component props
type PageActions struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// PageTitle Templ component props
type PageTitle struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}
