import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Flipster from '@/components/Projects/Flipster'
import Contact from '@/components/Contact'

Vue.use(Router)

const TemplateRoute = {
    template: '<router-view transition="slide" mode="out-in" :duration="500"></router-view>'
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/projects',
            component: TemplateRoute,
            children: [
                {
                    path: '',
                    name: 'Projects',
                    component: Projects
                },
                {
                    path: 'bvc',
                    name: 'Bonne Vie Cafe',
                    component: Contact
                },
                {
                    path: 'rogue',
                    name: 'Rogue',
                    component: Contact
                },
                {
                    path: 'feedshare',
                    name: 'Feedshare',
                    component: Contact
                },
                {
                    path: 'flipster',
                    name: 'Flipster',
                    component: Flipster
                },
                {
                    path: 'sthacks',
                    name: 'Sthacks',
                    component: Contact
                },
                {
                    path: 'myneu',
                    name: 'Modern MyNEU',
                    component: Contact
                }
            ]
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        }
    ]
})
