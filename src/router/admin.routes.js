import Admin from '@/views/Admin'
import HomeAdmin from '@/views/Admin/Home'

const routes = [
  {
    path: '/xadminx',
    name: 'Admin',
    component: Admin,
    meta: { title: 'Admin' },
    redirect: (to) => `${to.path}/home`,
    children: [
      {
        path: 'home',
        name: 'HomeAdmin',
        component: HomeAdmin,
      },
    ],
  },
]

export default routes

