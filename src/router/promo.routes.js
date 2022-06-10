import Promo from '@/views/Promo'
import Metabull from '@/views/Promo/Metabull'

const routes = [
  {
    path: '/promo',
    component: Promo,
    meta: { title: 'Campaigns' },
    redirect: (to) => `${to.path.replace(/\/$/, '')}/metabull`,
    children: [
      {
        path: 'metabull',
        component: Metabull,
        meta: {
          title: 'Campaign',
        },
      },
    ],
  },
]

export default routes

