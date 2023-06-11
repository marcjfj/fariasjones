import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

const setLayout = () => {
  return function (_, file) {
    file.data.astro.frontmatter.layout =
      file.data.astro.frontmatter.layout || "@layouts/Post.astro";
  };
};

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), mdx()],
  vite: {
    plugins: [
      nodePolyfills({
        exclude: ["fs"],
        protocolImports: true,
      }),
    ],
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx"],
    },
  },
  markdown: {
    remarkPlugins: [setLayout],
    shikiConfig: {
      theme: "slack-dark",
      wrap: false,
    },
  },
});
