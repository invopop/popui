package props

import "github.com/a-h/templ"

type Image struct {
	Src   string
	Alt   string
	Class string
	Attrs templ.Attributes
}
