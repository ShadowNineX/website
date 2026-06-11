// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://shadownine.dev",
  trailingSlash: "always",
  devToolbar: {
    enabled: true,
    placement: "bottom-center",
  },

  integrations: [sitemap(), robotsTxt(), mdx()],
});
