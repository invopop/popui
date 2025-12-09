package main

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/a-h/templ"
	popui "github.com/invopop/popui/go"
	"github.com/invopop/popui/go/examples"
	"github.com/invopop/popui/go/internal/ui/pages"
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

	// Documentation routes (now at root)
	e.GET("/", s.docsHome)
	e.GET("/components/accordion", s.docsAccordion)
	e.GET("/components/avatar", s.docsAvatar)
	e.GET("/components/breadcrumb", s.docsBreadcrumb)
	e.GET("/components/button", s.docsButton)
	e.GET("/components/card", s.docsCard)
	e.GET("/components/checkbox", s.docsCheckbox)
	e.GET("/components/description-list", s.docsDescriptionList)
	e.GET("/components/empty-state", s.docsEmptyState)
	e.GET("/components/fieldset", s.docsFieldset)
	e.GET("/components/file", s.docsFile)
	e.GET("/components/flash-message", s.docsFlashMessage)
	e.GET("/components/image", s.docsImage)
	e.GET("/components/input", s.docsInput)
	e.GET("/components/label", s.docsLabel)
	e.GET("/components/notification", s.docsNotification)
	e.GET("/components/popover", s.docsPopover)
	e.GET("/components/radio", s.docsRadio)
	e.GET("/components/select", s.docsSelect)
	e.GET("/components/separator", s.docsSeparator)
	e.GET("/components/slider", s.docsSlider)
	e.GET("/components/table", s.docsTable)
	e.GET("/components/tabs", s.docsTabs)
	e.GET("/components/textarea", s.docsTextarea)
	e.GET("/components/typography", s.docsTypography)

	// Examples
	e.GET("/examples/admin", s.examplesAdmin)
	e.GET("/examples/wizard", s.examplesWizard)
	e.GET("/wizard/step-one", s.wizardStepOne)
	e.GET("/wizard/step-two", s.wizardStepTwo)
	e.GET("/wizard/step-three", s.wizardStepThree)
	e.GET("/wizard/step-four", s.wizardStepFour)

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

// examplesAdmin shows the admin panel example page
func (s *serveOpts) examplesAdmin(c echo.Context) error {
	return render(c, http.StatusOK, examples.Admin())
}

// examplesWizard shows the wizard example page
func (s *serveOpts) examplesWizard(c echo.Context) error {
	return render(c, http.StatusOK, examples.AppIndex())
}

// wizardStepOne shows wizard step one
func (s *serveOpts) wizardStepOne(c echo.Context) error {
	return render(c, http.StatusOK, examples.AppStepOne())
}

// wizardStepTwo shows wizard step two
func (s *serveOpts) wizardStepTwo(c echo.Context) error {
	return render(c, http.StatusOK, examples.AppStepTwo())
}

// wizardStepThree shows wizard step three
func (s *serveOpts) wizardStepThree(c echo.Context) error {
	return render(c, http.StatusOK, examples.AppStepThree())
}

// wizardStepFour shows wizard step four
func (s *serveOpts) wizardStepFour(c echo.Context) error {
	return render(c, http.StatusOK, examples.AppStepFour())
}

// docsHome shows the documentation home page
func (s *serveOpts) docsHome(c echo.Context) error {
	return render(c, http.StatusOK, pages.DocsHome())
}

// docsAccordion shows the accordion component documentation
func (s *serveOpts) docsAccordion(c echo.Context) error {
	return render(c, http.StatusOK, pages.Accordion())
}

// docsAvatar shows the avatar component documentation
func (s *serveOpts) docsAvatar(c echo.Context) error {
	return render(c, http.StatusOK, pages.Avatar())
}

// docsBreadcrumb shows the breadcrumb component documentation
func (s *serveOpts) docsBreadcrumb(c echo.Context) error {
	return render(c, http.StatusOK, pages.Breadcrumb())
}

// docsButton shows the button component documentation
func (s *serveOpts) docsButton(c echo.Context) error {
	return render(c, http.StatusOK, pages.Button())
}

// docsCard shows the card component documentation
func (s *serveOpts) docsCard(c echo.Context) error {
	return render(c, http.StatusOK, pages.Card())
}

// docsCheckbox shows the checkbox component documentation
func (s *serveOpts) docsCheckbox(c echo.Context) error {
	return render(c, http.StatusOK, pages.Checkbox())
}

// docsFieldset shows the fieldset component documentation
func (s *serveOpts) docsFieldset(c echo.Context) error {
	return render(c, http.StatusOK, pages.Fieldset())
}

// docsFile shows the file component documentation
func (s *serveOpts) docsFile(c echo.Context) error {
	return render(c, http.StatusOK, pages.File())
}

// docsImage shows the image component documentation
func (s *serveOpts) docsImage(c echo.Context) error {
	return render(c, http.StatusOK, pages.Image())
}

// docsRadio shows the radio component documentation
func (s *serveOpts) docsRadio(c echo.Context) error {
	return render(c, http.StatusOK, pages.Radio())
}

// docsSelect shows the select component documentation
func (s *serveOpts) docsSelect(c echo.Context) error {
	return render(c, http.StatusOK, pages.Select())
}

// docsSlider shows the slider component documentation
func (s *serveOpts) docsSlider(c echo.Context) error {
	return render(c, http.StatusOK, pages.Slider())
}

// docsInput shows the input component documentation
func (s *serveOpts) docsInput(c echo.Context) error {
	return render(c, http.StatusOK, pages.Input())
}

// docsLabel shows the label component documentation
func (s *serveOpts) docsLabel(c echo.Context) error {
	return render(c, http.StatusOK, pages.Label())
}

// docsDescriptionList shows the description list component documentation
func (s *serveOpts) docsDescriptionList(c echo.Context) error {
	return render(c, http.StatusOK, pages.DescriptionList())
}

// docsEmptyState shows the empty state component documentation
func (s *serveOpts) docsEmptyState(c echo.Context) error {
	return render(c, http.StatusOK, pages.EmptyState())
}

// docsFlashMessage shows the flash message component documentation
func (s *serveOpts) docsFlashMessage(c echo.Context) error {
	return render(c, http.StatusOK, pages.FlashMessage())
}

// docsNotification shows the notification component documentation
func (s *serveOpts) docsNotification(c echo.Context) error {
	return render(c, http.StatusOK, pages.Notification())
}

// docsPopover shows the popover component documentation
func (s *serveOpts) docsPopover(c echo.Context) error {
	return render(c, http.StatusOK, pages.Popover())
}

// docsSeparator shows the separator component documentation
func (s *serveOpts) docsSeparator(c echo.Context) error {
	return render(c, http.StatusOK, pages.Separator())
}

// docsTable shows the table component documentation
func (s *serveOpts) docsTable(c echo.Context) error {
	return render(c, http.StatusOK, pages.Table())
}

// docsTabs shows the tabs component documentation
func (s *serveOpts) docsTabs(c echo.Context) error {
	return render(c, http.StatusOK, pages.Tabs())
}

// docsTextarea shows the textarea component documentation
func (s *serveOpts) docsTextarea(c echo.Context) error {
	return render(c, http.StatusOK, pages.Textarea())
}

// docsTypography shows the typography components documentation
func (s *serveOpts) docsTypography(c echo.Context) error {
	return render(c, http.StatusOK, pages.Typography())
}

// render provides a wrapper around the component to make it nice to render.
func render(c echo.Context, status int, t templ.Component) error { //nolint:unparam
	c.Response().Writer.WriteHeader(status)

	if err := t.Render(c.Request().Context(), c.Response().Writer); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return nil
}
