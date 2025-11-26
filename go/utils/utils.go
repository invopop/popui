// Package utils provides utility functions for PopUI components.
package utils

import (
	twmerge "github.com/Oudwins/tailwind-merge-go"
)

// TwMerge merges Tailwind CSS classes, with later classes overriding earlier ones.
// Uses tailwind-merge-go for sophisticated class conflict resolution.
func TwMerge(classes ...string) string {
	return twmerge.Merge(classes...)
}
