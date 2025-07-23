// Package props provides props to be passed to the Templ components
package props

// First returns the first entry in the array, or a new empty instance
// of the object.
func First[V any](ary []V) V {
	var s V
	for _, v := range ary {
		s = v
		break
	}
	return s
}
