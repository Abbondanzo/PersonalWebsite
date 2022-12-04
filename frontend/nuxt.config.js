const isProduction = process.env.NODE_ENV === 'production'

const BASE_URL = isProduction
  ? 'https://abbondanzo.com'
  : 'http://localhost:3000'

const currentDate = new Date().toISOString().split('T')[0]

const googleAnalyticsId = isProduction
  ? process.env.GOOGLE_UA_KEY
  : process.env.GOOGLE_UA_KEY_DEV

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
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
      { hid: 'og:site_name', name: 'og:site_name', content: 'abbondanzo.com' },
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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/sass/_variables.scss', '@/assets/sass/app.scss'],
  styleResources: {
    scss: ['@/assets/sass/_variables.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['~/plugins/vee-validate'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://google-analytics.nuxtjs.org/
    '@abbo/nuxt-google-analytics',
    // https://google-fonts.nuxtjs.org/
    ['@nuxtjs/google-fonts'],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://github.com/nuxt-community/robots-module#readme
    '@nuxtjs/robots',
    // https://github.com/nuxt-community/sitemap-module#readme
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  generate: { fallback: '404.html' },

  googleAnalytics: {
    id: googleAnalyticsId,
    useGtag: true,
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: googleAnalyticsId,
      useGtag: true,
    },
  },

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

  sitemap: {
    hostname: BASE_URL,
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: currentDate,
    },
  },
}
