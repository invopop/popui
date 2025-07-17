package props

import "github.com/a-h/templ"

// WizardHeader Templ component props
type WizardHeader struct {
	Class string
	Attrs templ.Attributes
}

// WizardContent Templ component props
type WizardContent struct {
	Class          string
	CenterVertical bool
	Attrs          templ.Attributes
}

// WizardFooter Templ component props
type WizardFooter struct {
	Class string
	Attrs templ.Attributes
}
