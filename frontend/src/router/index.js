import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* eslint-disable indent */
let routes = [{
        path: '/',
        name: 'Home',
        component: require('@/components/Home').default,
        meta: {
            description: 'I design websites and mobile applications for people and have a long last name. Come check out the cool projects I\'ve made.'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: require('@/components/About').default,
        meta: {
            description: 'Experienced full-stack developer with a passion for creating, innovating, and coffee. Well versed in Adobe\'s Creative Suite'
        }
    },
    {
        path: '/projects',
        component: require('@/components/Projects').default,
        children: [{
                path: '',
                name: 'Projects',
                component: require('@/components/Projects/Main').default,
                meta: {
                    description: 'Recent projects, both personal and for work. You can only know what\'s here if you take a look.'
                }
            },
            {
                path: 'bvc',
                name: 'Bonne Vie Café',
                component: require('@/components/Projects/Bonne').default,
                meta: {
                    description: 'Wireframing and mock-up designs for a mock bakery. Utilizes Zapla API for table reservations and more.'
                }
            },
            {
                path: 'rogue',
                name: 'Rogue',
                component: require('@/components/Projects/Rogue').default,
                meta: {
                    description: 'Simple one-page site for advertising Counter Strike: Global Offensive software.'
                }
            },
            {
                path: 'feedshare',
                name: 'Feedshare',
                component: require('@/components/Projects/FeedShare').default,
                meta: {
                    description: 'Complete product design and development project for a food sharing mobile application.'
                }
            },
            {
                path: 'flipster',
                name: 'Flipster',
                component: require('@/components/Projects/Flipster').default,
                meta: {
                    description: 'Mock-up designs for an E-Commerce/user trading website. Cross-breed of Craigslist and eBay.'
                }
            },
            {
                path: 'sthacks',
                name: 'Sthacks',
                component: require('@/components/Projects/Sthacks').default,
                meta: {
                    description: 'Unique in-browser terminal designed to display pre-defined information only to tech-savvy users.'
                }
            },
            {
                path: 'myneu',
                name: 'Modern MyNEU',
                component: require('@/components/Projects/ModernMyNEU').default,
                meta: {
                    description: 'Full-fledged Chrome extension designed to overhaul the look and flow of Northeastern\'s student portal.'
                }
            }
        ]
    },
    {
        path: '/contact',
        name: 'Contact',
        component: require('@/components/Contact').default,
        meta: {
            description: 'Use this form to send me an email or follow any of my social profiles.'
        }
    },
    {
        path: '*',
        name: 'Page Not Found',
        component: require('@/components/404').default,
        meta: {
            description: 'The page you are looking for does not exist.'
        }
    }
]

export default new Router({
    mode: 'history',
    routes
})