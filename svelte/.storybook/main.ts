import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-docs"],

  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },

  staticDirs: ["../static"],

  async viteFinal(config) {
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      server: {
        fs: {
          allow: ["./svelte"],
        },
      },
    });
  },
};
export default config;
