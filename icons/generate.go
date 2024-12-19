//go:build ignore

package main

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/invopop/gobl/pkg/here"
	"github.com/invopop/popui/icons"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

func main() {
	if error := generate(); error != nil {
		panic(error)
	}
}

// generate will prepare an icons templ file that contains all of the icons provided
// by popui.
func generate() error {
	tt := here.Doc(`
		// Code generated by popui - DO NOT EDIT.

		package icons

		//lint:file-ignore SA4006 This context is only used if a nested component is present.

		{{ range .Icons }}
		templ {{ .Name }}() {
			@Show("{{ .Filename }}")
		}
		{{ end }}
	`)
	tmpl, err := template.New("base").Parse(tt)
	if err != nil {
		return fmt.Errorf("preparing template: %w", err)
	}

	files, err := icons.Content.ReadDir(filepath.Join("themes", icons.ThemeDefault))
	if err != nil {
		return fmt.Errorf("loading directory: %w", err)
	}

	type Icon struct {
		Name     string
		Filename string
	}

	caser := cases.Title(language.English)

	icons := []Icon{}
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		// Remove the .svg extension.
		filename := file.Name()[:len(file.Name())-4]
		// Convert to camel case from dashed case
		name := caser.String(strings.ReplaceAll(filename, "-", " "))
		name = strings.ReplaceAll(name, " ", "")
		icon := Icon{
			Name:     name,
			Filename: filename,
		}
		icons = append(icons, icon)
	}

	out := bytes.NewBuffer(nil)
	tmpl.Execute(out, map[string]any{"Icons": icons})

	f := filepath.Join("icons_list.templ")
	if err := os.WriteFile(f, out.Bytes(), 0644); err != nil {
		return err
	}
	fmt.Printf("Processed %v\n", f)

	return nil
}
