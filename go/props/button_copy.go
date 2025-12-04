package props

import "github.com/a-h/templ"

// ButtonCopy Templ component props
type ButtonCopy struct {
	Value        string           // The text value to display and copy
	PrefixLength int              // Number of characters to show at the beginning
	SuffixLength int              // Number of characters to show at the end
	CopiedText   string           // Text to show in popover when copied (optional)
	Attrs        templ.Attributes // Additional HTML attributes
}
