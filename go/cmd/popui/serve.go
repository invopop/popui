package main

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/a-h/templ"
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/examples"
	"github.com/labstack/echo/v4"
	"github.com/spf13/cobra"
)

type serveOpts struct {
	*rootOpts
	port string
}

func serve(o *rootOpts) *serveOpts {
	return &serveOpts{rootOpts: o}
}

func (s *serveOpts) cmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "serve",
		Short: "Serve serves the examples Templ components",
		RunE:  s.runE,
	}

	f := cmd.Flags()
	f.StringVarP(&s.port, "port", "p", "3000", "port to listen on")

	return cmd
}

func (s *serveOpts) runE(cmd *cobra.Command, _ []string) error {
	ctx, cancel := context.WithCancel(cmd.Context())
	defer cancel()

	e := echo.New()

	e.StaticFS(popui.AssetPath, popui.Assets)

	e.GET("/", s.index)
	e.GET("/prose", s.prose)
	e.GET("/admin", s.admin)

	var startErr error
	go func() {
		err := e.Start(":" + s.port)
		if !errors.Is(err, http.ErrServerClosed) {
			startErr = err
		}
		cancel()
	}()

	<-ctx.Done()

	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownCancel()
	if err := e.Shutdown(shutdownCtx); err != nil {
		return err
	}
	return startErr
}

// index shows the example page that will render all the components
func (s *serveOpts) index(c echo.Context) error {
	return render(c, http.StatusOK, examples.Page())
}

// prose shows the prose example page with lots of possible combinations
func (s *serveOpts) prose(c echo.Context) error {
	return render(c, http.StatusOK, examples.Prose())
}

// admin shows the admin panel example page
func (s *serveOpts) admin(c echo.Context) error {
	return render(c, http.StatusOK, examples.Admin())
}

// render provides a wrapper around the component to make it nice to render.
func render(c echo.Context, status int, t templ.Component) error { //nolint:unparam
	c.Response().Writer.WriteHeader(status)

	if err := t.Render(c.Request().Context(), c.Response().Writer); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return nil
}
