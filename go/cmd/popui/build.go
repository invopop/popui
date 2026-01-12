package main

import (
	"context"
	"io"
	"log"
	"os"
	"path"

	"github.com/a-h/templ"
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/internal/docs"
	"github.com/spf13/cobra"
)

type buildOpts struct {
	*rootOpts
}

func build(o *rootOpts) *buildOpts {
	return &buildOpts{rootOpts: o}
}

const (
	buildOutputPath = "public"
	buildAssetsPath = "assets"
)

func (s *buildOpts) cmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "build",
		Short: "Generate the popui documentation in the /public folder",
		RunE:  s.run,
	}

	return cmd
}

func (s *buildOpts) run(_ *cobra.Command, _ []string) error {
	// Prepare output folder
	err := createFolder(buildOutputPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	// Render the documentation page
	err = renderPage(buildOutputPath, "index.html", docs.Index())
	if err != nil {
		log.Fatalf("Error rendering index page: %v", err)
	}

	// Copy over the static assets
	publicAssetPath := path.Join(buildOutputPath, popui.AssetPath, "assets")
	err = createFolder(publicAssetPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	err = copyFile(path.Join(buildAssetsPath, "popui.css"), path.Join(publicAssetPath, "popui.css"))
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("CSS file published")
	err = copyFile(path.Join(buildAssetsPath, "popui-full.css"), path.Join(publicAssetPath, "popui-full.css"))
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("Full CSS file published")
	err = copyFile(path.Join(buildAssetsPath, "popui.js"), path.Join(publicAssetPath, "popui.js"))
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("JS file published")

	// Copy over the docs specific JS
	scriptsOutPath := path.Join(buildOutputPath, "assets", "scripts")
	err = createFolder(scriptsOutPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	err = copyFile(path.Join("internal/docs/assets/scripts", "docs.js"), path.Join(scriptsOutPath, "docs.js"))
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("Docs JS file published")

	return nil
}

func renderPage(basePath, pagePath string, component templ.Component) error {
	fullPath := path.Join(basePath, pagePath)
	dir := path.Dir(fullPath)

	// Create directory structure
	if err := createFolder(dir); err != nil {
		return err
	}

	// Create file
	f, err := os.Create(fullPath)
	if err != nil {
		return err
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Printf("Failed to close file: %v", err)
		}
	}()

	// Render component
	return component.Render(context.Background(), f)
}

// copyFile copies a file from source to destination path
func copyFile(src, dst string) error {
	source, err := os.Open(src)
	if err != nil {
		return err
	}
	defer func() {
		if err := source.Close(); err != nil {
			log.Printf("Failed to close source file: %v", err)
		}
	}()

	destination, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer func() {
		if err := destination.Close(); err != nil {
			log.Printf("Failed to close destination file: %v", err)
		}
	}()

	_, err = io.Copy(destination, source)
	return err
}

// createFolder creates a folder if it does not exist
func createFolder(folderPath string) error {
	_, err := os.Stat(folderPath)
	if os.IsNotExist(err) {
		err := os.MkdirAll(folderPath, 0755)
		if err != nil {
			return err
		}
		log.Printf("Folder created: %s\n", folderPath)
	} else if err != nil {
		return err
	}
	return nil
}
