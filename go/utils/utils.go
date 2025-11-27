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
