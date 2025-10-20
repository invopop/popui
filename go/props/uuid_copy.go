package props

import "github.com/a-h/templ"

// UUIDCopy Templ component props
type UUIDCopy struct {
	UUID         string           // The UUID string to display and copy
	PrefixLength int              // Number of characters to show at the beginning
	SuffixLength int              // Number of characters to show at the end
	CopiedText   string           // Text to show in popover when copied (optional)
	Attrs        templ.Attributes // Additional HTML attributes
}
