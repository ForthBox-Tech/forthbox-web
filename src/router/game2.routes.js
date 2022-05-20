import Game2 from '@/views/Game2'
import Collections from '@/views/Game2/Collections.vue'
import Project from '@/views/Game2/Project.vue'

const routes = [
  {
    path: '/game2',
    component: Game2,
    meta: { title: 'GameFi Center' },
    redirect: (to) => `${to.path.replace(/\/$/, '')}/collections`,
    children: [
      {
        path: 'collections',
        name: 'Game2Collections',
        component: Collections,
        meta: { title: 'Collections' },
      },
      {
        path: 'project',
        component: Project,
      },
    ],
  },
]

export default routes


