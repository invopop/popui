package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// InputCheckbox defines the properties that can be used when building
// input checkboxes.
type InputCheckbox struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Autofocus  bool
	Checked    bool
	Disabled   bool
	Switch     bool
	Name       string
	Value      string
	Attrs      templ.Attributes
}

// OptionGroup Templ component props.
type OptionGroup struct {
	Label      string
	Class      string
	Attrs      templ.Attributes
	LabelAttrs templ.Attributes
}

// GenerateID returns a new InputCheckbox instance with either the existing ID
// or a new randomly generated one.
func (i InputCheckbox) GenerateID() InputCheckbox {
	if i.ID != "" {
		return i
	}
	// generate a short random identifier
	i.ID = fmt.Sprintf("%s%06d", i.Name, rand.Intn(100000))
	return i
}
