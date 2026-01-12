package props

import "github.com/a-h/templ"

// Avatar sizes
const (
	AvatarSizeLarge string = "lg"
)

// Avatar provides props for the avatar component
type Avatar struct {
	ID         string
	Class      string
	Attributes templ.Attributes
	Initial    string
	Size       string
}
