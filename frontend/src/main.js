// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueAnalytics from 'vue-analytics'
import router from './router'

Vue.config.productionTip = false

// Google Analytics tracking tag
function analytics() {
    let docSelector = document.head.querySelector('[name=ua-google-key]')
    if (!docSelector) {
        return
    }
    let uaKey = document.head.querySelector('[name=ua-google-key]').content
    if (uaKey && uaKey !== '') {
        Vue.use(VueAnalytics, {
            id: uaKey,
            router
        })
    }
}

analytics()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
