/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": theme("colors.gray[600]"),
            "--tw-prose-th-borders": theme("colors.sky[400]"),
            "--tw-prose-td-borders": theme("colors.gray[300]"),
            "--tw-prose-code": theme("colors.emerald[600]"),
            "--tw-prose-links": theme("colors.sky[600]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
