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
}

// Main for configuring the App main content component.
type Main struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Article for configuring the App article component.
type Article struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Footer for configuring the App footer component.
type Footer struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Nav for configuring the App nav component.
type Nav struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// Aside for configuring the App aside component.
type Aside struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}
