package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// InputFile defines the properties that can be used for file pickers.
type InputFile struct {
	ID        string
	Class     string
	Accept    string
	Capture   string
	Multiple  bool
	Autofocus bool
	Required  bool
	Name      string
	Value     string
	Attrs     templ.Attributes
}

// GenerateID returns a new InputFile instance with either the existing ID
// or a new randomly generated one.
func (i InputFile) GenerateID() InputFile {
	if i.ID != "" {
		return i
	}
	// generate a short random identifier
	i.ID = fmt.Sprintf("%s%06d", i.Name, rand.Intn(100000))
	return i
}
