package props

import (
	"strconv"

	"github.com/a-h/templ"
)

// Textarea Templ component props
type Textarea struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Name        string
	Placeholder string
	Value       string
	Label       string
	Disabled    bool
	Readonly    bool
	Required    bool
	Autofocus   bool
	Rows        int
	Error       Error
}

// GetRows returns the Rows prop as a string with a default if not present
func (t Textarea) GetRows() string {
	if t.Rows == 0 {
		return "4"
	}

	return strconv.Itoa(t.Rows)
}
