import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Flipster from '@/components/Projects/Flipster'
import Bonne from '@/components/Projects/Bonne'
import Rogue from '@/components/Projects/Rogue'
import FeedShare from '@/components/Projects/FeedShare'
import Sthacks from '@/components/Projects/Sthacks'
import ModernMyNEU from '@/components/Projects/ModernMyNEU'
import Contact from '@/components/Contact'

Vue.use(Router)

const TemplateRoute = {
    template: '<router-view transition="slide" mode="out-in" :duration="500"><div class="project-return">Return to projects</div></router-view>'
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
                    name: 'Bonne Vie Café',
                    component: Bonne
                },
                {
                    path: 'rogue',
                    name: 'Rogue',
                    component: Rogue
                },
                {
                    path: 'feedshare',
                    name: 'Feedshare',
                    component: FeedShare
                },
                {
                    path: 'flipster',
                    name: 'Flipster',
                    component: Flipster
                },
                {
                    path: 'sthacks',
                    name: 'Sthacks',
                    component: Sthacks
                },
                {
                    path: 'myneu',
                    name: 'Modern MyNEU',
                    component: ModernMyNEU
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
