// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: { Rubik: [400, 600] },
    display: 'swap',
    download: true,
    inject: true,
  },
  app: {
    head: {
      // Static fallback only; dynamic titles handled in app.vue (per docs)
      title: 'crispicons — Free Open-Source SVG UI Icons',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'canonical', href: 'https://www.crispicons.com/' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        // Static, site-wide theming/robots only; SEO meta set in components
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { name: 'theme-color', content: '#EBEAEA' },
        { name: 'msapplication-TileColor', content: '#FF6B4A' },
        // OG/Twitter fallbacks (page-specific values will override via useSeoMeta)
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'crispicons' },
        {
          property: 'og:image',
          content: 'https://www.crispicons.com/social-image.png',
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'crispicons — SVG UI Icon Library',
        },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@donnieraycrisp' },
        { name: 'twitter:creator', content: '@donnieraycrisp' },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/_nuxt/**': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
      '/**/*.svg': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
      '/social-image.png': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
    },
  },
  experimental: { payloadExtraction: false },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'icon-components': [
              './app/components/Icon.vue',
              './app/components/IconGrid.vue',
            ],
          },
        },
      },
    },
  },
})
