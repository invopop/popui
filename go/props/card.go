package props

import (
	"github.com/a-h/templ"
	"github.com/invopop/gobl/num"
)

// Card Templ component props
type Card struct {
	Class  string
	URL    templ.SafeURL
	Header CardHeader
	Attrs  templ.Attributes
}

// CardHeader Templ component props
type CardHeader struct {
	Class    string
	Title    string
	Subtitle string
	ImgSrc   string
	FlagISO  string
	Attrs    templ.Attributes
}

// CardProgressBar Templ component props
type CardProgressBar struct {
	Class        string
	Title        string
	Subtitle     string
	Total        int64
	Current      int64
	HideCounter  bool
	NumFormatter num.Formatter
	Attrs        templ.Attributes
}

// CardDashboard Templ component props
type CardDashboard struct {
	Class string
	Items []CardDashboardItem
	Attrs templ.Attributes
}

// CardDashboardItem Templ component props
type CardDashboardItem struct {
	Class string
	Label string
	Value string
	Attrs templ.Attributes
}

// PercentValue returns the progress percentage, capped at 100.
func (p CardProgressBar) PercentValue() int64 {
	percent := int64((float64(p.Current) / float64(p.Total)) * 100)

	if percent > 100 {
		return 100
	}

	return percent
}

// PercentColor returns the expected progress bar color based on PercentValue
func (p CardProgressBar) PercentColor() string {

	if p.PercentValue() == 100 {
		return "#C92D45"
	}

	return "#008852"
}

// Formatter returns the number formatter for the progress bar
func (p CardProgressBar) Formatter() num.Formatter {

	if p.NumFormatter.ThousandsSeparator != "" {
		return p.NumFormatter
	}

	p.NumFormatter.ThousandsSeparator = ","
	return p.NumFormatter
}

// EmptyHeader returns true if all the Header properties has zero value
func (c Card) EmptyHeader() bool {
	return c.Header.Title == "" && c.Header.Subtitle == "" && c.Header.ImgSrc == ""
}
