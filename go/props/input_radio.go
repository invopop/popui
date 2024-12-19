package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// InputRadio defines the properties that can be used for radio inputs.
type InputRadio struct {
	ID          string
	Class       string
	LabelClass  string
	Label       string
	Description string
	Autofocus   bool
	Required    bool
	Checked     bool
	Name        string
	Value       string
	Attrs       templ.Attributes
}

// GenerateID returns a new InputRadio instance with either the existing ID
// or a new randomly generated one.
func (i InputRadio) GenerateID() InputRadio {
	if i.ID != "" {
		return i
	}
	// generate a short random identifier
	i.ID = fmt.Sprintf("%s%06d", i.Name, rand.Intn(100000))
	return i
}
