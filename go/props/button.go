package props

import "github.com/a-h/templ"

// Button Sizes
const (
	ButtonSizeSmall string = "sm"
	ButtonSizeLarge string = "lg"
	ButtonSizeIcon  string = "icon"
)

// Button Variants
const (
	ButtonVariantPrimary     string = "primary"
	ButtonVariantSecondary   string = "secondary"
	ButtonVariantDanger      string = "danger"
	ButtonVariantTransparent string = "transparent"
)

// Button Templ component props
type Button struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Type       string
	Variant    string
	Size       string
	Disabled   bool
	Autofocus  bool
	Name       string
	Value      string
	Form       string
}

// AnchorButton Templ component props
type AnchorButton struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Variant    string
	Size       string
	Href       templ.SafeURL
	Target     string
	Rel        string
	Download   bool
}
