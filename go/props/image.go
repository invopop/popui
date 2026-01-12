package props

import "github.com/a-h/templ"

// Image Templ component props
type Image struct {
	Src   string
	Alt   string
	Class string
	Attrs templ.Attributes
}
