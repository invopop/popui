package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// SliderListOption defines the datalist options displayed on a Slider component
type SliderListOption struct {
	Value string
	Label string
}

// Slider defines the properties that can be used for slider inputs.
type Slider struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Min         string
	Max         string
	Step        string
	ListOptions []SliderListOption
	Name        string
	Value       string
}

// GenerateID returns a new Slider instance with either the existing ID
// or a new randomly generated one.
func (s Slider) GenerateID() Slider {
	if s.ID != "" {
		return s
	}
	// generate a short random identifier
	s.ID = fmt.Sprintf("%s%06d", s.Name, rand.Intn(100000))
	return s
}
