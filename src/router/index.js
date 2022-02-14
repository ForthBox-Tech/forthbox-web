import { createRouter, createWebHashHistory } from 'vue-router'
import Layout1 from '@/layouts/Layout1'
import Home from '@/views/Home/index.old.vue'
// import Home from '@/views/Home'
import Minting from '@/views/Minting'
import Share from '@/views/Share'
import Faq from '@/views/Faq'
import Recruit from '@/views/Recruit'
import Invite from '@/views/Invite'
import gameRoutes from './game.routes'
import defiRoutes from './difi.routes'
import marketRoutes from './market.routes'
import market2Routes from './market2.routes'
import game2Routes from './game2.routes'
import settingsRoutes from './settings.routes'
import promoRoutes from './promo.routes'
import adminRoutes from './admin.routes'

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  {
    path: '/',
    component: Layout1,
    children: [{ path: '', component: Home, meta: { title: 'ForthBox' } }],
  },
  {
    path: '/minting',
    name: 'Minting',
    component: Minting,
    meta: { title: 'Mint Ham' },
  },
  {
    path: '/invite',
    component: Invite,
  },
  {
    path: '/share',
    name: 'Share',
    component: Share,
    meta: { title: 'Share' },
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq,
    meta: { title: 'FAQ' },
  },
  {
    path: '/recruit',
    name: 'Recruit',
    component: Recruit,
  },
  ...gameRoutes,
  ...marketRoutes,
  ...defiRoutes,
  ...market2Routes,
  ...game2Routes,
  ...settingsRoutes,
  ...promoRoutes,
  ...adminRoutes,
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const TITLE = 'ForthBox'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || TITLE
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    window.scrollTo(0, 0)
  }
})

export default router




