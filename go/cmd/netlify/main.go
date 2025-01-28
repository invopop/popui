package main

import (
	"context"
	"io"
	"log"
	"os"
	"path"

	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/examples"
)

func main() {
	// Generate static html file for compiled examples
	publicPath := "public"
	err := createFolder(publicPath)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	// Create index.html file on public path
	name := path.Join(publicPath, "index.html")
	f, err := os.Create(name)
	if err != nil {
		log.Fatalf("failed to create output file: %v", err)
	}
	// Render Admin example templ component
	err = examples.Admin().Render(context.Background(), f)
	if err != nil {
		log.Fatalf("failed to write index page: %v", err)
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
	log.Printf("CSS file publissed")
	err = copyFile(assetsPath+"/popui.js", publicAssetPath+"/popui.js")
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	log.Printf("JS file publissed")
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
