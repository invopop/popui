package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

type RangeListOptions struct {
	Value string
	Label string
}

// InputRange defines the properties that can be used for range inputs.
type InputRange struct {
	ID          string
	Class       string
	LabelClass  string
	Label       string
	Min         string
	Max         string
	Step        string
	ListOptions []RangeListOptions
	Name        string
	Value       string
	Attrs       templ.Attributes
}

// GenerateID returns a new InputRange instance with either the existing ID
// or a new randomly generated one.
func (i InputRange) GenerateID() InputRange {
	if i.ID != "" {
		return i
	}
	// generate a short random identifier
	i.ID = fmt.Sprintf("%s%06d", i.Name, rand.Intn(100000))
	return i
}
