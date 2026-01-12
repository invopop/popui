// Package tailwind provides utilities for working with Tailwind CSS in Go projects.
package tailwind

import (
	twmerge "github.com/Oudwins/tailwind-merge-go"
)

// Merge Tailwind CSS classes, with later classes overriding earlier ones.
// Uses tailwind-merge-go for sophisticated class conflict resolution.
func Merge(classes ...string) string {
	return twmerge.Merge(classes...)
}
