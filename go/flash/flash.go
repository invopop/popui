// Package flash provides functionality to set and retrieve flash messages in an echo context.
package flash

import (
	"context"

	"github.com/labstack/echo/v4"
)

// Message represents a message to be displayed to the user.
type Message struct {
	Type        string // e.g., "success", "error"
	Text        string
	Description string // Optional description for the message
}

type contextKey string

const flashKey contextKey = "flash_message"

// SetMessage sets a flash message in the context of the echo request.
func SetMessage(c echo.Context, msg *Message) {
	c.Set(string(flashKey), msg)
}

// GetMessage retrieves the flash message from the context.
func GetMessage(ctx context.Context) *Message {
	v := ctx.Value(flashKey)
	if msg, ok := v.(*Message); ok {
		return msg
	}
	return nil
}

// WithContext wraps the echo context into a standard context.Context
func WithContext(ctx context.Context, c echo.Context) context.Context {
	if v := c.Get(string(flashKey)); v != nil {
		if msg, ok := v.(*Message); ok {
			return context.WithValue(ctx, flashKey, msg)
		}
	}
	return ctx
}
