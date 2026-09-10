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

// The contact form posts here. Same-origin now that the site Worker serves
// /mail itself; override only to point at a different deployment.
const mailEndpoint = process.env.NUXT_PUBLIC_MAIL_ENDPOINT || '/mail'

// Guard against a mangled override. Git Bash on Windows rewrites a leading
// slash into a Windows path, so NUXT_PUBLIC_MAIL_ENDPOINT=/mail silently
// becomes something like C:/Program Files/Git/mail and the form posts nowhere.
const endpointLooksValid =
  mailEndpoint.startsWith('/') ||
  mailEndpoint.startsWith('http://') ||
  mailEndpoint.startsWith('https://')

if (!endpointLooksValid) {
  throw new Error(
    `NUXT_PUBLIC_MAIL_ENDPOINT must be an absolute URL or a root-relative path, got: ${mailEndpoint}`,
  )
}

const turnstileSiteKey = process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY

if (!turnstileSiteKey) {
  console.warn('Missing Turnstile site key')
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-09-07',

  devtools: {
    enabled: !isProduction,

    timeline: {
      enabled: true,
    },
  },

  // This is a static build, so public runtime config is baked in at build time
  // rather than read from the environment at runtime. Both values are public.
  runtimeConfig: {
    public: {
      siteUrl: BASE_URL,
      mailEndpoint,
      turnstileSiteKey,
    },
  },

  ssr: isProduction,

  nitro: {
    // Pin the preset. Workers Builds sets Cloudflare environment variables, and
    // Nitro then auto-selects cloudflare-module even for `nuxt generate`: it
    // prerenders a handful of routes instead of every page, and emits a
    // redirected wrangler config pointing at a server entry a static build
    // never produces. The Worker serves .output/public as static assets.
    preset: 'static',
  },

  typescript: {
    typeCheck: true,
  },

  // Global page headers (https://nuxt.com/docs/api/nuxt-config#head)
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'keywords',
          content:
            'graphic designer,design,developer,develop,code,css,html,photoshop,peter,abbondanzo,peter abbondanzo,website,photoshop,ui,ui designer,ui developer,graphic,graphics',
        },
        { name: 'og:title', content: 'Peter V. Abbondanzo' },
        {
          name: 'og:site_name',
          content: 'abbondanzo.com',
        },
        {
          name: 'og:description',
          content:
            "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made.",
        },
        {
          name: 'og:image',
          property: 'og:image',
          content: `${BASE_URL}/ogimage.jpg`,
        },
        {
          name: 'image',
          property: 'image',
          content: `${BASE_URL}/ogimage.jpg`,
        },
        {
          name: 'author',
          property: 'author',
          content: 'Peter Abbondanzo',
        },
        {
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
