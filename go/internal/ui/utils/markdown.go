// Package utils provides utility functions for the PopUI documentation site.
package utils

import "strings"

// ExtractCode extracts code from a markdown code fence.
func ExtractCode(md string) string {
	lines := strings.Split(md, "\n")
	var code []string
	inCodeBlock := false

	for _, line := range lines {
		if strings.HasPrefix(line, "```") {
			if inCodeBlock {
				break
			}
			inCodeBlock = true
			continue
		}
		if inCodeBlock {
			code = append(code, line)
		}
	}

	return strings.Join(code, "\n")
}
