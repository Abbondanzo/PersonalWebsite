// Global import Vue
require('./bootstrap')
window.Vue = require('vue')

import App from './App'
import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'
import router from './routes'

Vue.use(VueRouter)

// Google Analytics tracking tag
let uaKey = document.head.querySelector("[name=ua-google-key]").content
if (uaKey && uaKey !== '') {
    Vue.use(VueAnalytics, {
        id: uaKey,
        router
    })
}

const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
