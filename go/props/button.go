package props

import "github.com/a-h/templ"

// Button Templ component props
type Button struct {
	Type               string
	Variant            string
	Class              string
	Disabled           bool
	Small              bool
	Autofocus          bool
	Name               string
	Value              string
	ShowSpinnerOnClick bool
	Attrs              templ.Attributes
}

// AnchorButton Templ component props
type AnchorButton struct {
	Type     string
	Variant  string
	Class    string
	Small    bool
	Href     templ.SafeURL
	Target   string
	Rel      string
	Download bool
	Attrs    templ.Attributes
}

// FileButton Templ component props
type FileButton struct {
	Type      string
	Class     string
	Disabled  bool
	Autofocus bool
	Name      string
	Value     string
	Attrs     templ.Attributes
}
