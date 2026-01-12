package main

import (
	"github.com/spf13/cobra"
)

type rootOpts struct {
}

func root() *rootOpts {
	return &rootOpts{}
}

func (o *rootOpts) cmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:           "popui",
		SilenceUsage:  true,
		SilenceErrors: true,
	}

	cmd.AddCommand(serve(o).cmd())
	cmd.AddCommand(build(o).cmd())

	return cmd
}
