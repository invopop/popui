// Package examples defines all the example templ components that are both
// rendered and incorporated into the documentation.
package examples

import (
	"embed"
)

//go:embed *.templ
var contents embed.FS

// LoadExample loads the content of an example file by name. Errors will
// cause a panic.
func LoadExample(name string) string {
	out, err := contents.ReadFile(name)
	if err != nil {
		panic(err)
	}
	return string(out)
}
