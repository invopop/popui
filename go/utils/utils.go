// Package utils provides utility functions for PopUI components.
package utils

import (
	"strings"

	twmerge "github.com/Oudwins/tailwind-merge-go"
)

// TwMerge merges Tailwind CSS classes, with later classes overriding earlier ones.
// Uses tailwind-merge-go for sophisticated class conflict resolution.
func TwMerge(classes ...string) string {
	return twmerge.Merge(classes...)
}

// Clsx conditionally joins class names together, mimicking the clsx/classnames behavior.
// Accepts strings (which are included as-is) and maps (where keys are included if values are truthy).
// Empty strings are filtered out automatically.
//
// Example:
//
//	Clsx("base-class", map[string]bool{"active": isActive, "disabled": isDisabled})
//	// Returns: "base-class active" (if isActive is true and isDisabled is false)
func Clsx(items ...interface{}) string {
	var classes []string

	for _, item := range items {
		switch v := item.(type) {
		case string:
			if v != "" {
				classes = append(classes, v)
			}
		case map[string]bool:
			for class, condition := range v {
				if condition && class != "" {
					classes = append(classes, class)
				}
			}
		}
	}

	return strings.Join(classes, " ")
}

// FormFieldClasses returns common CSS classes for form fields (input, select, textarea).
// These classes provide consistent styling for border, focus, hover, disabled states, font, caret, and padding.
func FormFieldClasses() string {
	return "font-sans py-1.5 px-2.5 border border-border-default-secondary w-full rounded-md text-base outline-none text-foreground tracking-tight caret-foreground-accent placeholder:text-foreground-default-tertiary box-border disabled:bg-background-default-secondary hover:enabled:border-border-default-secondary-hover focus:hover:enabled:border-border-selected-bold focus:ring-0 focus:ring-offset-0"
}

// FormFieldErrorClasses returns CSS classes for form field error states.
// When hasError is true, applies critical styling. When false, applies focus styling.
func FormFieldErrorClasses(hasError bool) string {
	return Clsx(
		map[string]bool{
			"!text-foreground-critical !border-border-critical-bold !outline-none !caret-foreground-critical": hasError,
			"focus:border-border-selected-bold focus:shadow-active":                                           !hasError,
		},
	)
}
