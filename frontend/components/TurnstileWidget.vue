<template>
  <div class="turnstile-field">
    <div ref="container" class="turnstile-widget" />
    <span v-if="failed" class="help turnstile-error">
      Verification could not load. Please refresh and try again, or reach out
      over social media.
    </span>
  </div>
</template>

<script>
/**
 * Cloudflare Turnstile widget, rendered explicitly.
 *
 * Hand-rolled rather than using @nuxtjs/turnstile, which pulls in @nuxt/scripts.
 * Written when this app was on Nuxt 3.11, below that module's minimum; kept
 * after the 3.21 upgrade because it needs no dependency and no version pin.
 *
 * Exposes reset() for the parent to call after every submission attempt --
 * Turnstile tokens are single-use, and the contact form stays mounted behind
 * its modal, so without a reset a second submit always fails verification.
 */
const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

let scriptPromise = null

const loadScript = () => {
  if (scriptPromise) {
    return scriptPromise
  }
  scriptPromise = new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve()
      return
    }
    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })
  return scriptPromise
}

export default {
  name: 'TurnstileWidget',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    // See contact.vue: composables need an instance context, so read the key
    // here rather than in mounted().
    const { turnstileSiteKey } = useRuntimeConfig().public
    return {
      siteKey: turnstileSiteKey,
      widgetId: null,
      failed: false,
    }
  },
  async mounted() {
    if (!this.siteKey) {
      // eslint-disable-next-line no-console
      console.warn('Missing Turnstile site key; contact form will be rejected.')
      return
    }

    try {
      await loadScript()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load Turnstile', error)
      return
    }

    this.widgetId = window.turnstile.render(this.$refs.container, {
      sitekey: this.siteKey,
      // Render UI only when a challenge actually needs the visitor to do
      // something. On success the widget stays invisible rather than showing
      // Cloudflare's success box.
      appearance: 'interaction-only',
      callback: (token) => {
        this.failed = false
        this.$emit('update:modelValue', token)
      },
      'expired-callback': () => this.$emit('update:modelValue', ''),
      'error-callback': () => {
        this.failed = true
        this.$emit('update:modelValue', '')
      },
    })
  },
  beforeUnmount() {
    if (this.widgetId && window.turnstile) {
      window.turnstile.remove(this.widgetId)
    }
  },
  methods: {
    reset() {
      if (this.widgetId && window.turnstile) {
        this.failed = false
        window.turnstile.reset(this.widgetId)
        this.$emit('update:modelValue', '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.turnstile-field {
  position: relative;
}

// Only take up space when Cloudflare actually injects a challenge; with
// appearance "interaction-only" the container is empty the rest of the time.
.turnstile-widget:not(:empty) {
  margin: 1rem 0;
}

.turnstile-error {
  position: static;
  display: block;
  color: #fff;
  font-size: 12px;
  opacity: 0.8;
  padding: 1rem 0;
}
</style>
