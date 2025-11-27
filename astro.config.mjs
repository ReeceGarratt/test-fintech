import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ReeceGarratt.github.io',
  base: '/test-fintech',
  integrations: [react()],
  output: 'static',
});
