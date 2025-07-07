import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/nextjs-vite",
    "options": {}
  },
  "staticDirs": ["../renderer/public"],
  viteFinal: async (config) => {
    const path = require('path');
    // Ensure PostCSS is properly configured
    config.css = config.css || {};
    config.css.postcss = {
      plugins: [
        require('tailwindcss')({
          config: path.resolve(__dirname, '../renderer/tailwind.config.js'),
        }),
        require('autoprefixer'),
      ],
    };
    return config;
  }
};
export default config;