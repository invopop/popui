import twTheme from "./src/lib/tw.theme";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      ...twTheme.extend,
      typography: ({ theme }) => ({
        popui: {
          css: {
            "--tw-prose-body": theme("colors.neutral[500]"),
            "--tw-prose-bullets": theme("colors.neutral[500]"),
            p: {
              marginLeft: "0px",
              marginTop: "12px",
              marginBottom: "12px",
            },
            ul: {
              marginLeft: "2px",
              marginTop: "12px",
              marginBottom: "12px",
            },
            li: {
              margin: "0px",
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
