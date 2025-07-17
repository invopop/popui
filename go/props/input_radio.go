package props

import (
	"fmt"
	"math/rand"

	"github.com/a-h/templ"
	"github.com/invopop/popui/go/classes"
)

// Theme colors for radio inputs.
const (
	ColorSherwood    = "sherwood"
	ColorOcean       = "ocean"
	ColorGrape       = "grape"
	ColorMetal       = "metal"
	ColorCosmos      = "cosmos"
	ColorSherwoodRGB = "rgb(25, 65, 54)"
	ColorOceanRGB    = "rgb(48, 105, 148)"
	ColorGrapeRGB    = "rgb(94, 71, 122)"
	ColorMetalRGB    = "rgb(82, 108, 134)"
	ColorCosmosRGB   = "rgb(13, 22, 37)"
)

type themeColor struct {
	Name string
	RGB  string
}

var themeColorList = []themeColor{
	{Name: ColorSherwood, RGB: ColorSherwoodRGB},
	{Name: ColorOcean, RGB: ColorOceanRGB},
	{Name: ColorGrape, RGB: ColorGrapeRGB},
	{Name: ColorMetal, RGB: ColorMetalRGB},
	{Name: ColorCosmos, RGB: ColorCosmosRGB},
}

// InputRadio defines the properties that can be used for radio inputs.
type InputRadio struct {
	ID          string
	Class       string
	LabelClass  string
	Label       string
	Description string
	Autofocus   bool
	Required    bool
	Checked     bool
	Name        string
	Value       string
	Attrs       templ.Attributes
}

// InputRadioTheme defines the properties that can be used for the theme radio.
type InputRadioTheme struct {
	ID        string
	Class     string
	Variant   string
	Autofocus bool
	Required  bool
	Checked   bool
	Name      string
	Value     string
	Attrs     templ.Attributes
}

// GenerateID returns a new InputRadio instance with either the existing ID
// or a new randomly generated one.
func (i InputRadio) GenerateID() InputRadio {
	if i.ID != "" {
		return i
	}
	// generate a short random identifier
	i.ID = fmt.Sprintf("%s%06d", i.Name, rand.Intn(100000))
	return i
}

// ToRadioProp generates a InputRadio prop from an InputRadioTheme prop.
func (it InputRadioTheme) ToRadioProp() InputRadio {
	i := InputRadio{
		ID:        it.ID,
		Name:      it.Name,
		Value:     it.Value,
		Checked:   it.Checked,
		Autofocus: it.Autofocus,
		Required:  it.Required,
		Class:     classes.RadioTheme,
		Attrs:     it.Attrs,
	}

	return i.GenerateID()
}

// GenerateVariant returns a new InputRadioTheme instance with the applied variant styles.
func (it InputRadioTheme) GenerateVariant() InputRadioTheme {
	if it.Variant == "" {
		return it
	}

	if it.Attrs == nil {
		it.Attrs = make(map[string]any)
	}

	for _, c := range themeColorList {
		if c.Name == it.Variant {
			it.Attrs["style"] = fmt.Sprintf("background-color: %s;", c.RGB)
			break
		}
	}

	return it
}
