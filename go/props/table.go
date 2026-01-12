package props

import "github.com/a-h/templ"

// Table Templ component props
type Table struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Variant    string // "card" adds outer border
}

// TablePagination Templ component props
type TablePagination struct {
	ID                  string
	Class               string
	Attributes          templ.Attributes
	CurrentPage         int
	TotalPages          int
	TotalItems          int
	RowsPerPage         int
	RowsPerPageOptions  []int
	ShowRowsPerPage     bool
	ItemsLabel          string
	FirstPageURL        templ.SafeURL
	PrevPageURL         templ.SafeURL
	NextPageURL         templ.SafeURL
	LastPageURL         templ.SafeURL
	PageInputAttributes templ.Attributes
}
