import twTheme from "./src/lib/tw.theme";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      ...twTheme.extend,
      boxShadow: {
        ...twTheme.extend.boxShadow,
        button: '0 -2px 4px 0 rgba(11, 11, 16, 0.04) inset;',
        'button-active': '0 2px 6px 0 rgba(11, 11, 16, 0.16) inset, 0 -2px 5px -2px rgba(255, 255, 255, 0.25) inset;',
        'calendar': '0 8px 30px 0 rgba(10, 10, 10, 0.12);'
      },
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
