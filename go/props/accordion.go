package props

import "github.com/a-h/templ"

// Accordion provides props for the details element wrapper
type Accordion struct {
	ID         string
	Class      string
	Open       bool
	Attributes templ.Attributes
}

// AccordionTrigger provides props for the clickable summary element
type AccordionTrigger struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}

// AccordionContent provides props for the collapsible content area
type AccordionContent struct {
	ID         string
	Class      string
	Attributes templ.Attributes
}
