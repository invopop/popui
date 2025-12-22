package props

import "github.com/a-h/templ"

// App defines the properties used to configure an App.
type App struct {
	Title       string
	Description string
	// When Console is true, the App is being rendered inside the Invopop
	// console and will load the additional JavaScript required.
	Console bool

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

	// When true, removes padding in the main content area to allow
	// for edge to edge content such as tables or potentially iframes.
	EdgeToEdge bool

	Attributes templ.Attributes
}

// Header for configuring the App header component and set of
// breadcrumbs if required.
type Header struct {
	ID    string
	Class string
	// Data adds the x-data attribute to the header element.
	Data        string
	Attributes  templ.Attributes
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
