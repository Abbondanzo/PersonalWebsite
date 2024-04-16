const isProduction = process.env.NODE_ENV === 'production'

const BASE_URL = isProduction
  ? 'https://abbondanzo.com'
  : 'http://localhost:3000'

const currentDate = new Date().toISOString().split('T')[0]

const googleAnalyticsId = isProduction
  ? process.env.GOOGLE_UA_KEY
  : process.env.GOOGLE_UA_KEY_DEV

if (!googleAnalyticsId) {
  console.warn('Missing Google Tag')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: !isProduction },

  ssr: isProduction,
  nitro: {
    static: isProduction,
    prerender: {
      routes: ['/_ipx/f_webp/bg.webp'],
    },
  },

  typescript: {
    typeCheck: true,
  },

  // Global page headers (https://nuxt.com/docs/api/nuxt-config#head)
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
    'nuxt-gtag', // https://github.com/johannschopplich/nuxt-gtag
    '@vee-validate/nuxt', // https://vee-validate.logaretm.com/v4/integrations/nuxt/
    '@nuxtjs/google-fonts', // https://google-fonts.nuxtjs.org/
    '@nuxtjs/robots', // https://github.com/nuxt-community/robots-module#readme
    '@nuxtjs/sitemap', // https://github.com/nuxt-community/sitemap-module#readme
    '@nuxt/image', // https://image.nuxt.com/usage/nuxt-img
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

  gtag: {
    tags: googleAnalyticsId ? [googleAnalyticsId] : [],
  },

  image: {
    dir: 'assets/img',
    format: ['webp'],
    inject: true,
    provider: 'ipx',
  },

  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '',
      Sitemap: `${BASE_URL}/sitemap.xml`,
    },
  },

  site: {
    url: BASE_URL,
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
