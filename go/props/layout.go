package props

// Head Templ component properties.
type Head struct {
	Title       string
	Description string

	// AlpineJS when true includes Alpine.js in the head.
	AlpineJS bool
}

// PopupLayout Templ component props
type PopupLayout struct {
	Title string
}
