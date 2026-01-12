// Package classes provides utilities for managing CSS class names in Go projects.
package classes

import (
	"strings"
)

// Join conditionally joins class names together, mimicking the clsx/classnames behavior.
// Accepts strings (which are included as-is) and maps (where keys are included if values are truthy).
// Empty strings are filtered out automatically.
//
// Example:
//
//	classes.Join("base-class", map[string]bool{"active": isActive, "disabled": isDisabled})
//	// Returns: "base-class active" (if isActive is true and isDisabled is false)
func Join(items ...any) string {
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

// FormField returns common CSS classes for form fields (input, select, textarea).
// These classes provide consistent styling for border, focus, hover, disabled states, font, caret, and padding.
func FormField() string {
	return "font-sans py-1.5 px-2.5 border border-border-default-secondary w-full rounded-lg text-base outline-none text-foreground tracking-tight caret-foreground-accent placeholder:text-foreground-default-tertiary box-border disabled:bg-background-default-secondary hover:enabled:border-border-default-secondary-hover focus:hover:enabled:border-border-selected-bold focus:ring-0 focus:ring-offset-0"
}

// FormFieldError returns the error styling classes for form fields.
// Useful for dynamic class bindings or composing custom error states.
func FormFieldError() string {
	return "!text-foreground-critical !border-border-critical-bold !outline-none !caret-foreground-critical"
}

// FormFieldState returns CSS classes for form field states.
// When hasError is true, applies critical styling. When false, applies focus styling.
func FormFieldState(hasError bool) string {
	return Join(
		map[string]bool{
			FormFieldError(): hasError,
			"focus:border-border-selected-bold focus:shadow-active": !hasError,
		},
	)
}
