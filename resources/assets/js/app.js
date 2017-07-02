// Global import Vue
require('./bootstrap')
window.Vue = require('vue')

import App from './App'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)

const app = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
