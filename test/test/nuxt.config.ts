const isProduction = process.env.NODE_ENV === 'production'

const BASE_URL = isProduction
  ? 'https://abbondanzo.com'
  : 'http://localhost:3000'

const currentDate = new Date().toISOString().split('T')[0]

const googleAnalyticsId = isProduction
  ? process.env.GOOGLE_UA_KEY
  : process.env.GOOGLE_UA_KEY_DEV

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: !isProduction },

  // Global page headers (https://nuxt.com/docs/api/nuxt-config#head)
  app: {
    head: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'Home',
      // all titles will be injected into this template
      titleTemplate: '%s | Peter V. Abbondanzo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.",
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content:
            'graphic designer,design,developer,develop,code,css,html,photoshop,peter,abbondanzo,peter abbondanzo,website,photoshop,ui,ui designer,ui developer,graphic,graphics',
        },
        { hid: 'og:title', name: 'og:title', content: 'Peter V. Abbondanzo' },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'abbondanzo.com',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.",
        },
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
          content: `${BASE_URL}/ogimage.jpg`,
        },
        {
          hid: 'image',
          name: 'image',
          property: 'image',
          content: `${BASE_URL}/ogimage.jpg`,
        },
        {
          hid: 'author',
          name: 'author',
          property: 'author',
          content: 'Peter Abbondanzo',
        },
        {
          hid: 'date',
          name: 'date',
          property: 'date',
          content: currentDate,
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    pageTransition: { name: 'slide', mode: 'out-in' },
  },

  css: ['@/assets/sass/app.scss'],

  modules: [
    // https://vee-validate.logaretm.com/v4/integrations/nuxt/
    '@vee-validate/nuxt',
    // https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/robots-module#readme
    '@nuxtjs/robots',
    // https://github.com/nuxt-community/sitemap-module#readme
    '@nuxtjs/sitemap',
  ],

  googleFonts: {
    families: {
      Montserrat: {
        wght: [400, 600, 700],
      },
      Raleway: {
        wght: [300, 400, 600],
      },
    },
  },

  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '',
      Sitemap: `${BASE_URL}/sitemap.xml`,
    },
  },

  sitemap: {
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: currentDate,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/sass/_variables.scss" as *;',
        },
      },
    },
  },
})
