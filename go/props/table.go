package props

import "github.com/a-h/templ"

// Table Templ component props
type Table struct {
	Class string
	Attrs templ.Attributes
}

// TableCell Templ component props
type TableCell struct {
	Content    string
	UseInitial bool
	Bold       bool
	RightAlign bool
	Class      string
	Attrs      templ.Attributes
}
