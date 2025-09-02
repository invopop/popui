import type { Preview } from "@storybook/sveltekit";
import "inter-ui/inter.css";
import "./variables.css";
import "../src/app.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
