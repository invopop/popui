package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// Checkbox defines the properties for checkbox inputs.
type Checkbox struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
	Variant    string // "switch" for toggle switch style
	Name       string
	Value      string
	Checked    bool
	Autofocus  bool
	Disabled   bool
}

// GenerateID returns a new Checkbox instance with either the existing ID
// or a new randomly generated one.
func (c Checkbox) GenerateID() Checkbox {
	if c.ID != "" {
		return c
	}
	// generate a short random identifier
	c.ID = fmt.Sprintf("%s%06d", c.Name, rand.Intn(100000))
	return c
}

// OptionGroup properties for grouping form elements like checkboxes and radio buttons.
type OptionGroup struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Label      string
}
