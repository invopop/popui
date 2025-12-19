// Package assets holds the embedded assets for the UI.
package assets

import (
	"crypto/md5"
	"embed"
	"fmt"
	"io"
	"path"
)

//go:embed scripts/*

// Content holds the embedded assets.
var Content embed.FS

var versionCache = map[string]string{}

// Versioned provides the versioned path for the given path assuming the file
// exists in the Content.
func Versioned(file ...string) string {
	p := path.Join(file...)
	if v, ok := versionCache[p]; ok {
		return p + "?v=" + v
	}
	f, err := Content.Open(p)
	if err != nil {
		return p
	}
	defer f.Close() //nolint:errcheck

	h := md5.New()
	_, err = io.Copy(h, f)
	if err != nil {
		return p
	}

	v := fmt.Sprintf("%x", h.Sum(nil))[0:8]

	versionCache[p] = v

	return p + "?v=" + v
}
