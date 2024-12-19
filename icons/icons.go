// Package icons provides easy access to all of the icons provided by popui
// including a generator script for helper methods.
package icons

import (
	"embed"
	"path/filepath"
)

//go:generate go run ./icons/generate.go

//go:embed themes
var Content embed.FS

// ThemeDefault is the default theme for the icons.
const ThemeDefault = "default"

const baseThemePath = "themes"

func loadFile(name ...string) ([]byte, error) {
	name = append([]string{baseThemePath}, name...)
	return Content.ReadFile(filepath.Join(name...) + ".svg")
}
