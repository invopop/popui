// Package main provides the entry point for building a preview on Netlify.
package main

import (
	"context"
	"io"
	"log"
	"os"
	"path"

	"github.com/a-h/templ"
	popui "github.com/invopop/popui/go"
)

func main() {
	// Generate static html file for compiled examples
	publicPath := "public"
	err := createFolder(publicPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}

	// Create docs pages
	docsPages := map[string]func() error{
		// TODO
	}

	for pagePath, renderFunc := range docsPages {
		if err := renderFunc(); err != nil {
			log.Fatalf("failed to render %s: %v", pagePath, err)
		}
		log.Printf("Generated: %s", pagePath)
	}

	// Copy assets to public path
	assetsPath := "go/assets"
	publicAssetPath := publicPath + popui.AssetPath + "/assets"
	err = createFolder(publicAssetPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	err = copyFile(assetsPath+"/popui.css", publicAssetPath+"/popui.css")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("CSS file published")
	err = copyFile(assetsPath+"/popui-full.css", publicAssetPath+"/popui-full.css")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("Full CSS file published")
	err = copyFile(assetsPath+"/popui.js", publicAssetPath+"/popui.js")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("JS file published")
}

// renderPage creates the necessary folders and renders a templ component to an HTML file
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
