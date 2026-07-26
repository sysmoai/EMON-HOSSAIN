import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://emonhossain.pro',
  build: {
    format: 'directory',
  },
  server: {
    host: true,
  },
});