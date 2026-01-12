package main

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/a-h/templ"
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/examples"
	"github.com/invopop/popui/go/internal/docs"
	"github.com/invopop/popui/go/internal/docs/assets"
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
		Short: "Serve serves the popui UI components browser",
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
	e.StaticFS("/assets", assets.Content)

	// Documentation routes (now at root)
	e.GET("/", s.index)

	// Older examples are provided here for testing
	e.GET("/examples/admin", renderComponent(examples.Admin()))
	e.GET("/examples/app", renderComponent(examples.App()))
	e.GET("/examples/console", renderComponent(examples.Console()))
	e.GET("/examples/prose", renderComponent(examples.Prose()))

	// Wizard example
	e.GET("/examples/wizard", renderComponent(examples.Wizard()))
	e.GET("/examples/wizard/start", renderComponent(examples.Wizard()))
	e.GET("/examples/wizard/step-one", renderComponent(examples.WizardStepOne()))
	e.GET("/examples/wizard/step-two", renderComponent(examples.WizardStepTwo()))
	e.GET("/examples/wizard/step-three", renderComponent(examples.WizardStepThree()))
	e.GET("/examples/wizard/step-four", renderComponent(examples.WizardStepFour()))
	e.GET("/examples/wizard/confirm", renderComponent(examples.WizardConfirm()))
	e.GET("/examples/wizard/success", renderComponent(examples.WizardSuccess()))
	e.GET("/examples/wizard/error", renderComponent(examples.WizardError()))

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

func renderComponent(tmp templ.Component) func(c echo.Context) error {
	return func(c echo.Context) error {
		return render(c, http.StatusOK, tmp)

	}
}

func (s *serveOpts) index(c echo.Context) error {
	return render(c, http.StatusOK, docs.Index())
}

// render provides a wrapper around the component to make it nice to render.
func render(c echo.Context, status int, t templ.Component) error { //nolint:unparam
	c.Response().Writer.WriteHeader(status)

	if err := t.Render(c.Request().Context(), c.Response().Writer); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return nil
}
