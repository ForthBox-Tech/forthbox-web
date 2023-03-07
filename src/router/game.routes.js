import Games from '@/views/Games'
import Home from '@/views/Games/Home'
import Collections from '@/views/Games/Collections'
import About from '@/views/Home'

const routes = [
  {
    path: '/games',
    component: Games,
    meta: { title: 'Games' },
    children: [
      {
        path: '',
        name: 'GamesHome',
        component: Home,
        meta: { title: 'Games Home' },
      },
      {
        path: 'collections',
        name: 'GamesCollections',
        component: Collections,
        meta: { title: 'Game Collections' },
      },
      {
        path: 'about',
        component: About,
      },
    ],
  },
]

export default routes



