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
	"github.com/invopop/popui/go/examples"
	"github.com/invopop/popui/go/internal/ui/pages"
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
		"index.html": func() error {
			return renderPage(publicPath, "index.html", pages.DocsHome())
		},
		"components/accordion/index.html": func() error {
			return renderPage(publicPath, "components/accordion/index.html", pages.Accordion())
		},
		"components/avatar/index.html": func() error {
			return renderPage(publicPath, "components/avatar/index.html", pages.Avatar())
		},
		"components/button/index.html": func() error {
			return renderPage(publicPath, "components/button/index.html", pages.Button())
		},
		"components/button-copy/index.html": func() error {
			return renderPage(publicPath, "components/button-copy/index.html", pages.ButtonCopy())
		},
		"components/breadcrumb/index.html": func() error {
			return renderPage(publicPath, "components/breadcrumb/index.html", pages.Breadcrumb())
		},
		"components/card/index.html": func() error {
			return renderPage(publicPath, "components/card/index.html", pages.Card())
		},
		"components/checkbox/index.html": func() error {
			return renderPage(publicPath, "components/checkbox/index.html", pages.Checkbox())
		},
		"components/description-list/index.html": func() error {
			return renderPage(publicPath, "components/description-list/index.html", pages.DescriptionList())
		},
		"components/empty-state/index.html": func() error {
			return renderPage(publicPath, "components/empty-state/index.html", pages.EmptyState())
		},
		"components/fieldset/index.html": func() error {
			return renderPage(publicPath, "components/fieldset/index.html", pages.Fieldset())
		},
		"components/file/index.html": func() error {
			return renderPage(publicPath, "components/file/index.html", pages.File())
		},
		"components/flash-message/index.html": func() error {
			return renderPage(publicPath, "components/flash-message/index.html", pages.FlashMessage())
		},
		"components/image/index.html": func() error {
			return renderPage(publicPath, "components/image/index.html", pages.Image())
		},
		"components/input/index.html": func() error {
			return renderPage(publicPath, "components/input/index.html", pages.Input())
		},
		"components/label/index.html": func() error {
			return renderPage(publicPath, "components/label/index.html", pages.Label())
		},
		"components/notification/index.html": func() error {
			return renderPage(publicPath, "components/notification/index.html", pages.Notification())
		},
		"components/popover/index.html": func() error {
			return renderPage(publicPath, "components/popover/index.html", pages.Popover())
		},
		"components/radio/index.html": func() error {
			return renderPage(publicPath, "components/radio/index.html", pages.Radio())
		},
		"components/select/index.html": func() error {
			return renderPage(publicPath, "components/select/index.html", pages.Select())
		},
		"components/separator/index.html": func() error {
			return renderPage(publicPath, "components/separator/index.html", pages.Separator())
		},
		"components/slider/index.html": func() error {
			return renderPage(publicPath, "components/slider/index.html", pages.Slider())
		},
		"components/table/index.html": func() error {
			return renderPage(publicPath, "components/table/index.html", pages.Table())
		},
		"components/tabs/index.html": func() error {
			return renderPage(publicPath, "components/tabs/index.html", pages.Tabs())
		},
		"components/tag-status/index.html": func() error {
			return renderPage(publicPath, "components/tag-status/index.html", pages.TagStatus())
		},
		"components/textarea/index.html": func() error {
			return renderPage(publicPath, "components/textarea/index.html", pages.Textarea())
		},
		"components/typography/index.html": func() error {
			return renderPage(publicPath, "components/typography/index.html", pages.Typography())
		},
		"examples/admin/index.html": func() error {
			return renderPage(publicPath, "examples/admin/index.html", examples.Admin())
		},
		"examples/wizard/index.html": func() error {
			return renderPage(publicPath, "examples/wizard/index.html", examples.AppIndex())
		},
		"wizard/step-one/index.html": func() error {
			return renderPage(publicPath, "wizard/step-one/index.html", examples.AppStepOne())
		},
		"wizard/step-two/index.html": func() error {
			return renderPage(publicPath, "wizard/step-two/index.html", examples.AppStepTwo())
		},
		"wizard/step-three/index.html": func() error {
			return renderPage(publicPath, "wizard/step-three/index.html", examples.AppStepThree())
		},
		"wizard/step-four/index.html": func() error {
			return renderPage(publicPath, "wizard/step-four/index.html", examples.AppStepFour())
		},
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
