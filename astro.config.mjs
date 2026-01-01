// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  // For GitHub Pages deployment
  // Change 'marksuarez-portfolio' to your repo name
  // Or remove site/base if using custom domain
  site: 'https://marksuarez.github.io',
  base: '/marksuarez-portfolio',
  
  integrations: [react(), alpinejs()],

  vite: {
    plugins: [tailwindcss()]
  }
});