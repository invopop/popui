package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
)

// Theme colors for radio inputs.
const (
	ColorSherwood        = "sherwood"
	ColorOcean           = "ocean"
	ColorGrape           = "grape"
	ColorMetal           = "metal"
	ColorCosmos          = "cosmos"
	ColorSherwoodValue   = "#018551"
	ColorBgSherwoodValue = "#004235"
	ColorOceanValue      = "#0C6598"
	ColorBgOceanValue    = "#041E2D"
	ColorGrapeValue      = "#A01A49"
	ColorBgGrapeValue    = "#2F0816"
	ColorMetalValue      = "#6B727D"
	ColorBgMetalValue    = "#1A1C23"
	ColorCosmosValue     = "#20222A"
	ColorBgCosmosValue   = "#0B0B10"
)

// Radio defines the properties for radio button inputs.
type Radio struct {
	ID          string
	Class       string
	Attributes  templ.Attributes
	Label       string
	Description string
	Name        string
	Value       string
	Variant     string // "card" or "theme" for special variants
	Checked     bool
	Autofocus   bool
	Disabled    bool
}

// GenerateID returns a new Radio instance with either the existing ID
// or a new randomly generated one.
func (r Radio) GenerateID() Radio {
	if r.ID != "" {
		return r
	}
	// generate a short random identifier
	r.ID = fmt.Sprintf("%s%06d", r.Name, rand.Intn(100000))
	return r
}

// ApplyThemeColor applies theme color as inline style for theme variant radios.
func (r Radio) ApplyThemeColor() Radio {
	var color string
	switch r.Variant {
	case ColorSherwood:
		color = ColorSherwoodValue
	case ColorOcean:
		color = ColorOceanValue
	case ColorGrape:
		color = ColorGrapeValue
	case ColorMetal:
		color = ColorMetalValue
	case ColorCosmos:
		color = ColorCosmosValue
	default:
		return r
	}

	if r.Attributes == nil {
		r.Attributes = make(map[string]any)
	}
	r.Attributes["style"] = fmt.Sprintf("background-color: %s;", color)
	return r
}
