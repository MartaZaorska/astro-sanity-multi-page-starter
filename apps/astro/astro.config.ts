import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel';
import redirects from './redirects';
import { isPreviewDeployment } from './src/utils/is-preview-deployment';
import { DOMAIN } from './src/global/constants';

export default defineConfig({
  site: DOMAIN,
  integrations: [preact({ compat: true })],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  prefetch: {
    prefetchAll: true,
  },
  vite: {
    ssr: {
      noExternal: ['react-hook-form'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  redirects: redirects,
  output: 'server',
  adapter: vercel({
    ...(!isPreviewDeployment
      ? {
          isr: {
            bypassToken: process.env.VERCEL_DEPLOYMENT_ID,
            exclude: [/^\/api\/.+/],
          },
        }
      : {}),
  }),
});
