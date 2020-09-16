import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: {
    id:
      process.env.NODE_ENV === 'production'
        ? process.env.GOOGLE_UA_KEY
        : process.env.GOOGLE_UA_KEY_DEV
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
