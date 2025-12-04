package props

import "github.com/a-h/templ"

// DescriptionList defines the props for the DescriptionList component.
type DescriptionList struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// DescriptionListItem defines the props for the DescriptionListItem component.
type DescriptionListItem struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
	Value      string
}

// DT defines the props for the DT component (definition term).
type DT struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// DD defines the props for the DD component (definition description).
type DD struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}
