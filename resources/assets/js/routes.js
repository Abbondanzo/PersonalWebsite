import VueRouter from 'vue-router'

let routes = [
    {
        path: '/',
        name: 'Home',
        component: require('./components/Home')
    },
    {
        path: '/about',
        name: 'About',
        component: require('./components/About')
    },
    {
        path: '/projects',
        component: require('./components/Projects'),
        children: [
            {
                path: '',
                name: 'Projects',
                component: require('./components/Projects/Main')
            },
            {
                path: 'bvc',
                name: 'Bonne Vie Café',
                component: require('./components/Projects/Bonne')
            },
            {
                path: 'rogue',
                name: 'Rogue',
                component: require('./components/Projects/Rogue')
            },
            {
                path: 'feedshare',
                name: 'Feedshare',
                component: require('./components/Projects/FeedShare')
            },
            {
                path: 'flipster',
                name: 'Flipster',
                component: require('./components/Projects/Flipster')
            },
            {
                path: 'sthacks',
                name: 'Sthacks',
                component: require('./components/Projects/Sthacks')
            },
            {
                path: 'myneu',
                name: 'Modern MyNEU',
                component: require('./components/Projects/ModernMyNEU')
            }
        ]
    },
    {
        path: '/contact',
        name: 'Contact',
        component: require('./components/Contact')
    },
    {
        path: '*',
        name: 'Page Not Found',
        component: require('./components/404')
    }
]

export default new VueRouter({
    mode: 'history',
    routes
})
