package props

import (
	"strconv"

	"github.com/a-h/templ"
)

type Textarea struct {
	ID         string
	Class      string
	Label      string
	LabelClass string
	Disabled   bool
	Rows       int
	Error      Error
	Attrs      templ.Attributes
}

// GetRows returns the Rows prop as a string with a default if not present
func (t Textarea) GetRows() string {
	if t.Rows == 0 {
		return "4"
	}

	return strconv.Itoa(t.Rows)
}