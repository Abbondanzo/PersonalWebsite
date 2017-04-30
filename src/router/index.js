import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Flipster from '@/components/Projects/Flipster'
import Contact from '@/components/Contact'

Vue.use(Router)

const TemplateRoute = {
    template: '<router-view></router-view>'
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
                    component: Contact
                },
                {
                    path: 'rogue',
                    component: Contact
                },
                {
                    path: 'feedshare',
                    component: Contact
                },
                {
                    path: 'flipster',
                    component: Flipster
                },
                {
                    path: 'sthacks',
                    component: Contact
                },
                {
                    path: 'myneu',
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
