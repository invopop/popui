package props

import "github.com/a-h/templ"

// App defines the properties used to configure an App.
type App struct {
	Title       string
	Description string

	// Accent color for the application.
	AccentColor string

	// Head allows for additional headers to be added to the App's Head
	// component.
	Head templ.Component

	// Data adds the x-data attribute to the application body's contents.
	Data string
}

// Main for configuring the App main content component.
type Main struct {
	ID    string
	Class string

	// Cloak when true adds the x-cloak attribute to the main element.
	Cloak bool

	// Data adds the x-data attribute to the main element.
	Data string

	// Center when true will ensure that the main content is centered in
	// the available space with a maximum width.
	Center bool

	Attributes templ.Attributes
}

// Article for configuring the App article component.
type Article struct {
	ID    string
	Class string

	// FullWidth when true makes the article take the full width of the
	// main content area while maintaining padding.
	FullWidth bool

	Attributes templ.Attributes
}

// Header for configuring the App header component and set of
// breadcrumbs if required.
type Header struct {
	ID    string
	Class string

	// title allows for a custom title component to be provided on the left
	// side of the header before the Breadcrumbs.
	Title templ.Component

	// Data adds the x-data attribute to the header element.
	Data string

	// Attributes adds additional attributes to the header element.
	Attributes templ.Attributes

	// Breadcrumbs is the set of breadcrumbs to show in the header.
	Breadcrumbs []Breadcrumb
}

// Footer for configuring the App footer component.
type Footer struct {
	ID    string
	Class string
	// Data adds the x-data attribute to the footer element.
	Data       string
	Attributes templ.Attributes
}

// Nav for configuring the App nav component.
type Nav struct {
	ID    string
	Class string
	// Data adds the x-data attribute to the nav element.
	Data       string
	Attributes templ.Attributes
}
