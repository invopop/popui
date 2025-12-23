// Package docs provides user interface components and utilities for PopUI.
package docs

import (
	"github.com/a-h/templ"
	"github.com/invopop/popui/go/internal/docs/components"
)

// Page defines a single documentation page that can be rendered.
type Page struct {
	Title    string
	Desc     string
	Path     string
	Template templ.Component
}

// Group defines a group of related pages.
type Group struct {
	Title string
	Path  string
	Pages []*Page
}

// DocsIndex is the index of all documentation pages.
var groups = []*Group{
	{
		Title: "Layout",
		Path:  "layout",
		Pages: []*Page{
			{
				Title:    "App",
				Desc:     "The main application layout component with header, nav, aside, main, and footer sections.",
				Path:     "app",
				Template: components.App(),
			},
			{
				Title:    "Card",
				Desc:     "Flexible container components for displaying content in a bordered box.",
				Path:     "card",
				Template: components.Card(),
			},
			{
				Title:    "Empty State",
				Desc:     "Layout for displaying empty states with illustrations and call-to-action.",
				Path:     "empty-state",
				Template: components.EmptyState(),
			},
			{
				Title:    "Separator",
				Desc:     "Horizontal divider with a dashed line for visual separation.",
				Path:     "separator",
				Template: components.Separator(),
			},
		},
	},
	{
		Title: "Forms",
		Path:  "forms",
		Pages: []*Page{
			{
				Title:    "Checkbox",
				Desc:     "Checkbox inputs with optional toggle switch variant.",
				Path:     "checkbox",
				Template: components.Checkbox(),
			},
			{
				Title:    "Fieldset",
				Desc:     "Groups form fields together with proper spacing and optional legend.",
				Path:     "fieldset",
				Template: components.Fieldset(),
			},
			{
				Title:    "File",
				Desc:     "File input components for selecting and uploading files. Use InputFile for basic file selection or FileUpload for avatar/image uploads with preview.",
				Path:     "file",
				Template: components.File(),
			},
			{
				Title:    "Input",
				Desc:     "Text input field for capturing user data with various types and validation.",
				Path:     "input",
				Template: components.Input(),
			},
			{
				Title:    "Label",
				Desc:     "Form label element with optional hint tooltip.",
				Path:     "label",
				Template: components.Label(),
			},
			{
				Title:    "Radio",
				Desc:     "Radio button inputs for selecting a single option from a group.",
				Path:     "radio",
				Template: components.Radio(),
			},
			{
				Title:    "Select",
				Desc:     "Dropdown selection control for choosing one or more options from a list.",
				Path:     "select",
				Template: components.Select(),
			},
			{
				Title:    "Slider",
				Desc:     "A range slider input for selecting numeric values.",
				Path:     "slider",
				Template: components.Slider(),
			},
			{
				Title:    "Textarea",
				Desc:     "Multi-line text input field for capturing longer user input with support for labels and validation.",
				Path:     "textarea",
				Template: components.Textarea(),
			},
		},
	},
	{
		Title: "Navigation",
		Path:  "navigation",
		Pages: []*Page{
			{
				Title:    "Breadcrumbs",
				Desc:     "Navigation breadcrumbs to show the current page location.",
				Path:     "breadcrumb",
				Template: components.Breadcrumbs(),
			},
			{
				Title:    "Popover",
				Desc:     "A context menu that displays when a button is clicked.",
				Path:     "popover",
				Template: components.Popover(),
			},
			{
				Title:    "Tabs",
				Desc:     "Interactive tab navigation component with default and pill variants.",
				Path:     "tabs",
				Template: components.Tabs(),
			},
		},
	},
	{
		Title: "Display",
		Path:  "display",
		Pages: []*Page{
			{
				Title:    "Accordion",
				Desc:     "Vertically stacked interactive sections to organize content.",
				Path:     "accordion",
				Template: components.Accordion(),
			},
			{
				Title:    "Avatar",
				Desc:     "Display user profile images or initials in circular containers.",
				Path:     "avatar",
				Template: components.Avatar(),
			},
			{
				Title:    "Description List",
				Desc:     "Semantic HTML definition list for displaying term-description pairs.",
				Path:     "description-list",
				Template: components.DescriptionList(),
			},
			{
				Title:    "Flag",
				Desc:     "Display country flags using ISO 3166-1 alpha-2 country codes.",
				Path:     "flag",
				Template: components.Flag(),
			},
			{
				Title:    "Image",
				Desc:     "Displays images with rounded corners and proper object fit.",
				Path:     "image",
				Template: components.Image(),
			},
			{
				Title:    "Table",
				Desc:     "Display data in a structured table format with automatic styling for headers, cells, and borders.",
				Path:     "table",
				Template: components.Table(),
			},
			{
				Title:    "Typography",
				Desc:     "Text components for headings, paragraphs, descriptions, and formatted content.",
				Path:     "typography",
				Template: components.Typography(),
			},
		},
	},
	{
		Title: "Actions",
		Path:  "actions",
		Pages: []*Page{
			{
				Title:    "Button",
				Desc:     "Trigger actions and events with customizable button components.",
				Path:     "button",
				Template: components.Button(),
			},
			{
				Title:    "Button Copy",
				Desc:     "Copy-to-clipboard button with text truncation and visual feedback.",
				Path:     "button-copy",
				Template: components.ButtonCopy(),
			},
		},
	},
	{
		Title: "Feedback",
		Path:  "feedback",
		Pages: []*Page{
			{
				Title:    "Flash Message",
				Desc:     "Toast-style success message for quick feedback.",
				Path:     "flash-message",
				Template: components.FlashMessage(),
			},
			{
				Title:    "Notification",
				Desc:     "Feedback messages with different severity types and icons.",
				Path:     "notification",
				Template: components.Notification(),
			},
			{
				Title:    "Tag Status",
				Desc:     "Status indicators with optional dots and different color variants.",
				Path:     "tag-status",
				Template: components.TagStatus(),
			},
		},
	},
}
