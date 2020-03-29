import FourOhFour from '@/components/404.vue'
import About from '@/components/About.vue'
import Contact from '@/components/Contact.vue'
import Home from '@/components/Home.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      description:
        "I design websites and mobile applications for people and have a long last name. Come check out the cool projects I've made."
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      description:
        "Experienced full-stack developer with a passion for creating, innovating, and coffee. Well versed in Adobe's Creative Suite"
    }
  },
  {
    path: '/projects',
    component: () =>
      import(/* webpackChunkName: "projects" */ '@/components/Projects.vue'),
    children: [
      {
        path: '',
        name: 'Projects',
        component: require('@/components/Projects/Main').default,
        meta: {
          description:
            "Recent projects, both personal and for work. You can only know what's here if you take a look."
        }
      },
      {
        path: 'bvc',
        name: 'Bonne Vie Café',
        component: require('@/components/Projects/Bonne').default,
        meta: {
          description:
            'Wireframing and mock-up designs for a mock bakery. Utilizes Zapla API for table reservations and more.'
        }
      },
      {
        path: 'rogue',
        name: 'Rogue',
        component: require('@/components/Projects/Rogue').default,
        meta: {
          description:
            'Simple one-page site for advertising Counter Strike: Global Offensive software.'
        }
      },
      {
        path: 'feedshare',
        name: 'Feedshare',
        component: require('@/components/Projects/FeedShare').default,
        meta: {
          description:
            'Complete product design and development project for a food sharing mobile application.'
        }
      },
      {
        path: 'flipster',
        name: 'Flipster',
        component: require('@/components/Projects/Flipster').default,
        meta: {
          description:
            'Mock-up designs for an E-Commerce/user trading website. Cross-breed of Craigslist and eBay.'
        }
      },
      {
        path: 'sthacks',
        name: 'Sthacks',
        component: require('@/components/Projects/Sthacks').default,
        meta: {
          description:
            'Unique in-browser terminal designed to display pre-defined information only to tech-savvy users.'
        }
      },
      {
        path: 'myneu',
        name: 'Modern MyNEU',
        component: require('@/components/Projects/ModernMyNEU').default,
        meta: {
          description:
            "Full-fledged Chrome extension designed to overhaul the look and flow of Northeastern's student portal."
        }
      },
      {
        path: 'magic-mover',
        name: 'Magic Mover',
        component: require('@/components/Projects/MagicMover').default,
        meta: {
          description:
            'Rehabilitation AR game and research using the Microsoft Hololens.'
        }
      },
      {
        path: 'replay-viewer',
        name: 'Replay Viewer',
        component: require('@/components/Projects/ReplayViewer').default,
        meta: {
          description:
            'A Rocket League replay viewer in the browser written entirely in JavaScript using Three.JS.'
        }
      }
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      description:
        'Use this form to send me an email or follow any of my social profiles.'
    }
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: FourOhFour,
    meta: {
      description: 'The page you are looking for does not exist.'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
