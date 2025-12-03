package props

import (
"github.com/a-h/templ"
"github.com/google/uuid"
)

// InputFile defines the properties for the InputFile and FileUpload components.
type InputFile struct {
	ID            string
	Class         string
	Attributes    templ.Attributes
	Name          string
	Accept        string
	Capture       string
	Multiple      bool
	Autofocus     bool
	Required      bool
	Disabled      bool
	AvatarURL     string
	AvatarAlt     string
	Text          string
	PreviewSquare bool
}

// GenerateID generates a unique ID if not provided.
func (i InputFile) GenerateID() InputFile {
	if i.ID == "" {
		i.ID = "input-file-" + uuid.NewString()
	}
	return i
}
