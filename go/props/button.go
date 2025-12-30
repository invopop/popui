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

// Buttons is used with buttons components that usually contain
// multiple buttons.
type Buttons struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Button defines the properties for a button component. Either regular form
// or anchor button behavior can be configured.
type Button struct {
	ID         string
	Class      string
	Attributes templ.Attributes

	// Variant defines the button style variant, see the ButtonVariant constants.
	// Default is "primary".
	Variant string

	// Size defines the button size, see the ButtonSize constants.
	Size string

	/* Form button fields */

	// Type determines the type of button, e.g., "button", "submit", "reset".
	Type string
	// Name sets the name attribute of the button for the form.
	Name string
	// Value sets the value attribute of the button for the form.
	Value string
	// Form associates the button with a form element by its ID.
	Form string
	// Disabled when true disables the button.
	Disabled bool
	// Autofocus when true sets the autofocus attribute on the button.
	Autofocus bool

	/* Anchor button fields */

	// Href enables anchor button behavior as opposed to a form button.
	Href templ.SafeURL
	// Target determines where to open the linked document.
	Target string
	// Rel specifies the relationship between the current document and the
	// linked document.
	Rel string
	// Download when true indicates that the linked resource is intended to be
	// downloaded rather than displayed in the browser.
	Download bool
}

// IsAnchor returns true if the button is configured as an anchor.
func (b Button) IsAnchor() bool {
	return b.Href != ""
}
