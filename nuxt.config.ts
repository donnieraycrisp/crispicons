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
})
