// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/scss/main.scss'],
  modules: ['@nuxtjs/google-fonts'],
  googleFonts: {
    families: {
      Rubik: [400, 600],
    },
    display: 'swap',
    download: true,
    inject: true,
  },
  app: {
    head: {
      title:
        'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
        },
        {
          name: 'keywords',
          content:
            'free icons, svg icons, open source icons, icon library, download icons, crypto icons, arrow icons, currency icons, web icons, design icons',
        },
        { name: 'author', content: 'crispicons' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'English' },
        { name: 'revisit-after', content: '7 days' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content:
            'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
        },
        {
          property: 'og:description',
          content:
            'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
        },
        { property: 'og:url', content: 'https://crispicons.com' },
        { property: 'og:site_name', content: 'crispicons' },
        {
          property: 'og:image',
          content: 'https://crispicons.com/social-image.png',
        },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content:
            'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
        },
        {
          name: 'twitter:description',
          content:
            'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
        },
        {
          name: 'twitter:image',
          content: 'https://crispicons.com/social-image.png',
        },
        { name: 'twitter:creator', content: '@donnieraycrisp' },

        // Additional SEO
        { name: 'theme-color', content: '#EBEAEA' },
        { name: 'msapplication-TileColor', content: '#FF6B4A' },
      ],
      link: [
        { rel: 'canonical', href: 'https://crispicons.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Collection',
            name: 'crispicons',
            description:
              'crispicons - clean and crisp open source icons made with ❤️ for designers and developers',
            url: 'https://crispicons.com',
            creator: {
              '@type': 'Organization',
              name: 'crispicons',
            },
            license: 'MIT License',
            keywords: 'free icons, svg icons, open source icons, icon library',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: 30,
              itemListElement: [],
            },
          }),
        },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  experimental: {
    payloadExtraction: false,
  },
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
